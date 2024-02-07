import Link from 'next/link';
import Image from 'next/image';

import styles from '@/styles/Meals/meal-item.module.css';

export default function MealItem({ title, slug, image, summary, creator }) {
    return (
        <article className={styles.meal}>
            <header>
                <div className={styles.image}>
                    <Image src={`https://suzal-udemy-nextjs-recipeapp.s3.amazonaws.com/${image}`} alt={title} fill /> {/*use fill property to set the width and height of the images fetched dynamically*/}
                </div>
                <div className={styles.headerText}>
                    <h2>{title}</h2>
                    <p>by {creator}</p>
                </div>
            </header>
            <div className={styles.content}>
                <p className={styles.summary}>{summary}</p>
                <div className={styles.actions}>
                    <Link href={`/meals/${slug}`}>View Details</Link>
                </div>
            </div>
        </article>
    );
}