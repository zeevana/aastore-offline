import clientPromise from "../src/lib/mongodb.js";

export default async function handler(req, res) {

  try {

    const client = await clientPromise;

    const db = client.db("aastore");

    const { userId, serverId, nickname } = req.body;

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

    console.log(error);

    res.status(500).json({
      error: "Database error"
    });

  }

}