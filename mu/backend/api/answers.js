import { Router } from "express";
import randomForest from "random-forest-classifier";
import Answer from "../model/answer.js";
import lesson from "../model/lesson.js";
import { Types } from "mongoose";
import training from "../model/training.js";

const router = Router(); //API routes
var RandomForestClassifier = randomForest.RandomForestClassifier;
const rFPred = ({ status, duration, pred }) => // rFPred prediction function
  status === "correct" && duration < 30 ? "Learning" : pred;

router.post("/saveAnswer", async (req, res) => { 
  try {
    let { answer, lessonID } = req.body;

    let trainingData = await training.find({});
    var rf = new RandomForestClassifier({
      n_estimators: 20,//configures classifier
    });

    rf.fit(       //trained on training data
      trainingData,
      ["status", "duration"],
      "label", 
      function (err, trees) {   //callback function
        var prediction = rFPred({   
          ...answer,
          pred: rf.predict([answer], trees)[0],
        });
        answer = {      //updates answers
          ...answer,
          prediction: prediction,
        };
      }
    );
    await Answer.create({ //saved in database
      answer,
      lesson: Types.ObjectId(lessonID),
    });
    return res.status(200).send(answer);
  } catch (e) {
    console.log(e);
    res.status(404).send(e);
  }
});

router.get("/lessons", async (req, res) => {
  try {
    let lessons = await lesson.find({});
    return res.status(200).send(lessons);
  } catch (e) {
    console.log(e);
    res.status(404).send(e);
  }
});

router.post("/addLesson", async (req, res) => {
  try {
    const { title, description, youtubeLink } = req.body;
    await lesson.create({ title, description, youtubeLink });
    let lessons = await lesson.find({});
    return res.status(200).send(lessons);
  } catch (e) {
    console.log(e);
    res.status(404).send(e);
  }
});

router.post("/addQuestion", async (req, res) => {
  try {
    const { question, lessonId } = req.body;
    let updatedLesson = await lesson.findByIdAndUpdate(
      lessonId,
      { $push: { questions: question } },
      { returnOriginal: false } // Return the updated document
    );
    return res.status(200).send(updatedLesson);
  } catch (e) {
    console.log(e);
    res.status(404).send(e);
  }
});

router.get("/lesson/:lessonID", async (req, res) => {
  try {
    let result = await Answer.aggregate([
      {
        $match: {
          lesson: Types.ObjectId(req.params.lessonID),
        },
      },
      {
        $group: {
          _id: "$answer.question",
          count: { $sum: 1 }, //add count in each group
          Inattentive: {
            $sum: {
              $cond: [{ $eq: ["$answer.prediction", "Inattentive"] }, 1, 0], // if prediction true returns 1
            },
          },
          Learning: {
            $sum: {
              $cond: [{ $eq: ["$answer.prediction", "Learning"] }, 1, 0],
            },
          },
          Difficulty_in_understanding: {
            $sum: {
              $cond: [
                { $eq: ["$answer.prediction", "Difficulty in understanding"] },
                1,
                0,
              ],
            },
          },
        },
      },
    ]);
    return res.status(200).send(result);
  } catch (e) {
    console.log(e);
    res.status(404).send(e);
  }
});
export default router;