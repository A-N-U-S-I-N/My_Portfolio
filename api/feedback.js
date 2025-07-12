import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { name, email, feedback } = req.body;
    try {
      const client = await MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
      const db = client.db();
      await db.collection("feedbacks").insertOne({ name, email, feedback, createdAt: new Date() });
      await client.close();
      // Respond with 200 and no JSON
      res.status(200).end();
    } catch (error) {
      console.log("Database connection failed:", error); // Only log, no JSON
      res.status(500).end();
    }
  } else {
    console.log("Method not allowed");
    res.status(405).end();
  }
}
