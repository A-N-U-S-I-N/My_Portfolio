import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;

let cachedClient = null;

async function connectToDatabase() {
  if (cachedClient) return cachedClient;
  const client = new MongoClient(uri);
  await client.connect();
  cachedClient = client;
  return client;
}

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { name, email, feedback } = req.body;
    try {
      const client = await connectToDatabase();
      const db = client.db();
      await db.collection("feedbacks").insertOne({ name, email, feedback, createdAt: new Date() });

      res.writeHead(302, { Location: '/' }); 
      res.end();
    } catch (error) {
      console.error("Database connection failed:", error);
      res.status(500).send("Internal server error");
    }
  } else {
    res.status(405).send("Method not allowed");
  }
}
