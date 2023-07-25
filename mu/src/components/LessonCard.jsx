import { Stack } from "@mui/system";
import { Paper, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
export function LessonCard(props) {
  const navigate = useNavigate();
  return (
    <Paper
      sx={{
        cursor: "pointer",
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
        borderRadius: 5,
      }}
      onClick={() => navigate("/lesson", { state: props.lesson })}
    >
      <Stack direction={"row"}>
        <iframe
          title="3"
          style={{ borderTopLeftRadius: 20, borderBottomLeftRadius: 20 }}
          width={window.innerWidth > 800 ? "520" : "300"}
          height={window.innerWidth > 800 ? "315" : "280"}
          src={props.lesson.youtubeLink}
        ></iframe>
        <Stack padding={5} maxWidth={"600px"}>
          <Typography
            variant="h5"
            gutterBottom
            fontSize={{
              lg: 30,
              md: 30,
              sm: 30,
              xs: 25,
            }}
            fontWeight={"20"}
          >
            {props.index + 1}. Lecture on: {props.lesson.title}
          </Typography>
          <Typography
            variant="h5"
            color={"gray"}
            maxHeight={190}
            overflow={"clip"}
            textOverflow={"ellipsis"}
          >
            {props.lesson.description}
          </Typography>
        </Stack>
      </Stack>
    </Paper>
  );
}
