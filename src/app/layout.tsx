import QueryProvider from "@/presentation/providers/query-client";
import './globals.css';
// import { Query } from "@tanstack/react-query";

export default function RootLayout({ children }:{ children:React.ReactNode }) {
  return (<html lang="en">
    <body>
      <QueryProvider>
        {children}
      </QueryProvider>
    </body>
  </html>);
}