import { useState } from "react";
import Dialog from "../organisms/dialog";

export function ViewImage({ url }: { url: string }) {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <button
        className="text-blue-500 hover:underline"
        onClick={() => setModalOpen(true)}
      >
        View Image
      </button>
      <Dialog title="Category Image" open={modalOpen} setOpen={setModalOpen}>
        <div className="flex flex-col items-center justify-center max-w-[500px]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={url} alt="" className="w-full h-full" />
        </div>
      </Dialog>
    </>
  );
}
