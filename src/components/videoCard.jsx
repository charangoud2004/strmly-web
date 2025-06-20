import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./VideoCard.css";

const VideoCard = ({ video }) => {
  const videoRef = useRef(null);
  const [muted, setMuted] = useState(true);
  const [playing, setPlaying] = useState(true);
  const [isFollowing, setIsFollowing] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const navigate = useNavigate();

  const togglePlay = () => {
    if (videoRef.current.paused) {
      videoRef.current.play();
      setPlaying(true);
    } else {
      videoRef.current.pause();
      setPlaying(false);
    }
  };

  const toggleMute = () => {
    setMuted((prev) => !prev);
    videoRef.current.muted = !videoRef.current.muted;
  };

  const toggleFollow = () => setIsFollowing((prev) => !prev);

  const handleProfileClick = (e) => {
    e.stopPropagation(); // Prevent triggering video play/pause
    navigate('/profile', { state: { user: video.userName } });
  };

  return (
    <div className="video-card-container">
      <video
        ref={videoRef}
        src={video.videoUrl}
        className="video-element"
        autoPlay
        loop
        muted={muted}
        onClick={togglePlay}
      />

      {/* Video overlay content */}
      <div className="video-overlay">
        {/* Left side content */}
        <div className="left-content">
          <p className="hashtag">#{video.hashtag}</p>
          <div className="user-info">
            <img src={video.userImage} className="user-avatar" />
            <button 
              onClick={handleProfileClick}
              className="username-button"
            >
              <span className="username">{video.userName}</span>
            </button>
            <button
              onClick={toggleFollow}
              className={`follow-button ${isFollowing ? "following" : ""}`}
            >
              {isFollowing ? "Following" : "Follow"}
            </button>
          </div>
          <p className="video-title">{video.title}</p>
          <p className="video-description">{video.description}</p>
        </div>

        {/* Right side stats */}
        <div className="right-stats">
          <div className="stat-item">
            <button
              onClick={() => setIsLiked(!isLiked)}
              className="focus:outline-none"
            >
              <span
                className={`icon ${isLiked ? "text-red-500" : "text-white"}`}
              >
                {isLiked ? "❤️" : "🤍"}
              </span>
            </button>
          </div>
          <div className="stat-item">
            <span className="icon">💬</span>
            <span>{video.comments}</span>
          </div>
          <div className="stat-item">
            <span className="icon">🔁</span>
            <span>{video.shares}</span>
          </div>
          <div className="stat-item">
            <span className="icon">💰</span>
            <span>{video.earnings}</span>
          </div>
          <div className="icon">⋮</div>
        </div>

        {/* Mute button */}
        <button onClick={toggleMute} className="mute-button">
          {muted ? "🔇" : "🔊"}
        </button>
      </div>
    </div>
  );
};

export default VideoCard;