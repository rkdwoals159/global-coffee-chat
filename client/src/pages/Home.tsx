import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home: React.FC = () => {
  return (
    <div className="home">
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">
            ✈️ <span className="highlight">트립챗</span>에서
            <br />
            해외 취업의 꿈을 현실로
          </h1>
          <p className="hero-description">
            해외에서 성공적으로 취업한 사람들과의 커피챗을 통해<br />
            현지 취업 노하우와 라이프스타일을 공유하는 커뮤니티입니다.
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
      </section>

      <section className="features">
        <div className="container">
          <h2 className="section-title">트립챗만의 특별한 장점</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🌍</div>
              <h3>글로벌 네트워킹</h3>
              <p>전 세계 다양한 국가에서 일하는 사람들과 연결되어 현지 정보를 얻을 수 있습니다.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">💼</div>
              <h3>실무 경험 공유</h3>
              <p>실제 해외 취업에 성공한 사람들의 생생한 경험과 노하우를 들을 수 있습니다.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🏠</div>
              <h3>라이프스타일 정보</h3>
              <p>취업뿐만 아니라 현지 생활, 문화, 비자 등 실용적인 정보도 얻을 수 있습니다.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🤝</div>
              <h3>커뮤니티 형성</h3>
              <p>같은 꿈을 가진 사람들과 함께 성장할 수 있는 커뮤니티를 형성합니다.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="stats">
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
            <div className="stat-item">
              <div className="stat-number">95%</div>
              <div className="stat-label">만족도</div>
            </div>
          </div>
        </div>
      </section>

      <section className="cta">
        <div className="container">
          <h2>지금 바로 시작해보세요!</h2>
          <p>해외 취업의 꿈을 현실로 만들기 위한 첫 걸음을 내딛어보세요.</p>
          <Link to="/create" className="btn btn-primary btn-large">
            첫 커피챗 만들기
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
