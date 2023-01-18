import Nav from "../components/Nav/Nav"
import SingleProd from "../components/Single-Prod/single-prod"
import Recommended from "../components/Recommended/Recommended"
import Footer from "../components/Footer/footer"
import { useContext, useEffect } from "react"
import { SelectedProdContext } from "../Contexts/selectedProductContext"

function IndividualProdPage () {
    
    const { selectedProductToShow, setSelectedProductToShow} = useContext(SelectedProdContext); 
    const { quantityValue, setQuantityValue} = useContext(SelectedProdContext);
// Save selectedProductToShow to sessionStorage when it changes
    useEffect(() => {
        if (selectedProductToShow) {
            sessionStorage.setItem("selectedProductToShow", JSON.stringify(selectedProductToShow));
        }
    }, [selectedProductToShow]);

  // Restore selectedProductToShow from sessionStorage when the component is first rendered
    useEffect(() => {
        const storedSelectedProductToShow = JSON.parse(sessionStorage.getItem("selectedProductToShow") || "null");
        if (storedSelectedProductToShow) {
        setSelectedProductToShow(storedSelectedProductToShow);
        }
        console.log(storedSelectedProductToShow)
    }, []);

    return (
        <>
            <Nav></Nav>
            <SelectedProdContext.Provider value={{
                selectedProductToShow, setSelectedProductToShow,
                quantityValue, setQuantityValue
                }}>
                <SingleProd></SingleProd>
                <Recommended></Recommended>
            </SelectedProdContext.Provider>
            <Footer></Footer>
        </>
    )
}

export default IndividualProdPage