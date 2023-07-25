import Button from "@mui/material/Button";

export default function EasyButton(props) {
  let size;
  if (props.size === "small") size = { lg: 20, md: 20, sm: 16, xs: 16 };
  else if (props.size === "smallest") size = { lg: 14, md: 14, sm: 12, xs: 12 };
  else size = { lg: 25, md: 25, sm: 20, xs: 20 };
  if (!props.variant)
    return (
      <Button
        onClick={props.onClick}
        startIcon={props.startIcon}
        size={props.size || "large"}
        sx={{
          borderRadius: 100,
          width: props.width ? props.width : "auto",
          textTransform: "none",
          fontWeight: props.fontWeight || "bold",
          fontSize: size,

          backgroundColor: props.color ? props.color : "#662d91",
          "&:hover": {
            backgroundColor: "#262262",
          },
        }}
        variant="contained"
      >
        {props.label}
      </Button>
    );
  else if (props.variant === "outlined")
    return (
      <Button
        onClick={props.onClick}
        startIcon={props.startIcon}
        size={props.size || "large"}
        sx={{
          borderRadius: 100,
          width: props.width ? props.width : "auto",
          textTransform: "none",
          fontWeight: props.fontWeight || "bold",
          fontSize: size,
          justifyContent: "flex-start",

          // backgroundColor: props.color ? props.color : "#662d91",
          // "&:hover": {
          //   backgroundColor: "#262262",
          // },
        }}
        variant="outlined"
        color="neutral"
      >
        {props.label}
      </Button>
    );
  else if (props.variant === "text")
    return (
      <Button
        onClick={props.onClick}
        startIcon={props.startIcon}
        size={props.size || "large"}
        sx={{
          borderRadius: 100,
          width: props.width ? props.width : "auto",
          textTransform: "none",
          fontWeight: props.fontWeight || "bold",
          fontSize: size,
          justifyContent: "flex-start",

          // backgroundColor: props.color ? props.color : "#662d91",
          // "&:hover": {
          //   backgroundColor: "#262262",
          // },
        }}
        variant="text"
      >
        {props.label}
      </Button>
    );
}
