import Nav from "../components/Nav/Nav";
import Recommended from "../components/Recommended/Recommended";
import MultipleProd from "../components/Multiple-Prod/Multiple-prod";
import Footer from "../components/Footer/footer";

export default function FilteredProducts() {

    return (
        <>
            <Nav></Nav>
            <MultipleProd></MultipleProd>
            <Recommended></Recommended>
            <Footer></Footer>
        </>
    );
}