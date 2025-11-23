/**
 * 🔹 Next.js App Router 官方 Page props 介面（對齊官方 Promise 版本）
 * 參考：https://nextjs.org/docs/app/api-reference/file-conventions/page#page-props-helper
 */
export interface PageProps<
  Params extends Record<string, string | string[]> = Record<string, string | string[]>,
  SearchParams extends Record<string, string | string[] | undefined> = Record<
    string,
    string | string[] | undefined
  >,
> {
  params: Promise<Params>;
  searchParams: Promise<SearchParams>;
}
