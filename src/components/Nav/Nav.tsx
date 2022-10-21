import './Nav.css'

function Nav () {
    return(
        <nav className='bg-black h-1/4'>
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
        </nav>
    )
}

export default Nav