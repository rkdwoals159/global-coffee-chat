import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

const Home: React.FC = () => {
  return (
    <div className="home">
      <div className="hero">
        <div className="hero-content">
          <h1>해외 취업의 꿈을 현실로</h1>
          <p>
            실제로 해외에서 일하고 있는 사람들과 커피챗을 통해
            <br />
            현실적인 조언과 경험을 나누어보세요
          </p>
          <div className="hero-buttons">
            <Link to="/coffee-chats" className="btn btn-primary">
              커피챗 둘러보기
            </Link>
            <Link to="/create" className="btn btn-secondary">
              커피챗 만들기
            </Link>
          </div>
        </div>
      </div>

      <div className="features">
        <div className="container">
          <h2>왜 글로벌 커피챗인가요?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🌍</div>
              <h3>실제 경험자와의 소통</h3>
              <p>
                현지에서 실제로 일하고 있는 사람들과 직접 이야기할 수 있어요
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">💼</div>
              <h3>실무 중심의 조언</h3>
              <p>이론이 아닌 실제 취업 과정과 일상에 대한 생생한 정보</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🤝</div>
              <h3>네트워킹 기회</h3>
              <p>같은 꿈을 가진 사람들과의 만남과 정보 공유</p>
            </div>
          </div>
        </div>
      </div>

      <div className="stats">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-number">50+</div>
              <div className="stat-label">참여 국가</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">200+</div>
              <div className="stat-label">성공 사례</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">1000+</div>
              <div className="stat-label">커피챗 참여자</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
