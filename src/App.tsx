import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/home';
import IndividualProdPage from './pages/individualProdPage';
import FilteredProducts from './pages/filteredProductsPage';
import { SelectedProdProvider } from './Contexts/selectedProductContext';
import { SelectedFilterProvider } from './Contexts/selectedFilterContext';
import { InventoryContextProvider } from './Contexts/inventoryContext';
import { UserMethodsProvider } from './Contexts/userMethodsContext';

function App() {

  return (
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
        </Routes>
      </BrowserRouter>
    </SelectedFilterProvider> 
    </SelectedProdProvider>
    </InventoryContextProvider>
    </UserMethodsProvider>
  );  
}

export default App;
