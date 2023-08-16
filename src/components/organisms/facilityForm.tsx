import { IFacility } from "@/types/facilities.schema";
import React, { ReactNode, useState } from "react";
import Dialog from "./dialog";
import Input from "../atoms/Input";
import Button from "../atoms/Button";

export default function FacilityForm({
  formData,
  trigger,
  onSubmit,
  isLoading,
}: {
  formData?: IFacility;
  isLoading?: boolean;
  trigger: ReactNode;
  onSubmit?: (name: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [facName, setFacName] = useState("");

  return (
    <Dialog
      title={`${formData?._id ? "Edit" : "Add"} Facilities`}
      open={open}
      setOpen={setOpen}
      trigger={trigger}
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit?.(facName);
        }}
        className="flex flex-col gap-3"
      >
        <Input
          label="Facility"
          value={facName}
          type="text"
          min={3}
          onChange={(e) => setFacName(e.target.value)}
        />
        <Button
          className="w-fit"
          type="submit"
          disabled={!facName}
          isLoading={isLoading}
          loadingText="Saving..."
        >
          Save
        </Button>
      </form>
    </Dialog>
  );
}
