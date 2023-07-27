"use client";
import Dialog from "@/components/organisms/dialog";
import { useState } from "react";

export default function AdminHome() {
  const [open, setOpen] = useState(true);
  return (
    <div>
      <Dialog open={open} setOpen={setOpen} trigger={<p>Hey</p>}>
        Hey
      </Dialog>
    </div>
  );
}
