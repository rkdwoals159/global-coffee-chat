import { getCoffeeChats, addCoffeeChat } from '../data/coffeeChats.js';

export default function handler(req, res) {
  // CORS 헤더 설정
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // OPTIONS 요청 처리 (preflight)
  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  // GET 요청: 모든 커피챗 조회
  if (req.method === "GET") {
    res.status(200).json(getCoffeeChats());
    return;
  }

  // POST 요청: 새로운 커피챗 생성
  if (req.method === "POST") {
    try {
      const newChat = addCoffeeChat(req.body);
      res.status(201).json(newChat);
    } catch (error) {
      res.status(400).json({ message: "잘못된 요청입니다." });
    }
    return;
  }

  // 지원하지 않는 메서드
  res.setHeader("Allow", ["GET", "POST"]);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
