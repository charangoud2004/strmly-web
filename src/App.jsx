import { useEffect, useRef, useState } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import BottomNav from "./components/BottomNav";
import VideoCard from "./components/videoCard";
import ProfilePage from "./components/ProfilePage";
import videosData from "./data/videos";
import Login from "./screens/Login";
import "./App.css";

function VideoFeed() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState(localStorage.getItem("userId"));
  const [page, setPage] = useState(1);
  const pageSize = 2;
  const containerRef = useRef();

  useEffect(() => {
    if (!userId) return;

    const fetchVideos = () => {
      setLoading(true);
      setError(null);

      setTimeout(() => {
        const start = (page - 1) * pageSize;
        const end = start + pageSize;
        const newVideos = videosData.slice(start, end);

        if (newVideos.length === 0) {
          setLoading(false);
          return;
        }

        setVideos((prev) => [...prev, ...newVideos]);
        setLoading(false);
      }, 1000);
    };

    fetchVideos();
  }, [page, userId]);

  useEffect(() => {
    const container = containerRef.current;

    const handleScroll = () => {
      if (
        container.scrollTop + container.clientHeight >=
        container.scrollHeight - 10
      ) {
        setPage((prev) => prev + 1);
      }
    };

    if (container) {
      container.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (container) {
        container.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  if (!userId) return <Login onLogin={setUserId} />;

  if (error) {
    return (
      <div className="error-screen">
        {error}
      </div>
    );
  }

  return (
    <div className="app-container">
      <div className="sidebar left-sidebar"></div>
      
      <div
        ref={containerRef}
        className="main-content"
      >
        {videos.map((video) => (
          <div key={video.id} className="video-container">
            <VideoCard video={video} />
          </div>
        ))}

        {loading && (
          <div className="loading-indicator">Loading more videos...</div>
        )}
      </div>
      
      <div className="sidebar right-sidebar"></div>
      
      <BottomNav />
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<VideoFeed />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </Router>
  );
}

export default App;