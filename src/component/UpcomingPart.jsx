import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaArrowRightLong } from "react-icons/fa6";
import { CiLocationOn } from "react-icons/ci";
import styles from './upcoming.module.css';

const UpcomingPart = () => {
  const [events, setEvents] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [load, setLoad] = useState(false);

  const fetchNextPage = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`https://gg-backend-assignment.azurewebsites.net/api/Events?code=FOX643kbHEAkyPbdd8nwNLkekHcL4z0hzWBGCd64Ur7mAzFuRCHeyQ==&page=${page}&type=upcoming`);
      setEvents(prevEvents => [...prevEvents, ...response.data.events]);
      setPage(prevPage => prevPage + 1);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const handleScroll = (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target;
    if (scrollTop + clientHeight >= scrollHeight - 10 && !loading) {
      fetchNextPage();
    }
  };

  useEffect(() => {
    fetchNextPage();
  }, []);

  useEffect(() => {
    if (events.length > 0) {
      setLoad(true);
    }
  }, [events]);

  const formatDistance = (distanceKm) => {
    const roundedDistance = Math.floor(distanceKm / 100);
    return `${roundedDistance} km`;
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const list = events.map((item, index) => {
    const { cityName, date, distanceKm, eventName, imgUrl, weather } = item;
    const fileIdMatch = imgUrl.match(/\/file\/d\/([^\/]*)/);
    const fileId = fileIdMatch ? fileIdMatch[1] : null;
    const directImageUrl = fileId ? `https://drive.google.com/thumbnail?id=${fileId}&sz=w1000` : null;

    return (
      <div key={index} className={styles.card}>
        <div className={styles.imgbox} style={{ backgroundImage: `url(${directImageUrl})`, backgroundRepeat: "no-repeat", backgroundSize: "cover" }}>
          <div className={styles.datebox}>
            <p className={styles.date}>{formatDate(date)}</p>
          </div>
        </div>
        <div>
          <div className={styles.eventtext}>
            <div>
              <p className={styles.eventName}>{eventName}</p>
            </div>
            <div className={styles.eventloc}>
              <div className={styles.location}>
                <CiLocationOn size={15} />
                <p className={styles.eventloctext}>{cityName}</p>
              </div>
              <p className={styles.eventkm}>{`${weather} | ${formatDistance(distanceKm)}`}</p>
            </div>
          </div>
        </div>
      </div>
    );
  });

  return (
    <div>
      {load ? (
        <div className={styles.arrow}>
          <div className={styles.recoarrow}>
            <p className={styles.uptag}>Upcoming events</p>
            <FaArrowRightLong color='black' />
          </div>
          <div className={styles.main} onScroll={handleScroll}>
            {list}
            {loading && <div className={styles.spinner}>Loading...</div>}
          </div>
        </div>
      ) : (
        <div>
          <h1 className={styles.load}>Loading...</h1>
        </div>
      )}
    </div>
  );
}

export default UpcomingPart;