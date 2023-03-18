import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/home';
import IndividualProdPage from './pages/individualProdPage';
import FilteredProducts from './pages/filteredProductsPage';
import { SelectedProdProvider } from './Contexts/selectedProductContext';
import { SelectedFilterProvider } from './Contexts/selectedFilterContext';
import { InventoryContextProvider } from './Contexts/inventoryContext';
// import { AuthProvider } from './Contexts/authContext';

function App() {

  return (
    <SelectedProdProvider>
    <SelectedFilterProvider>
    <InventoryContextProvider>
    {/* <AuthProvider> */}
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
    {/* </AuthProvider> */}
    </InventoryContextProvider>
    </SelectedFilterProvider> 
    </SelectedProdProvider>
  );  
}

export default App;
