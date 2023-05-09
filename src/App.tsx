import tw from "tailwind-styled-components";
import "./App.css";
import Bookmark from "./components/Bookmark";
import Footer from "./components/Footer";
import Header from "./components/Header";
import ToDo from "./components/ToDo";

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
  return (
    <Container>
      <Header />
      <Content>
        <ToDo />
        <Bookmark />
      </Content>
      <Footer />
    </Container>
  );
}

export default App;
