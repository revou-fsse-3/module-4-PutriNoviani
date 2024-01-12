"use client";

import { useEffect, useState } from "react";
import { AuthService } from "@/app/services";
import Navbar from "@/app/components/Navbar";
import Category from "@/app/components/Category"; // Assuming Category is a component, adjust the import as needed

const Home = () => {
  const [user, setUser] = useState<any>(null);
  const authService = AuthService.getInstance();

  useEffect(() => {
    authService
      .getUser()
      .then((res: any) => {
        setUser(res);
      })
      .catch((err: any) => {
        console.log(err);
        setUser(null);
      });
  }, []);

  return (
    <main className="min-h-screen h-screen">
      <Navbar user={user} setUser={setUser} />
      {user ? (
        <div className="w-full flex items-center justify-center">
          <Category user={user} />
        </div>
      ) : (
        <h1 className="text-6xl mt-20 w-full flex items-center justify-center font-bold">
          Welcome, Guest!
        </h1>
      )}
    </main>
  );
};

export default Home;
