'use client';

import { Copy } from 'lucide-react';
import { toast } from 'sonner';

export function CopyButton({ text }: { text: string }) {
  const copyText = () => {
    navigator.clipboard
      .writeText(text)
      .then(() => toast.success('Teks disalin'))
      .catch(() => toast.error('Gagal menyalin'));
  };

  return (
    <button
      onClick={copyText}
      className='p-1 rounded hover:bg-gray-200 cursor-pointer'
      title='Salin URL'
    >
      <Copy size={16} />
    </button>
  );
}
