'use client';

import { Button } from '@shirux/rux-ui/components/button';
import { Switch } from '@shirux/rux-ui/components/switch';
import { Typography } from '@shirux/rux-ui/components/typography';
import type { RC } from '@shirux/types/react';
import { Bell, BellOff } from 'lucide-react';
import { useState } from 'react';

const SwitchButtonDemo: RC = () => {
  const [enabled, setEnabled] = useState(true);

  const setState = (next: boolean) => () => setEnabled(next);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-3 rounded-full border px-5 py-2">
        <div className="flex items-center gap-2">
          {enabled ? (
            <Bell className="text-primary size-4" />
          ) : (
            <BellOff className="text-muted-foreground size-4" />
          )}
          <Typography variant="sm">推播提醒</Typography>
        </div>
        <Switch checked={enabled} onCheckedChange={setEnabled} />
      </div>
      <div className="space-y-1">
        <Typography variant="sm">
          {enabled ? '推播提醒已啟用' : '已關閉推播提醒'}
        </Typography>
        <Typography color="muted" variant="small">
          {enabled
            ? '當有新案件動態時，你會第一時間收到通知。'
            : '不再發送推播通知，可於下方快速重新啟用。'}
        </Typography>
      </div>
      <div className="flex gap-2">
        <Button
          onClick={setState(true)}
          size="sm"
          variant={enabled ? 'default' : 'outline'}
        >
          快速開啟
        </Button>
        <Button
          onClick={setState(false)}
          size="sm"
          variant={!enabled ? 'default' : 'outline'}
        >
          關閉提醒
        </Button>
      </div>
    </div>
  );
};

export { SwitchButtonDemo };
