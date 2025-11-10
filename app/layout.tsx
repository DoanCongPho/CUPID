// import type { Metadata } from "next";
// import StoreProvider from "@/store/StoreProvider";
// import { ApolloProvider } from "@/lib/ApolloProvider";

// export const metadata: Metadata = {
//   title: "Cupid App",
//   description: "My Cupid Web Application",
// };

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <html lang="vi">
//       <body>
//         <ApolloProvider>
//           <StoreProvider>
//             {children}
//           </StoreProvider>
//         </ApolloProvider>
//       </body>
//     </html>
//   );
// }

import type { Metadata } from "next";
import StoreProvider from "@/store/StoreProvider";
import { ApolloProvider } from "@/lib/ApolloProvider";
import "./styles/globals.css";

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