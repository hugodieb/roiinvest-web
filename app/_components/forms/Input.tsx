import Link from "next/link";
import { Input } from "@/components/ui/input";
import React from "react";

interface Props {
  labelId: string;
  type: string;
  children: React.ReactNode;
  link?: {
    linkText: string;
    linkUrl: string;
  }
  errorMessage?: string;
  required?: boolean;
}

export default function InputForm({ labelId, type, children, link, errorMessage, required = false }: Props) {
  return (
    <div>
      <div className="flex justify-between align-center">
        <label htmlFor={labelId} className="block text-sm/6 font-bold text-gray-900"
        >
          {children}
        </label>
        {link && (
          <div className="text-sm">
            <Link
              className="font-semibold text-indigo-600 hover:text-indigo-500"
              href={link.linkUrl}
            >
              {link.linkText}
            </Link>
          </div>
        )}
      </div>
      <div className="mt-2">
        <Input
          id={labelId}
          name={labelId}
          type={type}
          required={required}
          className="block w-full rounded-md bg-white px-3 py-1.5
               text-base text-gray-900 outline outline-1 -outline-offset-1
                outline-gray-300 placeholder:text-gray-400 focus:outline
                 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600
                  sm:text-sm/6"
        />
        {errorMessage && (
          <span className="mt-1 text-sm text-red-600">{errorMessage}</span>
        )}
      </div>
    </div>
  )
}