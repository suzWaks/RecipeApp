import styles from './page.module.css';
import Image from 'next/image';
import { getMeal } from '@/Lib/meals';
import { notFound } from 'next/navigation'

export default function MealDetailsPage({ params }) { //Nextjs return params props which can be destructured to get the slug info
    //params is an object that contains the dynamic route parameters for the current page.
    const meal = getMeal(params.mealSlug);

    if (!meal) {
        notFound(); //Will show the closest not found file defined in the folder structure
    }

    meal.instructions = meal.instructions.replace(/\n/g, '<br/>'); //For proper formatting/ line breaks of the instrictions
    return (
        <>
            <header className={styles.header}>
                <div className={styles.image}>
                    <Image src={`https://suzal-udemy-nextjs-recipeapp.s3.amazonaws.com/${meal.image}`} alt={meal.title} fill />
                </div>
                <div className={styles.headerText}>
                    <h1>{meal.title}</h1>
                    <p className={styles.creator}>
                        by <a href={`mailto: ${meal.creator_email}`}>{meal.creator}</a>
                    </p>
                    <p className={styles.summary}>
                        {meal.summary}
                    </p>
                </div>
            </header>
            <main>
                <p className={styles.instructions} dangerouslySetInnerHTML={{ //Displaying data as plain HTML for formatting purposes
                    __html: meal.instructions,
                }}></p>
            </main>
        </>
    )
}
