// src/lib/ApolloClientProvider.tsx
"use client";

import { ApolloLink, HttpLink } from "@apollo/client";
import {
  ApolloNextAppProvider,
  NextSSRInMemoryCache,
  NextSSRApolloClient,
  SSRMultipartLink,
} from "@apollo/experimental-nextjs-app-support/ssr";

// Hàm này tạo ra một Apollo Client mới cho mỗi request phía server,
// và một client duy nhất dùng chung ở phía client.
function makeClient() {
  const httpLink = new HttpLink({
    // BAN QUAN TRỌNG: Vẫn thay thế URI này bằng địa chỉ API của bạn
    uri: "http://localhost:4000/graphql",
  });

  return new NextSSRApolloClient({
    cache: new NextSSRInMemoryCache(),
    link:
      typeof window === "undefined"
        ? ApolloLink.from([
            new SSRMultipartLink({
              stripDefer: true,
            }),
            httpLink,
          ])
        : httpLink,
  });
}

// Đây là component Provider mới mà chúng ta sẽ dùng
export function ApolloWrapper({ children }: React.PropsWithChildren) {
  return (
    <ApolloNextAppProvider makeClient={makeClient}>
      {children}
    </ApolloNextAppProvider>
  );
}