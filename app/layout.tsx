import type { Metadata } from "next";
import StoreProvider from "@/store/StoreProvider";
import QueryProvider from "@/lib/QueryProvider";

export const metadata: Metadata = {
  title: "Cupid App",
  description: "My Cupid Web Application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body>
        {}
        <QueryProvider>
          <StoreProvider>
            {children}
          </StoreProvider>
        </QueryProvider>
      </body>
    </html>
  );
}