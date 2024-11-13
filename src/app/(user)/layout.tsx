import cn from "@/lib/classNames";
import Navbar from "@/components/organisms/navbar";
import Footer from "@/components/organisms/footer";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import HeroSection from "@/components/molecules/helloSection";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body
        className={cn(
          "text-primary",
          "relative h-full min-h-screen w-full",
          "flex flex-col",
          "motion-reduce:transition-none motion-reduce:transform-none"
        )}
      >
        <ToastContainer />
        <nav
          className="sticky w-full bg-[#003b95] z-50 filter-blur dark:bg-black text-white top-0 px-4 md:px-10 py-5
          mx-auto flex justify-between items-center shadow-sm"
        >
          <Navbar />
        </nav>
        <HeroSection />
        <main
          className={cn(
            "w-full flex-grow relative px-4 md:px-10 py-4",
            "mx-auto my-auto",
            "flex gap-12",
            "flex-col",
            "bg-[#F6F7F9]",
            "divide-y divide-gray-200 dark:divide-gray-900"
          )}
        >
          <div>{children}</div>
        </main>
        <footer className="px-4 md:px-10 bg-white">
          <Footer />
        </footer>
      </body>
    </html>
  );
}
