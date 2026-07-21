import type { Metadata } from "next";
import "./globals.css";
import { M_PLUS_1p } from "next/font/google";
import { Toaster } from "react-hot-toast";

const mPlus1p = M_PLUS_1p({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "薬飲んだ？",
  description: "服薬管理webアプリ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className={mPlus1p.className}>
      <body className="min-h-screen bg-white">
        <div className="mx-auto min-h-screen w-full max-w-[520px] bg-white relative shadow-xl">
          {children}
        </div>
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
