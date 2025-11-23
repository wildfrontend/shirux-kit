import { NextResponse } from 'next/server';

export async function POST() {
  // 模擬處理時間
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // 隨機模擬成功或失敗
  const isSuccess = Math.random() > 0.3;

  if (isSuccess) {
    return NextResponse.json(
      {
        success: true,
        message: '資料處理成功',
      },
      { status: 200 }
    );
  } else {
    return NextResponse.json(
      {
        success: false,
        message: 'API 處理失敗',
      },
      { status: 500 }
    );
  }
}
