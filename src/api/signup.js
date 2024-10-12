import { MongoClient } from 'mongodb';
import bcrypt from 'bcryptjs';

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, email, phone, password } = req.body;

    try {
      await client.connect();
      const database = client.db('myself');
      const collection = database.collection('users');

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Insert the new user
      const result = await collection.insertOne({ name, email, phone, password: hashedPassword });
      res.status(201).json({ message: 'User created successfully', userId: result.insertedId });
    } catch (error) {
      res.status(500).json({ message: 'Internal server error', error: error.message });
    } finally {
      await client.close();
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
