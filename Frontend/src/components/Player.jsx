import React from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useParams, useNavigate } from "react-router-dom";

const Player = () => {
  const { videoId } = useParams();
  const navigate = useNavigate();

  if (!videoId) {
    return (
      <div className="h-screen bg-black text-white flex items-center justify-center">
        <p>Video not found</p>
      </div>
    );
  }

  return (
    <div className="h-screen bg-black relative">
      {/* Back Button */}
      <IoMdArrowRoundBack
        onClick={() => navigate(-1)}
        className="absolute top-4 left-4 text-4xl text-white cursor-pointer z-10 hover:scale-110 transition"
      />

      {/* YouTube Player */}
      <iframe
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
        title="YouTube Player"
        allow="autoplay; encrypted-media"
        allowFullScreen
        className="w-full h-full"
      />
    </div>
  );
};

export default Player;
