import styles from '@/styles/Meals/meals-grid.module.css'
import MealItem from './meal-item'


export default function MealsGrid({ meals }) {
    return (
        <ul className={styles.meals}>
            {meals.map(meal =>
                <li key={meals.id}>
                    <MealItem {...meal} /> {/*use spread operator to get all the values of meals and pass them as key-value pairs as props*/}
                </li>)}
        </ul>
    )
}
