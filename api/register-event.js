import clientPromise from "../src/lib/mongodb.js";

export default async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {

    const client = await clientPromise;

    const db = client.db("aastore");

    const { userId, serverId, nickname } = req.body;

    const exist = await db.collection("mlbb_event").findOne({ userId });

    if (exist) {

      return res.status(400).json({
        error: "ID MLBB sudah terdaftar"
      });

    }

    await db.collection("mlbb_event").insertOne({
      userId,
      serverId,
      nickname,
      createdAt: new Date()
    });

    res.json({ success: true });

  } catch (err) {

    console.error(err);

    res.status(500).json({
      error: "Database error"
    });

  }

}