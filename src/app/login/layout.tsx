import { Inter } from "next/font/google";

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Login | NextJS Login System",
  description: "This is a NextJS Login System Login Page",
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main>
      <ToastContainer />
      {children}
    </main>
  );
}