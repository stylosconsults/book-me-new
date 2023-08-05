import { toast } from "react-toastify";
import Button from "../atoms/Button";
import Dialog from "./dialog";
import { useState } from "react";
import { updateHotel } from "@/utils/hotel.api";
import { IHotel } from "@/types/hotel.schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function PromoteProperty({
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
    async onSuccess(data: { hotel: IHotel }) {
      toast.success(`${name} promoted`);
      queryClient.invalidateQueries(["properties"]);
      handleModalClose();
    },
    onError(error: { message: string }) {
      toast.error(error.message ?? "An error occurred during registration.");
    },
    mutationFn: () => updateHotel(id, { promoted: true }),
  });

  return (
    <Dialog open={open} setOpen={setOpen} trigger={<>Promote</>}>
      <p>
        Are you sure you want <span className="text-blue-500">{name}</span> to
        be promoted
      </p>
      <div className="flex gap-3">
        <Button
          onClick={() => mutate()}
          className="flex-grow"
          type="submit"
          isLoading={isLoading}
        >
          Promote
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
