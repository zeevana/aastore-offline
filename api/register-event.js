import clientPromise from "../src/lib/mongodb";

export default async function handler(req, res) {

  const client = await clientPromise;
  const db = client.db("aastore");

  const collection = db.collection("mlbb_event");

  if (req.method === "POST") {

    const { userId, serverId, nickname } = req.body;

    const exist = await collection.findOne({ userId });

    if (exist) {
      return res.status(400).json({
        error: "ID MLBB sudah terdaftar"
      });
    }

    await collection.insertOne({
      userId,
      serverId,
      nickname,
      createdAt: new Date()
    });

    return res.json({
      success: true
    });

  }

}