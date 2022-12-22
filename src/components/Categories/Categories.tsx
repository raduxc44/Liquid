import './Categories.css'

function Categories () {
    return(
        <div className='categ-cont'>
            <div className='upper-categ'>
                <div className='categ-card-sm'>
                    <picture> <source srcSet={require(`../../images/Champagne/desktop/dom-perignon.webp`)} 
                        media="(min-width: 600px)"/> <img 
                        className='categ-pic-sm'
                        src={require(`../../images/Champagne/mobile/dom-perignon.webp`)} alt="Champagne"
                        loading={'lazy'}
                    /> </picture>
                    <div>
                        <p className='categ-card-title'>Champagne</p>
                        <p>Champagne placeholder text</p>
                    </div>
                    <div className='check-out-btn categ-small-card-check'>Check it out</div>
                </div>
                <div className='categ-card-sm'>
                    <div>
                        <p className='categ-card-title'>Vodka</p>
                        <p>Silent, yet deadly.</p>
                    </div>
                    <picture> <source srcSet={require(`../../images/Vodka/desktop/absolut.webp`)} 
                        media="(min-width: 600px)"/> <img 
                        className='categ-pic-sm'
                        src={require(`../../images/Vodka/mobile/absolut.webp`)} alt="Vodka"
                        loading={'lazy'}
                    /> </picture>
                    <div className='check-out-btn categ-small-card-check'>Check it out</div>
                </div>
                <div className='categ-card-sm'>
                    <picture> <source srcSet={require(`../../images/Rum/desktop/the-kraken.webp`)} 
                            media="(min-width: 600px)"/> <img 
                            className='categ-pic-sm'
                            src={require(`../../images/Rum/mobile/the-kraken.webp`)} alt="Rum"
                            loading={'lazy'}
                    /> </picture>
                    <div>
                        <p className='categ-card-title'>Rum</p>
                        <p>Pirates favorite!</p>
                    </div>
                    <div className='check-out-btn categ-small-card-check'>Check it out</div>
                </div>
                <div className='categ-card-sm'>
                    <div>
                        <p className='categ-card-title'>Wine</p>
                        <p>Wine placeholder text</p>
                    </div>
                    <picture> <source srcSet={require(`../../images/White-Wine/desktop/muni.webp`)} 
                        media="(min-width: 600px)"/> <img 
                        className='categ-pic-sm'
                        src={require(`../../images/White-Wine/mobile/muni.webp`)} alt="Wine"
                        loading={'lazy'}
                    /> </picture>
                    <div className='check-out-btn categ-small-card-check'>Check it out</div>
                </div>
            </div>
            <div className='lower-categ'>
                <div className='categ-card-lg'>
                    <div>
                        <p className='categ-card-title'>Gift Cards</p>
                        <p>Gift Cards placeholder text</p>
                    </div>
                    <picture> <source srcSet={require(`../../images/GiftCards/desktop/100off.webp`)} 
                        media="(min-width: 600px)"/> <img 
                        className='categ-pic-lg'
                        src={require(`../../images/GiftCards/mobile/100off.webp`)} alt="GiftCards"
                        loading={'lazy'}
                    /> </picture>
                    <div className='check-out-btn categ-large-card-check'>Check it out</div>
                </div>
                <div className='categ-card-lg'>
                    <picture> <source srcSet={require(`../../images/Whisky/desktop/red-label.webp`)} 
                        media="(min-width: 600px)"/> <img 
                        className='categ-pic-lg'
                        src={require(`../../images/Whisky/mobile/red-label.webp`)} alt="Whisky"
                        loading={'lazy'}
                    /> </picture>
                    <div>
                        <p className='categ-card-title'>Whisky</p>
                        <p>Whisky placeholder text</p>
                    </div>
                    <div className='check-out-btn categ-large-card-check'>Check it out</div>
                </div>
            </div>
        </div>
    )
}

export default Categories