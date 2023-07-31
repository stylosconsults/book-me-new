"use client";
import Select, { GroupBase, OnChangeValue, Props } from "react-select";

interface SelectWithErrorProps {
  label?: string;
  name?: string;
  options: { value: string; label: string }[];
  error?: string;
  placeholder?: string;
  [x: string | number | symbol]: unknown;
}

export interface IOption {
  label: string;
  value: string;
}
export default function SelectWithErrorCustomSelect<
  Option,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>
>(props: Props<Option, IsMulti, Group> & SelectWithErrorProps) {
  return (
    <div>
      {props.label && (
        <label className="text-co-black font-bold text-base" htmlFor={props.id}>
          {props.label}
        </label>
      )}
      <Select
        {...props}
        styles={{
          control: (baseStyles: object) => ({
            ...baseStyles,
            borderColor: !props.error ? "grey" : "red",
          }),
          valueContainer: (base: object) => ({
            ...base,
            textTransform: "capitalize",
          }),
          option: (base) => ({
            ...base,
            textTransform: "capitalize",
          }),
        }}
      />
      {props.error && <p className="text-red-500 text-xs">{props.error}</p>}
    </div>
  );
}
