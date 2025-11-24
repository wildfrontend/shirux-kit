import { ImageResponse } from 'next/og';
import { Shirux } from '@shirux/rux-icons/logo';

export const runtime = 'edge';

export const size = {
  width: 32,
  height: 32,
};
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 24,
          background: 'transparent',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Shirux width="100%" height="100%" />
      </div>
    ),
    {
      ...size,
    }
  );
}
