import clientPromise from "../src/lib/mongodb.js";

export default async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {

    const client = await clientPromise;
    const db = client.db("aastore");

    const { nickname, userId, serverId } = req.body;

    if (!nickname || !userId || !serverId) {
      return res.status(400).json({
        error: "Semua field harus diisi"
      });
    }

    await db.collection("mlbb_event").insertOne({

      nickname,
      userId,
      serverId,
      createdAt: new Date()

    });

    res.status(200).json({
      success: true
    });

  } catch (error) {

    console.log("DATABASE ERROR:", error);

    res.status(500).json({
      error: "Database error"
    });

  }

}