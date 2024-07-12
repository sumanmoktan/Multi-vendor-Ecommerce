import React from "react";
import EventCard from "./EventCard";
import styles from "../../styles/Style";
import { useSelector } from "react-redux";

const Event = () => {
  const { allEvents, isLoading } = useSelector((state) => state.events);
  return (
    <div>
      {!isLoading && (
        <div className={`${styles.section}`}>
          <div className={`${styles.heading}`}>
            <h1>Popular Events</h1>
          </div>
          <div className="w-full gird">
            <EventCard data={allEvents && allEvents[0]} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Event;
