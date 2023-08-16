"use client";
import Heading from "@/components/atoms/Heading";
import FacilityForm from "@/components/organisms/facilityForm";
import { IFacility } from "@/types/facilities.schema";
import {
  addFacility,
  deleteFacility,
  getFacilities,
} from "@/utils/facilities.api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { MdRemoveCircle } from "react-icons/md";
import { toast } from "react-toastify";

export default function PropertyFacilities() {
  const queryClient = useQueryClient();

  const { data: facilities, isLoading: isFacilitiesLoading } = useQuery({
    queryKey: ["facilities"],
    queryFn: () => getFacilities(),
  });

  const { mutate, isLoading: isRemovingFacility } = useMutation({
    onSuccess() {
      toast.success("Facility removed successfully");
      queryClient.invalidateQueries(["facilities"]);
    },
    onError() {
      toast.error("Facility removal failed");
    },
    mutationFn: deleteFacility,
  });

  const { mutate: addFacilityMutate, isLoading: isAddingFacility } =
    useMutation({
      onSuccess() {
        toast.success("Facility added successfully");
        queryClient.invalidateQueries(["facilities"]);
      },
      onError() {
        toast.error("Failed to add facility");
      },
      mutationFn: addFacility,
    });

  return (
    <div className="px-8 py-4">
      <div className="flex justify-between items-center pb-6">
        <Heading>Facilities supported</Heading>
        <FacilityForm
          isLoading={isAddingFacility}
          onSubmit={(name) => {
            addFacilityMutate({ name });
          }}
          trigger={
            <p className="h-fit w-fit px-4 py-2  bg-blue-500 rounded-full text-white font-bold border-co-primary">
              Add Facility
            </p>
          }
        />
      </div>
      {isFacilitiesLoading ? (
        <div>Loading...</div>
      ) : (
        <div>
          {facilities.results?.length > 0 ? (
            facilities.results?.map((fac: IFacility, key: number) => (
              <div className="flex gap-5" key={key}>
                <h3>{fac.name}</h3>
                <button
                  disabled={isRemovingFacility}
                  onClick={() => mutate(fac._id)}
                >
                  <MdRemoveCircle />
                </button>
              </div>
            ))
          ) : (
            <p className="text-red-500">No facilities listed</p>
          )}
        </div>
      )}
    </div>
  );
}
