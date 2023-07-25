import { Typography } from "@mui/material";

export default function Heading({ title }) {
  return (
    <Typography
      gutterBottom
      padding={2}
      paddingLeft={0}
      fontSize={{
        lg: 30,
        md: 30,
        sm: 30,
        xs: 25,
      }}
      fontWeight={"bold"}
      lineHeight={1}
    >
      {title}
    </Typography>
  );
}
