import { Stack } from "@mui/system";
import { Typography } from "@mui/material";
import Sidepanel from "../components/sidePanel";
import Question from "../components/question";
import { useEffect, useState } from "react";
import Chip from "@mui/material/Chip";
import axios from "axios";
import EasyButton from "../components/easyButton";
import { Loader } from "../components/loader";
import io from "socket.io-client";

const drawerWidth = window.innerWidth > 600 ? 200 : window.innerWidth;

export default function Student() {
  const [question, setQuestion] = useState({});
  const [answer, setAnswer] = useState({});
  const [loading, setLoading] = useState(false);
  const [lessons, setLessons] = useState([]);
  const [selectedLesson, setSelectedLesson] = useState(0);
  const [time, setTime] = useState(60);
  const fetchData = async () => {
    setLoading(true);
    let res = await axios.get(`http://localhost:5002/api/answers/lessons`, {
      headers: {
        "x-auth-token": localStorage.getItem("token"),
      },
    });
    setLessons(res.data);
    setLoading(false);
  };
  const saveAnswer = async (status) => {
    try {
      setLoading(true);
      let res = await axios.post(
        `http://localhost:5002/api/answers/saveAnswer`,
        {
          answer: {
            status,
            duration: 60 - time,
            question: question.q,
          },
          lessonID: question.lessonId,
        },
        {
          headers: {
            "x-auth-token": localStorage.getItem("token"),
          },
        }
      );
      setAnswer(res.data);
      setQuestion({});
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    let intervalId;
    if (time === 0 && question.q) {
      saveAnswer("Not answered");
      return;
    }
    if (time > 0) {
      intervalId = setInterval(() => setTime(time - 1), 1000);
    }
    return () => clearInterval(intervalId);
  }, [time]);

  useEffect(() => {
    fetchData();

    const socket = io("http://localhost:4000");

    socket.on("connection", () => {
      console.log("Connected to the socket server");
    });

    // Handle received messages from the server
    socket.on("message", (data) => {
      console.log("Received message:", data);
      setQuestion(data);
      setTime(60);
    });

    // Clean up the socket connection on component unmount
    return () => {
      socket.disconnect();
    };
  }, []);
  return  selectedLesson === -1 ? (
    <Typography textAlign={"center"} paddingTop={"40vh"} variant="h2">
      All Lessons Attended
    </Typography>
  ) : (
    <Stack
      spacing={2}
      paddingLeft={window.innerWidth > 600 ? `${drawerWidth + 10}px` : "0vw"}
      paddingRight={"0vw"}
      paddingBottom={"3vw"}
    >
      <Sidepanel />{" "}
      <Stack padding={1.5} spacing={2} alignItems={"center"}>
        <Typography
          variant="h2"
          fontSize={{
            lg: 50,
            md: 50,
            sm: 40,
            xs: 35,
          }}
          fontWeight={"bold"}
          lineHeight={1}
        >
          Lecture on: {lessons[selectedLesson]?.title}
        </Typography>
        <Typography variant="h5" gutterBottom color={"gray"}>
          {lessons[selectedLesson]?.description}
        </Typography>
        <iframe
          title="3"
          style={{ borderRadius: 30, margin: 40 }}
          width={window.innerWidth > 800 ? "1100" : "300"}
          height={window.innerWidth > 800 ? "520" : "280"}
          src={lessons[selectedLesson]?.youtubeLink}
        >
          {" "}
        </iframe>
        {loading ? (
           <Loader  height={100}/>
             ) :!question.q ? (
          <Stack
            minHeight={answer.prediction ? 160 : 100}
            justifyContent={"space-around"}
            alignItems={"stretch"}
          >
            {answer.prediction && (
              <Typography textAlign={"center"} variant="h5">
                Response Submitted: {answer.prediction}
              </Typography>
            )}
            {answer.prediction && (
              <Chip
                key={answer}
                label={answer.status + " in " + answer.duration + " seconds"}
                color={answer.status === "correct" ? "success" : "error"}
                variant="outlined"
              ></Chip>
            )}
            <EasyButton
              label="Start Next Lesson"
              width={!answer.prediction && 300}
              size="small"
              onClick={() => {
                setAnswer({});
                if (selectedLesson + 1 === lessons.length)
                  setSelectedLesson(-1);
                else {
                  setSelectedLesson(selectedLesson + 1);
                }
              }}
            />
          </Stack>
        ) : (
          <div style={{ alignSelf: "stretch" }}>
            <Question
              timer={
                <Chip
                  sx={{}}
                  label={time + " seconds left"}
                  color="error"
                  variant="filled"
                />
              }
              question={question}
              index={0}
              selectOption={saveAnswer}
              showAnswer={false}
            />
          </div>
        )}
      </Stack>
    </Stack>
  );
}
