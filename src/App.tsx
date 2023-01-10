import './App.css';
import "slick-carousel/slick/slick.css"
import { useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/home';
import IndividualProdPage from './pages/individualProdPage';
import ShoppingCart from './pages/shoppingCart';
import { Item } from './data/types';
import { SelectedProdContext } from './Contexts/selectedProductContext';

function App() {

  const [selectedProductToShow, setSelectedProductToShow] = useState<Item | null>(null);

  return (
    <SelectedProdContext.Provider value={{selectedProductToShow, setSelectedProductToShow}}>

    <BrowserRouter>
      <Routes>
          <Route index element= {<Home/>}></Route>
          <Route 
          path={`/product/${selectedProductToShow?.name}`} 
          element={<IndividualProdPage />} />
        <Route path='/shopping-cart' element= {<ShoppingCart />}></Route>
      </Routes>
    </BrowserRouter>
    
    </SelectedProdContext.Provider>

  );  
}

export default App;
