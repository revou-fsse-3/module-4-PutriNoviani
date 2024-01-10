import { Inter } from "next/font/google";

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Add Contact | NextJS Login System",
  description: "This is a NextJS Login System Add Contact",
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // <html lang="en">
    //   <body className={inter.className}>
    <>
      <ToastContainer />
      {children}
    </>
    //   </body>
    // </html>
  );
}