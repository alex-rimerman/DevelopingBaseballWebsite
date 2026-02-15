import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Developing Baseball | Data-Driven Player Development",
  description: "Developing Baseball helps players, coaches, and organizations unlock their potential with cutting-edge analytics, Stuff+ technology, and Trackman integration.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
