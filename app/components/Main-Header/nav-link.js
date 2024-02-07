'use client';

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import styles from '@/app//styles/Main-Header/nav-link.module.css'


export default function NavLink({ href, children }) {

    const path = usePathname(); //Gives the currently active path
    return (
        <Link href={href} className={path.startsWith(href) ? `${styles.link} ${styles.active}` : styles.link}>{children}</Link>
    )
}
