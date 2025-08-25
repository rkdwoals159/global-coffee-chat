import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { coffeeChatAPI } from '../services/api';
import './CoffeeChatDetail.css';

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

const CoffeeChatDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [coffeeChat, setCoffeeChat] = useState<CoffeeChat | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [joining, setJoining] = useState(false);
  const [joinMessage, setJoinMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchCoffeeChatDetail = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        const response = await coffeeChatAPI.getById(id);
        setCoffeeChat(response.data);
        setError(null);
      } catch (err) {
        setError('커피챗 정보를 불러오는 중 오류가 발생했습니다.');
        console.error('커피챗 상세 조회 오류:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCoffeeChatDetail();
  }, [id]);

  const handleJoin = async () => {
    if (!id) return;
    
    try {
      setJoining(true);
      const response = await coffeeChatAPI.join(id);
      setCoffeeChat(response.data);
      setJoinMessage('커피챗에 성공적으로 참여했습니다! 🎉');
      
      // 3초 후 메시지 제거
      setTimeout(() => setJoinMessage(null), 3000);
    } catch (err: any) {
      setJoinMessage(err.response?.data?.message || '참여 중 오류가 발생했습니다.');
      setTimeout(() => setJoinMessage(null), 3000);
    } finally {
      setJoining(false);
    }
  };

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
        <p>커피챗 정보를 불러오는 중...</p>
      </div>
    );
  }

  if (error || !coffeeChat) {
    return (
      <div className="error">
        <p>❌ {error || '커피챗을 찾을 수 없습니다.'}</p>
        <button onClick={() => navigate('/coffee-chats')}>목록으로 돌아가기</button>
      </div>
    );
  }

  return (
    <div className="coffee-chat-detail">
      <div className="container">
        <div className="back-button">
          <button onClick={() => navigate('/coffee-chats')}>
            ← 커피챗 목록으로
          </button>
        </div>

        <div className="detail-header">
          <h1>{coffeeChat.title}</h1>
          <div className="status-info">
            <span className={`status-badge ${coffeeChat.status}`}>
              {coffeeChat.status === 'open' ? '모집중' : '마감'}
            </span>
            <span className="participants-count">
              {coffeeChat.currentParticipants}/{coffeeChat.maxParticipants}명
            </span>
          </div>
        </div>

        <div className="detail-content">
          <div className="main-info">
            <div className="info-section">
              <h3>📅 미팅 정보</h3>
              <div className="info-grid">
                <div className="info-item">
                  <strong>날짜:</strong> {coffeeChat.date}
                </div>
                <div className="info-item">
                  <strong>시간:</strong> {coffeeChat.time}
                </div>
                <div className="info-item">
                  <strong>참여 인원:</strong> {coffeeChat.currentParticipants}/{coffeeChat.maxParticipants}명
                </div>
              </div>
            </div>

            <div className="info-section">
              <h3>👤 호스트 정보</h3>
              <div className="info-grid">
                <div className="info-item">
                  <strong>이름:</strong> {coffeeChat.host}
                </div>
                <div className="info-item">
                  <strong>직업:</strong> {coffeeChat.job}
                </div>
                <div className="info-item">
                  <strong>회사:</strong> {coffeeChat.company}
                </div>
                <div className="info-item">
                  <strong>경력:</strong> {coffeeChat.experience}
                </div>
              </div>
            </div>

            <div className="info-section">
              <h3>📍 위치 정보</h3>
              <div className="info-grid">
                <div className="info-item">
                  <strong>국가:</strong> {coffeeChat.country}
                </div>
                <div className="info-item">
                  <strong>도시:</strong> {coffeeChat.city}
                </div>
              </div>
            </div>
          </div>

          <div className="description-section">
            <h3>📝 커피챗 소개</h3>
            <p>{coffeeChat.description}</p>
          </div>

          <div className="tags-section">
            <h3>🏷️ 태그</h3>
            <div className="tags">
              {coffeeChat.tags.map(tag => (
                <span key={tag} className="tag">{tag}</span>
              ))}
            </div>
          </div>
        </div>

        {joinMessage && (
          <div className={`join-message ${joinMessage.includes('성공') ? 'success' : 'error'}`}>
            {joinMessage}
          </div>
        )}

        <div className="actions">
          {coffeeChat.status === 'open' && coffeeChat.currentParticipants < coffeeChat.maxParticipants ? (
            <button
              className="btn btn-primary btn-large"
              onClick={handleJoin}
              disabled={joining}
            >
              {joining ? '참여 중...' : '커피챗 참여하기'}
            </button>
          ) : (
            <div className="full-message">
              <p>이 커피챗은 참여 인원이 가득 찼습니다.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CoffeeChatDetail;
