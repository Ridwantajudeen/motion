import { MongoClient } from 'mongodb';
import bcrypt from 'bcryptjs';

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, email, phone, password } = req.body;

    try {
      console.log("Connecting to the database...");
      await client.connect();
      const database = client.db('motionDB'); // Make sure to use your database name
      const collection = database.collection('usermanagement'); // Use your collection name

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Insert the new user
      const result = await collection.insertOne({ name, email, phone, password: hashedPassword });
      console.log('User created successfully:', result);
      res.status(201).json({ message: 'User created successfully', userId: result.insertedId });
    } catch (error) {
      console.error("Error creating user:", error);
      res.status(500).json({ message: 'Internal server error', error: error.message });
    } finally {
      await client.close();
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
