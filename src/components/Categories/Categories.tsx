import './Categories.css'
import { Item } from '../../data/types';
import { useContext } from 'react';
import { SelectedFilterContext } from '../../Contexts/selectedFilterContext';
import { Link } from 'react-router-dom';
import { InventoryContext } from '../../Contexts/inventoryContext';

function Categories () {

    const { setSelectedFilter } = useContext(SelectedFilterContext);
    const { inventory } = useContext(InventoryContext);

    function filterHandler (filter: string) {
        let filteredItems:Item[] = [];
        Object.entries(inventory).forEach(([key, value]) => {
            if(value.category === filter) {
                filteredItems.push(value);
                setSelectedFilter(filteredItems);
            }
            window.scroll(0,0);
        })
    }

    return(
        <div className='categ-cont'>
            <div className='upper-categ'>
                <div className='categ-card-sm'>
                    <Link
                    to={`/category/Champagne`}
                    onClick={() => filterHandler('Champagne')}
                    >
                    <picture> 
                        <source srcSet={require(`../../images/Champagne/desktop/dom-perignon.webp`)} 
                            media="(min-width: 600px)"/> <img 
                            className='categ-pic-sm'
                            src={require(`../../images/Champagne/mobile/dom-perignon.webp`)} alt="Champagne"
                            loading={'lazy'}
                        /> 
                    </picture>
                    </Link>
                    <div>
                        <p className='categ-card-title'>Champagne</p>
                        <p>For a special ocassion</p>
                    </div>
                    <Link
                    to={`/category/Champagne`}
                    onClick={() => filterHandler('Champagne')}
                    >
                        <div className='check-out-btn categ-small-card-check'
                        >Check it out</div>
                    </Link>
                </div>
                <div className='categ-card-sm'>
                    <div>
                        <p className='categ-card-title'>Vodka</p>
                        <p>Silent, yet deadly.</p>
                    </div>
                    <Link
                    to={`/category/Champagne`}
                    onClick={() => filterHandler('Champagne')}
                    >
                    <picture> 
                        <source srcSet={require(`../../images/Vodka/desktop/absolut.webp`)} 
                        media="(min-width: 600px)"/> <img 
                        className='categ-pic-sm'
                        src={require(`../../images/Vodka/mobile/absolut.webp`)} alt="Vodka"
                        loading={'lazy'}
                        /> 
                    </picture>
                    </Link>
                    <Link
                    to={`/category/Vodka`}
                    onClick={() => filterHandler('Vodka')}
                    >
                    <div className='check-out-btn categ-small-card-check'>Check it out</div>
                    </Link>
                </div>
                <div className='categ-card-sm'>
                    <Link
                    to={`/category/Rum`}
                    onClick={() => filterHandler('Rum')}
                    >
                    <picture> 
                        <source srcSet={require(`../../images/Rum/desktop/the-kraken.webp`)} 
                            media="(min-width: 600px)"/> <img 
                            className='categ-pic-sm'
                            src={require(`../../images/Rum/mobile/the-kraken.webp`)} alt="Rum"
                            loading={'lazy'}
                        /> 
                    </picture>
                    </Link>
                    <div>
                        <p className='categ-card-title'>Rum</p>
                        <p>Pirates favorite!</p>
                    </div>
                    <Link
                    to={`/category/Rum`}
                    onClick={() => filterHandler('Rum')}
                    >
                    <div className='check-out-btn categ-small-card-check'>Check it out</div>
                    </Link>
                </div>
                <div className='categ-card-sm'>
                    <div>
                        <p className='categ-card-title'>Wine</p>
                        <p>Guilty Pleasure</p>
                    </div>
                    <Link
                    to={`/category/White-Wine`}
                    onClick={() => filterHandler('White-Wine')}
                    >
                    <picture> 
                        <source srcSet={require(`../../images/White-Wine/desktop/muni.webp`)} 
                        media="(min-width: 600px)"/> <img 
                        className='categ-pic-sm'
                        src={require(`../../images/White-Wine/mobile/muni.webp`)} alt="Wine"
                        loading={'lazy'}
                        /> 
                    </picture>
                    </Link>
                    <Link
                    to={`/category/White-Wine`}
                    onClick={() => filterHandler('White-Wine')}
                    >
                    <div className='check-out-btn categ-small-card-check'>Check it out</div>
                    </Link>
                </div>
            </div>
            <div className='lower-categ'>
                <div className='categ-card-lg'>
                    <div>
                        <p className='categ-card-title'>Gift Cards</p>
                        <p>Best gift idea</p>
                    </div>
                    <Link
                    to={`/category/Gift-Cards`}
                    onClick={() => filterHandler('Gift-Card')}
                    >
                    <picture> 
                        <source srcSet={require(`../../images/Gift-Card/desktop/100off.webp`)} 
                        media="(min-width: 600px)"/> <img 
                        className='categ-pic-lg'
                        src={require(`../../images/Gift-Card/mobile/100off.webp`)} alt="GiftCards"
                        loading={'lazy'}
                        /> 
                    </picture>
                    </Link>
                    <Link
                    to={`/category/Gift-Cards`}
                    onClick={() => filterHandler('Gift-Card')}
                    >
                    <div className='check-out-btn categ-large-card-check'>Check it out</div>
                    </Link>
                </div>
                <div className='categ-card-lg'>
                    <Link
                    to={`/category/Whisky`}
                    onClick={() => filterHandler('Whisky')}
                    >
                    <picture> 
                        <source srcSet={require(`../../images/Whisky/desktop/red-label.webp`)} 
                        media="(min-width: 600px)"/> <img 
                        className='categ-pic-lg'
                        src={require(`../../images/Whisky/mobile/red-label.webp`)} alt="Whisky"
                        loading={'lazy'}
                        /> 
                    </picture>
                    </Link>
                    <div>
                        <p className='categ-card-title'>Whisky</p>
                        <p>The classical way</p>
                    </div>
                    <Link
                    to={`/category/Whisky`}
                    onClick={() => filterHandler('Whisky')}
                    >
                    <div className='check-out-btn categ-large-card-check'>Check it out</div>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Categories