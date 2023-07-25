import { Schema, model } from "mongoose";

const LessonSchema = new Schema({
  title: {
    type: String,
    default: "Lesson Title",
  },
  description: {
    type: String,
    default: "Lesson description",
  },
  youtubeLink: {
    type: String,
    default: "Youtube Link",
  },
  questions: [
    {
      q: String,
      a: String,
      b: String,
      c: String,
      d: String,
      answer: String,
    },
  ],
});

export default model("lessons", LessonSchema);
