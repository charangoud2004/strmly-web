import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./VideoCard.css";

const VideoCard = ({ video }) => {
  const videoRef = useRef(null);
  const navigate = useNavigate();

  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [isFollowing, setIsFollowing] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  // Ensure video starts muted
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = true;
    }
  }, []);

  const handleTap = () => {
    const videoEl = videoRef.current;

    if (!videoEl) return;

    if (videoEl.paused) {
      videoEl.play();
      videoEl.muted = false;
      setIsMuted(false);
      setIsPlaying(true);
    } else {
      videoEl.pause();
      videoEl.muted = true;
      setIsMuted(true);
      setIsPlaying(false);
    }
  };

  const toggleFollow = (e) => {
    e.stopPropagation(); // Prevent video toggle
    setIsFollowing((prev) => !prev);
  };

  const handleProfileClick = (e) => {
    e.stopPropagation();
    navigate("/profile", { state: { user: video.userName } });
  };

  const toggleLike = (e) => {
    e.stopPropagation();
    setIsLiked((prev) => !prev);
  };

  return (
    <div className="video-card-container" onClick={handleTap}>
      <video
        ref={videoRef}
        src={video.videoUrl}
        className="video-element"
        autoPlay
        loop
        playsInline
        muted
      />

      <div className="video-overlay">
        {/* LEFT */}
        <div className="left-content">
          <p className="hashtag">#{video.hashtag}</p>
          <div className="user-info">
            <img src={video.userImage} className="user-avatar" alt="user" />
            <button onClick={handleProfileClick} className="username-button">
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

       
        <div className="right-stats">
          <div className="stat-item">
            <button onClick={toggleLike} className="like-button">
              <span
                style={{ fontSize: "32px", color: isLiked ? "red" : "white" }}
              >
                {isLiked ? "❤️" : "🤍"}
              </span>
            </button>
            <span className="count">{video.likes}</span>
          </div>

          <div className="stat-item">
            <span className="icon">💬</span>
            <span className="count">{video.comments}</span>
          </div>
          <div className="stat-item">
            <span className="icon">🔁</span>
            <span className="count">{video.shares}</span>
          </div>
          <div className="stat-item">
            <span className="icon">💰</span>
            <span className="count">{video.earnings}</span>
          </div>
          <div className="icon">⋮</div>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
