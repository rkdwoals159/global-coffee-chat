import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { coffeeChatAPI } from "../services/api";
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
  status: string;
}

const CoffeeChatList: React.FC = () => {
  const [coffeeChats, setCoffeeChats] = useState<CoffeeChat[]>([]);
  const [filteredChats, setFilteredChats] = useState<CoffeeChat[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedJob, setSelectedJob] = useState("");

  useEffect(() => {
    const fetchCoffeeChats = async () => {
      try {
        setLoading(true);
        const response = await coffeeChatAPI.getAll();
        
        // 응답 데이터 구조 확인 및 안전한 처리
        const data = response.data;
        console.log('API 응답 데이터:', data);
        
        if (Array.isArray(data)) {
          setCoffeeChats(data);
          setFilteredChats(data);
          setError(null);
        } else {
          console.error('API 응답이 배열이 아닙니다:', data);
          setError('API 응답 데이터 형식이 올바르지 않습니다.');
          setCoffeeChats([]);
          setFilteredChats([]);
        }
      } catch (err) {
        setError('커피챗 목록을 불러오는 중 오류가 발생했습니다.');
        console.error('커피챗 목록 조회 오류:', err);
        setCoffeeChats([]);
        setFilteredChats([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCoffeeChats();
  }, []);

  useEffect(() => {
    const filterChats = () => {
      let filtered = coffeeChats;

      // 검색어 필터링
      if (searchTerm) {
        filtered = filtered.filter(
          (chat) =>
            chat.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            chat.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            chat.host.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }

      // 국가 필터링
      if (selectedCountry) {
        filtered = filtered.filter(
          (chat) => chat.country.toLowerCase() === selectedCountry.toLowerCase()
        );
      }

      // 직업 필터링
      if (selectedJob) {
        filtered = filtered.filter((chat) =>
          chat.job.toLowerCase().includes(selectedJob.toLowerCase())
        );
      }

      setFilteredChats(filtered);
    };

    filterChats();
  }, [coffeeChats, searchTerm, selectedCountry, selectedJob]);

  // 고유한 국가와 직업 목록 생성
  const countries = Array.from(
    new Set((coffeeChats || []).map((chat) => chat.country))
  );
  const jobs = Array.from(new Set((coffeeChats || []).map((chat) => chat.job)));

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
        <p>커피챗 목록을 불러오는 중...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error">
        <p>❌ {error}</p>
        <button onClick={() => window.location.reload()}>다시 시도</button>
      </div>
    );
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
            />
          </div>

          <div className="filter-options">
            <select
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
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

        <div className="results-info">
          <p>총 {(filteredChats || []).length}개의 커피챗을 찾았습니다.</p>
        </div>

        <div className="coffee-chats-grid">
          {(filteredChats || []).map((chat) => (
            <div key={chat.id} className="coffee-chat-card">
              <div className="card-header">
                <h3>{chat.title}</h3>
                <span className={`status-badge ${chat.status}`}>
                  {chat.status === "open" ? "모집중" : "마감"}
                </span>
              </div>

              <div className="card-content">
                <div className="host-info">
                  <strong>호스트:</strong> {chat.host} ({chat.experience})
                </div>
                <div className="location-info">
                  <strong>위치:</strong> {chat.country}, {chat.city}
                </div>
                <div className="job-info">
                  <strong>직업:</strong> {chat.job} @ {chat.company}
                </div>
                <div className="meeting-info">
                  <strong>일시:</strong> {chat.date} {chat.time}
                </div>
                <div className="participants-info">
                  <strong>참여자:</strong> {chat.currentParticipants}/
                  {chat.maxParticipants}명
                </div>
                <p className="description">{chat.description}</p>
                <div className="tags">
                  {chat.tags.map((tag) => (
                    <span key={tag} className="tag">
                      {tag}
                    </span>
                  ))}
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
          ))}
        </div>

        {(filteredChats || []).length === 0 && (
          <div className="no-results">
            <p>검색 조건에 맞는 커피챗이 없습니다.</p>
            <p>검색어나 필터를 변경해보세요.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CoffeeChatList;
