import './Categories.css'
import Inventory from '../../data/inventory.json';
import { Item } from '../../data/types';
import { useContext } from 'react';
import { SelectedFilterContext } from '../../Contexts/selectedFilterContext';

function Categories () {

    const {selectedFilter, setSelectedFilter} = useContext(SelectedFilterContext);

    function filterHandler (filter: string) {
        let filteredItems:Item[] = [];
        Object.entries(Inventory.Items).forEach(([key, value]) => {
            if(value.category === filter) filteredItems.push(value);
        })
        setSelectedFilter(filteredItems);        
    }

    return(
        <div className='categ-cont'>
            <div className='upper-categ'>
                <div className='categ-card-sm'>
                    <picture
                    onClick={() => filterHandler('Champagne')}
                    > <source srcSet={require(`../../images/Champagne/desktop/dom-perignon.webp`)} 
                        media="(min-width: 600px)"/> <img 
                        className='categ-pic-sm'
                        src={require(`../../images/Champagne/mobile/dom-perignon.webp`)} alt="Champagne"
                        loading={'lazy'}
                    /> </picture>
                    <div>
                        <p className='categ-card-title'>Champagne</p>
                        <p>Champagne placeholder text</p>
                    </div>
                    <div className='check-out-btn categ-small-card-check'
                    onClick={() => filterHandler('Champagne')}
                    >Check it out</div>
                </div>
                <div className='categ-card-sm'>
                    <div>
                        <p className='categ-card-title'>Vodka</p>
                        <p>Silent, yet deadly.</p>
                    </div>
                    <picture
                    onClick={() => filterHandler('Vodka')}
                    > <source srcSet={require(`../../images/Vodka/desktop/absolut.webp`)} 
                        media="(min-width: 600px)"/> <img 
                        className='categ-pic-sm'
                        src={require(`../../images/Vodka/mobile/absolut.webp`)} alt="Vodka"
                        loading={'lazy'}
                    /> </picture>
                    <div className='check-out-btn categ-small-card-check'
                    onClick={() => filterHandler('Vodka')}
                    >Check it out</div>
                </div>
                <div className='categ-card-sm'>
                    <picture
                    onClick={() => filterHandler('Rum')}
                    > <source srcSet={require(`../../images/Rum/desktop/the-kraken.webp`)} 
                            media="(min-width: 600px)"/> <img 
                            className='categ-pic-sm'
                            src={require(`../../images/Rum/mobile/the-kraken.webp`)} alt="Rum"
                            loading={'lazy'}
                    /> </picture>
                    <div>
                        <p className='categ-card-title'>Rum</p>
                        <p>Pirates favorite!</p>
                    </div>
                    <div className='check-out-btn categ-small-card-check'
                    onClick={() => filterHandler('Rum')}
                    >Check it out</div>
                </div>
                <div className='categ-card-sm'>
                    <div>
                        <p className='categ-card-title'>White Wine</p>
                        <p>Wine placeholder text</p>
                    </div>
                    <picture
                    onClick={() => filterHandler('White-Wine')}
                    > <source srcSet={require(`../../images/White-Wine/desktop/muni.webp`)} 
                        media="(min-width: 600px)"/> <img 
                        className='categ-pic-sm'
                        src={require(`../../images/White-Wine/mobile/muni.webp`)} alt="Wine"
                        loading={'lazy'}
                    /> </picture>
                    <div className='check-out-btn categ-small-card-check'
                    onClick={() => filterHandler('White-Wine')}
                    >Check it out</div>
                </div>
            </div>
            <div className='lower-categ'>
                <div className='categ-card-lg'>
                    <div>
                        <p className='categ-card-title'>Gift Cards</p>
                        <p>Gift Cards placeholder text</p>
                    </div>
                    <picture
                    onClick={() => filterHandler('Gift-Card')}
                    > <source srcSet={require(`../../images/Gift-Card/desktop/100off.webp`)} 
                        media="(min-width: 600px)"/> <img 
                        className='categ-pic-lg'
                        src={require(`../../images/Gift-Card/mobile/100off.webp`)} alt="GiftCards"
                        loading={'lazy'}
                    /> </picture>
                    <div className='check-out-btn categ-large-card-check'
                    onClick={() => filterHandler('Gift-Card')}
                    >Check it out</div>
                </div>
                <div className='categ-card-lg'>
                    <picture
                    onClick={() => filterHandler('Whisky')}
                    > <source srcSet={require(`../../images/Whisky/desktop/red-label.webp`)} 
                        media="(min-width: 600px)"/> <img 
                        className='categ-pic-lg'
                        src={require(`../../images/Whisky/mobile/red-label.webp`)} alt="Whisky"
                        loading={'lazy'}
                    /> </picture>
                    <div>
                        <p className='categ-card-title'>Whisky</p>
                        <p>Whisky placeholder text</p>
                    </div>
                    <div className='check-out-btn categ-large-card-check'
                    onClick={() => filterHandler('Whisky')}
                    >Check it out</div>
                </div>
            </div>
        </div>
    )
}

export default Categories