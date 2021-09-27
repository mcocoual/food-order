import classes from './MealItem.module.css';
import MealItemForm from './MealItemForm';
import { useContext } from 'react';
import CartContext from '../../../store/cart-context';

const MealItem = ({ id, name, description, price }) => {
    const cartCtx = useContext(CartContext);
    const priceFormated = `$${price.toFixed(2)}`;

    const addToCartHandler = (amount) => {
        cartCtx.addItem({
            id: id,
            name: name,
            amount: amount,
            price: price,
        });
    };

    return (
        <li className={classes.meal}>
            <div>
                <h3>{name}</h3>
                <div className={classes.description}>{description}</div>
                <div className={classes.price}>{priceFormated}</div>
            </div>

            <div>
                <MealItemForm onAddToCart={addToCartHandler} id={id} />
            </div>
        </li>
    );
};

export default MealItem;
