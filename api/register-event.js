import clientPromise from "../src/lib/mongodb.js";

export default async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {

    const client = await clientPromise;

    const db = client.db("aastore");

    const { userId, serverId, nickname } = req.body;

    if (!userId || !serverId || !nickname) {

      return res.status(400).json({
        error: "Data tidak lengkap"
      });

    }

    const exist = await db
      .collection("mlbb_event")
      .findOne({ userId });

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

    res.status(200).json({
      success: true
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      error: "Database error"
    });

  }

}