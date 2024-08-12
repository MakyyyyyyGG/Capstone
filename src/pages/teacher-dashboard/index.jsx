import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { useSession } from "next-auth/react";
import CreateRoom from "../components/CreateRoom";

const Dashboard = () => {
  const { data: session } = useSession();
  const [rooms, setRooms] = useState([]);

  // Function to fetch rooms
  const fetchRooms = async () => {
    console.log("executed");
    if (session?.user?.id) {
      const res = await fetch(
        `/api/accounts_teacher/room/create_room?account_id=${session.user.id}`
      );
      const data = await res.json();
      setRooms(data.roomsData);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, [session?.user?.id]);

  return (
    <div>
      <Header />
      <div className="flex border-2">
        <div className="flex flex-col  m-4 p-4 border-2 w-[200px]">
          <CreateRoom onRoomCreated={fetchRooms} />
          <Sidebar />
        </div>

        <div>
          <h1 className="border-2">Teacher Dashboard</h1>

          <div>
            <h2>Your Rooms</h2>
            <ul>
              {rooms.map((room) => (
                <li key={room.room_code}>
                  {room.room_name} - {room.room_difficulty} - Code:{" "}
                  {room.room_code}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
