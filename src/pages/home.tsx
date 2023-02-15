import Nav from '../components/Nav/Nav';
import Banner from '../components/Banner/Banner';
import Recommended from '../components/Recommended/Recommended';
import Categories from '../components/Categories/Categories';
import Footer from '../components/Footer/footer';

export default function Home () {
    
    return(
        <>
            <Nav></Nav>
            <Banner></Banner>
            <Recommended></Recommended>
            <Categories></Categories>
            <Footer></Footer>
        </>
    )
}