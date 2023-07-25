import { Schema, model } from "mongoose";

const TrainingSchema = new Schema({
  duration: {
    type: Number,
    default: 60,
  },
  status: { type: String, enum: ["correct", "incorrect", "Not answered"] },
  label: {
    type: String,
    enum: ["Learning", "Difficulty in understanding", "Inattentive"],
  },
});

export default model("Training", TrainingSchema);
