import { Stack } from "@mui/material";
import React from "react";
import {
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  LabelList,
  Tooltip,
} from "recharts";

const BarGraph = ({ response }) => {
  // Sample data
  const data = [
    { name: "Learning", students: 20 },
    { name: "Difficulty Understanding", students: 30 },
    { name: "Inattentive", students: 10 },
  ];

  return (
    <Stack
      alignItems={"center"}
      backgroundColor={"#fcfcfc"}
      padding={"20px"}
      borderRadius={5}
    >
      <BarChart
        width={425}
        style={{
          paddingRight: 20,
          paddingLeft: -10,
          marginLeft: -10,
          // background: "#fcfcfc",
        }}
        height={210}
        data={response}
      >
        <Tooltip />

        <Bar dataKey="Learning" fill="green" />
        <Bar dataKey="Difficulty_in_understanding" fill="orange" />
        <Bar dataKey="Inattentive" fill="darkRed" />

        <CartesianGrid stroke="#ccc" />
        <XAxis dataKey="name" />
        <YAxis />
      </BarChart>
      <Legend />
    </Stack>
  );
};

function Legend() {
  return (
    <div>
      <span
        style={{
          display: "inline-block",
          backgroundColor: "green",
          width: "10px",
          height: "10px",
          marginRight: "5px",
        }}
      ></span>
      <span>Learning</span>
      <span
        style={{
          display: "inline-block",
          backgroundColor: "orange",
          width: "10px",
          height: "10px",
          marginLeft: "10px",
          marginRight: "5px",
        }}
      ></span>
      <span>Difficulty In Understanding</span>
      <span
        style={{
          display: "inline-block",
          backgroundColor: "darkRed",
          width: "10px",
          height: "10px",
          marginLeft: "10px",
          marginRight: "5px",
        }}
      ></span>
      <span>Inattentive</span>
    </div>
  );
}

export default BarGraph;
