import { Schema, model } from "mongoose";

const AnswerSchema = new Schema({
  timeStamp: {
    type: Date,
    default: Date.now,
  },
  answer: {
    question: String,
    status: String,
    duration: Number,
    prediction: String,
  },

  lesson: {
    type: Schema.Types.ObjectId,
    ref: "lessons", //mongo
  },
});

export default model("Answer", AnswerSchema); //answer collection
