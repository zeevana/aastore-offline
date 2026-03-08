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

  try {

    const client = await clientPromise;

    const db = client.db("aastore");

    const players = await db
      .collection("mlbb_event")
      .find({})
      .sort({ createdAt: 1 }) // URUTKAN DARI PALING LAMA
      .toArray();

    return res.status(200).json(players);

  } catch (error) {

    console.log("GET LEADERBOARD ERROR:", error);

    return res.status(500).json({
      error: "Database error"
    });

  }

}