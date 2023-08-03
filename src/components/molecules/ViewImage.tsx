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
      <Dialog open={modalOpen} setOpen={setModalOpen}>
        <div className="flex flex-col items-center justify-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={url} alt="" className="w-full h-full" />
        </div>
      </Dialog>
    </>
  );
}
