import { Noto_Sans_KR } from "next/font/google";
import "./globals.css";

const notoSansKR = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
  display: "swap",
});

export const metadata = {
  title: "AX-On Platform · AI Expert Portfolio Guide",
  description: "30명+ AI 전문가 풀의 디지털 아이덴티티를 정의하는 미니 풀스택 웹사이트 항목 가이드",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body className={notoSansKR.className}>{children}</body>
    </html>
  );
}
