import { MongoClient } from 'mongodb';
import bcrypt from 'bcryptjs';

const uri = 'mongodb+srv://myself:my-password01@motion.zgd1x.mongodb.net/motionDB?retryWrites=true&w=majority&appName=motion'
// const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    try {
      console.log("Connecting to the database...");
      await client.connect();
      const database = client.db('motionDB');
      const collection = database.collection('usermanagement');

      // Find the user by email
      const user = await collection.findOne({ email });
      if (!user) {
        console.log("User not found");
        return res.status(401).json({ message: 'Invalid email or password' });
      }

      // Check if the password matches
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        console.log("Password does not match");
        return res.status(401).json({ message: 'Invalid email or password' });
      }

      // If successful, return user info or token
      res.status(200).json({ message: 'Login successful', userId: user._id });
    } catch (error) {
      console.error("Error logging in:", error);
      res.status(500).json({ message: 'Internal server error', error: error.message });
    } finally {
      await client.close();
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
