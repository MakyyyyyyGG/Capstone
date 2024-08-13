import React, { useState, useEffect } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { Button } from "@nextui-org/react";
import { useRouter } from "next/router";
import Header from "../components/header";
import SidebarStudent from "../components/SidebarStudent";
import JoinRoom from "../components/JoinRoom";
import JoinedRoom from "./joined_rooms";
const index = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [room, setRooms] = useState([]);

  console.log(session?.user?.role);
  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (!session) {
    return <p>You are not signed in</p>;
  }

  const fetchJoinedRoom = async () => {
    if (session?.user?.id) {
      const res = await fetch(
        `/api/accounts_student/room/joined_room?student_id=${session.user.id}`
      );
      const data = await res.json();
      setRooms(data.roomsData);
      console.log(data.roomsData);
    }
  };

  return (
    <div>
      <Header />
      <JoinRoom />
      <SidebarStudent />
      <p>Student dashbaord</p>
      <div>
        <JoinedRoom rooms={room} />
      </div>
    </div>
  );
};

export default index;
