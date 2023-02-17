import './Recommended.css'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';
import Inventory from '../../data/inventory.json';
import { Link } from 'react-router-dom';
import { Item } from '../../data/types';
import { useContext } from 'react';
import { SelectedProdContext } from '../../Contexts/selectedProductContext';
import { SelectedFilterContext } from '../../Contexts/selectedFilterContext';

let randomItemsArr: (Item)[] = [];

// Picks one random of each: Whisky, Vodka, Cognac, Rum, Liquor, Red & Wine, Champagne, Beer, Beverage

function Recommended () {

    const {selectedProductToShow, setSelectedProductToShow} = useContext(SelectedProdContext)
    const {setSelectedFilter} = useContext(SelectedFilterContext)

    function handleUserSelection (item: Item) {
        window.scroll(0,0)
        setSelectedProductToShow(item);
        console.log(selectedProductToShow)
    }

    (function randomizer () {
        let whiskyChosen: boolean = false;
        let vodkaChosen: boolean = false;
        let cognacChosen: boolean = false;
        let rumChosen: boolean = false;
        let liquorChosen: boolean = false;
        let redWineChosen: boolean = false;
        let whiteWineChosen: boolean = false;
        let champagneChosen: boolean = false;
        let beerChosen: boolean = false;
        let beverageChosen: boolean = false
                
            let itemsArr:Item[] = [];
            
            Object.entries(Inventory.Items).forEach(item => {
                itemsArr.push(item[1]);
            })
            while(randomItemsArr.length < 10) {
                let randomItemIndex = Math.floor(Math.random() * itemsArr.length);
                if(itemsArr[randomItemIndex].category === 'Whisky' && !whiskyChosen) {
                    whiskyChosen = true;
                    randomItemsArr.push(itemsArr[randomItemIndex])
                }
                else if(itemsArr[randomItemIndex].category === 'Vodka' && !vodkaChosen) {
                    vodkaChosen = true;
                    randomItemsArr.push(itemsArr[randomItemIndex])
                }
                else if(itemsArr[randomItemIndex].category === 'Cognac' && !cognacChosen) {
                    cognacChosen = true;
                    randomItemsArr.push(itemsArr[randomItemIndex])
                }
                else if(itemsArr[randomItemIndex].category === 'Rum' && !rumChosen) {
                    rumChosen = true;
                    randomItemsArr.push(itemsArr[randomItemIndex])
                }
                else if(itemsArr[randomItemIndex].category === 'Liquor' && !liquorChosen) {
                    liquorChosen = true;
                    randomItemsArr.push(itemsArr[randomItemIndex])
                }
                else if(itemsArr[randomItemIndex].category === 'White-Wine' && !whiteWineChosen) {
                    whiteWineChosen = true;
                    randomItemsArr.push(itemsArr[randomItemIndex])
                }
                else if(itemsArr[randomItemIndex].category === 'Red-Wine' && !redWineChosen) {
                    redWineChosen = true;
                    randomItemsArr.push(itemsArr[randomItemIndex])
                }
                else if(itemsArr[randomItemIndex].category === 'Champagne' && !champagneChosen) {
                    champagneChosen = true;
                    randomItemsArr.push(itemsArr[randomItemIndex])
                }
                else if(itemsArr[randomItemIndex].category === 'Beer' && !beerChosen) {
                    beerChosen = true;
                    randomItemsArr.push(itemsArr[randomItemIndex])
                }
                else if(itemsArr[randomItemIndex].category === 'Beverage' && !beverageChosen) {
                    beverageChosen = true;
                    randomItemsArr.push(itemsArr[randomItemIndex])
                }
            }
        }
    )()
    
    return(
        <div className="rec-cont">
            <div className='rec-section'>
                <div className='rec-section-msg'>
                    <p className='rec-section-msg-first'>Recommended products</p>
                </div>
                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '2dvw'}}>
                <Link
                    to={`/category/Recommended`}
                    onClick={() => {
                        window.scroll(0,0)
                        setSelectedFilter(randomItemsArr)
                    }}
                >
                    <div className='rec-section-all'>
                        <p>See all</p>
                    </div>
                </Link>
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
                    {randomItemsArr.map((item, index) => (
                        <div key={index} className='rec-item-wrapper'>
                        <div className='rec-item'>
                            <div className='rec-item-upper'>
                                <Link
                                to={`/product/${item?.name}`}
                                onClick={() => handleUserSelection(item)}
                                >
                                    <img className='carousel-img' src={require(`../../images/${item.category}/desktop/${item.imageTag}.webp`)} alt={item.name}/>
                                </Link>
                                <p>{item.name}</p>
                                <p>{item.quantity} / {item.strength}</p>
                            </div>
                            <Link
                                to={`/product/${item?.name}`}
                                onClick={() => handleUserSelection(item)}
                            >
                                <p className='rec-card-check check-out-btn'>Check it out</p>
                            </Link>
                        </div>
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
    )
}

export default Recommended