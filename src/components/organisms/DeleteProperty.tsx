import { toast } from "react-toastify";
import Button from "../atoms/Button";
import Dialog from "./dialog";
import { useState } from "react";
import { deleteHotel } from "@/utils/hotel.api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function DeleteProperty({
  id,
  name,
}: {
  id: string;
  name: string;
}) {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const handleModalClose = () => {
    setOpen(false);
  };
  const { mutate, isLoading } = useMutation({
    onSuccess() {
      toast.success(`hotel deleted`);
      queryClient.invalidateQueries(["properties"]);
      handleModalClose();
    },
    onError(error: { message: string }) {
      toast.error(error.message ?? "An error occurred while deleting hotel");
    },
    mutationFn: () => deleteHotel(id),
  });

  return (
    <Dialog
      open={open}
      setOpen={setOpen}
      trigger={<p className="text-red-500 text-left">Delete</p>}
    >
      <p>
        Are you sure you want <span className="text-blue-500">{name}</span> to
        be deleted
      </p>
      <div className="flex gap-3">
        <Button
          onClick={() => mutate()}
          loadingText="Deleting hotel"
          className="flex-grow bg-red-500"
          type="submit"
          isLoading={isLoading}
        >
          Delete
        </Button>
        <Button
          className="flex-grow"
          type="button"
          disabled={isLoading}
          onClick={handleModalClose}
        >
          Cancel
        </Button>
      </div>
    </Dialog>
  );
}
