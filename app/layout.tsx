import type { Metadata } from "next";
import { fontVars } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Vitheaon — วิเทียออน",
  description:
    "มหานครแห่งเดียวที่มนุษย์และกลุ่มดาวจักรราศีอาศัยอยู่ร่วมกันภายใต้รัฐบาลกลาง",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="th">
      <body className={`${fontVars} locale-th`}>{children}</body>
    </html>
  );
}
