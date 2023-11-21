import type { Metadata } from "next";
import { Ubuntu } from "next/font/google";
import { Context } from "./data/hooks/Context";
import "./globals.css";

const ubuntu = Ubuntu({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Delivery",
  description: "Delivery project",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Context>
      <html lang="en">
        <body className={ubuntu.className}>{children}</body>
      </html>
    </Context>
  );
}
