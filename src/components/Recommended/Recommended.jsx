import './Recommended.css'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';

let randomWhiskyArr = [];

(function randomizer () {
    let items = require('../../data/shop.json');
    let keys = Object.keys(items.categories.spirits.Whisky);
    while(randomWhiskyArr.length < 8) {
            let randomWhisky = keys[Math.floor(Math.random() * keys.length)];
            let randomWhiskyItem = items.categories.spirits.Whisky[randomWhisky];
            if(!randomWhiskyArr.includes(randomWhiskyItem)) {randomWhiskyArr.push(randomWhiskyItem);
        } 
    }
})()

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
            <div className='carousel-wrapper'>
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
                    {randomWhiskyArr.map((whisky, index) => (
                        <div key={index} className='rec-item-wrapper'>
                        <div className='rec-item'>
                            <div className='rec-item-upper'>
                                <img className='carousel-img' src={require(`../../images/Spirits/Whisky/low-res/${whisky.imageTag}.jpg`)} alt={whisky.name}/>
                                <p>{whisky.name}</p>
                                <p>{whisky.quantity}/{whisky.strength}</p>
                            </div>
                            <p className='rec-card-check check-out-btn'>Check it out</p>
                        </div>
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
    )
}

export default Recommended