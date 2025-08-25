import React, { useRef } from 'react'
import cards from './cards'   
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronRight, faChevronLeft } from "@fortawesome/free-solid-svg-icons"

const TitleCard = (props) => {
  const scrollRef = useRef(null)

  // Scroll helper
  const scroll = (direction) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === "right" ? 300 : -300, // scroll amount
        behavior: "smooth"
      })
    }
  }

  return (
    <div className="section-title bg-transparent relative">
      <h1 className="text-xl font-medium text-white mb-2">
        {props.name}
      </h1>
      <div className="relative">
        <FontAwesomeIcon
          icon={faChevronLeft}
          onClick={() => scroll("left")}
          className="absolute left-2 top-1/2 -translate-y-1/2 
                     text-white text-3xl cursor-pointer z-10 hidden md:block"
        />
        <div
          ref={scrollRef}
          className="flex gap-2 p-4 overflow-x-auto scrollbar-hide w-full scroll-smooth"
        >
          {cards.map((i, index) => (
            <div key={index} className="flex-shrink-0">
              <img 
                src={i.im} 
                alt={i.name} 
                className="h-40 w-60 rounded-lg shadow-md" 
              />
            </div>
          ))}
        </div>

        <FontAwesomeIcon
          icon={faChevronRight}
          onClick={() => scroll("right")}
          className="absolute right-2 top-1/2 -translate-y-1/2 
                     text-white text-3xl cursor-pointer z-10 hidden md:block"
        />
      </div>
    </div>
  )
}

export default TitleCard
