import { useState, FC, useEffect } from "react";
import { CategoryService } from "@/app/services";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

interface Props {
  user: any;
}

const Category: FC<Props> = ({ user }) => {
  const categoryService = CategoryService.getInstance();

  const [categories, setCategories] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    if (user) {
      categoryService.getCategoryByName("categoryName", user.$id).then(
        (res: any) => {
          setCategories(res.documents);
        },
        (err: any) => {
          console.log(err);
        }
      );
    }
  }, [user]);

  const handleDelete = (id: string) => {
    const token = user?.token;

    if (!token) {
      console.error("Token not available");
      return;
    }

    categoryService.deleteCategory(id, token).then(
      (res: any) => {
        setCategories(categories.filter((category: any) => category.$id !== id));
        toast.success("Category deleted successfully!!");
      },
      (err: any) => {
        console.log(err);
        toast.error(err.message);
      }
    );
  };

  return (
    <div className="w-full flex flex-col py-10 items-center justify-center">
      <h1 className="text-7xl font-bold w-full text-center py-5 mb-10">
        Categories
      </h1>
      <table className="table-auto w-4/5 border-collapse">
        <thead className="bg-black  shadow-md text-white">
          <tr>
          <th className=" px-4 py-5">ID</th>
            <th className=" px-4 py-5">Name</th>
            <th className=" px-4 py-5">Status</th>
            <th className=" px-4 py-5">Actions</th>
          </tr>
        </thead>
        <tbody className="border border-gray-200 divide-y divide-gray-200">
          {!categories && (
            <tr>
              <td colSpan={3} className=" px-4 py-5">
                No Categories Found
              </td>
            </tr>
          )}
          {categories &&
            categories.map((category: any) => (
              <tr key={category.$id}>
                <td className="px-4 py-5 text-center">{category.name}</td>
                <td className="px-4 py-5 text-center">
                  {category.is_active ? "Active" : "Deactive"}
                </td>
                <td className="gap-3 flex items-center justify-center px-4 py-5 text-center">
                  <button
                    onClick={() =>
                      router.push(
                        `/category/${category.$id}/${category.name}/edit`
                      )
                    }
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(category.$id)}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Category;
