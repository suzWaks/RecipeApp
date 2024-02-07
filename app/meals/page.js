import { getMeals } from '@/Lib/meals';
import MealsGrid from '../components/Meals/meals-grid';
import styles from './page.module.css';
import Link from 'next/link'
import { Suspense } from 'react';

async function Meals() {    //Outsource data fetching as a separate component
    const meals = await getMeals(); //No need of useEffect in Nextjs
    return <MealsGrid meals={meals} />
}

export default function MealsPage() {

    return (
        <>
            <header className={styles.header}>
                <h1>
                    Delicious meals created {' '}
                    <span className={styles.highlight}>by you</span>
                </h1>
                <p>
                    Choose your favourite recipe and cook it yourself. It is easy and fun
                </p>
                <p className={styles.cta}>
                    <Link href="/meals/share">
                        Share your favourite recipe
                    </Link>
                </p>
            </header>
            <main className={styles.main}>
                <Suspense fallback={<p className={styles.loading}>Fetching meals...</p>}><Meals /></Suspense> {/*Suspense is a  React component that delays rendering its child components until the required data is loaded*/}
            </main>
        </>
    )
}
