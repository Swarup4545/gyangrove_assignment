import React from 'react'
import styles from './navbar.module.css'
import { IoMdMenu } from "react-icons/io";
import { CiSearch } from "react-icons/ci";
import { Link } from 'react-router-dom';
import { MdFavoriteBorder } from "react-icons/md";
import { FaUser } from "react-icons/fa6";
const Navbar = () => {
    return (
        <>
            <div className={styles.navbar}>
                <div className={styles.logopart}>
                    <p className={styles.logo}>BookUsNow</p>
                    <div className={styles.inpsecptr}>
                        <button className={styles.btnmain}><IoMdMenu className={styles.iomenu} /><span className={styles.btncat}>Categorry</span></button>
                        <input type="text" className={styles.inptop} />

                        <CiSearch className={styles.cisearch} />
                        <MdFavoriteBorder className={styles.fav} />
                        <p>Favorites</p>
                        <button className={styles.inpbtn}><span className={styles.inpsign}>sign in</span></button>
                    </div>
                    <div className={styles.inpsecptr1}>
                    <CiSearch size={25}/>
                    <MdFavoriteBorder size={25}/>
                    <FaUser size={25}/>
                    </div>
                </div>
                <div className={styles.menupart}>
                    <p className={styles.location}>{'Mumbai,indea>'}</p>
                    <ul className={styles.menu}>
                        <li>
                            <Link to='#' className={styles.link}><span className={styles.linkspan}>Live shows</span></Link>
                        </li>
                        <li>
                            <Link to='#' className={styles.link}><span className={styles.linkspan}>Streams</span></Link>
                        </li>
                        <li>
                            <Link to="#" className={styles.link}><span className={styles.linkspan}>Movies</span></Link>
                        </li>
                        <li>
                            <Link to="#" className={styles.link}><span className={styles.linkspan}>Plays</span></Link>
                        </li>
                        <li>
                            <Link to="#" className={styles.link}><span className={styles.linkspan}>Events</span></Link>
                        </li>
                        <li>
                            <Link to="#" className={styles.link}><span className={styles.linkspan}>Sports</span></Link>
                        </li>
                        <li>
                            <Link to="#" className={styles.link}><span className={styles.linkspan}>Activities</span></Link>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    )
}

export default Navbar