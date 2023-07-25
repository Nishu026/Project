import { ThemeProvider, createTheme } from "@mui/material/styles";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Student from "./pages/student";
import Lesson from "./pages/lesson";
import AllLessons from "./pages/allLessons";

const theme = createTheme({
  palette: {
    primary: {
      main: "#0971f1",
      darker: "#053e85",
    },
    neutral: {
      main: "#64748B",
      contrastText: "#fff",
    },
  },
  typography: {
    allVariants: {
      fontFamily: "Helvetica",
      //'Georgia, sans serif',
      //textTransform: 'none',
      //fontSize: 16,
    },
  },
  components: {
    MuiInputBase: {
      styleOverrides: {
        color: "white",
        input: {
          color: "black",
          backgroundColor: "white",
        },
        multiline: {
          backgroundColor: "white",
        },
      },
    },
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          // height:'5em',
          // width:'5em'
          // fontSize:'3em'
        },
      },
    },
    // MuiRating:{
    //   styleOverrides:{
    //     root:{
    //       fontSize:'0.6em'
    //     }
    //   }
    // }
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route index element={<Student />} />
          <Route path="/allLesson" element={<AllLessons />} />
          <Route path="/lesson" element={<Lesson />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
  );
}

export default App;
