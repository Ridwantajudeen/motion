import { MongoClient } from 'mongodb';
import bcrypt from 'bcryptjs'; // Import bcrypt for password hashing

const uri = process.env.MONGODB_URI; // Ensure this is set up in your environment variables
const client = new MongoClient(uri);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    try {
      await client.connect();
      const database = client.db('myself');
      const collection = database.collection('users');

      // Find the user by email
      const user = await collection.findOne({ email });
      if (!user) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }

      // Check if the password matches
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }

      // If successful, return user info or token
      res.status(200).json({ message: 'Login successful', userId: user._id });
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
