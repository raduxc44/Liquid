import './App.css';
import "slick-carousel/slick/slick.css"
import Nav from './components/Nav/Nav';
import Banner from './components/Banner/Banner';
import Recommended from './components/Recommended/Recommended';
import About from './components/About/About';

function App() {
  return (
    <>
    <Nav></Nav>
    <Banner></Banner>
    <Recommended></Recommended>
    <About></About>
    </>
    
  );  
}

export default App;
