import './single-prod.css'
import * as MaterialIcon from '@mui/icons-material'
import * as Material from '@mui/material'
import { useState } from 'react';

function SingleProd (
    // selectedProduct Prop
) {    

    function QuantityInput() {
        const [quantityValue, setQuantityValue] = useState<number | string>(1);
        const handleIncrement = () => {
            setQuantityValue(prevValue => (prevValue as number) + 1);
        };
        const handleDecrement = () => {
            if(quantityValue > 1) setQuantityValue(prevValue => (prevValue as number) - 1);
        };
        const sideButtonsStyles = {
            background: 'black',
            color: 'goldenrod',
            height: '100%',
            minWidth: '25%',
            maxWidth: '25%',
        };
        const CustomDisableInput = Material.styled(Material.TextField)(() => ({
                ".MuiInputBase-input.Mui-disabled": {
                    WebkitTextFillColor: "gold"
                }
            }));

        return (
        <Material.Box className="quantity-container" 
            sx={{ 
                background: 'black',
                display: "flex",
                placeContent: "center",
                height: {xs: '40%', sm: '40%', md: '50%'},
                width: {xs: '70%', sm: '70%', md: '40%'},
                borderRadius: '15px'
            }}>
            <Material.Button onClick={handleDecrement} style={sideButtonsStyles}>-</Material.Button>
            <CustomDisableInput
                type="text"
                value={quantityValue}
                disabled
                className='QuantityInput'
                sx={{
                    width: '50%',
                    height: '100%',
                    color: 'white',
                    borderLeft: '1px solid goldenrod',
                    borderRight: '1px solid goldenrod',
                }}
                inputProps={{
                    max: 99,
                    min: 0,
                    sx: {
                        width: '100%',
                        height: 'inherit',
                        textAlign: 'center'
                    },
                }}
                InputProps={{   
                    sx: {
                        color: 'white',
                        height: 'inherit',
                        width: '100%',
                    },
                }}
            />
            <Material.Button onClick={handleIncrement} style={sideButtonsStyles}>+</Material.Button>
            </Material.Box>
        )
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
                            {QuantityInput()}
                            <Material.Button
                                variant="contained" 
                                sx={{
                                    background: 'black',
                                    color: 'goldenrod',
                                    height: {xs: '80%', sm: '80%', md: '50%'},
                                    width: {xs: '70%', sm: '70%', md: '40%'},
                                    "&:hover": {
                                        backgroundColor: "black"
                                    }
                                }}
                                startIcon={<MaterialIcon.AddShoppingCartRounded/>}>
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