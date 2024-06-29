import React from 'react'
import styles from './home.module.css'
import axios from 'axios';
import { CiLocationOn } from "react-icons/ci";
import { FaArrowRightLong } from "react-icons/fa6";
import { useState } from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';
import UpcomingPart from './UpcomingPart';

const Home = () => {

    //here we have use useRef for finding scroring dtails of div
    const divRef = useRef(null);

    // State to hold horizontal details
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [list, setList] = useState([]);
    const [load,setLoad]=useState(false);
    const PAGE_SIZE = 8;

    //we fetching api data using axois library
    const fetchProducts1 = async () => {
        try {
            const response = await axios.get("https://gg-backend-assignment.azurewebsites.net/api/Events?code=FOX643kbHEAkyPbdd8nwNLkekHcL4z0hzWBGCd64Ur7mAzFuRCHeyQ==&type=reco")
            console.log('respooo', response.data.events);
            setEvents(prev => [...prev, ...response.data.events]);
        }
        catch(error) {
            console.log(error)
        }
    };

    //when we exicute our code that time once render 
    useEffect(() => {
        fetchProducts1();
    }, []);
   
    console.log('eventys', events)
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };
    const formatDistance = (distanceKm) => {
        // Convert distance to a float and round it to two decimal places
        const roundedDistance = Math.floor((distanceKm) / 100);
        return `${roundedDistance} km`;
    };
    
    useEffect(() => {
        setList((prev) => [...prev, ...events.slice(0, PAGE_SIZE)]);
    }, [events, page]);

    const handleScroll = () => {
        if (
            divRef.current.scrollHeight - divRef.current.scrollTop ===
            divRef.current.clientHeight &&
            !loading
        ) {
            setLoading(true);
            setTimeout(() => {
                setPage(page + 1);
                setLoading(false);
            }, 1000); // Simulating loading delay, replace with actual API call
        }
    };
   
    useEffect(()=>{
        if(events.length>0)
        {
            setLoad(true)
        }
    },[events])

    const list1 = list.map((item, index) => {
        const { imgUrl, cityName, eventName, weather, date, distanceKm } = item

        const fileIdMatch = imgUrl.match(/\/file\/d\/([^\/]*)/);
        const fileId = fileIdMatch ? fileIdMatch[1] : null;
        const directImageUrl = fileId ? `https://drive.google.com/thumbnail?id=${fileId}&sz=w1000` : null;

        return ( 
            <>
                <div className={styles.card} >
                    <div className={styles.imgbox} style={{ backgroundImage: `url(${directImageUrl})`, backgroundRepeat: "no-repeat", backgroundSize: "cover" }} >
                        <div className={styles.cardtextmain}>
                            <div className={styles.cardtext}>
                                <div>
                                    <p className={styles.eventtext}>{eventName}</p>
                                    <div className={styles.eventloc}><CiLocationOn color='white' size={15} /> <p className={styles.eventloctext}>{cityName}</p></div>
                                </div>
                                <div>
                                    <p className={styles.eventdate}>{formatDate(date)}</p>
                                    <p className={styles.eventkm}>{`${weather}|${formatDistance(distanceKm)}`}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    })

    // Duplicate the list for infinite scrolling effect


    return (
        <>

            <div >
                <div className={styles.banner}>
                    <div className={styles.textpart}>
                        <h1 className={styles.hedding}>Discover Exciting Events Happening Near You - Stay Tuned for Updates!</h1>
                        <p className={styles.para}>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Est dicta quia nostrum eaque, a expedita error dolorum itaque cumque nihil tempore facere fugit adipisci saepe et inventore? At, ullam voluptatibus.</p>
                    </div>
                    <div className={styles.main}>
                        <div className={styles.recobox}>
                            <div className={styles.arrow}><p className={styles.recoarrow}>Recomended shows</p> <FaArrowRightLong color='white' /></div>
                            <p>See all
                            </p>
                        </div>
                        {load?<><div className={styles.main1} ref={divRef} onScroll={handleScroll}>
                            {list1}
                        </div></>:<><div><h1 className={styles.load}>Loading...</h1></div></>}
                    </div>
                    <UpcomingPart/>
                </div>
                
            </div>

        </>
    )
}

export default Home