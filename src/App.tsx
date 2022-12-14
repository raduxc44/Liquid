import './App.css';
import "slick-carousel/slick/slick.css"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/home';
import ShoppingCart from './pages/shoppingCart';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element= {<Home />}></Route>
        <Route path='/shopping-cart' element= {<ShoppingCart />}></Route>
      </Routes>
    </BrowserRouter>
    
  );  
}

export default App;
