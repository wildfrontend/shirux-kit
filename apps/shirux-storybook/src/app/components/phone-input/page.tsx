'use client';

import { useState, type FormEvent } from 'react';
import { Button } from '@shirux/rux-ui/components/button';
import {
  PhoneInput,
  PhoneInputSkeleton,
} from '@shirux/rux-ui/components/phone-input';
import { Typography } from '@shirux/rux-ui/components/typography';
import type { RC } from '@shirux/types/react';

import { ComponentPreview } from '@/components/ui/component-preview';

const PhoneInputPage: RC = () => {
  const [basicValue, setBasicValue] = useState('');
  const [basicE164, setBasicE164] = useState<string | undefined>(undefined);
  const [lockedCountryValue, setLockedCountryValue] = useState('');
  const [lockedCountryE164, setLockedCountryE164] = useState<
    string | undefined
  >(undefined);
  const [radiusValues, setRadiusValues] = useState<
    Record<'default' | 'none', string>
  >({
    default: '',
    none: '',
  });
  const [formValue, setFormValue] = useState('');
  const [formE164, setFormE164] = useState<string | undefined>(undefined);
  const [formError, setFormError] = useState('');
  const [submittedValue, setSubmittedValue] = useState<string | null>(null);

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!formE164) {
      setFormError('請輸入有效的國際電話格式');
      setSubmittedValue(null);
      return;
    }

    setFormError('');
    setSubmittedValue(formE164);
  };

  return (
    <div className="mx-auto max-w-5xl space-y-12">
      <div>
        <Typography className="mb-2" variant="h1">
          Phone Input
        </Typography>
        <Typography color="muted" variant="p">
          以 libphonenumber-js
          驗證的國際電話輸入欄位，支援國碼選擇、圓角樣式與錯誤顯示。
        </Typography>
      </div>

      <div className="bg-muted/20 rounded-lg border p-4">
        <Typography className="mb-1 font-semibold" variant="sm">
          使用流程
        </Typography>
        <Typography color="muted" variant="xs">
          Phone Input
          會根據瀏覽器語系推測預設國際碼；當使用者輸入完整的國際電話（含 +
          國碼）時，元件會自動更新對應國別並回傳最新的 E.164 格式。
        </Typography>
      </div>

      <div className="bg-muted/30 space-y-4 rounded-lg border p-6">
        <Typography variant="h3">Props</Typography>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="px-4 py-2 text-left font-semibold">Prop</th>
                <th className="px-4 py-2 text-left font-semibold">Type</th>
                <th className="px-4 py-2 text-left font-semibold">Default</th>
                <th className="px-4 py-2 text-left font-semibold">
                  Description
                </th>
              </tr>
            </thead>
            <tbody className="divide-y">
              <tr>
                <td className="px-4 py-2 font-mono">value</td>
                <td className="px-4 py-2 font-mono text-xs">string</td>
                <td className="px-4 py-2 font-mono">""</td>
                <td className="px-4 py-2">受控輸入值，顯示於輸入框</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-mono">onChange</td>
                <td className="px-4 py-2 font-mono text-xs">
                  (value: string, e164?: string) =&gt; void
                </td>
                <td className="px-4 py-2 font-mono">-</td>
                <td className="px-4 py-2">輸入更新時回傳原始與 E.164 值</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-mono">defaultCountry</td>
                <td className="px-4 py-2 font-mono text-xs">CountryCode</td>
                <td className="px-4 py-2 font-mono">使用者系統推測</td>
                <td className="px-4 py-2">預設國別與國碼</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-mono">enableCountrySelect</td>
                <td className="px-4 py-2 font-mono text-xs">boolean</td>
                <td className="px-4 py-2 font-mono">true</td>
                <td className="px-4 py-2">是否允許使用者切換國碼</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-mono">radius</td>
                <td className="px-4 py-2 font-mono text-xs">
                  "default" | "none"
                </td>
                <td className="px-4 py-2 font-mono">"default"</td>
                <td className="px-4 py-2">
                  輸入框圓角樣式（目前僅支援標準與無圓角）
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-mono">error</td>
                <td className="px-4 py-2 font-mono text-xs">boolean</td>
                <td className="px-4 py-2 font-mono">false</td>
                <td className="px-4 py-2">顯示錯誤邊框與樣式</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-mono">disabled</td>
                <td className="px-4 py-2 font-mono text-xs">boolean</td>
                <td className="px-4 py-2 font-mono">false</td>
                <td className="px-4 py-2">禁用輸入與國碼選擇</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-muted/30 mt-12 space-y-4 rounded-lg border p-6">
        <Typography variant="h3">使用範例</Typography>
        <pre className="overflow-x-auto rounded-md bg-black p-4 text-sm text-white">
          <code>{`import { PhoneInput } from "@shirux/rux-ui/components/phone-input";

const Example: RC = () => {
  const [phone, setPhone] = useState("");
  const [e164, setE164] = useState<string | undefined>();

  // 預設會依瀏覽器語系判定國碼，輸入 + 國碼會自動更新對應地區
  return (
    <PhoneInput
      value={phone}
      onChange={(value, formatted) => {
        setPhone(value);
        setE164(formatted);
      }}
      error={!e164}
      placeholder="輸入電話號碼"
    />
  );
};`}</code>
        </pre>
      </div>

      <ComponentPreview
        description="輸入值會同時返回原始字串與 E.164 標準格式"
        title="基本用法"
      >
        <div className="flex w-full max-w-xl flex-col gap-4">
          <PhoneInput
            onChange={(value, e164) => {
              setBasicValue(value);
              setBasicE164(e164);
            }}
            placeholder="輸入電話號碼"
            value={basicValue}
          />
          <div className="bg-muted/30 grid gap-2 rounded-md p-4 text-sm">
            <div className="flex items-center justify-between">
              <Typography variant="xs">目前輸入值</Typography>
              <Typography variant="xs">{basicValue || '-'}</Typography>
            </div>
            <div className="flex items-center justify-between">
              <Typography variant="xs">E.164</Typography>
              <Typography variant="xs">{basicE164 || '尚未產生'}</Typography>
            </div>
          </div>
        </div>
      </ComponentPreview>

      <ComponentPreview
        description="可預設國家與鎖定國碼選單，常見於區域限定註冊流程"
        title="預設國別與鎖定國碼"
      >
        <div className="flex w-full max-w-xl flex-col gap-4">
          <PhoneInput
            defaultCountry="TW"
            enableCountrySelect={false}
            onChange={(value, e164) => {
              setLockedCountryValue(value);
              setLockedCountryE164(e164);
            }}
            placeholder="輸入台灣手機號碼"
            value={lockedCountryValue}
          />
          <Typography color="muted" variant="xs">
            E.164: {lockedCountryE164 || '尚未產生'}
          </Typography>
        </div>
      </ComponentPreview>

      <ComponentPreview
        description="支援標準與無圓角樣式，可依需求切換對應風格"
        title="圓角樣式"
      >
        <div className="flex w-full flex-col gap-4">
          <PhoneInput
            onChange={(value) => {
              setRadiusValues((prev) => ({
                ...prev,
                default: value,
              }));
            }}
            placeholder="Default - 標準圓角"
            radius="default"
            value={radiusValues.default}
          />
          <PhoneInput
            defaultCountry="JP"
            onChange={(value) => {
              setRadiusValues((prev) => ({
                ...prev,
                none: value,
              }));
            }}
            placeholder="None - 無圓角"
            radius="none"
            value={radiusValues.none}
          />
        </div>
      </ComponentPreview>

      <ComponentPreview
        description="搭配錯誤提示與送出按鈕，展示真實表單流程"
        title="表單整合"
      >
        <form
          className="flex w-full max-w-xl flex-col gap-4"
          onSubmit={handleFormSubmit}
        >
          <PhoneInput
            error={!!formError}
            onChange={(value, e164) => {
              setFormValue(value);
              setFormE164(e164);
            }}
            placeholder="請輸入連絡電話"
            value={formValue}
          />
          {formError && (
            <Typography color="error" variant="xs">
              {formError}
            </Typography>
          )}
          <div className="flex items-center gap-3">
            <Button type="submit">送出</Button>
            {submittedValue && (
              <Typography color="success" variant="xs">
                送出值：{submittedValue}
              </Typography>
            )}
          </div>
        </form>
      </ComponentPreview>

      <ComponentPreview
        description="載入中時可顯示骨架畫面，避免版面突變"
        title="Skeleton"
      >
        <div className="flex w-full max-w-xl flex-col gap-4">
          <PhoneInputSkeleton />
          <PhoneInputSkeleton enableCountrySelect={false} />
        </div>
      </ComponentPreview>
    </div>
  );
};

export default PhoneInputPage;
