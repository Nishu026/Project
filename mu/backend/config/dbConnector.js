import { connect, mongoose } from "mongoose";
import dotenv from "dotenv"; //load from .env
dotenv.config();
const connectDB = async () => {
  try {
    mongoose.set("strictQuery", true);
    connect(process.env.MONGO_URI);
    //connect("mongodb://localhost:27017/mu");
    console.log("DB Success");
  } catch (err) {
    console.log("Error Connecting", err);
    process.exit(1);
  }
};

export default connectDB;
