import cn from "@/lib/classNames";
import Navbar from "@/components/organisms/navbar";
import Footer from "@/components/organisms/footer";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
        <nav
          className="sticky w-full bg-white z-50 filter-blur dark:bg-black top-0 px-4 md:px-10 py-5
         rounded-md mx-auto flex justify-between items-center shadow-sm"
        >
          <Navbar />
        </nav>

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
