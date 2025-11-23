
> 本文件定義 monorepo 內所有 React 元件、型別、與撰寫風格規範。
> 適用範圍：`apps/*`, `packages/*`

---

## 🎯 React Component 撰寫規範

### ⚠️ 重要：優先使用 RC / RCC 類型

所有 React 元件都必須使用 `@shirux/types` 提供的 `RC` 和 `RCC` 類型。

```typescript
// ✅ 一般元件使用 RC
export const Button: RC<{ label: string; onClick?: () => void }> = ({ label, onClick }) => {
  return (
    <button onClick={onClick}>{label}</button>
  );
};

// ✅ 有 children 的元件使用 RCC
export const Card: RCC<{ title: string; className?: string }> = ({ title, children, className }) => {
  return (
    <div className={className}>
      <h3>{title}</h3>
      {children}
    </div>
  );
};
```