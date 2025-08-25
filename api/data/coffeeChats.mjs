// 커피챗 데이터 (실제로는 데이터베이스를 사용해야 합니다)
export const coffeeChats = [
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

// 데이터를 메모리에 저장하고 관리하는 함수들
let data = [...coffeeChats];

export const getCoffeeChats = () => [...data];
export const getCoffeeChatById = (id) => data.find((chat) => chat.id === id);
export const addCoffeeChat = (chat) => {
  const newChat = {
    ...chat,
    id: Date.now().toString(),
    currentParticipants: 0,
    status: "open",
  };
  data.push(newChat);
  return newChat;
};
export const updateCoffeeChat = (id, updates) => {
  const index = data.findIndex((chat) => chat.id === id);
  if (index !== -1) {
    data[index] = { ...data[index], ...updates };
    return data[index];
  }
  return null;
};
export const joinCoffeeChat = (id) => {
  const chat = data.find((chat) => chat.id === id);
  if (!chat || chat.status !== "open") {
    return { success: false, message: "참여할 수 없는 커피챗입니다." };
  }
  if (chat.currentParticipants >= chat.maxParticipants) {
    chat.status = "full";
    return { success: false, message: "참여 인원이 가득 찼습니다." };
  }
  chat.currentParticipants += 1;
  if (chat.currentParticipants >= chat.maxParticipants) {
    chat.status = "full";
  }
  return { success: true, chat };
};
