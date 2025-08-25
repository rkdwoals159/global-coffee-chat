import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { validateConfig } from "./config/config";
import Header from "./components/Header";
import Home from "./pages/Home";
import CoffeeChatList from "./pages/CoffeeChatList";
import CoffeeChatDetail from "./pages/CoffeeChatDetail";
import CreateCoffeeChat from "./pages/CreateCoffeeChat";
import AnonymousCommunity from "./pages/AnonymousCommunity";
import WriteAnonymousPost from "./pages/WriteAnonymousPost";
import AnonymousPostDetail from "./pages/AnonymousPostDetail";

function App() {
  useEffect(() => {
    // 환경변수 설정 검증
    validateConfig();
  }, []);

  return (
    <Router>
      <div className="App">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/coffee-chats" element={<CoffeeChatList />} />
            <Route path="/coffee-chats/:id" element={<CoffeeChatDetail />} />
            <Route path="/create" element={<CreateCoffeeChat />} />
            <Route path="/anonymous" element={<AnonymousCommunity />} />
            <Route path="/anonymous/write" element={<WriteAnonymousPost />} />
            <Route path="/anonymous/:id" element={<AnonymousPostDetail />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
