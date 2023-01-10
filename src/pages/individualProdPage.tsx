import Nav from "../components/Nav/Nav"
import SingleProd from "../components/Single-Prod/single-prod"
import Recommended from "../components/Recommended/Recommended"
import Footer from "../components/Footer/footer"
import { useContext } from "react"
import { SelectedProdContext } from "../Contexts/selectedProductContext"

function IndividualProdPage () {
    
    const { selectedProductToShow } = useContext(SelectedProdContext);
    const {setSelectedProductToShow} = useContext(SelectedProdContext)

    return (
        <>
            <Nav></Nav>
            <SelectedProdContext.Provider value={{selectedProductToShow, setSelectedProductToShow}}>
                <SingleProd></SingleProd>
                <Recommended></Recommended>
            </SelectedProdContext.Provider>
            
            <Footer></Footer>
        </>
    )
}

export default IndividualProdPage