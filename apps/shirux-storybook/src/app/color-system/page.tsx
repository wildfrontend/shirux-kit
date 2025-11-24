import type { RC } from '@shirux/types/react';

const ColorSystemPage: RC = () => {
  const colorCategories = [
    {
      title: 'Primary Colors',
      description: '主要品牌色彩',
      colors: [
        { name: 'primary', var: '--primary', description: '主要品牌色' },
        {
          name: 'primary-foreground',
          var: '--primary-foreground',
          description: '主要色文字',
        },
      ],
    },
    {
      title: 'Secondary Colors',
      description: '次要色彩',
      colors: [
        { name: 'secondary', var: '--secondary', description: '次要背景色' },
        {
          name: 'secondary-foreground',
          var: '--secondary-foreground',
          description: '次要色文字',
        },
      ],
    },
    {
      title: 'Accent Colors',
      description: '強調色彩',
      colors: [
        { name: 'accent', var: '--accent', description: '強調背景色' },
        {
          name: 'accent-foreground',
          var: '--accent-foreground',
          description: '強調色文字',
        },
      ],
    },
    {
      title: 'Muted Colors',
      description: '柔和色彩',
      colors: [
        { name: 'muted', var: '--muted', description: '柔和背景色' },
        {
          name: 'muted-foreground',
          var: '--muted-foreground',
          description: '柔和色文字',
        },
      ],
    },
    {
      title: 'Destructive Colors',
      description: '警示色彩',
      colors: [
        {
          name: 'destructive',
          var: '--destructive',
          description: '警示/危險色',
        },
        {
          name: 'destructive-foreground',
          var: '--destructive-foreground',
          description: '警示色文字',
        },
      ],
    },
    {
      title: 'Base Colors',
      description: '基礎色彩',
      colors: [
        { name: 'background', var: '--background', description: '主背景色' },
        { name: 'foreground', var: '--foreground', description: '主文字色' },
        { name: 'card', var: '--card', description: '卡片背景色' },
        {
          name: 'card-foreground',
          var: '--card-foreground',
          description: '卡片文字色',
        },
        { name: 'popover', var: '--popover', description: '彈出層背景色' },
        {
          name: 'popover-foreground',
          var: '--popover-foreground',
          description: '彈出層文字色',
        },
      ],
    },
    {
      title: 'Border & Input',
      description: '邊框與輸入框',
      colors: [
        { name: 'border', var: '--border', description: '邊框色' },
        { name: 'input', var: '--input', description: '輸入框邊框色' },
        { name: 'ring', var: '--ring', description: '聚焦環色' },
      ],
    },
  ];

  return (
    <div className="container mx-auto space-y-8 px-4 py-8">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold">Color System</h1>
        <p className="text-muted-foreground text-lg">
          完整的設計系統色彩定義，支援明暗主題切換
        </p>
      </div>

      <div className="space-y-12">
        {colorCategories.map((category) => (
          <section className="space-y-4" key={category.title}>
            <div>
              <h2 className="text-2xl font-semibold">{category.title}</h2>
              <p className="text-muted-foreground text-sm">
                {category.description}
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {category.colors.map((color) => (
                <div
                  className="flex items-center gap-4 rounded-lg border p-4"
                  key={color.name}
                >
                  <div
                    className={`bg-${color.name} h-16 w-16 shrink-0 rounded-md border shadow-sm`}
                  />
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-2">
                      <code className="text-sm font-semibold">
                        {color.name}
                      </code>
                    </div>
                    <p className="text-muted-foreground text-xs">
                      {color.description}
                    </p>
                    <code className="text-muted-foreground text-xs">
                      var({color.var})
                    </code>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>

      <section className="bg-muted/30 space-y-4 rounded-lg border p-6">
        <h2 className="text-xl font-semibold">使用方式</h2>
        <div className="space-y-4">
          <div>
            <h3 className="mb-2 font-medium">Tailwind CSS Classes</h3>
            <pre className="bg-muted rounded-md p-4">
              <code className="text-sm">
                {`<div className="bg-primary text-primary-foreground">
  Primary Background
</div>

<div className="bg-secondary text-secondary-foreground">
  Secondary Background
</div>`}
              </code>
            </pre>
          </div>

          <div>
            <h3 className="mb-2 font-medium">CSS Variables</h3>
            <pre className="bg-muted rounded-md p-4">
              <code className="text-sm">
                {`.custom-element {
  background-color: hsl(var(--primary));
  color: hsl(var(--primary-foreground));
  border-color: hsl(var(--border));
}`}
              </code>
            </pre>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ColorSystemPage;
