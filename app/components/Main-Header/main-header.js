import Link from 'next/link'
import logoImg from '@/assets/logo.png'
import styles from '@/app//styles/Main-Header/main-header.module.css'
import Image from 'next/image'
import MainHeaderBackground from './main-header-bg'
import NavLink from './nav-link'

export default function MainHeader() {

    return (
        <>
            <MainHeaderBackground />
            <header className={styles.header}>
                <Link className={styles.logo} href='/'>
                    <Image src={logoImg} alt='a plate with food' priority />
                    NextLevel Food
                </Link>

                <nav className={styles.nav}>
                    <ul>
                        <li>
                            <NavLink href='/meals'>Browse meals</NavLink>
                        </li>
                        <li>
                            <NavLink href='/community'>Foodies community</NavLink>
                        </li>
                    </ul>
                </nav>
            </header>
        </>

    )
}
