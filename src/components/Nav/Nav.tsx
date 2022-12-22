import './Nav.css'
import 'animate.css';
import { useEffect, useMemo, useState, useRef } from 'react';
import Inventory from '../../data/inventory.json'

function Nav () {

    //Functionality for the second desktop nav menu
    const alreadyOpenedCateg = useRef(false);
    const subCategories = useRef(0)
    const [selectedCategories, setSelectedCategories] = useState('spirits');
    const shownCategories: Object[] = useMemo(() => {
        if(selectedCategories === 'spirits') {
            let spiritsArr:Object[] = []
            subCategories.current = 7;
            Object.entries(Inventory.Items).forEach(item => {
                if (item[1].category === 'Whisky' || 
                    item[1].category === 'Vodka'  || 
                    item[1].category === 'Rum'    ||
                    item[1].category === 'Gin'    ||
                    item[1].category === 'Liquor' ||
                    item[1].category === 'Tequila'||
                    item[1].category === 'Cognac' ) 
                {spiritsArr.push(item[1])}
            })
            return spiritsArr 
        }
        else if(selectedCategories === 'wines') {
            let winesArr: Object[] = []
            subCategories.current = 3;
            Object.entries(Inventory.Items).forEach(item => {
                if(item[1].category === 'White-Wine' || 
                    item[1].category === 'Red-Wine' || 
                    item[1].category === 'Rose-Wine') 
                {winesArr.push(item[1])}
            })
            return winesArr
        }
        else if(selectedCategories === 'champagne') {
            let champagneArr: Object[] = []
            subCategories.current = 0;
            Object.entries(Inventory.Items).forEach(item => {
                if(item[1].category === 'Champagne')
                {champagneArr.push(item[1])}
            })
            return champagneArr
        }
        else if(selectedCategories === 'others') {
            let othersArr: Object[] = []
            subCategories.current = 2;
            Object.entries(Inventory.Items).forEach(item => {
                if (item[1].category === 'Beer' ||
                    item[1].category === 'Beverage')
                {othersArr.push(item[1])}
            })
            return othersArr
        }
        else if(selectedCategories === 'gift-cards') {
            let giftCardsArr: Object[] = []
            subCategories.current = 0;
            Object.entries(Inventory.Items).forEach(item => {
                if(item[1].category === 'Gift-Card')
                {giftCardsArr.push(item[1])}
            })
            return giftCardsArr
        }
        // On sale and daily offer needs to be reworked ( separate property with boolean value? )
        else if(selectedCategories === 'on-sale') {
            let onSaleArr: Object[] = []
            subCategories.current = 0;
            Object.entries(Inventory.Items).forEach(item => {
                if(item[1].category === 'On-Sale')
                {onSaleArr.push(item[1])}
            })
            return onSaleArr
        }
        else if(selectedCategories === 'daily-offer') {
            let dailyOfferArr: Object[] = []
            subCategories.current = 0;
            Object.entries(Inventory.Items).forEach(item => {
                if(item[1].category === 'Daily-Offer') 
                {dailyOfferArr.push(item[1])}
            })
            return dailyOfferArr
        }
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
        if( selectedCategories === 'spirits'||
            selectedCategories === 'wines'  ||
            selectedCategories === 'others'
        ) {
            for(let i = 0; i < subCategories.current; i++) {
                let listItemDiv: HTMLElement = document.createElement('div');
                let listItem: HTMLElement = document.createElement('li');
                let listItemImage: HTMLImageElement = document.createElement('img')
                let listItemP: HTMLElement = document.createElement('p')
                secondCategList.appendChild(listItemDiv);
                listItemDiv.appendChild(listItem);
                listItem.appendChild(listItemImage);
                listItem.appendChild(listItemP);
                listItemDiv.classList.add('secondary-categ-item')
                if(selectedCategories === 'spirits') listItemDiv.classList.toggle('seven-categs');
                else if(selectedCategories === 'wines') listItemDiv.classList.toggle('three-categs');
                else if(selectedCategories === 'others') listItemDiv.classList.toggle('two-categs');
                }
                if(window.innerWidth < 1000) {
                    let listCategoryNamesArr: HTMLElement[] = Array.from(document.querySelectorAll('div.secondary-categ-item > li > p'))
                    let listImagesArr: HTMLImageElement[] = Array.from(document.querySelectorAll('div.secondary-categ-item > li > img'))!;
                    let firstCategListElements: HTMLElement[] = Array.from(document.querySelectorAll('div.primary-categ-item'))!;
                    firstCategListElements[0].onclick = switchMenus;
                    firstCategListElements[1].onclick = switchMenus;
                    firstCategListElements[3].onclick = switchMenus;
                    if(selectedCategories === 'spirits') {
                        listCategoryNamesArr[0].innerText = 'Whisky'
                        listImagesArr[0].src = require(`../../images/Whisky/mobile/jack-standard.webp`);
                        listCategoryNamesArr[1].innerText = 'Vodka'
                        listImagesArr[1].src = require(`../../images/Vodka/mobile/absolut.webp`);
                        listCategoryNamesArr[2].innerText = 'Cognac'
                        listImagesArr[2].src = require(`../../images/Cognac/mobile/hennessy.webp`);
                        listCategoryNamesArr[3].innerText = 'Gin'
                        listImagesArr[3].src = require(`../../images/Gin/mobile/koval.webp`);
                        listCategoryNamesArr[4].innerText = 'Rum'
                        listImagesArr[4].src = require(`../../images/Rum/mobile/the-kraken.webp`);
                        listCategoryNamesArr[5].innerText = 'Tequila'
                        listImagesArr[5].src = require(`../../images/Tequila/mobile/jose-cuervo-reposado.webp`);
                        listCategoryNamesArr[6].innerText = 'Liquor'
                        listImagesArr[6].src = require(`../../images/Liquor/mobile/disaronno.webp`)
                    }
                    else if(selectedCategories === 'wines') {    
                        listCategoryNamesArr[0].innerText = 'Red Wine'                
                        listImagesArr[0].src = require(`../../images/Red-Wine/mobile/samtrot-spatlese.webp`);
                        listCategoryNamesArr[1].innerText = 'White Wine'
                        listImagesArr[1].src = require(`../../images/White-Wine/mobile/muni.webp`);
                        listCategoryNamesArr[2].innerText = 'Rose Wine'
                        listImagesArr[2].src = require(`../../images/Rose-Wine/mobile/cave-amadeu.webp`);
                    }
                    else if(selectedCategories === 'others') {
                        listCategoryNamesArr[0].innerText = 'Beer'
                        listImagesArr[0].src = require(`../../images/Beer/mobile/desperados.webp`);
                        listCategoryNamesArr[1].innerText = 'Beverages'
                        listImagesArr[1].src = require(`../../images/Beverage/mobile/coca-cola.webp`);
                    }
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
                                <img src={require(`../../images/Whisky/mobile/jack-honey.webp`)} alt="Whisky" />
                                <p>Spirits</p>
                            </li>
                        </div>
                        <div className='primary-categ-item' onClick={() => {
                            setSelectedCategories('wines')
                            alreadyOpenedCateg.current = true;
                            }}>
                            <li>
                                <img src={require(`../../images/Red-Wine/mobile/samtrot-spatlese.webp`)} alt="Whisky" />
                                <p>Wine</p>
                            </li>
                        </div>
                        <div className='primary-categ-item' onClick={() => {
                            setSelectedCategories('champagne')
                            deactivateCateg()
                            }}>
                            <li>
                                <img src={require(`../../images/Champagne/mobile/ferrari.webp`)} alt="Whisky" />
                                <p>Champagne</p>
                            </li>
                        </div>
                        <div className='primary-categ-item' onClick={() => {
                            setSelectedCategories('others')
                            alreadyOpenedCateg.current = true;
                            }}>
                            <li>
                                <img src={require(`../../images/Beer/mobile/desperados.webp`)} alt="Others" />
                                <p>Others</p>
                            </li>
                        </div>
                        <div className='primary-categ-item' onClick={() => {
                            setSelectedCategories('gift-cards')
                            deactivateCateg()
                            }}>
                            <li>
                                <img src={require(`../../images/GiftCards/mobile/100off.webp`)} alt="Gift Cards" />
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