import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/home';
import IndividualProdPage from './pages/individualProdPage';
import FilteredProducts from './pages/filteredProductsPage';
import Checkout from './pages/checkout';
import { SelectedProdProvider } from './Contexts/selectedProductContext';
import { SelectedFilterProvider } from './Contexts/selectedFilterContext';
import { InventoryContextProvider } from './Contexts/inventoryContext';
import { UserMethodsProvider } from './Contexts/userMethodsContext';
import { AppearenceMethodsProvider } from './Contexts/appeareanceContext';

function App() {

  return (
    <AppearenceMethodsProvider>
    <UserMethodsProvider>
    <InventoryContextProvider>
    <SelectedProdProvider>
    <SelectedFilterProvider>
      <BrowserRouter>
        <Routes>
            <Route index element= {<Home/>}></Route>
            <Route 
            path={`/product/:productId`} 
            element={<IndividualProdPage />} />
            <Route
            path={`category/:categoryName`}
            element={<FilteredProducts />}
            />
            <Route
            path='/checkout'
            element={<Checkout />}
            />
        </Routes>
      </BrowserRouter>
    </SelectedFilterProvider> 
    </SelectedProdProvider>
    </InventoryContextProvider>
    </UserMethodsProvider>
    </AppearenceMethodsProvider>
  );  
}

export default App;
