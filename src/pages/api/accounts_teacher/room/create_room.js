import { query } from "@/lib/db";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const { account_i } = req.query;
    const roomsData = await query({
      query: "SELECT * FROM rooms WHERE account_id = ?",
      values: [account_id],
    });
    res.status(200).json({ roomsData });
  }

  if (req.method === "POST") {
    const { account_id, room_name, difficulty, room_code } = req.body;
    const roomsData = await query({
      query:
        "INSERT INTO rooms (account_id, room_name, room_difficulty, room_code) VALUES (?, ?, ?, ?)",
      values: [account_id, room_name, difficulty, room_code],
    });
    res.status(200).json({ roomsData });
  }
}
