import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "高圧ケーブル充電電流計算ツール | 6.6kV竣工検査・耐圧試験対応",
  description:
    "6.6kV系統の高圧ケーブル（CV・CVT）充電電流を自動計算。竣工検査・耐圧試験の試験電流値をケーブル種別・サイズ・亘長から瞬時に算出。電気主任技術者向け無料ツール。登録不要。",
  keywords: [
    "高圧ケーブル", "充電電流", "計算", "6.6kV", "竣工検査", "耐圧試験",
    "CV", "CVT", "電気主任技術者", "試験電流", "亘長", "キャパシタンス", "電気工事",
  ],
  openGraph: {
    title: "高圧ケーブル充電電流計算ツール | 6.6kV竣工検査・耐圧試験対応",
    description:
      "6.6kV系統の高圧ケーブル（CV・CVT）充電電流を自動計算。竣工検査・耐圧試験対応。電気主任技術者向け無料ツール。",
    type: "website",
    locale: "ja_JP",
  },
  twitter: {
    card: "summary",
    title: "高圧ケーブル充電電流計算ツール",
    description: "6.6kV系統 CV・CVT 充電電流を自動計算。竣工検査・耐圧試験対応。無料・登録不要。",
  },
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
