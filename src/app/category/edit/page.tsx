"use client"
// Import statements
import { useState, FC, useEffect } from "react";
import { CategoryService, AuthService } from "@/app/services";
import { useRouter, useParams } from "next/navigation";
import { toast } from "react-toastify";
import { Form } from "@/app/components";
import Navbar from "@/app/components/Navbar";
import type { ContactType } from "@/app/types";

const EditCategoryPage: FC = () => {
  // Initialization
  const authService = AuthService.getInstance();
  const categoryService = CategoryService.getInstance();
  const router = useRouter();
  const { id } = useParams<{ id: string }>(); 

  const [user, setUser] = useState<any>(null);
  const [data, setData] = useState<ContactType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch user and contact data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const userRes = await authService.getUser(); 
        setUser(userRes);
        const categoryRes = await categoryService.getCategoryById(id); 
        setData({
          id: categoryRes.$id,
          name: categoryRes.name,
          status: categoryRes.is_active,
        });
        setLoading(false);
      } catch (err) {
        console.error(err);
        toast.error("Error fetching data");
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  // Handle update contact
  const handleClick = async (e: any, data: ContactType) => {
    e.preventDefault();
    const { name, status }: ContactType = data;

    if (!name) {
      toast.error("Please fill all fields");
      return;
    }

    const token = user?.token;

    if (!token) {
      console.error("Token not available");
      return;
    }

    try {
      await categoryService.updateCategory(id, { name, is_active: status });
      toast.success("Contact updated successfully!!");
      router.push("/");
    } catch (err) {
      console.error(err);
      toast.error((err as Error).message);
    }
  };

  // Render loading state
  if (loading) {
    return (
      <div className="h-screen w-full py-10 flex flex-col items-center gap-10">
        <Navbar user={user} setUser={setUser} />
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900" />
      </div>
    );
  }

  // Render no data state
  if (!data)
    return (
      <div className="h-screen w-full py-10 flex flex-col items-center gap-10">
        <Navbar user={user} setUser={setUser} />
        <h1 className="text-7xl font-bold w-full text-center py-5 mb-10">
          NO DATA FOUND
        </h1>
      </div>
    );

  // Render main content
  return (
    <main>
      <Navbar user={user} setUser={setUser} />
      <div className="h-screen w-full py-10 flex flex-col items-center gap-10">
        <h1 className="text-7xl font-bold w-full text-center py-5 mb-10">
          Edit Contact
        </h1>

        <Form
          handleClick={handleClick}
          data={data}
          dataFields={[
            {
              name: "name",
              type: "text",
              placeholder: "Fullyworld Web Tutorials",
            },
            {
              name: "status",
              type: "checkbox",
              placeholder: "Status",
            },
          ]}
          btnTitle="Update Category"
        />
      </div>
    </main>
  );
};

export default EditCategoryPage;
