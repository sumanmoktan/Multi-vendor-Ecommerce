import React from 'react'
import Header from '../component/Layout/Header'
import EventCard from '../component/Event/EventCard'

const EventPage = () => {
  return (
    <div>
        <Header activeHeading={4}/>
        <EventCard active={true}/>
        <EventCard active={true}/>
    </div>
  )
}

export default EventPage