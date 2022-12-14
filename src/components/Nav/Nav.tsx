import './Nav.css'
import 'animate.css';
import { useEffect, useMemo, useState, useRef } from 'react';
import Inventory from '../../data/inventory.json'

function Nav () {

    //Functionality for the second desktop nav menu
    const alreadyOpenedCateg = useRef(false)
    const [selectedCategories, setSelectedCategories] = useState('spirits');
    const shownCategories: string[] = useMemo(() => {
        if(selectedCategories === 'spirits')            return Object.keys(Inventory.categories.spirits)
        else if(selectedCategories === 'wines')         return Object.keys(Inventory.categories.wine)
        else if(selectedCategories === 'champagne')     return Object.keys(Inventory.categories.champagne)
        else if(selectedCategories === 'others')        return Object.keys(Inventory.categories.others)
        else if(selectedCategories === 'gift-cards')    return Object.keys(Inventory.categories.giftCards)
        else if(selectedCategories === 'on-sale')       return Object.keys(Inventory.categories.onSale)
        else if(selectedCategories === 'daily-offer')   return Object.keys(Inventory.categories.dailyOffer)
    }, [selectedCategories])!

    // Applies in and out animations on categories (mobile version only)
    // Delay refs are used to avoid animation bugging when pressing their buttons rapidly
    let categAnimationDelay = useRef(0)
    let searchAnimationDelay = useRef(0)


    let deactivateCateg = () => {
        let primaryCategList: HTMLElement = document.querySelector('div.primary-categ > ul')!;
        let secondCategList: HTMLElement = document.querySelector('div.second-categ > ul')!;
        let mobileCateg: HTMLElement = document.querySelector('div.nav-lower')!;
        mobileCateg.classList.toggle('animate__fadeOutLeft')         
        setTimeout(() => {
            if(primaryCategList.style.display === 'none')   primaryCategList.style.display = 'block';
            if(secondCategList.style.display !== 'none')    secondCategList.style.display = 'none';
            mobileCateg.classList.toggle('animate__fadeOutLeft')
            mobileCateg.style.removeProperty('display')
            categAnimationDelay.current = 0
        }, 1000)   

    }
    let deactivateSearch = () => {
        let mobileSearch:HTMLElement = document.querySelector('div.nav-mobile-search-cont')!;
        mobileSearch.classList.toggle('animate__fadeOutUp')
        setTimeout(() => {
            mobileSearch.classList.toggle('animate__fadeOutUp')
            mobileSearch.style.removeProperty('display')
            searchAnimationDelay.current = 0;
        }, 1000);    
    }

    function openMobileAnim (button:string) {
        if(window.innerWidth < 1000) {
            let mobileCateg: HTMLElement = document.querySelector('.nav-lower')!;
            let mobileSearch: HTMLElement = document.querySelector('.nav-mobile-search-cont')!;

            //Obstructs interacting with the main body instead of the navbar
            if(button === 'categ') {                
                let body: HTMLElement = document.querySelector('body')!;
                if(body.style.overflow === 'hidden') body.style.overflow = 'visible';
                else body.style.overflow = 'hidden';  
            }
            if(button === 'categ') {
                if(categAnimationDelay.current === 1 ) {
                    categAnimationDelay.current = 1.5;
                    deactivateCateg();
                }
                else if(categAnimationDelay.current === 0) {
                    categAnimationDelay.current = 0.5
                    deactivateSearch();
                    setTimeout(() => {categAnimationDelay.current = 1}, 1000)
                    mobileCateg.style.display = 'block'
                    mobileCateg.classList.toggle('animate__fadeInLeft')
                    setTimeout(() => mobileCateg.classList.toggle('animate__fadeInLeft'), 1000)
                }
            }
            else if(button === 'search') {
                if(searchAnimationDelay.current === 1) {
                    searchAnimationDelay.current = 1.5
                    deactivateSearch();
                }
                else if(searchAnimationDelay.current === 0){
                    searchAnimationDelay.current = 0.5
                    deactivateCateg()
                    setTimeout(() => {searchAnimationDelay.current = 1}, 1000)
                    mobileSearch.style.display = 'flex'
                    mobileSearch.classList.toggle('animate__fadeInDown');
                    setTimeout(() => mobileSearch.classList.toggle('animate__fadeInDown'), 1000)
                }
            }
        } 
    }
    
    function switchMenus () {
        let primaryCategList: HTMLElement = document.querySelector('div.primary-categ > ul')!;
        let secondCategList: HTMLElement = document.querySelector('div.second-categ > ul')!;
        setTimeout(() => {
            primaryCategList.classList.add('animate__fadeOutLeft');
            secondCategList.style.display = 'flex';
            secondCategList.classList.add('animate__fadeInRight')
            setTimeout(() => {primaryCategList.style.display = 'none';}, 1000)
        }, 0)
        setTimeout(() => {
            primaryCategList.classList.remove('animate__fadeOutLeft')
            secondCategList.classList.remove('animate__fadeInRight')
        }, 1200)
    }

    // Generates the second category menu
    useEffect(() => {
        let primaryCategList: HTMLElement = document.querySelector('div.primary-categ > ul')!;
        let secondCategList: HTMLElement = document.querySelector('ul.second-categ-list')!;
        primaryCategList.classList.add('animate__animated');
        secondCategList.classList.add('animate__animated');
        secondCategList.innerHTML = ''

        for(let i = 0; i < shownCategories.length; i++) {
            let listItemDiv: HTMLElement = document.createElement('div');
            let listItem: HTMLElement = document.createElement('li');
            let listItemImage: HTMLImageElement = document.createElement('img')
            let listItemP: HTMLElement = document.createElement('p')
            listItemP.innerText = shownCategories[i];
            secondCategList.appendChild(listItemDiv);
            listItemDiv.appendChild(listItem);
            listItem.appendChild(listItemImage);
            listItem.appendChild(listItemP)
            listItemDiv.classList.add('secondary-categ-item')
            if(selectedCategories === 'spirits') listItemDiv.classList.toggle('seven-categs');
            else if(selectedCategories === 'wines') listItemDiv.classList.toggle('three-categs');
            else if(selectedCategories === 'others') listItemDiv.classList.toggle('two-categs');
            }
            if(window.innerWidth < 1000) {
                let listImagesArr: HTMLImageElement[] = Array.from(document.querySelectorAll('div.secondary-categ-item > li > img'))!;
                let firstCategListElements: HTMLElement[] = Array.from(document.querySelectorAll('div.primary-categ-item'))!;
                firstCategListElements[0].onclick = switchMenus;
                firstCategListElements[1].onclick = switchMenus;
                firstCategListElements[3].onclick = switchMenus;
                if(selectedCategories === 'spirits') {
                    listImagesArr[0].src = require(`../../images/Spirits/Whisky/low-res/jack-standard.jpg`);
                    listImagesArr[1].src = require(`../../images/Spirits/Vodka/low-res/absolut.jpg`);
                    listImagesArr[2].src = require(`../../images/Spirits/Cognac/low-res/hennessy.jpg`);
                    listImagesArr[3].src = require(`../../images/Spirits/Gin/low-res/koval.jpg`);
                    listImagesArr[4].src = require(`../../images/Spirits/Rum/low-res/the-kraken.jpg`);
                    listImagesArr[5].src = require(`../../images/Spirits/Tequila/low-res/jose-cuervo-reposado.jpg`);
                    listImagesArr[6].src = require(`../../images/Spirits/Liquor/low-res/disaronno.jpg`)
                
                }
                else if(selectedCategories === 'wines') {                    
                    listImagesArr[0].src = require(`../../images/Wine/low-res/Red/samtrot-spatlese.jpg`);
                    listImagesArr[1].src = require(`../../images/Wine/low-res/White/muni.jpg`);
                    listImagesArr[2].src = require(`../../images/Wine/low-res/Rose/cave-amadeu.jpg`);
                }
                else if(selectedCategories === 'others') {
                    listImagesArr[0].src = require(`../../images/Others/Beer/low-res/desperados.jpg`);
                    listImagesArr[1].src = require(`../../images/Others/Beverages/low-res/coca-cola.jpg`);
                }
            }
    }, [selectedCategories, shownCategories])    

    return(
        <nav>
            <div className='nav-upper'>
                <div className='logo-cont'>
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
                    <span onClick={() => {
                        openMobileAnim('categ');
                        }} className="material-symbols-outlined">menu</span>
                    <p>Products</p>
                </div>
                <div className='nav-mobile-utilities'>
                    <span onClick={() => {
                        openMobileAnim('search')
                        }} className='material-symbols-outlined search-icon-mobile'>search</span>
                </div>
            </div>
            <div className='nav-mobile-search-cont animate__animated'>
                <input type="text" placeholder='Search'/>
            </div>
            <div className='nav-lower animate__animated'>
                <div className='primary-categ'>
                    <ul>
                        <div className='primary-categ-item' onClick={() => {
                            setSelectedCategories('spirits')
                            alreadyOpenedCateg.current = true;
                            }}>
                            <li>
                                <img src={require(`../../images/Spirits/Whisky/low-res/jack-honey.jpg`)} alt="Whisky" />
                                <p>Spirits</p>
                            </li>
                        </div>
                        <div className='primary-categ-item' onClick={() => {
                            setSelectedCategories('wines')
                            alreadyOpenedCateg.current = true;
                            }}>
                            <li>
                                <img src={require(`../../images/Wine/low-res/Red/samtrot-spatlese.jpg`)} alt="Whisky" />
                                <p>Wine</p>
                            </li>
                        </div>
                        <div className='primary-categ-item' onClick={() => {
                            setSelectedCategories('champagne')
                            deactivateCateg()
                            }}>
                            <li>
                                <img src={require(`../../images/Champagne/low-res/ferrari.jpg`)} alt="Whisky" />
                                <p>Champagne</p>
                            </li>
                        </div>
                        <div className='primary-categ-item' onClick={() => {
                            setSelectedCategories('others')
                            alreadyOpenedCateg.current = true;
                            }}>
                            <li>
                                <img src={require(`../../images/Others/Beer/low-res/desperados.jpg`)} alt="Others" />
                                <p>Others</p>
                            </li>
                        </div>
                        <a href="/shopping-cart"><div className='primary-categ-item' onClick={() => {
                            setSelectedCategories('gift-cards')
                            deactivateCateg()
                            }}>
                            <li>
                                <img src={require(`../../images/Gift Cards/100off.png`)} alt="Gift Cards" />
                                <p>Gift Cards</p>
                            </li>
                        </div></a>
                        <div className='primary-categ-item' onClick={() => {
                            setSelectedCategories('on-sale')
                            deactivateCateg()
                            }}>
                            <li>
                                <img src={require(`../../images/on-sale-high-res.jpg`)} alt="On Sale" />
                                <p>On sale</p>
                            </li>
                        </div>
                        <div className='primary-categ-item' onClick={() => {
                            setSelectedCategories('daily-offer')
                            deactivateCateg()
                            }}>
                            <li>
                                <img src={require(`../../images/daily-offer-high-res.jpg`)} alt="Daily Offer" />
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