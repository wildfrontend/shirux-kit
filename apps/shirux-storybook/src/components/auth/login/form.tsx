'use client';

import dynamic from 'next/dynamic';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { parsePhoneNumberWithError } from 'libphonenumber-js';
import { Button } from '@shirux/rux-ui/components/button';
import { Input } from '@shirux/rux-ui/components/input';
import { Typography } from '@shirux/rux-ui/components/typography';
import { PhoneInput } from '@shirux/rux-ui/components/phone-input';
import type { RCC } from '@shirux/types/react';
import { useSignIn } from '@/hooks/auth';

const DevTool: React.ElementType = dynamic(
  () => import('@hookform/devtools').then((module) => module.DevTool),
  { ssr: false }
);

const phoneNumberSchema = z
  .string()
  .min(1, '請輸入手機號碼')
  .refine((value) => {
    try {
      return parsePhoneNumberWithError(value).isValid();
    } catch {
      return false;
    }
  }, '請輸入有效的手機號碼');

const loginSchema = z.object({
  phoneNumber: phoneNumberSchema,
  password: z.string().min(6, '密碼至少需要 6 個字元'),
});

export type LoginFormData = z.infer<typeof loginSchema>;
type LoginFormValues = z.input<typeof loginSchema>;

export interface LoginFormProps {
  onSuccess?: (data: LoginFormData) => void | Promise<void>;
  onError?: (error: Error) => void;
  onForgotPassword?: () => void;
  onRegister?: () => void;
}

export const LoginForm: RCC<LoginFormProps> = ({
  onSuccess,
  onError,
  onForgotPassword,
  onRegister,
}) => {
  const [generalError, setGeneralError] = useState('');
  const signInMutation = useSignIn();

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      phoneNumber: '',
      password: '',
    },
  });

  const isLoading = isSubmitting || signInMutation.isPending;

  const onSubmit = handleSubmit(async (formValues) => {
    setGeneralError('');
    signInMutation.reset();
    try {
      const parsedData = loginSchema.parse(formValues);
      await signInMutation.mutateAsync({
        phone: parsedData.phoneNumber,
        password: parsedData.password,
      });
      await onSuccess?.(parsedData);
    } catch (error) {
      const err = error instanceof Error ? error : new Error('登入失敗');
      setGeneralError(err.message || '登入失敗,請檢查您的手機號碼和密碼');
      onError?.(err);
    }
  });

  return (
    <>
      <form className="mt-8 space-y-6" onSubmit={onSubmit}>
        <div className="space-y-4">
          <div>
            <Typography asChild className="mb-2 block" variant="small">
              <label htmlFor="phone">手機號碼</label>
            </Typography>
            <Controller
              control={control}
              name="phoneNumber"
              render={({
                field: { value, onChange },
                fieldState: { error },
              }) => (
                <>
                  <PhoneInput
                    disabled={isLoading}
                    error={!!error}
                    id="phone"
                    onChange={(value) => {
                      onChange(value);
                    }}
                    value={value}
                  />
                  {error && (
                    <Typography
                      className="mt-1 font-normal"
                      color="error"
                      variant="xs"
                    >
                      {error.message}
                    </Typography>
                  )}
                </>
              )}
            />
          </div>

          <div>
            <Typography asChild className="mb-2 block" variant="small">
              <label htmlFor="password">密碼</label>
            </Typography>
            <Controller
              control={control}
              name="password"
              render={({ field, fieldState }) => (
                <>
                  <Input
                    aria-invalid={!!fieldState.error}
                    autoComplete="current-password"
                    disabled={isLoading}
                    id="password"
                    placeholder="請輸入密碼"
                    type="password"
                    {...field}
                  />
                  {fieldState.error && (
                    <Typography
                      className="mt-1 font-normal"
                      color="error"
                      variant="xs"
                    >
                      {fieldState.error.message}
                    </Typography>
                  )}
                </>
              )}
            />
          </div>
        </div>

        {onForgotPassword && (
          <div className="flex items-center justify-end">
            <button
              className="text-primary text-sm hover:underline"
              onClick={onForgotPassword}
              type="button"
            >
              忘記密碼?
            </button>
          </div>
        )}

        {(generalError || signInMutation.error) && (
          <div className="bg-destructive/10 rounded-md p-3">
            <Typography color="error" variant="small">
              {generalError ||
                (signInMutation.error instanceof Error
                  ? signInMutation.error.message
                  : '登入失敗')}
            </Typography>
          </div>
        )}

        <Button className="w-full" disabled={isLoading} size="lg" type="submit">
          {isLoading ? '登入中...' : '登入'}
        </Button>

        {onRegister && (
          <div className="text-center">
            <Typography color="muted" variant="small">
              還沒有帳號?{' '}
              <button
                className="text-primary hover:underline"
                onClick={onRegister}
                type="button"
              >
                立即註冊
              </button>
            </Typography>
          </div>
        )}
      </form>
      <DevTool control={control} />
    </>
  );
};
