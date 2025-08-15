'use client';

import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { toast } from 'sonner';

const formSchema = z.object({
  name: z.string().min(1, 'Nama wajib diisi'),
  status: z.enum(['Lolos', 'Tidak']),
  message: z.string().optional(),
});

export default function AdminFormPage({
  onSuccess,
}: {
  onSuccess: () => void;
}) {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      status: 'Lolos',
      message: '',
    },
  });

  // 2. Define a submit handler.
  async function handleSubmit(values: z.infer<typeof formSchema>) {
    const res = await fetch('/api/candidates', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values),
    });

    if (res.ok) {
      form.reset();
      toast.success('Data berhasil disimpan');
      onSuccess?.(); // <-- trigger refresh parent
    } else {
      toast.error('Gagal menyimpan data');
    }
  }

  return (
    <div className='w-full max-w-sm md:max-w-3xl'>
      <h1 className='text-xl font-bold mb-4'>Tambah Kandidat</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-6'>
          {/* Name field */}
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nama Anggota</FormLabel>
                <FormControl>
                  <Input placeholder='Masukkan nama anggota' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Status field */}
          <FormField
            control={form.control}
            name='status'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <FormControl>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className='w-[180px]'>
                      <SelectValue placeholder='Pilih status' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='Lolos'>Lolos</SelectItem>
                      <SelectItem value='Tidak'>Tidak Lolos</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Message field */}
          <FormField
            control={form.control}
            name='message'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Pesan untuk anggota</FormLabel>
                <FormControl>
                  <Textarea placeholder='Tulis pesan...' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button className='cursor-pointer' type='submit'>
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
}
