import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "高圧ケーブル 充電電流計算",
  description: "6.6kV系統 竣工検査耐圧試験 充電電流計算ツール",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
