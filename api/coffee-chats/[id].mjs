import { getCoffeeChatById, joinCoffeeChat } from '../data/coffeeChats.mjs';

export default function handler(req, res) {
  const { id } = req.query;

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

  // GET 요청: 특정 커피챗 조회
  if (req.method === "GET") {
    const coffeeChat = getCoffeeChatById(id);
    
    if (!coffeeChat) {
      return res.status(404).json({ message: "커피챗을 찾을 수 없습니다." });
    }
    
    res.json(coffeeChat);
    return;
  }

  // POST 요청: 커피챗 참여
  if (req.method === "POST") {
    const result = joinCoffeeChat(id);
    
    if (!result.success) {
      return res.status(400).json({ message: result.message });
    }
    
    res.json(result.chat);
    return;
  }

  // 지원하지 않는 메서드
  res.setHeader("Allow", ["GET", "POST"]);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
