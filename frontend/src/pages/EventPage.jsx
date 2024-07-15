import React from "react";
import { useSelector } from "react-redux";
import Header from "../component/Layout/Header";
import EventCard from "../component/Event/EventCard";
import Loader from "../component/Layout/Loader";

const EventPage = () => {
  const { allEvents, isLoading } = useSelector((state) => state.events);
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <Header activeHeading={4} />
          <EventCard active={true} data={allEvents && allEvents[0]} />
        </div>
      )}
    </>
  );
};

export default EventPage;
