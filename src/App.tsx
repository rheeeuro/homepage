import tw from "tailwind-styled-components";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import "./App.css";
import Bookmark from "./components/Bookmark";
import Footer from "./components/Footer";
import Header from "./components/Header";
import ToDo from "./components/ToDo";
import { useEffect } from "react";

const Container = tw.div`
h-screen
w-screen
m-0
flex
flex-col
items-center
relative
`;

const Content = tw.div`
w-[80rem]
h-5/6
`;

function App() {
  useEffect(() => {
    function checkBgData() {
      const bgUrl = localStorage.getItem("bgUrl");
      if (bgUrl) {
        document.body.style.backgroundImage = `url('${bgUrl}')`;
      }
    }
    checkBgData();
    window.addEventListener("storage", checkBgData);
    return () => {
      window.removeEventListener("storage", checkBgData);
    };
  }, []);

  return (
    <Container>
      <Header />
      <DndProvider backend={HTML5Backend}>
        <Content>
          <ToDo />
          <Bookmark />
        </Content>
      </DndProvider>
      <Footer />
    </Container>
  );
}

export default App;
