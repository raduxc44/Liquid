import './Banner.css'
import "react-responsive-carousel/lib/styles/carousel.min.css"
import { Carousel } from 'react-responsive-carousel'
import CoverSprits from '../../images/cover-sprits.jpg'
import CoverWines from '../../images/cover-wines.jpg'
import CoverBaskets from '../../images/cover-basket.jpg'

function Banner () {
    return (
        <div className='banner-cont'>
            <Carousel 
            autoPlay = {true}
            interval = {5000}
            infiniteLoop = {true}
            showIndicators = {false}
            showThumbs = {false}
            showStatus = {false}
            stopOnHover = {false}
            >
                <div>
                    <img className='carousel-img' src={CoverSprits} alt="Sprits"/>
                    <div className='banner-promo sprits-banner'>
                    <span className="material-symbols-outlined truck">local_shipping</span><p>Free delivery over $20</p>
                    </div>
                    {/* <p className="legend">Legend 1</p> */}
                </div>
                <div>
                    <img src={CoverWines} alt="Wines"/>
                    {/* <div className='banner-promo wines-banner'>
                    <span className="material-symbols-outlined truck">local_shipping</span><p>Free delivery over $20</p>
                    </div> */}
                    <div className='banner-promo sprits-banner'>
                    <span className="material-symbols-outlined truck">local_shipping</span><p>Free delivery over $20</p>
                    </div>
                </div>
                <div>
                    <img className='carousel-img' src={CoverBaskets} alt="Baskets"/>
                    {/* <div className='banner-promo baskets-banner'>
                    <span className="material-symbols-outlined truck">local_shipping</span><p>Free delivery over $20</p>
                    </div> */}
                    <div className='banner-promo sprits-banner'>
                    <span className="material-symbols-outlined truck">local_shipping</span><p>Free delivery over $20</p>
                    </div>
                </div>
            </Carousel>
        </div>
    )
}

export default Banner