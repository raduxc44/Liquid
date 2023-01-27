import Nav from "../components/Nav/Nav";
import Recommended from "../components/Recommended/Recommended";
import MultipleProd from "../components/Multiple-Prod/Multiple-prod";
import Footer from "../components/Footer/footer";
import { useContext } from "react";
import { SelectedFilterContext } from "../Contexts/selectedFilterContext";

export default function FilteredProducts() {

    const { selectedFilter, setSelectedFilter } = useContext(SelectedFilterContext);

    return (
        <>
        <SelectedFilterContext.Provider value={{
            selectedFilter, setSelectedFilter
        }}>
            <Nav></Nav>
            <MultipleProd></MultipleProd>
            <Recommended></Recommended>
            <Footer></Footer>
        </SelectedFilterContext.Provider>
        </>
    );
}