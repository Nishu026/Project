import { Stack } from "@mui/system";
import React from "react";
import CircularProgress from "@mui/material/CircularProgress";

export function Loader(props) {
  return (
    <Stack
      justifyContent={"center"}
      alignItems={"center"}
      height={props.height || "100vh"}
    >
      <CircularProgress size={60} color="secondary" />
    </Stack>
  );
}
