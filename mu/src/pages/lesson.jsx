import { Stack } from "@mui/system";
import { Divider, Paper, StepContent, Typography } from "@mui/material";
import Sidepanel from "../components/sidePanel";
import Question from "../components/question";
import EasyButton from "../components/easyButton";
import { Fragment, useEffect, useState } from "react";
import {
  Alert,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import TextField from "@mui/material/TextField";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { useLocation } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";
import Graph from "../components/graph";
import io from "socket.io-client";
import Heading from "../components/heading";
import Snackbar from "@mui/material/Snackbar";

const drawerWidth = window.innerWidth > 600 ? 200 : window.innerWidth;

export default function Lesson() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState();
  const [message, setMessage] = useState({ open: false });
  const [data, setData] = useState([]);
  const [q, setQ] = useState({
    q: "",
    a: "A. ",
    b: "B. ",
    c: "C. ",
    d: "D. ",
    answer: "",
  });
  const location = useLocation();
  const [lesson, setLesson] = useState(location.state);
  const fetchData = async () => {
    setLoading(true);
    let res = await axios.get(
      `http://localhost:5002/api/answers/lesson/${lesson._id}`,
      {
        headers: {
          "x-auth-token": localStorage.getItem("token"),
        },
      }
    );
    console.log(res);
    setData(res.data);
    setLoading(false);
  };
  const addQuestion = async () => {
    setLoading(true);
    let res = await axios.post(
      `http://localhost:5002/api/answers/addQuestion`,
      { question: q, lessonId: lesson._id },
      {
        headers: {
          "x-auth-token": localStorage.getItem("token"),
        },
      }
    );
    console.log(res);
    setLesson(res.data);
    setLoading(false);
  };
  useEffect(() => {
    fetchData();
  }, []);
  useEffect(() => {
    const socket = io("http://localhost:4000");

    socket.on("connection", () => {
      console.log("Connected to the socket server");
    });

    // Handle received messages from the server
    socket.on("message", (data) => {
      console.log("Received message:", data);
    });

    // Clean up the socket connection on component unmount
    return () => {
      socket.disconnect();
    };
  }, []);
  const sendMessage = (question) => {
    setMessage({
      open: true,
      message: "Question sent: " + question.q,
    });
    const socket = io("http://localhost:4000");
    socket.emit("message", { ...question, lessonId: lesson._id });
  };
  return (
    <Stack
      spacing={2}
      paddingLeft={window.innerWidth > 600 ? `${drawerWidth + 10}px` : "0vw"}
      paddingRight={"0vw"}
      paddingBottom={"3vw"}
    >
      <Snackbar
        open={message.open}
        message={message.message}
        key={message.question}
        autoHideDuration={6000}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        onClose={() => setMessage({ ...message, open: false })}
      >
        <Alert
          onClose={() => setMessage({ ...message, open: false })}
          severity="success"
          sx={{ width: "100%" }}
        >
          {message.message}
        </Alert>
      </Snackbar>
      <Sidepanel />{" "}
      <Stack padding={2} spacing={3}>
        <Stack direction={"row"} justifyContent={"space-between"}>
          <Typography
            fontSize={{
              lg: 40,
              md: 40,
              sm: 30,
              xs: 25,
            }}
            fontWeight={"bold"}
            lineHeight={1}
          >
            Title: {lesson.title}
          </Typography>
          <EasyButton
            label=" Add Question "
            size="small"
            width={180}
            // startIcon={<AddIcon />}
            onClick={() => {
              setOpen(true);
            }}
          ></EasyButton>
        </Stack>
        <Heading title={"Youtube Video"} />
        <iframe
          title="3"
          style={{ borderRadius: 40, alignSelf: "center" }}
          width={window.innerWidth > 800 ? "1100" : "300"}
          height={window.innerWidth > 800 ? "500" : "280"}
          src={lesson.youtubeLink}
        >
          {" "}
        </iframe>
        <Heading title={"Description"} />
        <Paper
          sx={{
            padding: 3,
            borderRadius: 5,
            boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
          }}
        >
          <Typography textAlign={"justify"} variant="h5">
            {lesson.description}
          </Typography>
        </Paper>
        <Heading title={"Learning Curve"} />
        <Paper
          sx={{
            padding: 3,
            borderRadius: 5,
            boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Graph
            //data={[{a:10},{a:20},{a:30},{a:23}]}
            // width={props.isMobile ? 340 : 430}
            data={data}
            width={1200}
            height={420}
            dataKey={"Learning"}
            fill={"purple"}
            stroke={"#292292"}
            name="Learning"
          />
        </Paper>
        <Heading title={"Questions"} />

        {lesson.questions.map((e, i) => {
          return (
            <Question
              question={e}
              sendMessage={sendMessage}
              response={data.filter((obj) => obj._id === e.q)}
              showAnswer={true}
              index={i}
            ></Question>
          );
        })}

        <Dialog open={open} fullWidth maxWidth="lg">
          <DialogTitle variant="h5" fontWeight={"bold"}>
            Add question
          </DialogTitle>
          <DialogContent>
            <DialogContentText>Question </DialogContentText>
            <TextField
              value={q.q}
              multiline
              onChange={(e) => setQ({ ...q, q: e.target.value })}
              sx={{ margin: "10px", width: "1100px" }}
            ></TextField>
            <DialogContentText>Options </DialogContentText>
            <TextField
              value={q.a}
              multiline
              onChange={(e) => setQ({ ...q, a: e.target.value })}
              sx={{ margin: "10px", width: "500px" }}
            ></TextField>
            <TextField
              value={q.b}
              multiline
              onChange={(e) => setQ({ ...q, b: e.target.value })}
              sx={{ margin: "10px", width: "500px" }}
            ></TextField>
            <TextField
              value={q.c}
              multiline
              onChange={(e) => setQ({ ...q, c: e.target.value })}
              sx={{ margin: "10px", width: "500px" }}
            ></TextField>
            <TextField
              value={q.d}
              multiline
              onChange={(e) => setQ({ ...q, d: e.target.value })}
              sx={{ margin: "10px", width: "500px" }}
            ></TextField>
            <DialogContentText>Correct Answer </DialogContentText>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
            >
              <FormControlLabel
                value={q.a}
                disabled={q.a === ""}
                onClick={() => setQ({ ...q, answer: q.a })}
                control={<Radio />}
                label={q.a}
              />
              <FormControlLabel
                value={q.b}
                disabled={q.b === ""}
                onClick={() => setQ({ ...q, answer: q.b })}
                control={<Radio />}
                label={q.b}
              />
              <FormControlLabel
                value={q.c}
                disabled={q.c === ""}
                onClick={() => setQ({ ...q, answer: q.c })}
                control={<Radio />}
                label={q.c}
              />
              <FormControlLabel
                value={q.d}
                onClick={() => setQ({ ...q, answer: q.d })}
                disabled={q.d === ""}
                control={<Radio />}
                label={q.d}
              />
            </RadioGroup>
          </DialogContent>
          <DialogActions>
            <EasyButton
              label={"Add"}
              size={"small"}
              onClick={() => {
                setOpen(false);
                addQuestion();
              }}
            ></EasyButton>
            <EasyButton
              label={"Cancel"}
              size={"small"}
              onClick={() => {
                setOpen(false);
                setQ({
                  q: "",
                  a: "A. ",
                  b: "B. ",
                  c: "C. ",
                  d: "D. ",
                  answer: "",
                });
              }}
            ></EasyButton>
          </DialogActions>
        </Dialog>
      </Stack>
    </Stack>
  );
}
