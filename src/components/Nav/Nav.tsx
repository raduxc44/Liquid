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
        if(window.innerWidth < 1000) {
            let body: HTMLElement = document.querySelector('body')!;
            body.style.overflow = 'visible';  
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
                //Prevents the user from rappidly pressing the opening button for categ/search
                if(categAnimationDelay.current === 1 ) {
                    categAnimationDelay.current = 1.5;
                    deactivateCateg();
                }
                else if(categAnimationDelay.current === 0) {
                    let body: HTMLElement = document.querySelector('body')!;
                    body.style.overflow = 'hidden';
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
    
    //Handles the secondary menu animations - mobile
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
                    listImagesArr[0].src = require(`../../images/Spirits/Whisky/mobile-res/jack-standard.webp`);
                    listImagesArr[1].src = require(`../../images/Spirits/Vodka/mobile-res/absolut.webp`);
                    listImagesArr[2].src = require(`../../images/Spirits/Cognac/mobile-res/hennessy.webp`);
                    listImagesArr[3].src = require(`../../images/Spirits/Gin/mobile-res/koval.webp`);
                    listImagesArr[4].src = require(`../../images/Spirits/Rum/mobile-res/the-kraken.webp`);
                    listImagesArr[5].src = require(`../../images/Spirits/Tequila/mobile-res/jose-cuervo-reposado.webp`);
                    listImagesArr[6].src = require(`../../images/Spirits/Liquor/mobile-res/disaronno.webp`)
                
                }
                else if(selectedCategories === 'wines') {                    
                    listImagesArr[0].src = require(`../../images/Wine/mobile-res/Red/samtrot-spatlese.webp`);
                    listImagesArr[1].src = require(`../../images/Wine/mobile-res/White/muni.webp`);
                    listImagesArr[2].src = require(`../../images/Wine/mobile-res/Rose/cave-amadeu.webp`);
                }
                else if(selectedCategories === 'others') {
                    listImagesArr[0].src = require(`../../images/Others/Beer/mobile-res/desperados.webp`);
                    listImagesArr[1].src = require(`../../images/Others/Beverages/mobile-res/coca-cola.webp`);
                }
            }
    }, [selectedCategories, shownCategories])

    function searchFunc () {
        let searchInput:HTMLInputElement = document.querySelector('div.nav-mobile-search-cont > input')!;
        console.log(searchInput.value);
        let resultsDiv = document.createElement('div');
        let resultsArr = [];
        let a = Object.getOwnPropertyNames(Inventory)
        console.log(a);
        
    }

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
                <input onChange= {() => searchFunc()} type="text" placeholder='Search'/>
            </div>
            <div className='nav-lower animate__animated'>
                <div className='primary-categ'>
                    <ul>
                        <div className='primary-categ-item' onClick={() => {
                            setSelectedCategories('spirits')
                            alreadyOpenedCateg.current = true;
                            }}>
                            <li>
                                <img src={require(`../../images/Spirits/Whisky/mobile-res/jack-honey.webp`)} alt="Whisky" />
                                <p>Spirits</p>
                            </li>
                        </div>
                        <div className='primary-categ-item' onClick={() => {
                            setSelectedCategories('wines')
                            alreadyOpenedCateg.current = true;
                            }}>
                            <li>
                                <img src={require(`../../images/Wine/mobile-res/Red/samtrot-spatlese.webp`)} alt="Whisky" />
                                <p>Wine</p>
                            </li>
                        </div>
                        <div className='primary-categ-item' onClick={() => {
                            setSelectedCategories('champagne')
                            deactivateCateg()
                            }}>
                            <li>
                                <img src={require(`../../images/Champagne/mobile-res/ferrari.webp`)} alt="Whisky" />
                                <p>Champagne</p>
                            </li>
                        </div>
                        <div className='primary-categ-item' onClick={() => {
                            setSelectedCategories('others')
                            alreadyOpenedCateg.current = true;
                            }}>
                            <li>
                                <img src={require(`../../images/Others/Beer/mobile-res/desperados.webp`)} alt="Others" />
                                <p>Others</p>
                            </li>
                        </div>
                        <div className='primary-categ-item' onClick={() => {
                            setSelectedCategories('gift-cards')
                            deactivateCateg()
                            }}>
                            <li>
                                <img src={require(`../../images/GiftCards/mobile-res/100off.webp`)} alt="Gift Cards" />
                                <p>Gift Cards</p>
                            </li>
                        </div>
                        <div className='primary-categ-item' onClick={() => {
                            setSelectedCategories('on-sale')
                            deactivateCateg()
                            }}>
                            <li>
                                <img src={require(`../../images/on-sale-mobile-res.webp`)} alt="On Sale" />
                                <p>On sale</p>
                            </li>
                        </div>
                        <div className='primary-categ-item' onClick={() => {
                            setSelectedCategories('daily-offer')
                            deactivateCateg()
                            }}>
                            <li>
                                <img src={require(`../../images/daily-offer-mobile-res.webp`)} alt="Daily Offer" />
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