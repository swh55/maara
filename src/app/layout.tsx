import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "المخطط المعماري | مجمع سكني على أرض 2000 م²",
  description:
    "تصميم معماري متكامل لأربعة مبانٍ سكنية على أرض 50×40 م: 36 شقة، مواقف تحت الأرض، وأسطح مجهزة بمنظومة طاقة شمسية وخزانات مياه.",
  keywords: ["مخطط معماري", "تصميم سكني", "مجمع سكني", "طاقة شمسية", "مخطط موقع"],
  icons: {
    icon: "https://z-cdn.chatglm.cn/z-ai/static/logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body className="antialiased bg-background text-foreground arch-font">
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
