import mongoose from 'mongoose';
import fs from 'fs';



const secretPath = '/run/secrets/MONGO_URI';
if (fs.existsSync(secretPath)) {
  process.env.MONGO_URI = fs.readFileSync(secretPath, 'utf8').trim();
}



const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;