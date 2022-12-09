import './Nav.css'
import 'animate.css';
import BasicJack from '../../images/Whisky-high-res/jack.jpg'
import { useEffect, useMemo, useState } from 'react';
import Shop from '../../data/shop.json'


function Nav () {

    //Functionality for the second nav menu
    const [selectedCategories, setSelectedCategories] = useState('spirits');
    const shownCategories: string[] = useMemo(() => {
        if(selectedCategories === 'spirits')        return Object.keys(Shop.categories.spirits)
        else if(selectedCategories === 'wines')     return Object.keys(Shop.categories.wine)
        else if(selectedCategories === 'others')    return Object.keys(Shop.categories.others)
    }, [selectedCategories])!

    // Applies in and out animations on categories (mobile version only)
    let categAnimationDelay:number = 0;
    let searchAnimationDelay:number = 0;

    function openMobileAnim (item:string) { 

        let mobileCateg: HTMLElement = document.querySelector('.nav-lower')!;
        let mobileSearch: HTMLElement = document.querySelector('.nav-mobile-search-cont')!;

        let deactivateCateg = () => {
            mobileCateg.classList.toggle('animate__fadeOutLeft');
            setTimeout(() => {
                mobileCateg.classList.toggle('animate__fadeOutLeft')
                mobileCateg.style.removeProperty('display')
                categAnimationDelay = 0
            }, 1000)   
        }
        let deactivateSearch = () => {
            mobileSearch.classList.toggle('animate__fadeOutUp')
            setTimeout(() => {
                mobileSearch.classList.toggle('animate__fadeOutUp')
                mobileSearch.style.removeProperty('display')
                searchAnimationDelay = 0;
            }, 1000);    
        }
        if(item === 'categ') {   
            if(categAnimationDelay === 1) {
                categAnimationDelay = 1.5
                deactivateCateg();
            }
            else if(categAnimationDelay === 0) {
                categAnimationDelay = 0.5
                deactivateSearch();
                setTimeout(() => {categAnimationDelay = 1}, 1000)
                mobileCateg.style.display = 'block'
                mobileCateg.classList.toggle('animate__fadeInLeft')
                setTimeout(() => mobileCateg.classList.toggle('animate__fadeInLeft'), 1000)
            }
        }
        else if(item === 'search') {
            if(searchAnimationDelay === 1) {
                searchAnimationDelay = 1.5
                deactivateSearch();
            }
            else if(searchAnimationDelay === 0){
                searchAnimationDelay = 0.5
                deactivateCateg()
                setTimeout(() => {searchAnimationDelay = 1}, 1000)
                mobileSearch.style.display = 'flex'
                mobileSearch.classList.toggle('animate__fadeInDown');
                setTimeout(() => mobileSearch.classList.toggle('animate__fadeInDown'), 1000)
            }
        }
    }
    
    useEffect(() => {
        let secondCategList: HTMLElement = document.querySelector('ul.second-categ-list')!;
        secondCategList.innerHTML = ''
        for(let i = 0; i < shownCategories.length; i++) {
            let listItemDiv: HTMLElement = document.createElement('div');
            let listItem: HTMLElement = document.createElement('li');
            listItem.innerHTML = shownCategories[i];
            secondCategList.appendChild(listItemDiv);
            listItemDiv.appendChild(listItem)
            listItemDiv.classList.add('secondary-categ-item');
            if(selectedCategories === 'spirits')    {listItemDiv.classList.add('seven-categs')}
            else if(selectedCategories === 'wines') {listItemDiv.classList.add('three-categs')}
            else if(selectedCategories === 'others'){listItemDiv.classList.add('four-categs')}
        }
    }, [selectedCategories, shownCategories])

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
                    <span onClick={() => {openMobileAnim('categ')}} className="material-symbols-outlined">menu</span>
                    <p>Products</p>
                </div>
                <div className='nav-mobile-utilities'>
                    <span onClick={() => {openMobileAnim('search')}} className='material-symbols-outlined search-icon-mobile'>search</span>
                </div>
            </div>
            <div className='nav-mobile-search-cont animate__animated'>
                <input type="text" placeholder='Search'/>
            </div>
            <div className='nav-lower animate__animated'>
                <div className='primary-categ'>
                    <ul>
                        <div className='primary-categ-item' onClick={() => {setSelectedCategories('spirits')}}>
                            <li>
                                <img src={BasicJack} alt="Whisky" />
                                <p>Spirits</p>
                            </li>
                        </div>
                        <div className='primary-categ-item' onClick={() => {setSelectedCategories('wines')}}>
                            <li>
                                <img src={BasicJack} alt="Whisky" />
                                <p>Wine</p>
                            </li>
                        </div>
                        <div className='primary-categ-item'>
                            <li>
                                <img src={BasicJack} alt="Whisky" />
                                <p>Champagne</p>
                            </li>
                        </div>
                        <div className='primary-categ-item'>
                            <li>
                                <img src={BasicJack} alt="Whisky" />
                                <p>Gift Baskets</p>
                            </li>
                        </div>
                        <div className='primary-categ-item' onClick={() => {setSelectedCategories('others')}}>
                            <li>
                                <img src={BasicJack} alt="Whisky" />
                                <p>Others</p>
                            </li>
                        </div>
                        <div className='primary-categ-item'>
                            <li>
                                <img src={BasicJack} alt="Whisky" />
                                <p>On sale</p>
                            </li>
                        </div>
                        <div className='primary-categ-item'>
                            <li>
                                <img src={BasicJack} alt="Whisky" />
                                <p>Daily Offer</p>
                            </li>
                        </div>
                    </ul>
                </div>
                <div className='second-categ'>
                    <ul className='second-categ-list'>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Nav