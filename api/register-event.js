import { MongoClient } from "mongodb";

const uri = process.env.MONGO_URI;

let client;
let clientPromise;

if (!uri) {
  throw new Error("MONGO_URI belum diisi di ENV");
}

if (!global._mongoClientPromise) {

  client = new MongoClient(uri);

  global._mongoClientPromise = client.connect();

}

clientPromise = global._mongoClientPromise;


export default async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {

    const client = await clientPromise;

    const db = client.db("aastore");

    const body = req.body;

    const nickname = body.nickname;
    const userId = body.userId;
    const serverId = body.serverId;

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

    return res.status(200).json({
      success: true
    });

  } catch (error) {

    console.log("REGISTER EVENT ERROR:", error);

    return res.status(500).json({
      error: "Database error"
    });

  }

}