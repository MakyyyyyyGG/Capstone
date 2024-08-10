import React from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { Button } from "@nextui-org/react";
import { useRouter } from "next/router";
import Header from "../components/header";
import Sidebar from "../components/Sidebar";
const index = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  console.log(session?.user?.role);
  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (!session) {
    return <p>You are not signed in</p>;
  }

  return (
    <div>
      <Header />
      <Sidebar />
      <p>this is the body</p>
    </div>
  );
};

export default index;
