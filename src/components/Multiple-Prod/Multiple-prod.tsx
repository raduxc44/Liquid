import './Multiple-prod.css';
import { useContext } from 'react';
import { SelectedFilterContext } from '../../Contexts/selectedFilterContext';
import { SelectedProdContext } from '../../Contexts/selectedProductContext';
import { Item } from '../../data/types';
import { Link } from 'react-router-dom';

export default function MultipleProd () {

    const {selectedFilter} = useContext(SelectedFilterContext);
    const {selectedProductToShow, setSelectedProductToShow} = useContext(SelectedProdContext)

    function handleUserSelection (item: Item) {
        window.scroll(0,0)
        setSelectedProductToShow(item);
        console.log(selectedProductToShow)
    }

    if(selectedFilter.length === 0) return <div></div>
    else 
        return (
            <div className='multiple-prod-wrap'>
                {selectedFilter.map((item, index) => {
                    return (
                        <div key={index} className='multiple-prod-card'>
                            <p style={{fontSize: 24, fontWeight: 600}}>{item.name}</p>
                            <Link
                                to={`/product/${item?.name}`}
                                onClick={() => handleUserSelection(item)}
                            >
                                <img src={require(`../../images/${item.category}/desktop/${item.imageTag}.webp`)} alt=""
                                {...item.category === 'Gift-Card' && {style: {width: 200, height: 150}}}
                                />
                            </Link>
                            <div>
                                {item.category !== 'Gift-Card' && <p>{item.quantity}/{item.strength}</p>}
                                <p>${item.price}</p>
                            </div>
                            <Link
                                to={`/product/${item?.name}`}
                                onClick={() => handleUserSelection(item)}
                            >
                            <div className='rec-card-check check-out-btn'>Check it out</div>
                            </Link>
                        </div>
                    )
                })
                }
            </div>
        )
}