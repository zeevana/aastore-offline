import clientPromise from "../src/lib/mongodb";

export default async function handler(req,res){

 const client = await clientPromise;
 const db = client.db("aastore");

 const players = await db
 .collection("mlbb_event")
 .find({})
 .sort({createdAt:-1})
 .limit(100)
 .toArray();

 const leaderboard = players.map(p=>({
  id:p._id,
  nickname:p.nickname,
  userId:p.userId
 }));

 res.json(leaderboard);

}