import React, { useState, useEffect } from 'react';
import { IoMdArrowRoundBack } from "react-icons/io";

const Player = () => {
  const [apidata, setApidata] = useState(null);
  

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNzFkMTRiOTA4OWIwYzg0NTg1ODY2NjBkNTg2Nzg3NSIsIm5iZiI6MTc1NjM3NzQ5Ni42NzcsInN1YiI6IjY4YjAzMTk4ZjkwMzYwMDZhYmZhOTc4NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.S7Zg89Y5jmogBFOxfwzt61vpNwvYbC0qONUWRdiISho'
    }
  };

  useEffect(() => {
    fetch('https://api.themoviedb.org/3/movie/550/videos?language=en-US', options)
      .then(response => response.json())
      .then(response => {
        if (response.results && response.results.length > 0) {
          setApidata(response.results[0]); // take the first video
        }
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="h-screen bg-black text-white relative">
      {/* Back Button */}
      <IoMdArrowRoundBack className="h-10 text-4xl absolute top-4 left-4 z-10 cursor-pointer" />

      {/* Responsive YouTube Embed */}
      <div style={{ position: "relative", paddingBottom: "56.25%", height: 0 }}>
        {apidata && (
          <>
            <iframe
              src={`https://www.youtube.com/embed/${apidata.key}?autoplay=1&mute=1`}
              frameBorder="0"
              allowFullScreen
              title={apidata.name}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%"
              }}
            ></iframe>

            {/* Video Info */}
            <div className="mt-4 p-2">
              <p><b>Name:</b> {apidata.name}</p>
              <p><b>Type:</b> {apidata.type}</p>
              <p><b>Published At:</b> {apidata.published_at}</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Player;
