import { MongoClient } from "mongodb";

const uri = process.env.MONGO_URI;

let client;
let clientPromise;

if (!uri) {
  throw new Error("MONGO_URI belum diisi");
}

if (!global._mongoClient) {

  client = new MongoClient(uri);

  global._mongoClient = client.connect();

}

clientPromise = global._mongoClient;

export default clientPromise;