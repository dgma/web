"use client";

import { HTMLInputTypeAttribute } from "react";

type InputParams = {
  type?: HTMLInputTypeAttribute;
};

export default function AmountInputControl({ type = "text" }: InputParams) {
  return (
    <input
      type={type}
      className="w-72 cursor-default rounded-lg bg-white py-2.5 pl-3 text-left shadow-sm ring-1 ring-inset ring-gray-300 sm:text-sm outline-0"
      placeholder="0.1"
    />
  );
}
