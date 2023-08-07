import { deleteRoom } from "@/utils/room.api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { toast } from "react-toastify";
import Button from "../atoms/Button";
import Dialog from "./dialog";

export default function DeleteRoom({ name, id }: { id: string; name: string }) {
  const queryClient = useQueryClient();
  const [modalOpen, setModalOpen] = useState(false);

  const { mutate: deleteMutate, isLoading: isDeletingRoom } = useMutation({
    onSuccess() {
      toast.success(`Room deleted successful.`);
      queryClient.invalidateQueries(["roomsInHotel"]);
      setModalOpen(false);
    },
    onError() {
      toast.error("An error occurred during registration.");
    },
    mutationFn: () => deleteRoom(id),
  });

  return (
    <Dialog
      open={modalOpen}
      setOpen={setModalOpen}
      trigger={
        <div className="py-1 text-center font-medium rounded-lg bg-red-500 text-white border-0 w-full mt-2">
          Delete
        </div>
      }
    >
      <p>
        Are you sure you want <span className="text-blue-500">{name}</span> room
        to be deleted
      </p>
      <div className="flex gap-3">
        <Button
          onClick={() => deleteMutate()}
          className="flex-grow bg-red-500"
          type="submit"
          isLoading={isDeletingRoom}
        >
          Delete
        </Button>
        <Button
          className="flex-grow"
          type="button"
          disabled={isDeletingRoom}
          onClick={() => setModalOpen(false)}
        >
          Cancel
        </Button>
      </div>
    </Dialog>
  );
}
