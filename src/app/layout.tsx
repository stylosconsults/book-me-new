import "./globals.css";
import Providers from "./_providers";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bookme.rw - your friendly booking platform",
  description: "Booking hotels, cars all in one place",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
