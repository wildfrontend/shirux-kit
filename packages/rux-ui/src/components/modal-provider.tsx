import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useSyncExternalStore,
} from 'react';

// 特殊 symbol 用來表示返回上一層
export const MODAL_BACK = Symbol('MODAL_BACK');

interface ModalEntry {
  id: string;
  key: string;
  namespace: string;
  payload: unknown;
  resolve: (value: unknown) => void;
}

interface OpenModalOptions<TPayload> {
  key: string;
  namespace: string;
  payload?: TPayload;
}

interface ModalStoreSnapshot {
  stack: ModalEntry[];
  resolvingMap: Record<string, boolean>;
}

interface ModalStore {
  getSnapshot: () => ModalStoreSnapshot;
  getServerSnapshot: () => ModalStoreSnapshot;
  subscribe: (listener: () => void) => () => void;
  openModal: <TPayload = unknown, TResult = unknown>(
    options: OpenModalOptions<TPayload>
  ) => Promise<TResult | undefined>;
  closeModal: (id: string, result?: unknown) => void;
  closeTop: (result?: unknown) => void;
  resolveModal: <TResult>(
    id: string,
    executor: () => Promise<TResult> | TResult
  ) => Promise<void>;
}

const createModalStore = (): ModalStore => {
  let state: ModalStoreSnapshot = {
    stack: [],
    resolvingMap: {},
  };

  const listeners = new Set<() => void>();

  const getSnapshot = () => state;
  const getServerSnapshot = () => state;

  const notify = () => {
    listeners.forEach((listener) => listener());
  };

  const setState = (
    updater: (prev: ModalStoreSnapshot) => ModalStoreSnapshot
  ) => {
    const nextState = updater(state);
    if (nextState === state) {
      return;
    }
    state = nextState;
    notify();
  };

  const setResolving = (id: string, value: boolean) => {
    setState((prev) => {
      const currentlyResolving = !!prev.resolvingMap[id];
      if (value) {
        if (currentlyResolving) {
          return prev;
        }
        return {
          stack: prev.stack,
          resolvingMap: { ...prev.resolvingMap, [id]: true },
        };
      }
      if (!currentlyResolving) {
        return prev;
      }
      const { [id]: _, ...rest } = prev.resolvingMap;
      return {
        stack: prev.stack,
        resolvingMap: rest,
      };
    });
  };

  const openModal = <TPayload, TResult>({
    key,
    namespace,
    payload,
  }: OpenModalOptions<TPayload>) =>
    new Promise<TResult | undefined>((resolve) => {
      const entry: ModalEntry = {
        id: crypto.randomUUID(),
        key,
        namespace,
        payload: payload as unknown,
        resolve: resolve as (value: unknown) => void,
      };

      setState((prev) => ({
        stack: [...prev.stack, entry],
        resolvingMap: prev.resolvingMap,
      }));
    });

  const closeModal = (id: string, result?: unknown) => {
    let resolvedEntry: ModalEntry | undefined;

    setState((prev) => {
      const entryIndex = prev.stack.findIndex((item) => item.id === id);
      if (entryIndex === -1) {
        return prev;
      }

      resolvedEntry = prev.stack[entryIndex];

      const nextStack = [
        ...prev.stack.slice(0, entryIndex),
        ...prev.stack.slice(entryIndex + 1),
      ];
      const { [id]: _, ...restResolving } = prev.resolvingMap;

      return {
        stack: nextStack,
        resolvingMap: restResolving,
      };
    });

    resolvedEntry?.resolve(result);
  };

  const closeTop = (result?: unknown) => {
    let resolvedEntry: ModalEntry | undefined;

    setState((prev) => {
      if (!prev.stack.length) {
        return prev;
      }

      resolvedEntry = prev.stack[prev.stack.length - 1];
      if (!resolvedEntry) {
        return prev;
      }
      const { [resolvedEntry.id]: _, ...restResolving } = prev.resolvingMap;

      return {
        stack: prev.stack.slice(0, -1),
        resolvingMap: restResolving,
      };
    });

    resolvedEntry?.resolve(result);
  };

  const resolveModal = async <TResult,>(
    id: string,
    executor: () => Promise<TResult> | TResult
  ) => {
    setResolving(id, true);
    try {
      const result = await executor();
      closeModal(id, result);
    } finally {
      setResolving(id, false);
    }
  };

  const subscribe = (listener: () => void) => {
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  };

  return {
    getSnapshot,
    getServerSnapshot,
    subscribe,
    openModal,
    closeModal,
    closeTop,
    resolveModal,
  };
};

