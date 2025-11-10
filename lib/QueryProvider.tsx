"use client";

    import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
    import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
    import React from "react";

    export default function QueryProvider({ children }: { children: React.ReactNode }) {
      // Dùng useState để đảm bảo QueryClient chỉ được tạo một lần duy nhất
      // Tránh việc tạo lại client mỗi khi component re-render
      const [client] = React.useState(
        new QueryClient({
          defaultOptions: {
            queries: {
              // Cấu hình mặc định cho các query
              staleTime: 5 * 1000, // Dữ liệu được coi là "cũ" sau 5 giây
              refetchOnWindowFocus: false, // Không fetch lại dữ liệu khi focus vào cửa sổ
            },
          },
        })
      );

      return (
        <QueryClientProvider client={client}>
          {children}
          {/* Công cụ devtools chỉ hiển thị ở môi trường development */}
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      );
    }