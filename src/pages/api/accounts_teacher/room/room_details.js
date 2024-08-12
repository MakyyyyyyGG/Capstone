import { query } from "@/lib/db";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const { room_id } = req.query;
    const roomsData = await query({
      query: "SELECT * FROM rooms WHERE room_id = ?",
      values: [room_id],
    });
    res.status(200).json({ roomsData });
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
