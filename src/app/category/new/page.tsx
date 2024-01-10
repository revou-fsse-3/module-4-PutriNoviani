"use client"
import { Form } from "@/app/components";
import Navbar from "@/app/components/Navbar";
import { CategoryService, AuthService } from "@/app/services";
import type { ContactType } from "@/app/types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const AddCategoryPage = () => {
  const authService = AuthService.getInstance();
  const categoryService = CategoryService.getInstance();
  const router = useRouter();

  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await authService.getUser();
        setUser(res);
      } catch (err) {
        console.error(err);
        toast.error("Please login to continue");
        router.push("/login");
        setUser(null);
      }
    };

    fetchUser();
  }, []);

  const handleClick = async (e: any, data: ContactType) => {
    e.preventDefault();

    const { name }: ContactType = data;

    if (!name) {
      toast.error("Please fill the name field");
      return;
    }

    const token = user?.token;

    console.log("Token before API call:", token);

    if (!token) {
      console.error("Token not available");
      return;
    }

    try {
      await categoryService.createCategory({ name }, token);
      toast.success("Category added successfully!!");
      router.push("/");
    } catch (err) {
      console.error(err);
      toast.error((err as Error).message);
    }
  };

  return (
    <main>
      <Navbar user={user} setUser={setUser} />
      <div className="h-screen w-full py-10 flex flex-col items-center gap-10">
        <h1 className="text-7xl font-bold w-full text-center py-5 mb-10">
          Add Category
        </h1>
        <Form
          handleClick={handleClick}
          dataFields={[
            {
              name: "name",
              type: "text",
              placeholder: "Fullyworld Web Tutorials",
            },
          ]}
          btnTitle="Add Category"
        />
      </div>
    </main>
  );
};

export default AddCategoryPage;
