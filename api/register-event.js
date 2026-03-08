import { MongoClient } from "mongodb";

const uri = process.env.MONGO_URI;

let client;
let clientPromise;

if(!uri){
throw new Error("MONGO_URI belum diisi di ENV");
}

if(!global._mongoClientPromise){

client = new MongoClient(uri);

global._mongoClientPromise = client.connect();

}

clientPromise = global._mongoClientPromise;


/* RATE LIMIT MEMORY */

const requests = new Map();


export default async function handler(req,res){

if(req.method !== "POST"){

return res.status(405).json({
error:"Method not allowed"
});

}

try{

const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;

const now = Date.now();

if(requests.has(ip)){

const last = requests.get(ip);

if(now - last < 5000){

return res.status(429).json({
error:"Terlalu cepat, tunggu 5 detik"
});

}

}

requests.set(ip,now);


const client = await clientPromise;

const db = client.db("aastore");

const {nickname,userId,serverId} = req.body;


if(!nickname || !userId || !serverId){

return res.status(400).json({
error:"Semua field harus diisi"
});

}


/* CEK DUPLICATE USER */

const exist = await db.collection("mlbb_event").findOne({
userId:userId
});

if(exist){

return res.status(400).json({
error:"ID MLBB sudah terdaftar"
});

}


/* INSERT DATA */

await db.collection("mlbb_event").insertOne({

nickname,
userId,
serverId,
createdAt:new Date()

});


return res.status(200).json({
success:true
});

}catch(error){

console.log("REGISTER EVENT ERROR:",error);

return res.status(500).json({
error:"Database error"
});

}

}