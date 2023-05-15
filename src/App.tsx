import tw from "tailwind-styled-components";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import "./App.css";
import Bookmark from "./components/Bookmark";
import Footer from "./components/Footer";
import Header from "./components/Header";
import ToDo from "./components/ToDo";

function App() {
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

const Container = tw.div`
w-screen
m-0
flex
flex-col
items-center
relative
`;

const Content = tw.div`
w-[44rem]
lg:w-[80rem]
`;

export default App;
