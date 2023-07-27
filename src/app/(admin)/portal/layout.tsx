import React, { ReactNode } from "react";

export default function layout({ children }: { children: ReactNode }) {
  return (
    <div className="w-full relative flex">
      <aside className="h-screen sticky top-0 max-w-[350px] min-w-[300px] bg-co-black">
        hf
      </aside>
      <div className="flex-grow">{children}</div>
    </div>
  );
}
