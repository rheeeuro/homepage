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
bg-orange-200
`;

function App() {
  return (
    <Container>
      <Header />
      <div className="content">
        <ToDo />
        <Bookmark />
        <Footer />
      </div>
    </Container>
  );
}

export default App;
