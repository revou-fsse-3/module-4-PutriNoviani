"use client";

import { useEffect, useState } from "react";
import { AuthService } from "./services";
import Navbar from "./components/Navbar";
import { Category } from "./components";

const Home = () => {
  const [user, setUser] = useState<any>(null);
  const authService = AuthService.getInstance();

  useEffect(() => {
    authService
      .getUser(user?.token)
      .then((res: any) => {
        setUser(res);
        (err: any) => {
          console.log(err);
          setUser(null);
        };
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
        </h1>
      )}
    </main>
  );
};

export default Home;