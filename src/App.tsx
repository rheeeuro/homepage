import "./App.css";
import Bookmark from "./components/Bookmark";
import Footer from "./components/Footer";
import Header from "./components/Header";
import ToDo from "./components/ToDo";

function App() {
  return (
    <div className="container">
      <Header />
      <div className="content">
        <ToDo />
        <Bookmark />
        <Footer />
      </div>
    </div>
  );
}

export default App;
