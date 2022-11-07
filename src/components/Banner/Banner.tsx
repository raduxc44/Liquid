import './Banner.css'
import CoverSprits from '../../images/cover-sprits.jpg'
import CoverWines from '../../images/cover-wines.jpg'
import CoverBaskets from '../../images/cover-basket.jpg'
import "react-responsive-carousel/lib/styles/carousel.min.css"
import { Carousel } from 'react-responsive-carousel';


function Banner () {
    return (
        <div className='banner-cont'>
            <Carousel
            autoPlay = {true}
            interval = {5000}
            centerMode = {false}
            infiniteLoop = {true}
            showIndicators = {false}
            showThumbs = {false}
            showStatus = {false}
            stopOnHover = {false}
            swipeable = {false}
            >
                <div>
                    <img className='banner-img' src={CoverSprits} alt="Sprits"/>
                    <div className='banner-promo'>
                        <span className="material-symbols-outlined truck">local_shipping</span><p>Free delivery over $20</p>
                    </div>
                </div>
                <div>
                    <img className='banner-img' src={CoverWines} alt="Wines"/>
                    <div className='banner-promo'>
                        <span className="material-symbols-outlined truck">local_shipping</span><p>Free delivery over $20</p>
                    </div>
                </div>
                <div>
                    <img className='banner-img' src={CoverBaskets} alt="Baskets"/>
                    <div className='banner-promo'>
                        <span className="material-symbols-outlined truck">local_shipping</span><p>Free delivery over $20</p>
                    </div>
                </div>
            </Carousel>
        </div>
    )
}

export default Banner