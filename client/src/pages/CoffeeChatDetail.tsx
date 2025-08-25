import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./CoffeeChatDetail.css";

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

const CoffeeChatDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [coffeeChat, setCoffeeChat] = useState<CoffeeChat | null>(null);
  const [loading, setLoading] = useState(true);
  const [joining, setJoining] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (id) {
      const fetchCoffeeChatDetail = async () => {
        try {
          const response = await axios.get(
            `https://tokyo-3j7eqskv3-rkdwoals159s-projects.vercel.app/api/coffee-chats/${id}`
          );
          setCoffeeChat(response.data);
          setLoading(false);
        } catch (error) {
          console.error("커피챗 상세 정보를 불러오는데 실패했습니다:", error);
          setLoading(false);
        }
      };
      
      fetchCoffeeChatDetail();
    }
  }, [id]);

  const handleJoin = async () => {
    if (!coffeeChat) return;

    setJoining(true);
    try {
      const response = await axios.post(
        `https://tokyo-3j7eqskv3-rkdwoals159s-projects.vercel.app/api/coffee-chats/${id}/join`
      );
      setCoffeeChat(response.data);
      setMessage("성공적으로 참여했습니다!");
      setTimeout(() => setMessage(""), 3000);
    } catch (error: any) {
      setMessage(error.response?.data?.message || "참여에 실패했습니다.");
      setTimeout(() => setMessage(""), 3000);
    } finally {
      setJoining(false);
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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      weekday: "long",
    });
  };

  if (loading) {
    return <div className="loading">로딩 중...</div>;
  }

  if (!coffeeChat) {
    return <div className="error">커피챗을 찾을 수 없습니다.</div>;
  }

  return (
    <div className="coffee-chat-detail">
      <div className="container">
        <div className="back-button">
          <button
            onClick={() => navigate("/coffee-chats")}
            className="btn btn-secondary"
          >
            ← 목록으로 돌아가기
          </button>
        </div>

        <div className="detail-card">
          <div className="card-header">
            <div className="header-content">
              <h1>{coffeeChat.title}</h1>
              {getStatusBadge(coffeeChat.status)}
            </div>
          </div>

          <div className="card-body">
            <div className="main-info">
              <div className="host-section">
                <h3>호스트 정보</h3>
                <div className="host-details">
                  <div className="host-item">
                    <span className="label">이름:</span>
                    <span className="value">{coffeeChat.host}</span>
                  </div>
                  <div className="host-item">
                    <span className="label">직업:</span>
                    <span className="value">{coffeeChat.job}</span>
                  </div>
                  <div className="host-item">
                    <span className="label">회사:</span>
                    <span className="value">{coffeeChat.company}</span>
                  </div>
                  <div className="host-item">
                    <span className="label">경력:</span>
                    <span className="value">{coffeeChat.experience}</span>
                  </div>
                </div>
              </div>

              <div className="location-section">
                <h3>위치</h3>
                <div className="location-details">
                  <div className="location-item">
                    <span className="country">{coffeeChat.country}</span>
                    <span className="city">{coffeeChat.city}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="meeting-section">
              <h3>미팅 정보</h3>
              <div className="meeting-details">
                <div className="meeting-item">
                  <span className="label">날짜:</span>
                  <span className="value">{formatDate(coffeeChat.date)}</span>
                </div>
                <div className="meeting-item">
                  <span className="label">시간:</span>
                  <span className="value">{coffeeChat.time}</span>
                </div>
                <div className="meeting-item">
                  <span className="label">참여 인원:</span>
                  <span className="value">
                    {coffeeChat.currentParticipants}/
                    {coffeeChat.maxParticipants}명
                  </span>
                </div>
              </div>
            </div>

            <div className="description-section">
              <h3>상세 설명</h3>
              <p>{coffeeChat.description}</p>
            </div>

            <div className="tags-section">
              <h3>태그</h3>
              <div className="tags">
                {coffeeChat.tags.map((tag) => (
                  <span key={tag} className="tag">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {message && <div className="message">{message}</div>}

            <div className="actions">
              {coffeeChat.status === "open" && (
                <button
                  onClick={handleJoin}
                  disabled={joining}
                  className="btn btn-primary"
                >
                  {joining ? "참여 중..." : "커피챗 참여하기"}
                </button>
              )}

              {coffeeChat.status === "full" && (
                <div className="full-message">
                  <p>이 커피챗은 참여 인원이 가득 찼습니다.</p>
                </div>
              )}

              {coffeeChat.status === "completed" && (
                <div className="completed-message">
                  <p>이 커피챗은 이미 완료되었습니다.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoffeeChatDetail;
