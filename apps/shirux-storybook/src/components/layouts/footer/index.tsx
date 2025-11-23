import { Button } from '@shirux/rux-ui/components/button';
import { Typography } from '@shirux/rux-ui/components/typography';
import { Globe, Mail, Share2 } from 'lucide-react';
import type { RC } from '@shirux/types/react';

import { ShiruxLogoForge } from '@shirux/rux-icons/logo';

const footerColumns = [
  {
    title: '關於我們',
    links: ['品牌故事', '核心理念', '聯絡資訊'],
  },
  {
    title: '合作夥伴',
    links: ['合作流程', '合作案例', '夥伴支援'],
  },
  {
    title: '相關資訊',
    links: ['媒體資源', '常見問題', '最新消息'],
  },
];

const socialIcons = [
  { label: '官方網站', icon: Globe, href: '#' },
  { label: '聯絡我們', icon: Mail, href: '#' },
  { label: '社群分享', icon: Share2, href: '#' },
];
const Footer: RC = () => (
  <footer className="bg-primary relative mt-16">
    <div className="mx-auto w-full max-w-6xl px-6 py-12 sm:px-12">
      <div className="grid gap-10 md:grid-cols-[auto,1fr,auto] md:items-start">
        <div className="space-y-3">
          <ShiruxLogoForge className="h-6 w-auto" />
          <Typography color="primary" foreground variant="sm">
            用設計與科技串聯每一次互動，打造兼具美感與實用的數位體驗。
          </Typography>
        </div>

        <div className="grid gap-8 sm:grid-cols-3">
          {footerColumns.map((column) => (
            <div className="space-y-3" key={column.title}>
              <Typography
                as="h4"
                className="font-semibold tracking-wide uppercase"
                color="primary"
                foreground
                variant="sm"
              >
                {column.title}
              </Typography>
              <ul className="space-y-2">
                {column.links.map((link) => (
                  <li key={link}>
                    <Button
                      asChild
                      className="px-0 text-left"
                      color="primary"
                      foreground
                      variant="link"
                    >
                      <a href="#">{link}</a>
                    </Button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex items-start gap-4">
          <div className="flex gap-3">
            {socialIcons.map(({ label, icon: Icon, href }) => (
              <Button
                asChild
                color="primary"
                foreground
                key={label}
                radius="circle"
                size="icon"
              >
                <a aria-label={label} href={href}>
                  <Icon className="size-5" />
                </a>
              </Button>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-12 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <Typography color="primary" foreground variant="xs">
          © {new Date().getFullYear()} ELUELU. All rights reserved.
        </Typography>
        <Typography color="primary" foreground variant="xs">
          此區為示意內容，實際連結與資訊可再調整。
        </Typography>
      </div>
    </div>
  </footer>
);

export { Footer };
