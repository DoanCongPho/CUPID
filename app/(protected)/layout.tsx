"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppSelector } from '@/store/hooks';
import { Spinner } from '@/components/ui/Spinner';

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { isAuthenticated, token } = useAppSelector((state) => state.auth);

  useEffect(() => {
    // Nếu chưa xác thực và không có token, chuyển hướng về trang đăng nhập
    if (!isAuthenticated && !token) {
      router.push('/login');
    }
  }, [isAuthenticated, token, router]);

  // Nếu đã xác thực, hiển thị nội dung trang
  if (isAuthenticated && token) {
    return <>{children}</>;
  }

  // Có thể hiển thị một màn hình loading trong khi kiểm tra
  return <Spinner />;
}