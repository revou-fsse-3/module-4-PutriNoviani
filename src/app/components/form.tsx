"use client";

import Link from "next/link";
import { useState, type FC, useEffect } from "react";

interface FormProps {
  handleClick: (e: any, data: any) => void;
  dataFields: any;
  btnTitle: string;
  data?: any;
}

const Form: FC<FormProps> = ({
  handleClick,
  dataFields,
  btnTitle,
  data: filledData,
}) => {
  const [data, setData] = useState<any>(
    filledData
      ? filledData
      : dataFields.reduce(
          (acc: any, field: any) => ({
            ...acc,
            [field.name]: "",
          }),
          {}
        )
  );

  useEffect(() => {
    if (filledData) {
      setData(filledData);
    }
  }, [filledData]);

  return (
    <form
      onSubmit={(e: any) => handleClick(e, data)}
      className="w-full flex flex-col items-center max-w-sm"
    >
      {dataFields.map((field: any, index: number) => (
        <input
          key={index}
          className="border border-gray-200 px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-black w-full mb-4"
          type={field.type}
          placeholder={field.placeholder}
          name={field.name}
          value={data[field.name]}
          onChange={(e) =>
            setData({
              ...data,
              [field.name]: e.target.value,
            })
          }
        />
      ))}

      {(btnTitle.includes("Login") || btnTitle.includes("Register")) && (
        <p className="text-gray-500 text-xs flex w-full items-center justify-end gap-2 italic">
          {btnTitle === "Login"
            ? "Don't have an account?"
            : "Already have an account?"}
          <Link
            href={btnTitle === "Login" ? "/register" : "/login"}
            className="text-blue-500 hover:text-blue-800"
          >
            {btnTitle === "Login" ? "register" : "login"}
          </Link>
        </p>
      )}
      <button className="bg-black w-full mt-5 text-white px-4 py-2 rounded-md hover:bg-gray-800">
        {btnTitle.toUpperCase()}
      </button>
    </form>
  );
};

export default Form;