import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Home from "./pages/Home";
import CoffeeChatList from "./pages/CoffeeChatList";
import CoffeeChatDetail from "./pages/CoffeeChatDetail";
import CreateCoffeeChat from "./pages/CreateCoffeeChat";

function App() {
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
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
