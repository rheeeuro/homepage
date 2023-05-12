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
    changeBackgroundImage();
  }, []);
  const changeBackgroundImage = () => {
    const url =
      "https://r4.wallpaperflare.com/wallpaper/108/140/869/digital-digital-art-artwork-fantasy-art-drawing-hd-wallpaper-d8b62d28c0f06c48d03c114ec8f2b4aa.jpg";
    document.body.style.backgroundImage = `url('${url}')`;
  };

  return (
    <Container>
      <Header />
      <DndProvider backend={HTML5Backend}>
        <Content>
          <ToDo />
          {/* <Bookmark /> */}
        </Content>
      </DndProvider>
      <Footer />
    </Container>
  );
}

export default App;
