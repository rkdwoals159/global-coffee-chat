// 커피챗 데이터 (실제로는 데이터베이스를 사용해야 합니다)
let coffeeChats = [
  {
    id: "1",
    title: "도쿄 IT 업계 취업 성공기",
    host: "김민수",
    country: "일본",
    city: "도쿄",
    job: "프론트엔드 개발자",
    company: "LINE",
    experience: "3년차",
    date: "2024-01-15",
    time: "19:00",
    maxParticipants: 8,
    currentParticipants: 3,
    description:
      "일본 IT 업계에서 취업하기까지의 과정과 현재 생활에 대해 이야기해요. 일본어 공부법부터 이력서 작성 팁까지!",
    tags: ["일본", "IT", "취업", "일본어"],
    status: "open",
  },
  {
    id: "2",
    title: "런던 금융권 취업 후기",
    host: "박지영",
    country: "영국",
    city: "런던",
    job: "데이터 분석가",
    company: "Goldman Sachs",
    experience: "2년차",
    date: "2024-01-20",
    time: "20:00",
    maxParticipants: 6,
    currentParticipants: 6,
    description:
      "영국 금융권에서 일하는 것에 대해 궁금한 점들을 자유롭게 물어보세요. 비자 신청부터 일상생활까지!",
    tags: ["영국", "금융", "런던", "비자"],
    status: "full",
  },
  {
    id: "3",
    title: "베를린 스타트업 생태계",
    host: "이준호",
    country: "독일",
    city: "베를린",
    job: "프로덕트 매니저",
    company: "N26",
    experience: "4년차",
    date: "2024-01-25",
    time: "18:30",
    maxParticipants: 10,
    currentParticipants: 7,
    description:
      "독일 스타트업에서 일하는 것의 장단점과 베를린의 멋진 문화에 대해 이야기해요.",
    tags: ["독일", "스타트업", "베를린", "PM"],
    status: "open",
  },
];

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
    res.status(200).json(coffeeChats);
    return;
  }

  // POST 요청: 새로운 커피챗 생성
  if (req.method === "POST") {
    try {
      const newChat = {
        id: Date.now().toString(),
        ...req.body,
        currentParticipants: 0,
        status: "open",
      };

      coffeeChats.push(newChat);
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
