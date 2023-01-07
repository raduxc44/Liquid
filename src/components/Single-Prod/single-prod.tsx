import './single-prod.css'
import * as MaterialIcon from '@mui/icons-material'
import * as Material from '@mui/material'
import { palette } from '@mui/system'


function SingleProd (
    // selectedProduct Prop

) {
    function renderRating () {
        
    }

    return(
        <div className='product-wrapper-cont'>
            <div className='product-container-wrapper'>
                <div className='product-container'>
                    {/* Product name  + quantity */}
                    <div className='product-title'>
                        <h1>Jack Daniel's Standard</h1>
                        {/*Product details*/}
                        <p>Whisky 0.7L / 40%</p>
                    </div>
                    <div className='product-photo-cont'>
                        <img src={require('../../images/Whisky/desktop/jack-standard.webp')} alt="Jack Daniel's Standard" />
                    </div>
                </div>
                <div className='product-details-container'>
                    <div className='rating-price-cont'>
                        <div className='rating-cont'>
                            <div className='rating'>
                                <Material.Rating name="half-rating" defaultValue={4.5} sx={{color: 'black'}} precision={0.5} />
                            </div>
                            <p>0 Reviews for this product</p>
                            <p className='price-cont'>$15</p>
                            <div className='stock'>
                                <span className="material-symbols-outlined">check_circle</span>
                                <p>In stock</p>
                            </div>
                        </div>
                        
                        <div className='buy-cont'>
                            <Material.TextField 
                            type="tel"
                            id="buying-quantity"
                            variant="standard"
                            defaultValue={1}
                            InputProps={{
                                disableUnderline: true,
                            }}
                            sx= {{
                                aspectRatio: "1 / 1",
                                display: "flex",
                                placeContent: "center",
                                height: "4.5dvh",
                                input: { 
                                    color: 'white',
                                    aspectRatio: "1 / 1", 
                                    textAlign: "center",
                                },
                                borderRadius: '5px',
                                background: 'black', 
                                }}
                            />
                            <Material.Button 
                                variant="contained" sx={{color: 'white', background:'black'}} startIcon={<MaterialIcon.AddShoppingCartRounded/>}>
                                Add to Cart
                            </Material.Button>
                        </div>
                    </div>
                    <div className='details-cont'>
                        <div className='product-details'>
                        <div className='product-detail'>
                            <p className='detail-categ'>Category</p>
                            <p className='detail-value'>Whisky</p>
                        </div>
                        <div className='product-detail'>
                            <p className='detail-categ'>Size</p>
                            <p className='detail-value'>0.7L</p>
                        </div>
                        <div className='product-detail'>
                            <p className='detail-categ'>Strength</p>
                            <p className='detail-value'>40%</p>
                        </div>
                        <div className='product-detail'>
                            <p className='detail-categ'>Origin Country</p>
                            <p className='detail-value'>USA</p>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default SingleProd