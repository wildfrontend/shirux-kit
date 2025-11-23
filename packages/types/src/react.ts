import type { PropsWithChildren, ReactElement } from "react";

export type ComponentReturn = ReactElement | null;
export type WithDisplayName<T> = T & { displayName?: string };

/**
 * 🔹 Arrow function component
 * @example
 * export const Button: RC<{ label: string }> = ({ label }) => <button>{label}</button>;
 */
export type RC<P = {}> = WithDisplayName<(props: P) => ComponentReturn>;

/**
 * 🔹 Arrow function component with children
 * @example
 * export const Card: RCC<{ title: string }> = ({ title, children }) => (
 *   <div><h3>{title}</h3>{children}</div>
 * );
 */
export type RCC<P = {}> = RC<PropsWithChildren<P>>;

type MaybePromise<T> = T | Promise<T>;

/**
 * 🔹 Async-friendly component (e.g. Next.js Server Component)
 * @example
 * export const ServerButton: SSRC<{ label: string }> = async ({ label }) => {
 *   await doSomething();
 *   return <button>{label}</button>;
 * };
 */

export type SRC<P = {}> = WithDisplayName<(props: P) => MaybePromise<ComponentReturn>>;

/**
 * 🔹 Async-friendly arrow function component with children (SSR)
 */
export type SRCC<P = {}> = SRC<PropsWithChildren<P>>;
