
"use client"
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./_Components/Navbar/Navbar";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { Box } from "@mui/material";
import { Provider } from "react-redux";
import { store } from './../Libraries/Redux/store';
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
     <AppRouterCacheProvider>
     <Provider store={store}>
      <Toaster/>
     <Navbar/>
    <Box sx={{mt:6,pt:5}}>
    {children}
    </Box>
     </Provider>
     </AppRouterCacheProvider>
      </body>
    </html>
  );
}
