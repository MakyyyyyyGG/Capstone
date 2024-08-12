import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

const fetchRoomDetails = async (room_id, setRoomData) => {
  try {
    const res = await fetch(
      `/api/accounts_teacher/room/room_details?room_id=${room_id}`
    );
    const data = await res.json();
    setRoomData(data.roomsData);
  } catch (error) {
    console.error("Error fetching room details:", error);
  }
};

const IndividualRoom = () => {
  const { data: session } = useSession();
  const [roomData, setRoomData] = useState(null);
  const router = useRouter();
  const { room_id } = router.query;

  useEffect(() => {
    if (room_id) {
      fetchRoomDetails(room_id, setRoomData);
    }
  }, [room_id]);

  if (!roomData) return <p>Loading...</p>;

  return (
    <div>
      <h1>{roomData[0]?.room_name || "Room"}</h1>
      <p>Difficulty: {roomData[0]?.room_difficulty}</p>
      <p>Room Code: {roomData[0]?.room_code}</p>
      {/* Add more details as needed */}
    </div>
  );
};

export default IndividualRoom;
