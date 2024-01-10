"use client";

import { Form } from "@/app/components";
import { AuthService } from "@/app/services";
import type { AuthType } from "@/app/types";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const RegisterPage = () => {
  const authService = AuthService.getInstance();
  const router = useRouter();

  const handleClick = (e: any, data: AuthType) => {
    e.preventDefault();
    const { name, email, password } = data;

    if (!name || !email || !password) {
      toast.error("Please fill all fields");
      return;
    }
    authService.registerUser({ name, email, password }).then(
      (res: any) => {
        router.push("/login");
      },
      (err: any) => {
        console.log(err);
      }
    );
  };

  return (
    <div className="h-screen w-full py-10 flex flex-col items-center gap-10">
      <h1 className="text-7xl font-bold w-full text-center py-5 mb-10">
        Register
      </h1>
      <Form
        handleClick={handleClick}
        dataFields={[
          {
            name: "name",
            type: "text",
            placeholder: "Name",
          },
          {
            name: "email",
            type: "email",
            placeholder: "Email",
          },
          {
            name: "password",
            type: "password",
            placeholder: "Password",
          },
        ]}
        btnTitle="Register"
      />
    </div>
  );
};

export default RegisterPage;