import clientPromise from "../src/lib/mongodb.js";

export default async function handler(req, res) {

  try {

    const client = await clientPromise;

    const db = client.db("aastore");

    const players = await db
      .collection("mlbb_event")
      .find({})
      .sort({ createdAt: -1 })
      .limit(50)
      .toArray();

    const leaderboard = players.map((p) => ({
      id: p._id,
      nickname: p.nickname,
      userId: p.userId
    }));

    res.status(200).json(leaderboard);

  } catch (err) {

    console.error(err);

    res.status(500).json({
      error: "Database error"
    });

  }

}