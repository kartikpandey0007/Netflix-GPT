import React from "react";

const VideoTitle = ({ title, overview }) => {
  return (
    <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center px-12 text-white bg-gradient-to-r from-black/40 via-black/20 to-transparent">
      <h1 className="text-5xl font-extrabold drop-shadow-lg">{title}</h1>

      <p className="py-6 text-lg max-w-xl leading-relaxed text-gray-200 drop-shadow-md">
        {overview}
      </p>

      <div className="flex gap-4">
        <button className="bg-white text-black font-bold px-8 py-3 rounded-md hover:bg-gray-200 transition">
          ▶ Play
        </button>
        <button className="bg-gray-500/70 text-white font-bold px-8 py-3 rounded-md hover:bg-gray-500/60 transition">
          ℹ More Info
        </button>
      </div>
    </div>
  );
};

export default VideoTitle; 