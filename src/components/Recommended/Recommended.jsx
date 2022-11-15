import './Recommended.css'
import BasicJack from '../../images/Whisky/standard-jack.jpeg'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';

function Recommended () {
    return(
        <div className="rec-cont">
            <div className='rec-section'>
                <div className='rec-section-msg'>
                    <p className='rec-section-msg-first'>Recommended products</p>
                </div>
                <div className='rec-section-all'>
                    <p>See all</p>
                </div>
            </div>
            <Slider 
            dots = {true}
            infinite = {true}
            slidesToShow = {4}
            slidesToScroll = {1}
            arrows = {false}
            responsive = {[
                {
                    breakpoint: 1001,
                    settings: {
                        slidesToShow: 3,
                    }
                },
                {
                    breakpoint: 501,
                    settings: {
                        slidesToShow: 2
                    }
                }
            ]}
            >
                <div className='rec-item-wrapper'>
                    <div className='rec-item'>
                        <div className='rec-item-upper'>
                            <img className='carousel-img' src={BasicJack} alt="Sprits"/>
                            <p>Jack Daniel's 0.7L</p>
                            <p>70CL/40%</p>
                        </div>
                        <p className='rec-item-check'>Check it out</p>
                    </div>
                </div>
                <div className='rec-item-wrapper'>
                    <div className='rec-item'>
                        <div className='rec-item-upper'>
                            <img className='carousel-img' src={BasicJack} alt="Sprits"/>
                            <p>Jack Daniel's 0.7L</p>
                            <p>70CL/40%</p>
                        </div>
                        <p className='rec-item-check'>Check it out</p>
                    </div>
                </div>
                <div className='rec-item-wrapper'>
                    <div className='rec-item'>
                        <div className='rec-item-upper'>
                            <img className='carousel-img' src={BasicJack} alt="Sprits"/>
                            <p>Jack Daniel's 0.7L</p>
                            <p>70CL/40%</p>
                        </div>
                        <p className='rec-item-check'>Check it out</p>
                    </div>
                </div>
                <div className='rec-item-wrapper'>
                    <div className='rec-item'>
                        <div className='rec-item-upper'>
                            <img className='carousel-img' src={BasicJack} alt="Sprits"/>
                            <p>Jack Daniel's 0.7L</p>
                            <p>70CL/40%</p>
                        </div>
                        <p className='rec-item-check'>Check it out</p>
                    </div>
                </div>
                <div className='rec-item-wrapper'>
                    <div className='rec-item'>
                        <div className='rec-item-upper'>
                            <img className='carousel-img' src={BasicJack} alt="Sprits"/>
                            <p>Jack Daniel's 0.7L</p>
                            <p>70CL/40%</p>
                        </div>
                        <p className='rec-item-check'>Check it out</p>
                    </div>
                </div>
                <div className='rec-item-wrapper'>
                    <div className='rec-item'>
                        <div className='rec-item-upper'>
                            <img className='carousel-img' src={BasicJack} alt="Sprits"/>
                            <p>Jack Daniel's 0.7L</p>
                            <p>70CL/40%</p>
                        </div>
                        <p className='rec-item-check'>Check it out</p>
                    </div>
                </div>
            </Slider>
        </div>
    )
}

export default Recommended