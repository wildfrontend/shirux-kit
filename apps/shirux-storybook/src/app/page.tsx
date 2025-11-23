import { Button } from '@shirux/rux-ui/components/button';
import Link from 'next/link';
import type { RC } from '@shirux/types/react';

const Page: RC = () => (
  <div className="container mx-auto px-4 py-16">
    <div className="mx-auto flex max-w-4xl flex-col gap-12">
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold">@rux-ui Demo</h1>
        <p className="text-muted-foreground text-lg">
          探索和測試各種 UI 元件的展示範例
        </p>
      </div>
      <section className="space-y-4" id="design-system">
        <div>
          <h2 className="mb-2 text-2xl font-semibold">設計系統</h2>
          <p className="text-muted-foreground text-sm">
            探索設計系統的基礎元素，包含色彩與圖示庫
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="bg-muted/30 rounded-lg border p-6">
            <h3 className="mb-2 text-lg font-semibold">色彩系統</h3>
            <p className="text-muted-foreground mb-4 text-sm">
              完整的設計系統色彩定義，支援明暗主題切換
            </p>
            <Button asChild>
              <Link href="/color-system">查看色彩</Link>
            </Button>
          </div>
          <div className="bg-muted/30 rounded-lg border p-6">
            <h3 className="mb-2 text-lg font-semibold">圖示庫</h3>
            <p className="text-muted-foreground mb-4 text-sm">
              Rux Icons 圖示庫，包含所有自訂圖示與使用範例
            </p>
            <Button asChild>
              <Link href="/rux-icons">查看圖示</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  </div>
);

export default Page;
