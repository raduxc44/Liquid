import './Nav.css'
import 'animate.css';
import { useState, useRef, useContext } from 'react';
import { Item } from '../../data/types';
import { Link, useNavigate } from 'react-router-dom';
import { SelectedProdContext } from '../../Contexts/selectedProductContext';
import { SelectedFilterContext } from '../../Contexts/selectedFilterContext';
import { InventoryContext } from '../../Contexts/inventoryContext';
import AuthCont from '../Auth-Container/Auth-Cont';
import FavCont from '../Favorites-Container/Fav-Cont';

function Nav () {

    const navigate = useNavigate();
    const { setSelectedProductToShow } = useContext(SelectedProdContext);
    const { setSelectedFilter } = useContext(SelectedFilterContext);
    const { inventory } = useContext(InventoryContext);
    const [selectedMainCategory, setSelectedMainCategory] = useState('spirits');
    const [deviceType, setDeviceType] = useState(
        window.innerWidth < 1000 ? 'mobile' : 'desktop'
    );
    const alreadyOpenedCateg = useRef(false);
    const alreadyOpenedSearch = useRef(false);
    let categAnimationDelay = useRef(0)
    let searchAnimationDelay = useRef(0)
    let searchResultsAnimationDelay = useRef(0);
    let alreadyInTransition = useRef(false);
    let searchResultsArr: Item[] = []; 

    function changeDeviceType () {
        if(window.innerWidth < 1000) {
            setDeviceType('mobile');
        }
        else {
            setDeviceType('desktop');
        }
    }
    window.addEventListener('resize', changeDeviceType);

    function hideMobileElement (element: HTMLElement, animationClass: string) {
        if(!element.classList.contains('in-transition')) {
            element.classList.toggle('in-transition')
            element.classList.toggle(animationClass)
            setTimeout(() => {
                element.classList.toggle('in-transition')
                element.classList.toggle(animationClass)
                element.style.removeProperty('display')
                categAnimationDelay.current = 0
                searchAnimationDelay.current = 0;
            }, 1000)
        }
    }

    function showMobileElement (element: HTMLElement, animationClass: string) {
        if(!element.classList.contains('in-transition')) {
            element.classList.toggle('in-transition')
            element.style.display = 'flex';
            element.classList.toggle(animationClass)
            setTimeout(() => {
                element.classList.toggle(animationClass)
                element.classList.toggle('in-transition')
            }, 1000)
        }
    }
    
    //Handles the secondary menu animations - mobile
    function switchMenus (start:string, end:string) {
        let primaryCategList: HTMLElement = document.querySelector('ul.nav-mobile-primary-categ')!;
        let secondCategList: HTMLElement = document.querySelector('ul.nav-mobile-secondary-categ')!;
        let backButton: HTMLElement = document.querySelector('div.second-categ-list-back')!;

        if(start === 'primary' && end === 'secondary' && !alreadyInTransition.current) {
            primaryCategList.classList.toggle('animate__fadeOutLeft');
            secondCategList.style.display = 'flex';
            backButton.style.display = 'flex';
            backButton.classList.toggle('animate__fadeInRight')
            secondCategList.classList.toggle('animate__fadeInRight');
            alreadyInTransition.current = true;
            setTimeout(() => {primaryCategList.style.display = 'none'}, 1000);
            setTimeout(() => {
                primaryCategList.classList.toggle('animate__fadeOutLeft')
                secondCategList.classList.toggle('animate__fadeInRight')
                backButton.classList.toggle('animate__fadeInRight')
                alreadyInTransition.current = false;
            }, 1200)
        }
        else if(start === 'secondary' && end === 'primary' && !alreadyInTransition.current) {
            setTimeout(() => {
                backButton.classList.add('animate__fadeOutRight');
                secondCategList.classList.add('animate__fadeOutRight');
                primaryCategList.style.display = 'flex';
                primaryCategList.classList.add('animate__fadeInLeft')
                alreadyInTransition.current = true;
                setTimeout(() => {
                    secondCategList.style.display = 'none';
                    backButton.style.display = 'none';
                }, 1000)
            }, 0)
            setTimeout(() => {
                secondCategList.classList.remove('animate__fadeOutRight')
                backButton.classList.remove('animate__fadeOutRight')
                primaryCategList.classList.remove('animate__fadeInLeft')
                alreadyInTransition.current = false;
            }, 1200)
        }
    }

    function filterHandler (filter: string) {
        let filteredItems:Item[] = [];
        Object.entries(inventory).forEach(item => {
            if(item[1].category) {
                if(item[1].category === filter)
                filteredItems.push(item[1])
            }
        })
        setSelectedMainCategory('spirits');
        setSelectedFilter(filteredItems);
    }

    //Handles the secondary menu content

    const secondaryMenu = () => {
        switch (selectedMainCategory) {
            case 'spirits':
                if(window.innerWidth >= 1000) {
                    return (
                        <>
                            <Link
                                to={`/category/Whisky`}
                                onClick={() => filterHandler('Whisky')}
                                className="secondary-categ-item seven-categs"
                            >
                                <div>
                                    <li>
                                        <p>Whisky</p>
                                    </li>
                                </div>
                            </Link>
                            <Link
                                to={`/category/Vodka`}
                                onClick={() => filterHandler('Vodka')}
                                className="secondary-categ-item seven-categs"
                            >
                                <div>
                                    <li>
                                        <p>Vodka</p>
                                    </li>
                                </div>
                            </Link>
                            <Link
                                to={`/category/Champagne`}
                                onClick={() => filterHandler('Champagne')}
                                className="secondary-categ-item seven-categs"
                            >
                                <div>
                                    <li>
                                        <p>Cognac</p>
                                    </li>
                                </div>
                            </Link>
                            <Link
                                to={`/category/Gin`}
                                onClick={() => filterHandler('Gin')}
                                className="secondary-categ-item seven-categs"
                            >
                                <div>
                                    <li>
                                        <p>Gin</p>
                                    </li>
                                </div>
                            </Link>
                            <Link
                                to={`/category/Rum`}
                                onClick={() => filterHandler('Rum')}
                                className="secondary-categ-item seven-categs"
                            >
                                <div>
                                    <li>
                                        <p>Rum</p>
                                    </li>
                                </div>
                            </Link>
                            <Link
                                to={`/category/Tequila`}
                                onClick={() => filterHandler('Tequila')}
                                className="secondary-categ-item seven-categs"
                            >
                                <div>
                                    <li>
                                        <p>Tequila</p>
                                    </li>
                                </div>
                            </Link>
                            <Link
                                to={`/category/Liquor`}
                                onClick={() => filterHandler('Liquor')}
                                className="secondary-categ-item seven-categs"
                            >
                                <div>
                                    <li>
                                        <p>Liquor</p>
                                    </li>
                                </div>
                            </Link>
                        </>
                    )
                }
                else {
                    return (
                        <>
                        <Link
                            to={`/category/Whisky`}
                            onClick={() => {
                                filterHandler('Whisky')
                                switchMenus('secondary', 'primary')
                                hideMobileElement(document.querySelector('div.nav-mobile-categs')!, 'animate__fadeOutLeft')
                            }}
                            className='primary-categ-item'
                        >
                            <div className="primary-categ-item seven-categs">
                                <li>
                                    <img src={require(`../../images/Whisky/mobile/jack-standard.webp`)} alt="Whisky"/>
                                    <p>Whisky</p>
                                </li>
                            </div>
                        </Link>
                        <Link
                            to={`/category/Vodka`}
                            onClick={() => {
                                filterHandler('Vodka')
                                switchMenus('secondary', 'primary')
                                hideMobileElement(document.querySelector('div.nav-mobile-categs')!, 'animate__fadeOutLeft')
                            }}
                            className='primary-categ-item'
                        >
                            <div className="primary-categ-item seven-categs">
                                <li>
                                    <img src={require(`../../images/Vodka/mobile/absolut.webp`)} alt="Vodka"/>
                                    <p>Vodka</p>
                                </li>
                            </div>
                        </Link>
                        <Link
                            to={`/category/Cognac`}
                            onClick={() => {
                                filterHandler('Cognac')
                                switchMenus('secondary', 'primary')
                                hideMobileElement(document.querySelector('div.nav-mobile-categs')!, 'animate__fadeOutLeft')
                            }}
                            className='primary-categ-item'
                        >
                            <div className="primary-categ-item seven-categs">
                                <li>
                                    <img src={require(`../../images/Cognac/mobile/hennessy.webp`)} alt="Cognac"/>
                                    <p>Cognac</p>
                                </li>
                            </div>
                        </Link>
                        <Link
                            to={`/category/Gin`}
                            onClick={() => {
                                filterHandler('Gin')
                                switchMenus('secondary', 'primary')
                                hideMobileElement(document.querySelector('div.nav-mobile-categs')!, 'animate__fadeOutLeft')
                            }}
                            className='primary-categ-item'
                        >
                            <div className="primary-categ-item seven-categs">
                                <li>
                                    <img src={require(`../../images/Gin/mobile/koval.webp`)} alt="Gin"/>
                                    <p>Gin</p>
                                </li>
                            </div>
                        </Link>
                        <Link
                            to={`/category/Rum`}
                            onClick={() => {
                                filterHandler('Rum')
                                switchMenus('secondary', 'primary')
                                hideMobileElement(document.querySelector('div.nav-mobile-categs')!, 'animate__fadeOutLeft')
                            }}
                            className='primary-categ-item'
                        >
                            <div className="primary-categ-item seven-categs">
                                <li>
                                    <img src={require(`../../images/Rum/mobile/the-kraken.webp`)} alt="Rum"/>
                                    <p>Rum</p>
                                </li>
                            </div>
                        </Link>
                        <Link
                            to={`/category/Tequila`}
                            onClick={() => {
                                filterHandler('Tequila')
                                switchMenus('secondary', 'primary')
                                hideMobileElement(document.querySelector('div.nav-mobile-categs')!, 'animate__fadeOutLeft')
                            }}
                            className='primary-categ-item'
                        >
                            <div className="primary-categ-item seven-categs">
                                <li>
                                    <img src={require(`../../images/Tequila/mobile/jose-cuervo-reposado.webp`)} alt="Tequila"/>
                                    <p>Tequila</p>
                                </li>
                            </div>
                        </Link>
                        <Link
                            to={`/category/Liquor`}
                            onClick={() => {
                                filterHandler('Liquor')
                                switchMenus('secondary', 'primary')
                                hideMobileElement(document.querySelector('div.nav-mobile-categs')!, 'animate__fadeOutLeft')
                            }}
                            className='primary-categ-item'
                        >
                            <div className="primary-categ-item seven-categs">
                                <li>
                                    <img src={require(`../../images/Liquor/mobile/disaronno.webp`)} alt="Liquor"/>
                                    <p>Liquor</p>
                                </li>
                            </div>
                        </Link>
                        </>
                    )
                }
            case 'wines':
                if(window.innerWidth >= 1000) {
                    return (
                        <>
                            <Link
                                to={`/category/Red-Wine`}
                                onClick={() => filterHandler('Red-Wine')}
                                className="secondary-categ-item three-categs"
                            >
                                <div>
                                    <li>
                                        <p>Red Wine</p>
                                    </li>
                                </div>
                            </Link>
                            <Link
                                to={`/category/White-Wine`}
                                onClick={() => filterHandler('White-Wine')}
                                className="secondary-categ-item three-categs"
                            >
                                <div>
                                    <li>
                                        <p>White Wine</p>
                                    </li>
                                </div>
                            </Link>
                            <Link
                                to={`/category/Rose-Wine`}
                                onClick={() => filterHandler('Rose-Wine')}
                                className="secondary-categ-item three-categs"
                            >
                                <div>
                                    <li>
                                        <p>Rose Wine</p>
                                    </li>
                                </div>
                            </Link>
                        </>
                    )
                }
                else {
                    return (
                        <>
                        <Link
                            to={`/category/Red-Wine`}
                            onClick={() => {
                                filterHandler('Red-Wine')
                                switchMenus('secondary', 'primary')
                                hideMobileElement(document.querySelector('div.nav-mobile-categs')!, 'animate__fadeOutLeft')
                            }}
                            className='primary-categ-item'
                        >
                            <div className="primary-categ-item three-categs">
                                <li>
                                    <img src={require(`../../images/Red-Wine/mobile/limestone-coast.webp`)} alt="Red Wine"/>
                                    <p>Red Wine</p>
                                </li>
                            </div>
                        </Link>
                        <Link
                            to={`/category/White-Wine`}
                            onClick={() => {
                                filterHandler('White-Wine')
                                switchMenus('secondary', 'primary')
                                hideMobileElement(document.querySelector('div.nav-mobile-categs')!, 'animate__fadeOutLeft')
                            }}
                            className='primary-categ-item'
                        >
                            <div className="primary-categ-item three-categs">
                                <li>
                                    <img src={require(`../../images/White-Wine/mobile/fratelli.webp`)} alt="White Wine"/>
                                    <p>White Wine</p>
                                </li>
                            </div>
                        </Link>
                        <Link
                            to={`/category/Rose-Wine`}
                            onClick={() => {
                                filterHandler('Rose-Wine')
                                switchMenus('secondary', 'primary')
                                hideMobileElement(document.querySelector('div.nav-mobile-categs')!, 'animate__fadeOutLeft')
                            }}
                            className='primary-categ-item'
                        >
                            <div className="primary-categ-item three-categs">
                                <li>
                                    <img src={require(`../../images/Rose-Wine/mobile/cave-amadeu.webp`)} alt="Rose Wine"/>
                                    <p>Rose Wine</p>
                                </li>
                            </div>
                        </Link>
                        </>
                    )
                }
            case 'others':
                if(window.innerWidth >= 1000) {
                    return (
                        <>
                            <Link
                                to={`/category/Beer`}
                                onClick={() => filterHandler('Beer')}
                                className="secondary-categ-item two-categs"
                            >
                                <div>
                                    <li>
                                        <p>Beer</p>
                                    </li>
                                </div>
                            </Link>
                            <Link
                                to={`/category/Beverage`}
                                onClick={() => filterHandler('Beverage')}
                                className="secondary-categ-item two-categs"
                            >
                                <div>
                                    <li>
                                        <p>Beverages</p>
                                    </li>
                                </div>
                            </Link>
                        </>
                    )
                }
                else {
                    return (
                        <>
                            <Link
                                to={`/category/Beer`}
                                onClick={() => {
                                    filterHandler('Beer')
                                    switchMenus('secondary', 'primary')
                                    hideMobileElement(document.querySelector('div.nav-mobile-categs')!, 'animate__fadeOutLeft')
                                }}
                                className='primary-categ-item'
                            >
                                <div className="primary-categ-item two-categs">
                                    <li>
                                        <img src={require(`../../images/Beer/mobile/desperados.webp`)} alt="Beer"/>
                                        <p>Beer</p>
                                    </li>
                                </div>
                            </Link>
                            <Link
                                to={`/category/Beverage`}
                                onClick={() => {
                                    filterHandler('Beverage')
                                    switchMenus('secondary', 'primary')
                                    hideMobileElement(document.querySelector('div.nav-mobile-categs')!, 'animate__fadeOutLeft')
                                }}
                                className='primary-categ-item'
                            >
                                <div className="primary-categ-item two-categs">
                                    <li>
                                        <img src={require(`../../images/Beverage/mobile/coca-cola.webp`)} alt="Beverage"/>
                                        <p>Beverage</p>
                                    </li>
                                </div>
                            </Link>
                        </>
                    )
                }
        }
    }

    function searchResultsAnim (type:string, time:string) {
        if(type === 'desktop') {
            let resultsDiv:HTMLElement = document.querySelector('div.search-results-container')!;
            if(time === 'start' && searchResultsAnimationDelay.current === 0) {
                resultsDiv.classList.toggle('animate__fadeIn');
                resultsDiv.style.display = 'flex'
                setTimeout(() => {
                    resultsDiv.classList.toggle('animate__fadeIn')
                    searchResultsAnimationDelay.current = 1
                }, 500)
            }
            else if(time === 'end' && searchResultsAnimationDelay.current === 1) {
                resultsDiv.classList.toggle('animate__fadeOut');
                setTimeout(() => {
                    resultsDiv.style.display = 'none'
                    resultsDiv.classList.toggle('animate__fadeOut')
                    searchResultsAnimationDelay.current = 0
                }, 500)
            }
        }
        else if(type === 'mobile') {
            let resultsDiv:HTMLElement = document.querySelector('div.mobile-search-results')!;
            if(time === 'start' && searchResultsAnimationDelay.current === 0) { 
                // document.querySelector('body')!.style.overflow = 'hidden';
                resultsDiv.classList.toggle('animate__fadeIn');
                resultsDiv.style.display = 'flex'
                setTimeout(() => {
                    resultsDiv.classList.toggle('animate__fadeIn')
                    searchResultsAnimationDelay.current = 1
                }, 500)
            }
            else if(time === 'end' && searchResultsAnimationDelay.current === 1) {
                // document.querySelector('body')!.style.overflow = 'visible';
                resultsDiv.classList.toggle('animate__fadeOut');
                setTimeout(() => {
                    resultsDiv.style.display = 'none'
                    resultsDiv.classList.toggle('animate__fadeOut')
                    searchResultsAnimationDelay.current = 0
                }, 500)
            }
        }
    }

    function searchFunc (deviceType : string) {
        if(deviceType === 'desktop') {
            let searchInput:HTMLInputElement = document.querySelector('div.search-bar > input')!;
            let resultsList:HTMLElement = document.querySelector('div.search-results-container > ul')!;
            resultsList.classList.add('search-results-container-anim');
            searchResultsArr = []
            resultsList.innerHTML = ''
            if(searchInput.value !== '') {
                searchResultsAnim('desktop', 'start')
                Object.entries(inventory).forEach(item => {
                    if(item[1].name) {
                        if(item[1].name.toLowerCase().includes(searchInput.value.toLowerCase()))
                        {searchResultsArr.push(item[1])}
                    }
                })
            }
            else if(searchInput.value === '') {searchResultsAnim('desktop', 'end')}
            searchResultsArr.forEach((item) =>  {
                let resultItemCont = document.createElement('div')
                let resultItem = document.createElement('li')
                let resultItemImage = document.createElement('img')
                let resultItemDetails = document.createElement('div')
                let resultItemP = document.createElement('p')
                resultItemImage.src = require(`../../images/${item.category}/desktop/${item.imageTag}.webp`)
                if(!item.quantity && !item.strength) {
                    resultItemDetails.innerHTML = 
                    `<p style='font-weight: bold'>${item.name}</p>
                    <p>$${item.price}</p>`
                }
                else if(item.quantity && item.strength) {
                    resultItemDetails.innerHTML = 
                    `<p style='font-weight: bold'>${item.name}</p>
                    <p>${item.quantity}/${item.strength}</p>
                    <p>$${item.price}</p>`
                }
                resultItemCont.classList.add('search-results-list-container')
                resultItemCont.onclick = () => {
                    setSelectedProductToShow(item);
                    navigate(`/product/${item.name}`);
                    searchInput.value = '';
                }
                resultItemDetails.classList.add('search-result-details')
                resultItemP.innerText = `${item.name}`
                resultsList.appendChild(resultItemCont)
                resultItemCont.appendChild(resultItem)
                resultItem.appendChild(resultItemDetails)
                resultItem.appendChild(resultItemImage)
            })
        }
        else if(deviceType === 'mobile') {
            let searchBox:HTMLElement = document.querySelector('div.nav-mobile-search-cont')!;
            searchBox.style.borderBottom = 'none';
            let searchInput:HTMLInputElement = document.querySelector('div.mobile-search-bar > input')!;
            let resultsList:HTMLElement = document.querySelector('div.mobile-search-results > ul')!;
            resultsList.classList.add('search-results-container-anim');
            searchResultsArr = []
            resultsList.innerHTML = ''
            if(searchInput.value !== '') {
                searchResultsAnim('mobile', 'start')
                Object.entries(inventory).forEach(item => {
                    if(item[1].name) {
                        if(item[1].name.toLowerCase().includes(searchInput.value.toLowerCase()))
                        {searchResultsArr.push(item[1])}
                    }
                })
            }
            else if(searchInput.value === '') {searchResultsAnim('mobile', 'end')}
            searchResultsArr.forEach((item) =>  {
                let resultItemCont = document.createElement('div')
                let resultItem = document.createElement('li')
                let resultItemImage = document.createElement('img')
                let resultItemDetails = document.createElement('div')
                let resultItemP = document.createElement('p')
                resultItemImage.src = require(`../../images/${item.category}/mobile/${item.imageTag}.webp`)
                if(!item.strength) {
                    resultItemDetails.innerHTML = 
                    `<p style='font-weight: bold'>${item.name}</p>
                    <p>${item.quantity}</p>
                    <p>$${item.price}</p>`
                }
                else if(item.quantity && item.strength) {
                    resultItemDetails.innerHTML = 
                    `<p style='font-weight: bold'>${item.name}</p>
                    <p>${item.quantity}/${item.strength}</p>
                    <p>$${item.price}</p>`
                }
                resultItemCont.onclick = () => {
                    setTimeout(() => {
                    setSelectedProductToShow(item);
                    navigate(`/product/${item.name}`);
                    }, 300)
                }
                resultItemCont.classList.add('search-results-list-container')
                resultItemDetails.classList.add('search-result-details-mobile')
                resultItemP.innerText = `${item.name}`
                resultsList.appendChild(resultItemCont)
                resultItemCont.appendChild(resultItem)
                resultItem.appendChild(resultItemDetails)
                resultItem.appendChild(resultItemImage)
            })
        }
    }
    function deleteSearchInput (deviceType:string) {
        if(deviceType === 'desktop') {
            let desktopSearchInput:HTMLInputElement = document.querySelector('div.search-bar > input')!;
            if(desktopSearchInput.value !== '') {
                desktopSearchInput.value = ''
                searchResultsAnim('desktop', 'end')
            }
        }
        else if(deviceType === 'mobile') {
        let mobileSearchInput:HTMLInputElement = document.querySelector('div.mobile-search-bar > input')!;
            if(mobileSearchInput.value !== '') {
                mobileSearchInput.value = ''
                searchResultsAnim('mobile', 'end')
            }
        }
    }

    return(
        <nav>
            <div className='nav-upper'>
                <div className='logo-cont' onClick={() => window.scrollTo(0, 0)}>
                    <Link to={'/'}>
                        <p className='logo'>Liquid</p>
                    </Link>
                </div>
                <div className="nav-utilities">
                    <div className='search-bar-container'>
                        <div className='search-bar'>
                            <input
                            onChange={() => searchFunc('desktop')} 
                            type="text" placeholder='Search for a product'/>
                            <p style={{'cursor': 'pointer', 'justifySelf': 'flex-end'}} onClick={() => deleteSearchInput('desktop')}>X</p>
                        </div>
                        <div className='search-results-container animate__faster animate__animated'>
                            <ul className='search-results-list'>
                            </ul>
                        </div>
                    </div>
                    <div className='nav-icon-container'>
                        <span onClick={
                            () => {
                                let favoritesDiv:HTMLElement = document.querySelector('div.favorites-preview-container')!;
                                let accountDiv:HTMLElement = document.querySelector('div.account-preview-container')!;
                                if(favoritesDiv.style.display === 'flex') {
                                    hideMobileElement(favoritesDiv, 'animate__fadeOutRight')
                                }
                                else {
                                    hideMobileElement(accountDiv, 'animate__fadeOutRight')
                                    showMobileElement(favoritesDiv, 'animate__fadeInRight')
                                }
                            }
                        } className='material-symbols-outlined nav-icon'>favorite</span>
                        <div className='nav-icon-counter'>98</div>
                    </div>
                    <div className='nav-icon-container'>
                        <span onClick={
                            () => {
                                let favoritesDiv:HTMLElement = document.querySelector('div.favorites-preview-container')!;
                                let accountDiv:HTMLElement = document.querySelector('div.account-preview-container')!;
                                if(accountDiv.style.display === 'flex') {
                                    hideMobileElement(accountDiv, 'animate__fadeOutRight')
                                }
                                else {
                                    hideMobileElement(favoritesDiv, 'animate__fadeOutRight')
                                    showMobileElement(accountDiv, 'animate__fadeInRight')
                                }
                            }
                        } className='material-symbols-outlined nav-icon'>account_circle</span>
                    </div>
                    <div className='nav-icon-container'>
                        <span className="material-symbols-outlined nav-icon">shopping_bag</span>
                        <div className='nav-icon-counter'>98</div>
                    </div>
                </div>
                {FavCont()}
                {AuthCont()}
            </div>
            {deviceType === 'mobile' && 
            <>
                <div className='nav-lower-mobile'>
                    <div className='nav-mobile-menu'>
                        <span onClick={() => {
                            let categories:HTMLElement = document.querySelector('div.nav-mobile-categs')!;
                            let searchCont:HTMLElement = document.querySelector('div.nav-mobile-search-cont')!;
                            if(searchCont.classList.contains('in-transition')) return;
                            if(alreadyOpenedSearch.current) hideMobileElement(searchCont, 'animate__fadeOutUp')
                            if(categories.style.display !== 'flex') {
                                showMobileElement(categories, 'animate__fadeInLeft')
                                alreadyOpenedCateg.current = true;
                            }
                            else {
                                hideMobileElement(categories, 'animate__fadeOutLeft')
                                alreadyOpenedCateg.current = false;
                            }
                            }} className="material-symbols-outlined">menu</span>
                        <p>Products</p>
                    </div>
                    <div className='nav-mobile-utilities'>
                        <span onClick={() => {
                            let categories:HTMLElement = document.querySelector('div.nav-mobile-categs')!;
                            let searchCont:HTMLElement = document.querySelector('div.nav-mobile-search-cont')!;
                            if(categories.classList.contains('in-transition')) return;
                            if(alreadyOpenedCateg.current) hideMobileElement(categories, 'animate__fadeOutLeft')
                            if(searchCont.style.display !== 'flex') {
                                showMobileElement(searchCont, 'animate__fadeInDown')
                                alreadyOpenedSearch.current = true;
                            }
                            else {
                                hideMobileElement(searchCont, 'animate__fadeOutUp')
                                alreadyOpenedSearch.current = false;
                            }
                        }} className='material-symbols-outlined search-icon-mobile'>search</span>
                    </div>
                </div>
                <div className='nav-mobile-search-cont animate__animated'>
                    <div className='mobile-search-bar'>
                        <input
                        onChange= {() => searchFunc('mobile')} 
                        type="text" placeholder='Search'/>
                        <div 
                        onClick={() => {deleteSearchInput('mobile')}}
                        className='mobile-menu-delete'>X</div>
                    </div>
                    <div className='mobile-search-results animate__faster animate__animated'>
                        <ul className='search-results-list'>
                            
                        </ul>
                    </div>
                </div>
                <div className='nav-mobile-categs animate__animated'>
                    <ul className='nav-mobile-primary-categ animate__animated'>
                        <div className='primary-categ-item'
                        onClick={() => {
                            setSelectedMainCategory('spirits')
                            switchMenus('primary', 'secondary')
                        }}
                        >
                            <li>
                                <img src={require('../../images/Whisky/mobile/jack-honey.webp')} alt="" />
                                <p>Spirits</p>
                            </li>
                        </div>
                        <div className='primary-categ-item'
                        onClick={() => {
                            setSelectedMainCategory('wines')
                            switchMenus('primary', 'secondary')
                        }}
                        >
                            <li>
                                <img src={require('../../images/Red-Wine/mobile/samtrot-spatlese.webp')} alt="" />
                                <p>Wine</p>
                            </li>
                        </div>
                        <Link
                            to='/category/Champagne'
                            onClick={() => {
                                filterHandler('Champagne')
                                switchMenus('secondary', 'primary')
                                hideMobileElement(document.querySelector('div.nav-mobile-categs')!, 'animate__fadeOutLeft')
                            }}
                            className='primary-categ-item'
                        >
                            <li>
                                <img src={require('../../images/Champagne/mobile/ferrari.webp')} alt="" />
                                <p>Champagne</p>
                            </li>
                        </Link>
                        <div className='primary-categ-item'
                        onClick={() => {
                            setSelectedMainCategory('others')
                            switchMenus('primary', 'secondary')
                        }}
                        >
                            <li>
                                <img src={require('../../images/Beer/mobile/desperados.webp')} alt="" />
                                <p>Others</p>
                            </li>
                        </div>
                        <Link
                            to='/category/GiftCards'
                            onClick={() => {
                                filterHandler('Gift-Card')
                                switchMenus('secondary', 'primary')
                                hideMobileElement(document.querySelector('div.nav-mobile-categs')!, 'animate__fadeOutLeft')
                            }}
                            className='primary-categ-item'
                        >
                            <li>
                                <img src={require('../../images/Gift-Card/mobile/100off.webp')} alt="" />
                                <p>Gift Cards</p>
                            </li>
                        </Link>
                    </ul>
                    <ul className='nav-mobile-secondary-categ animate__animated' style={{display: 'none'}}>
                        <div className='second-categ-list-back' onClick={() => switchMenus('secondary', 'primary')}>
                            <span className="material-symbols-outlined">
                                arrow_back
                            </span>Back
                        </div>
                        {secondaryMenu()}
                    </ul>
                </div>
            </>
            }
            {deviceType === 'desktop' &&
            <div className='nav-lower-desktop'>
                <div className='primary-categ'>
                    <ul>
                        <div className='primary-categ-item' onClick={() => {
                            setSelectedMainCategory('spirits');
                            }}>
                            <li>
                                <p>Spirits</p>
                            </li>
                        </div>
                        <div className='primary-categ-item' onClick={() => {
                            setSelectedMainCategory('wines')
                            }}>
                            <li>
                                <p>Wine</p>
                            </li>
                        </div>
                        <Link
                            to={`/category/Champagne`}
                            onClick={() => filterHandler('Champagne')}
                            className='primary-categ-item'
                        >
                            <div>
                                <li>
                                    <p>Champagne</p>
                                </li>
                            </div>
                        </Link>
                        <div className='primary-categ-item' onClick={() => {
                            setSelectedMainCategory('others')
                            }}>
                            <li>
                                <p>Others</p>
                            </li>
                        </div>
                        <Link
                            to={`/category/Gift-Cards`}
                            onClick={() => filterHandler('Gift-Card')}
                            className='primary-categ-item'
                        >
                            <div>
                                <li>
                                    <p>Gift Cards</p>
                                </li>
                            </div>
                        </Link>
                    </ul>
                </div>
                <div className='second-categ'>
                    <ul className='second-categ-list'>
                        {secondaryMenu()}
                    </ul>
                </div>
            </div>
            }
        </nav>
    )
}

export default Nav