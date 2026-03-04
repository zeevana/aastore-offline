import clientPromise from "../src/lib/mongodb.js";

export default async function handler(req, res) {

  try {

    const client = await clientPromise;
    const db = client.db("aastore");

    const players = await db
      .collection("mlbb_event")
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    const result = players.map(p => ({
      id: p._id,
      nickname: p.nickname,
      userId: p.userId
    }));

    res.status(200).json(result);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      error: "Database error"
    });

  }

}