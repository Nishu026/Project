import { Paper, Typography } from "@mui/material";
import EasyButton from "./easyButton";
import { Stack } from "@mui/system";
import BarGraph from "./barGraph";

export default function Question({
  question,
  showAnswer,
  selectOption,
  sendMessage,
  response,
  index,
  timer,
}) {
  return (
    <Paper
      sx={{
        padding: 3,
        borderRadius: 5,
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
        // width: "75vw",
      }}
    >
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={showAnswer ? "center" : "flex-start"}
      >
        <Stack spacing={2}>
          <Typography variant="h5">
            {index + 1} . {question?.q}
          </Typography>

          <Stack direction={"column"} spacing={3}>
            {" "}
            {[question?.a, question?.b, question?.c, question?.d].map(
              (e, i) => {
                return (
                  <EasyButton
                    key={i}
                    size="small"
                    label={e}
                    variant="outlined"
                    onClick={() => {
                      if (selectOption)
                        selectOption(
                          e === question?.answer ? "correct" : "incorrect"
                        );
                    }}
                  />
                );
              }
            )}
          </Stack>
          {question?.answer && showAnswer && (
            <Typography variant="h6">
              <b>Answer:</b> {question.answer}
            </Typography>
          )}
        </Stack>
        {showAnswer && (
          <Stack
            justifyContent={"space-between"}
            alignItems={"end"}
            spacing={5}
          >
            <BarGraph response={response} />

            <EasyButton
              label="Ask this question"
              variant="text"
              size="small"
              onClick={() => sendMessage(question)}
            />
          </Stack>
        )}
        {timer}
      </Stack>
    </Paper>
  );
}
