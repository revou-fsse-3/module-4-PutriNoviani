"use client";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { Form } from "@/app/components";
import { AuthService } from "@/app/services";
import { AuthType } from "@/app/types";

const LoginPage = () => {
  const authService = AuthService.getInstance();
  const router = useRouter();

  const handleClick = async (e: any, data: AuthType) => {
    e.preventDefault();
    const { email, password } = data;

    if (!email || !password) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      const res = await authService.loginUser({ email, password });
      toast.success("Login successful!!");
      // Set user state or perform any necessary action
      router.push("/");
    } catch (err) {
      console.error(err);
      toast.error((err as Error).message);
    }
  };

  return (
    <div className="h-screen w-full py-10 flex flex-col items-center gap-10">
      <h1 className="text-7xl font-bold w-full text-center py-5 mb-10">
        Login
      </h1>
      <Form
        handleClick={handleClick}
        dataFields={[
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
        btnTitle="Login"
      />
    </div>
  );
};

export default LoginPage;
