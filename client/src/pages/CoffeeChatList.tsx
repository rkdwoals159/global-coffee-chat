import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./CoffeeChatList.css";

interface CoffeeChat {
  id: string;
  title: string;
  host: string;
  country: string;
  city: string;
  job: string;
  company: string;
  experience: string;
  date: string;
  time: string;
  maxParticipants: number;
  currentParticipants: number;
  description: string;
  tags: string[];
  status: "open" | "full" | "completed";
}

const CoffeeChatList: React.FC = () => {
  const [coffeeChats, setCoffeeChats] = useState<CoffeeChat[]>([]);
  const [filteredChats, setFilteredChats] = useState<CoffeeChat[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedJob, setSelectedJob] = useState("");

  useEffect(() => {
    fetchCoffeeChats();
  }, []);

  useEffect(() => {
    const filterChats = () => {
      let filtered = coffeeChats;

      if (searchTerm) {
        filtered = filtered.filter(
          (chat) =>
            chat.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            chat.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            chat.host.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }

      if (selectedCountry) {
        filtered = filtered.filter((chat) => chat.country === selectedCountry);
      }

      if (selectedJob) {
        filtered = filtered.filter((chat) =>
          chat.job.toLowerCase().includes(selectedJob.toLowerCase())
        );
      }

      setFilteredChats(filtered);
    };

    filterChats();
  }, [coffeeChats, searchTerm, selectedCountry, selectedJob]);

  const fetchCoffeeChats = async () => {
    try {
      const response = await axios.get(
        "https://tokyo-3j7eqskv3-rkdwoals159s-projects.vercel.app/api/coffee-chats"
      );
      setCoffeeChats(response.data);
      setLoading(false);
    } catch (error) {
      console.error("커피챗을 불러오는데 실패했습니다:", error);
      setLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "open":
        return <span className="status-badge open">모집중</span>;
      case "full":
        return <span className="status-badge full">마감</span>;
      case "completed":
        return <span className="status-badge completed">완료</span>;
      default:
        return null;
    }
  };

  const countries = Array.from(
    new Set(coffeeChats.map((chat) => chat.country))
  );
  const jobs = Array.from(new Set(coffeeChats.map((chat) => chat.job)));

  if (loading) {
    return <div className="loading">로딩 중...</div>;
  }

  return (
    <div className="coffee-chat-list">
      <div className="container">
        <div className="page-header">
          <h1>✈️ 트립챗 커피챗 목록</h1>
          <p>해외에서 성공적으로 취업한 사람들과의 커피챗을 찾아보세요</p>
        </div>

        <div className="filters">
          <div className="search-box">
            <input
              type="text"
              placeholder="제목, 설명, 호스트로 검색..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>

          <div className="filter-options">
            <select
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
              className="filter-select"
            >
              <option value="">모든 국가</option>
              {countries.map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>

            <select
              value={selectedJob}
              onChange={(e) => setSelectedJob(e.target.value)}
              className="filter-select"
            >
              <option value="">모든 직업</option>
              {jobs.map((job) => (
                <option key={job} value={job}>
                  {job}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="coffee-chats-grid">
          {filteredChats.length === 0 ? (
            <div className="no-results">
              <p>검색 결과가 없습니다.</p>
            </div>
          ) : (
            filteredChats.map((chat) => (
              <div key={chat.id} className="coffee-chat-card">
                <div className="card-header">
                  <h3>{chat.title}</h3>
                  {getStatusBadge(chat.status)}
                </div>

                <div className="card-content">
                  <div className="host-info">
                    <span className="host-name">{chat.host}</span>
                    <span className="experience">{chat.experience}</span>
                  </div>

                  <div className="location-info">
                    <span className="country-city">
                      {chat.country} • {chat.city}
                    </span>
                    <span className="company">{chat.company}</span>
                  </div>

                  <p className="description">{chat.description}</p>

                  <div className="tags">
                    {chat.tags.map((tag) => (
                      <span key={tag} className="tag">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="meeting-info">
                    <span className="date-time">
                      {chat.date} {chat.time}
                    </span>
                    <span className="participants">
                      {chat.currentParticipants}/{chat.maxParticipants}명
                    </span>
                  </div>
                </div>

                <div className="card-actions">
                  <Link
                    to={`/coffee-chats/${chat.id}`}
                    className="btn btn-primary"
                  >
                    자세히 보기
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default CoffeeChatList;
