import './Nav.css'
import 'animate.css';
import BasicJack from '../../images/Whisky/standard-jack.jpeg'

function Nav () {


    // Applies in and out animations on categories (mobile version only)

    let categAnimationDelay:number = 0;
    let searchAnimationDelay:number = 0;

    function openCategMobile () { 
        let mobileCateg = document.querySelector('.nav-lower') as HTMLElement;
        let deactivate = () => {
            mobileCateg.style.removeProperty('display')
            mobileCateg.classList.toggle('animate__fadeOutLeft')
            categAnimationDelay = 0
        }
        if(mobileCateg.classList.contains('animate__fadeInLeft') && categAnimationDelay === 1) {
            mobileCateg.classList.toggle('animate__fadeInLeft');
            mobileCateg.classList.toggle('animate__fadeOutLeft');
            // setTimeout(deactivate, 1000);
            setTimeout(deactivate, 1000)
        }
        else if(categAnimationDelay === 0 && !mobileCateg.classList.contains('animate__fadeInLeft')) {
            setTimeout(() => {categAnimationDelay = 1}, 1000)
            mobileCateg.style.display = 'block'
            mobileCateg.classList.toggle('animate__fadeInLeft')
        }
    }

    function openSearchMobile () {
        let mobileSearch = document.querySelector('.nav-mobile-search-cont') as HTMLElement;
        let deactivate = () => {
            mobileSearch.classList.toggle('animate__fadeOutUp')
            mobileSearch.style.removeProperty('display')
            searchAnimationDelay = 0;
        }
        if(mobileSearch.classList.contains('animate__fadeInDown') && searchAnimationDelay === 1) {
            mobileSearch.classList.toggle('animate__fadeInDown')
            mobileSearch.classList.toggle('animate__fadeOutUp')
            setTimeout(deactivate, 1000);
        }
        else if(searchAnimationDelay === 0 && !mobileSearch.classList.contains('animate__fadeInDown')){
            setTimeout(() => {searchAnimationDelay = 1}, 1000)
            mobileSearch.style.display = 'flex'
            mobileSearch.classList.toggle('animate__fadeInDown')
        }
    }

    return(
        <nav>
            <div className='nav-upper'>
                <div>
                    <p className='logo'>Liquid</p>
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
                    <span onClick={openSearchMobile} className='material-symbols-outlined search-icon-mobile'>search</span>
                </div>
            </div>
            <div className='nav-mobile-search-cont animate__animated'>
                <input type="text" placeholder='Search'/>
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