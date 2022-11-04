import './Recommended.css'
import "react-responsive-carousel/lib/styles/carousel.min.css"
import { Carousel } from 'react-responsive-carousel'
import BasicJack from '../../images/Whisky/standard-jack.jpeg'

function Recommended () {
    return(
        <div className="rec-cont">
            <div className='rec-section'>
                <h2>Recommended products</h2>
            </div>
            <Carousel 
            centerSlidePercentage = {25}
            swipeable = {true}
            emulateTouch = {true}
            centerMode = {true}
            showThumbs = {false}
            showStatus = {false}
            stopOnHover = {false}
            >
                <div className='rec-item'>
                    <img className='carousel-img' src={BasicJack} alt="Sprits"/>
                </div>
                <div className='rec-item'>
                    <img className='carousel-img' src={BasicJack} alt="Sprits"/>
                </div>
                <div className='rec-item'>
                    <img className='carousel-img' src={BasicJack} alt="Sprits"/>
                </div>
                <div className='rec-item'>
                    <img className='carousel-img' src={BasicJack} alt="Sprits"/>
                </div>
                <div className='rec-item'>
                    <img className='carousel-img' src={BasicJack} alt="Sprits"/>
                </div>
                <div className='rec-item'>
                    <img className='carousel-img' src={BasicJack} alt="Sprits"/>
                </div>
                <div className='rec-item'>
                    <img className='carousel-img' src={BasicJack} alt="Sprits"/>
                </div>
                <div className='rec-item'>
                    <img className='carousel-img' src={BasicJack} alt="Sprits"/>
                </div>
                <div className='rec-item'>
                    <img className='carousel-img' src={BasicJack} alt="Sprits"/>
                </div>
            </Carousel>
        </div>
    )
}

export default Recommended