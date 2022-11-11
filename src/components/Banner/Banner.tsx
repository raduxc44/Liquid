import './Banner.css'
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
                <div className='banner-cont whisky-banner'>
                    <div className='banner-promo'>
                        <span className="material-symbols-outlined truck">local_shipping</span><p>Free delivery over $20</p>
                    </div>
                </div>
                <div className='banner-cont wines-banner'>
                    <div className='banner-promo'>
                        <span className="material-symbols-outlined truck">local_shipping</span><p>Free delivery over $20</p>
                    </div>
                </div>
                <div className='banner-cont champagne-banner'>
                    <div className='banner-promo'>
                        <span className="material-symbols-outlined truck">local_shipping</span><p>Free delivery over $20</p>
                    </div>
                </div>
            </Carousel>
        </div>
    )
}

export default Banner