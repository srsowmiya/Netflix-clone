import React from "react";
import Navbar from "./Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { CiCircleInfo } from "react-icons/ci";
import TitleCard from "./TitleCard";
import Footer from "./Footer";
import { Link } from "react-router-dom";
import MoodRecommender from  "./MoodREcommender"   

const Home = () => {
  return (
    <>
      <div className="">
        <Navbar />

        {/* HERO SECTION */}
        <div className="hero relative">
          <img
            src="/homeScreentesting1.jpg"
            alt=""
            className="h-screen object-cover w-full"
          />

          <div className="absolute bottom-10 left-10 flex flex-col items-start max-w-[600px]">
            <img src="/text-home.png" alt="" className="w-100 mb-4" />

            <p className="font-medium mb-4 text-white">
              A shy high school girl’s secret love letters are accidentally sent
              to her past crushes. Chaos turns into unexpected romance when one
              of them proposes a fake relationship.
            </p>

            {/* Buttons */}
            <div className="flex flex-row gap-3 ">
              <Link
                to="/player/550"
                className="flex flex-row items-center justify-center gap-2 h-10 px-4 w-32 bg-white rounded hover:bg-gray-200"
              >
                <FontAwesomeIcon icon={faPlay} className="text-black text-xl" />
                <p className="text-black font-medium leading-none">Play</p>
              </Link>

              <div className="flex flex-row items-center justify-center gap-2 px-4 py-2 w-32 bg-white/30 rounded text-black hover:bg-white/20">
                <CiCircleInfo className="text-xl text-white" strokeWidth={3} />
                <p className="capitalize font-medium leading-none text-white">
                  More Info
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ⭐ AI MOOD-BASED RECOMMENDER SECTION */}
        <div className="mt-10 px-10">
          <MoodRecommender />
        </div>

        {/* Movie Sections */}
        <TitleCard
          name="Popular on Netflix"
          url="https://api.themoviedb.org/3/movie/popular?language=en-US&page=1"
        />
        <TitleCard
          name="Now Playing"
          url="https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1"
        />
        <TitleCard
          name="Top Rated"
          url="https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1"
        />
        <TitleCard
          name="Upcoming"
          url="https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1"
        />

        <Footer />
      </div>
    </>
  );
};

export default Home;