const ModalContext = createContext<ModalStore | undefined>(
  undefined as ModalStore | undefined
);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const storeRef = useRef<ModalStore | null>(null);

  if (!storeRef.current) {
    storeRef.current = createModalStore();
  }

  return (
    <ModalContext.Provider value={storeRef.current}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModalManager = () => {
  const store = useContext(ModalContext);

  if (!store) {
    throw new Error('useModalManager must be used within ModalProvider');
  }

  const snapshot = useSyncExternalStore(
    store.subscribe,
    store.getSnapshot,
    store.getServerSnapshot
  );

  return useMemo(
    () => ({
      stack: snapshot.stack,
      openModal: store.openModal,
      closeModal: store.closeModal,
      closeTop: store.closeTop,
      resolveModal: store.resolveModal,
      isResolving: (id: string) => !!snapshot.resolvingMap[id],
    }),
    [snapshot, store]
  );
};

// 解析 namespace 參數的共用函數
const parseNamespace = (
  namespaceOrKey?: string | [string] | [string, string]
): string => {
  if (!namespaceOrKey) return 'app';
  if (typeof namespaceOrKey === 'string') return namespaceOrKey;
  return namespaceOrKey[0];
};

// 解析 namespace 和 key 參數的共用函數
const parseNamespaceAndKey = (
  keyOrKeys: string | [string] | [string, string]
): [string, string] => {
  if (typeof keyOrKeys === 'string') return ['app', keyOrKeys];
  if (keyOrKeys.length === 1) return ['app', keyOrKeys[0]];
  return [keyOrKeys[0], keyOrKeys[1]];
};

export const useModalController = (
  namespaceOrKey?: string | [string] | [string, string]
) => {
  const { openModal } = useModalManager();
  const namespace = parseNamespace(namespaceOrKey);

  return useCallback(
    <TPayload = unknown, TResult = unknown>(key: string, payload?: TPayload) =>
      openModal<TPayload, TResult>({ key, namespace, payload }),
    [namespace, openModal]
  );
};

type ModalSlot<TPayload> =
  | {
      isOpen: false;
      id: null;
      payload: Partial<TPayload>;
      close: () => void;
      resolveWith: () => Promise<void>;
      index: -1;
      isTop: false;
      isResolving: false;
    }
  | {
      isOpen: true;
      id: string;
      payload: TPayload;
      close: (result?: unknown) => void;
      resolveWith: <TResult>(
        executor: () => Promise<TResult> | TResult
      ) => Promise<void>;
      index: number;
      isTop: boolean;
      isResolving: boolean;
    };

const noop = () => {};
const noopAsync = async () => {};

export const useModalSlot = <TPayload = unknown,>(
  keyOrKeys: string | [string] | [string, string]
): ModalSlot<TPayload> => {
  const { stack, closeModal, resolveModal, isResolving } = useModalManager();

  // 解析參數: 支援 'key' | ['key'] | ['namespace', 'key']
  const [namespace, modalKey] = parseNamespaceAndKey(keyOrKeys);

  return useMemo(() => {
    // 從後往前找最新的 modal entry
    // TODO: 當升級到 ES2023+ 時可直接使用 stack.findLastIndex()
    let index = -1;
    for (let i = stack.length - 1; i >= 0; i--) {
      const entry = stack[i];
      if (entry && entry.namespace === namespace && entry.key === modalKey) {
        index = i;
        break;
      }
    }

    if (index === -1) {
      return {
        isOpen: false,
        id: null,
        payload: {} as Partial<TPayload>,
        close: noop,
        resolveWith: noopAsync,
        index: -1,
        isTop: false,
        isResolving: false,
      };
    }

    const entry = stack[index]!;
    return {
      isOpen: true,
      id: entry.id,
      payload: entry.payload as TPayload,
      close: (result?: unknown) => closeModal(entry.id, result),
      resolveWith: <TResult,>(executor: () => Promise<TResult> | TResult) =>
        resolveModal(entry.id, executor),
      index,
      isTop: index === stack.length - 1,
      isResolving: isResolving(entry.id),
    };
  }, [stack, closeModal, resolveModal, isResolving, namespace, modalKey]);
};
