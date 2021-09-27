import classes from './AvailableMeals.module.css';
import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
import axios from 'axios';
import { useEffect, useState } from 'react';

const AvailableMeals = () => {
    const [meals, setMeals] = useState([]);
    const [error, setError] = useState();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchMeals = async () => {
            try {
                const response = await axios.get(
                    'https://food-order-39e0a-default-rtdb.europe-west1.firebasedatabase.app/meals.json'
                );

                const { data } = response;
                const loadedMeals = [];

                for (const key in data) {
                    loadedMeals.push({
                        id: key,
                        name: data[key].name,
                        description: data[key].name,
                        price: data[key].price,
                    });
                }

                setMeals(loadedMeals);
                setIsLoading(false);
            } catch (error) {
                setIsLoading(false);
                setError(error.message);
            }
        };

        fetchMeals();
    }, []);

    const mealsList = meals.map((meal) => (
        <MealItem
            key={meal.id}
            id={meal.id}
            name={meal.name}
            description={meal.description}
            price={meal.price}
        />
    ));

    if (isLoading) {
        return (
            <section className={classes.MealsLoading}>
                <p>Loading...</p>
            </section>
        );
    }

    if (error) {
        return (
            <section className={classes.MealsError}>
                <p>{error}</p>
            </section>
        );
    }

    return (
        <section className={classes.meals}>
            {meals.length > 0 ? (
                <Card>
                    <ul>{mealsList}</ul>
                </Card>
            ) : (
                <section className={classes.MealsLoading}>
                    <p>There is no meal</p>
                </section>
            )}
        </section>
    );
};

export default AvailableMeals;
