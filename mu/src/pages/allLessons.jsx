import { Stack } from "@mui/system";
import { Typography } from "@mui/material";
import Sidepanel from "../components/sidePanel";
import EasyButton from "../components/easyButton";
import { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import TextField from "@mui/material/TextField";
import axios from "axios";

import { LessonCard } from "../components/LessonCard";
const drawerWidth = window.innerWidth > 600 ? 200 : window.innerWidth;
export default function AllLessons() {
  const [open, setOpen] = useState(false);
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState();
  const [newLesson, setNewLesson] = useState({
    title: "",
    description: "",
    youtubeLink: "",
  });
  const fetchData = async () => {
    setLoading(true);
    let res = await axios.get(`http://localhost:5002/api/answers/lessons`, {
      headers: {
        "x-auth-token": localStorage.getItem("token"),
      },
    });
    console.log(res);
    setLessons(res.data);
    setLoading(false);
  };
  const addLesson = async () => {
    setLoading(true);
    let res = await axios.post(
      `http://localhost:5002/api/answers/addLesson`,
      { ...newLesson },
      {
        headers: {
          "x-auth-token": localStorage.getItem("token"),
        },
      }
    );
    console.log(res);
    setLessons(res.data);
    setLoading(false);
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <Stack
      spacing={2}
      paddingLeft={window.innerWidth > 600 ? `${drawerWidth + 10}px` : "0vw"}
      paddingRight={"0vw"}
      paddingBottom={"3vw"}
    >
      <Sidepanel />{" "}
      <Stack padding={2} spacing={3}>
        <Stack direction={"row"} justifyContent={"space-between"}>
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
            All Lectures
          </Typography>
          <EasyButton
            // startIcon={<AddIcon />}
            size="small"
            width={180}
            label="Add Lesson"
            onClick={() => setOpen(true)}
          />
        </Stack>
        <Typography variant="h5" color={"gray"}>
          All lesson plans of Prof.Shraddha Kadam
        </Typography>
        {lessons.map((e, i) => {
          return <LessonCard key={i} lesson={e} index={i} />;
        })}
        <Dialog open={open} fullWidth maxWidth="sm">
          <DialogTitle variant="h5" fontWeight={"bold"}>
            Add lecture
          </DialogTitle>
          <DialogContent>
            <DialogContentText>Title </DialogContentText>
            <TextField
              value={newLesson.title}
              multiline
              onChange={(e) =>
                setNewLesson({ ...newLesson, title: e.target.value })
              }
              sx={{ margin: "10px", width: "500px" }}
            ></TextField>
            <DialogContentText>Description </DialogContentText>
            <TextField
              multiline
              value={newLesson.description}
              onChange={(e) =>
                setNewLesson({ ...newLesson, description: e.target.value })
              }
              sx={{ margin: "10px", width: "500px" }}
            ></TextField>
            <DialogContentText>
              Youtube Link(HTML embed link){" "}
            </DialogContentText>
            <TextField
              value={newLesson.youtubeLink}
              multiline
              onChange={(e) =>
                setNewLesson({ ...newLesson, youtubeLink: e.target.value })
              }
              sx={{ margin: "10px", width: "500px" }}
            ></TextField>
          </DialogContent>
          <DialogActions>
            <EasyButton
              label={"Add"}
              size={"small"}
              onClick={() => {
                setOpen(false);
                addLesson();
              }}
            ></EasyButton>
            <EasyButton
              label={"Cancel"}
              size={"small"}
              onClick={() => {
                setOpen(false);
                setNewLesson({
                  title: "",
                  description: "",
                  youtubeLink: "",
                });
              }}
            ></EasyButton>
          </DialogActions>
        </Dialog>
      </Stack>
    </Stack>
  );
}
