// components/copy-all-button.tsx
'use client';

import { Copy } from 'lucide-react';
import { toast } from 'sonner';

export function CopyAllButton({ urls }: { urls: string[] }) {
  const handleCopyAll = () => {
    const textToCopy = urls.join('\n'); // pisahkan dengan enter
    navigator.clipboard
      .writeText(textToCopy)
      .then(() => toast.success('Semua URL berhasil disalin'))
      .catch(() => toast.error('Gagal menyalin URL'));
  };

  return (
    <small
      onClick={handleCopyAll}
      className='flex items-center gap-2 px-3 py-1 text-sm leading-none font-medium cursor-pointer hover:underline'
    >
      <Copy size={12} />
      Salin Semua URL
    </small>
  );
}
