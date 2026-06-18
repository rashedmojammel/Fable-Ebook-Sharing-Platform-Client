import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;

async function test() {
  try {
    const client = new MongoClient(uri);

    await client.connect();

    console.log("✅ Connected to MongoDB");

    const db = client.db("test");
    await db.command({ ping: 1 });

    console.log("✅ Ping successful");

    await client.close();
  } catch (error) {
    console.error("❌ Error:", error);
  }
}

test();