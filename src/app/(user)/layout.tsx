import cn from "@/lib/classNames";
import Navbar from "@/components/organisms/navbar";
import Footer from "@/components/organisms/footer";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body
        className={
          "text-primary relative h-full min-h-screen w-full flex flex-col motion-reduce:transition-none motion-reduce:transform-none"}
      >
        <ToastContainer />
        <nav
          className="sticky backdrop-blur-sm z-50 w-full bg-white/80  dark:bg-black top-0 px-4 md:px-10 py-5
         rounded-md mx-auto flex justify-between items-center "
        >

        {/* <nav className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-sm dark:bg-black/80 px-4 md:px-10 py-5 shadow-sm"> */}

          <Navbar />
        </nav>

        <main
          className={
            " w-full  flex-grow relative  flex gap-12 flex-col bg-[#F6F7F9] divide-y divide-gray-200 dark:divide-gray-900"
          }
        >
          <div>{children}</div>
        </main>
        <footer className="px-4 md:p x-10 bg-white">
          <Footer />
        </footer>
      </body>
    </html>
  );
}
