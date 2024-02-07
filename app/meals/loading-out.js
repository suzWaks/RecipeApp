import styles from '@/styles/loading.module.css'

export default function mealsLoading() {
    return (
        <p className={styles.loading}>Fetching meals...</p>
    )
}
