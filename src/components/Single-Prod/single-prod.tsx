import './single-prod.css'
import * as MaterialIcon from '@mui/icons-material'
import * as Material from '@mui/material'
import { useContext, useEffect, useState } from 'react';
import { SelectedProdContext } from '../../Contexts/selectedProductContext';
import { UserMethodsContext } from '../../Contexts/userMethodsContext';

function SingleProd () {
    
    const { selectedProductToShow, quantityValue, setQuantityValue} = useContext(SelectedProdContext);
    const { checkIfFavorite, addToFavorites, removeFromFavorites, addToCart } = useContext(UserMethodsContext);
    const [isFavorite, setIsFavorite] = useState(checkIfFavorite(selectedProductToShow!));

    useEffect(() => {
        setIsFavorite(checkIfFavorite(selectedProductToShow!));
    }, [selectedProductToShow, checkIfFavorite]);

    function QuantityInput() {
        
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
    
    if(selectedProductToShow === null) return <div></div>
    else
    return(
        <div className='product-wrapper-cont'>
            <div className='product-container-wrapper'>
                <div className='product-container'>
                    <div className='product-title'>
                        <h1>{selectedProductToShow?.name}</h1>
                        {selectedProductToShow?.category !== 'Gift-Card' &&
                            <p>{selectedProductToShow?.category} / {selectedProductToShow?.quantity} / {selectedProductToShow?.strength}</p>
                        }
                    </div>
                    <div className='product-photo-cont'>
                        <img src={require(`../../images/${selectedProductToShow?.category}/desktop/${selectedProductToShow?.imageTag}.webp`)} alt={selectedProductToShow?.name} />
                    </div>
                </div>
                <div className='product-details-container'>
                    <div className='rating-price-cont'>
                        {
                            isFavorite ?
                            <span className='material-symbols-outlined favorite-active' onClick={() => {removeFromFavorites(selectedProductToShow); setIsFavorite(!isFavorite)}}>favorite</span>
                            :
                            <span className='material-symbols-outlined favorite-inactive' onClick={() => {addToFavorites(selectedProductToShow); setIsFavorite(!isFavorite)}}>favorite</span>
                        }
                        <div className='rating-cont'>
                            <p className='price-cont'>${selectedProductToShow?.price}</p>
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
                                onClick={() => addToCart(selectedProductToShow!, quantityValue)}
                                startIcon={<MaterialIcon.AddShoppingCartRounded/>}>
                                Add to Cart
                            </Material.Button>
                        </div>
                    </div>
                    {selectedProductToShow?.category !== 'Gift-Card' &&
                        <div className='details-cont'>
                        <div className='product-details'>
                        <div className='product-detail'>
                            <p className='detail-categ'>Category</p>
                            <p className='detail-value'>{selectedProductToShow?.category}</p>
                        </div>
                        <div className='product-detail'>
                            <p className='detail-categ'>Size</p>
                            <p className='detail-value'>{selectedProductToShow?.quantity}</p>
                        </div>
                        <div className='product-detail'>
                            <p className='detail-categ'>Strength</p>
                            <p className='detail-value'>{selectedProductToShow?.strength}</p>
                        </div>
                        <div className='product-detail'>
                            <p className='detail-categ'>Origin Country</p>
                            <p className='detail-value'>{selectedProductToShow?.origin}</p>
                        </div>
                        </div>
                    </div>
                    }
                </div>
            </div>
        </div>
    )
}
export default SingleProd