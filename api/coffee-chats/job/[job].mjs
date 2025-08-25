import { getCoffeeChats } from '../../data/coffeeChats.mjs';

export default function handler(req, res) {
  const { job } = req.query;

  // CORS 헤더 설정
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // OPTIONS 요청 처리 (preflight)
  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  // GET 요청: 직업별 커피챗 조회
  if (req.method === "GET") {
    const coffeeChats = getCoffeeChats();
    const filteredChats = coffeeChats.filter((chat) =>
      chat.job.toLowerCase().includes(job.toLowerCase())
    );
    res.json(filteredChats);
    return;
  }

  // 지원하지 않는 메서드
  res.setHeader("Allow", ["GET"]);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
