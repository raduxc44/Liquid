import Nav from '../components/Nav/Nav';
import Banner from '../components/Banner/Banner';
import Recommended from '../components/Recommended/Recommended';
import About from '../components/Categories/Categories';
import Footer from '../components/Footer/footer';
import { SelectedProdContext } from '../Contexts/selectedProductContext';
import { useContext } from 'react';

export default function Home () {
    
    const { selectedProductToShow, setSelectedProductToShow } = useContext(SelectedProdContext);
    const { quantityValue, setQuantityValue } = useContext(SelectedProdContext);
    
    return(
        <>
            <Nav></Nav>
            <Banner></Banner>
            <SelectedProdContext.Provider value={{
                selectedProductToShow, setSelectedProductToShow,
                quantityValue, setQuantityValue
                }}>
                <Recommended></Recommended>
            </SelectedProdContext.Provider>
            <About></About>
            <Footer></Footer>
        </>
    )
}