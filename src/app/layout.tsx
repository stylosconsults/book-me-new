import "./globals.css";
import Providers from "./_providers";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
        <ToastContainer />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
