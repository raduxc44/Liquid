import './Categories.css'

function Categories () {
    return(
        <div className='categ-cont'>
            <div className='upper-categ'>
                <div className='categ-card-sm'>
                    <img className='categ-pic-sm' src={require(`../../images/Spirits/Whisky/low-res/jack-standard.jpg`)} alt={'Jack'}/>
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
                    <img className='categ-pic-sm' src={require(`../../images/Spirits/Whisky/low-res/jack-standard.jpg`)} alt={'Jack'}/>
                    <div className='check-out-btn categ-small-card-check'>Check it out</div>
                </div>
                <div className='categ-card-sm'>
                    <img className='categ-pic-sm' src={require(`../../images/Spirits/Whisky/low-res/jack-standard.jpg`)} alt={'Jack'}/>
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
                    <img className='categ-pic-sm' src={require(`../../images/Spirits/Whisky/low-res/jack-standard.jpg`)} alt={'Jack'}/>
                    <div className='check-out-btn categ-small-card-check'>Check it out</div>
                </div>
            </div>
            <div className='lower-categ'>
                <div className='categ-card-lg'>
                    <div>
                        <p className='categ-card-title'>Gift Cards</p>
                        <p>Gift baskets placeholder text</p>
                    </div>
                    <img className='categ-pic-lg' src={require(`../../images/Covers/wine-cover.jpg`)} alt="" />
                    <div className='check-out-btn categ-large-card-check'>Check it out</div>
                </div>
                <div className='categ-card-lg'>
                    <img className='categ-pic-lg' src={require(`../../images/Covers/wine-cover.jpg`)} alt="" />
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