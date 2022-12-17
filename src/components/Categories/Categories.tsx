import './Categories.css'

function Categories () {
    return(
        <div className='categ-cont'>
            <div className='upper-categ'>
                <div className='categ-card-sm'>
                    {/* <picture> <source srcSet={require(`../../images/Champagne/full-res/dom-perignon.jpg`)} 
                        media="(min-width: 600px)"/> <img 
                        className='categ-pic-sm'
                        src={require(`../../images/Champagne/mobile-res/dom-perignon.webp`)} alt="Champagne"
                        height={900} width={1360}
                        loading={'lazy'}
                    /> </picture> */}
                    <img className='categ-pic-sm' src={require('../../images/Champagne/mobile-res/dom-perignon.webp')} alt="" />
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
                    <img className='categ-pic-sm' src={require(`../../images/Spirits/Vodka/mobile-res/absolut.webp`)} alt={'Vodka'}/>
                    <div className='check-out-btn categ-small-card-check'>Check it out</div>
                </div>
                <div className='categ-card-sm'>
                    <img className='categ-pic-sm' src={require(`../../images/Spirits/Rum/mobile-res/the-kraken.webp`)} alt={'Rum'}/>
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
                    <img className='categ-pic-sm' src={require(`../../images/Wine/mobile-res/White/muni.webp`)} alt={'Wine'}/>
                    <div className='check-out-btn categ-small-card-check'>Check it out</div>
                </div>
            </div>
            <div className='lower-categ'>
                <div className='categ-card-lg'>
                    <div>
                        <p className='categ-card-title'>Gift Cards</p>
                        <p>Gift baskets placeholder text</p>
                    </div>
                    <img className='categ-pic-lg' src={require(`../../images/GiftCards/mobile-res/10off.webp`)} alt="Gift Cards" />
                    <div className='check-out-btn categ-large-card-check'>Check it out</div>
                </div>
                <div className='categ-card-lg'>
                    <img className='categ-pic-lg' src={require(`../../images/Spirits/Whisky/mobile-res/red-label.webp`)} alt="Whisky" />
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