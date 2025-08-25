import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">
          ✈️ 트립챗
        </Link>
        <nav className="nav">
          <Link to="/" className="nav-link">
            홈
          </Link>
          <Link to="/coffee-chats" className="nav-link">
            커피챗 목록
          </Link>
          <Link to="/create" className="nav-link">
            커피챗 만들기
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
