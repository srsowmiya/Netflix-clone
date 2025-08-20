import React from 'react'
import cards from './cards'   

const TitleCard = () => {
  return (
    <>
      <div className="flex overflow-x-auto gap-2 p-4 scrollbar-hide">
        {cards.map((i, index) => (
          <div key={index} className="flex-shrink-0">
            <img 
              src={i.im} 
              alt={i.name} 
              className="h-60 w-80 rounded-lg"
            />
            <p className="text-center">{i.name}</p>
          </div>
        ))}
      </div>
    </>
  )
}

export default TitleCard
