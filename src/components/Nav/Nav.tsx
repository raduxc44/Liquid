import './Nav.css'
import 'animate.css';
import BasicJack from '../../images/Whisky/standard-jack.jpeg'

function Nav () {

    function openCategMobile () {
        let mobileCateg = document.querySelector('.nav-lower') as HTMLElement;
        let deactivate = () => {
            mobileCateg.style.removeProperty('display')
            mobileCateg.classList.toggle('animate__fadeOutLeft')
        }
        if(mobileCateg.classList.contains('animate__fadeInLeft')) {
            mobileCateg.classList.toggle('animate__fadeInLeft');
            mobileCateg.classList.toggle('animate__fadeOutLeft');
            setTimeout(deactivate, 1000);
        }
        else {
            mobileCateg.style.display = 'block'
            mobileCateg.classList.toggle('animate__fadeInLeft')
        }
        
    }

    function openSearchMobile () {
        let mobileSearch = document.querySelector('.nav-mobile-search-cont') as HTMLElement;
        let deactivate = () => {
            mobileSearch.classList.toggle('deactivating')
        }
        if(mobileSearch.classList.contains('activating')) {
            mobileSearch.classList.toggle('activating')
            mobileSearch.classList.toggle('deactivating')
            setTimeout(deactivate, 1000);
        }
        else {
            mobileSearch.classList.toggle('activating')
        }
    }

    return(
        <nav>
            <div className='nav-upper'>
                <div>
                    <p className='logo text-5xl'>Liquid</p>
                </div>
                <div className="nav-utilities">
                    <div className='search-bar'>
                        <input type="text" placeholder='Search for a product'/>
                        <span className="material-icons nav-icon">search</span>
                    </div>
                    <div><span className="material-symbols-outlined nav-icon">favorite</span></div>
                    <div><span className='material-symbols-outlined nav-icon'>account_circle</span></div>
                    <div className='cart-container'>
                        <span className="material-symbols-outlined nav-icon">shopping_bag</span>
                        <div className='cart-count'>98</div>
                    </div>
                </div>
            </div>
            <div className='nav-lower-mobile'>
                <div className='nav-mobile-menu'>
                    <span onClick={openCategMobile} className="material-symbols-outlined">menu</span>
                    <p>Products</p>
                </div>
                <div className='nav-mobile-utilities'>
                    <div className='nav-mobile-search-cont'>
                        <input type="text" placeholder='Search'/>
                    </div>
                    <span onClick={openSearchMobile} className='material-symbols-outlined search-icon-mobile'>search</span>
                </div>
            </div>
            <div className='nav-lower animate__animated'>
                <div className='primary-categ'>
                    <ul>
                        <li>
                            <img src={BasicJack} alt="Whisky" />
                            <p>Spirits</p>
                        </li>
                        <li>
                            <img src={BasicJack} alt="Whisky" />
                            <p>Wine</p>
                        </li>
                        <li>
                            <img src={BasicJack} alt="Whisky" />
                            <p>Champagne</p>
                        </li>
                        <li>
                            <img src={BasicJack} alt="Whisky" />
                            <p>Gift Baskets</p>
                        </li>
                        <li>
                            <img src={BasicJack} alt="Whisky" />
                            <p>Others</p>
                        </li>
                        <li>
                            <img src={BasicJack} alt="Whisky" />
                            <p>On sale</p>
                        </li>
                        <li>
                            <img src={BasicJack} alt="Whisky" />
                            <p>Daily Offer</p>
                        </li>
                    </ul>
                </div>
                <div className='second-categ'>
                    <ul>
                        <li>Whisky</li>
                        <li>Vodka</li>
                        <li>Rum</li>
                        <li>Tequila</li>
                        <li>Liqeur</li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Nav