import Link from "next/link";
import { type FC } from "react";
import { AuthService } from "@/app/services";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ACCESS_TOKEN_KEY } from "../utils/constants";

interface NavbarProps {
  user?: any;
  setUser?: any;
}

const Navbar: FC<NavbarProps> = ({ user, setUser }) => {
  const router = useRouter();
  const handleLogout = () => {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    if (setUser) {
      setUser(null);
    }
    router.push("/");
    toast.success("Successfully logged out");

  }

  return (
    <>
      <ToastContainer />
      <nav className="w-full py-4 bg-black text-white flex items-center justify-between">
        <Link href="/" className="text-lg pl-16 font-bold">
          CRUD With Login System
        </Link>

        <ul className="flex items-center space-x-4 pr-16">
          {user ? (
            <>
              <li>
                Welcome, <span className="font-bold">{user.name}</span>
              </li>
              <li>
                <Link
                  href="/category/new"
                  className="text-md text-white bg-blue-500 px-4 py-2 rounded-md hover:bg-blue-600"
                >
                  Add Category
                </Link>
              </li>
              <li>
                <button
                onClick={handleLogout
                  }
                  className="text-md text-white bg-red-500 px-4 py-2 rounded-md hover:bg-red-600"
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link
                  href="/login"
                  className="text-md text-slate-300 hover:text-white"
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  href="/register"
                  className="text-md text-slate-300 hover:text-white"
                >
                  Register
                </Link>
              </li>

              <li>
              <Link
                href="/multi-step-form"
                className="text-md text-slate-300 hover:text-white"
              >
                Form
              </Link>
            </li>
            </>
          )}
        </ul>
      </nav>
    </>
  );
};

export default Navbar;