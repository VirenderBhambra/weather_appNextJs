'use client'
import { Inter } from "next/font/google";
import "./globals.css";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import { Provider } from 'jotai'

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const queryClient = new QueryClient();
  
  return (
    <html lang="en">
     
       <head>
       <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
      />
       </head>
      <QueryClientProvider client={queryClient}>
        <Provider>
        <body className={inter.className}>{children}</body>
        </Provider>
      </QueryClientProvider>
    </html>
  );
}
