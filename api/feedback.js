import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { name, email, feedback } = req.body;

    try {
      const client = await MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
      const db = client.db();
      await db.collection("feedbacks").insertOne({ name, email, feedback, createdAt: new Date() });
      client.close();
      res.status(200).json({ message: "Feedback submitted successfully" });
    } catch (error) {
      res.status(500).json({ error: "Database connection failed" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
