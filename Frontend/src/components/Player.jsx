import React from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useParams, useNavigate } from "react-router-dom";

const Player = () => {
  const { videoId } = useParams();
  const navigate = useNavigate();

  return (
    <div className="h-screen bg-black relative">
      {/* Back button */}
      <IoMdArrowRoundBack
        className="absolute top-5 left-5 text-white text-4xl cursor-pointer z-10 hover:scale-110 transition"
        onClick={() => navigate(-1)}
      />

      {/* Player */}
      <iframe
        className="w-full h-full"
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&rel=0&modestbranding=1&playsinline=1&origin=${window.location.origin}`}
        title="YouTube player"
        allow="autoplay; encrypted-media"
        allowFullScreen
      />
    </div>
  );
};

export default Player;
