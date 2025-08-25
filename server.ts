import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// 미들웨어
app.use(cors());
app.use(express.json());

// 커피챗 데이터 (실제로는 데이터베이스를 사용해야 합니다)
interface CoffeeChat {
    id: string;
    title: string;
    host: string;
    country: string;
    city: string;
    job: string;
    company: string;
    experience: string;
    date: string;
    time: string;
    maxParticipants: number;
    currentParticipants: number;
    description: string;
    tags: string[];
    status: 'open' | 'full' | 'completed';
}

let coffeeChats: CoffeeChat[] = [
    {
        id: '1',
        title: '도쿄 IT 업계 취업 성공기',
        host: '김민수',
        country: '일본',
        city: '도쿄',
        job: '프론트엔드 개발자',
        company: 'LINE',
        experience: '3년차',
        date: '2024-01-15',
        time: '19:00',
        maxParticipants: 8,
        currentParticipants: 3,
        description: '일본 IT 업계에서 취업하기까지의 과정과 현재 생활에 대해 이야기해요. 일본어 공부법부터 이력서 작성 팁까지!',
        tags: ['일본', 'IT', '취업', '일본어'],
        status: 'open'
    },
    {
        id: '2',
        title: '런던 금융권 취업 후기',
        host: '박지영',
        country: '영국',
        city: '런던',
        job: '데이터 분석가',
        company: 'Goldman Sachs',
        experience: '2년차',
        date: '2024-01-20',
        time: '20:00',
        maxParticipants: 6,
        currentParticipants: 6,
        description: '영국 금융권에서 일하는 것에 대해 궁금한 점들을 자유롭게 물어보세요. 비자 신청부터 일상생활까지!',
        tags: ['영국', '금융', '런던', '비자'],
        status: 'full'
    },
    {
        id: '3',
        title: '베를린 스타트업 생태계',
        host: '이준호',
        country: '독일',
        city: '베를린',
        job: '프로덕트 매니저',
        company: 'N26',
        experience: '4년차',
        date: '2024-01-25',
        time: '18:30',
        maxParticipants: 10,
        currentParticipants: 7,
        description: '독일 스타트업에서 일하는 것의 장단점과 베를린의 멋진 문화에 대해 이야기해요.',
        tags: ['독일', '스타트업', '베를린', 'PM'],
        status: 'open'
    }
];

// API 엔드포인트

// 모든 커피챗 조회
app.get('/api/coffee-chats', (req, res) => {
    res.json(coffeeChats);
});

// 특정 커피챗 조회
app.get('/api/coffee-chats/:id', (req, res) => {
    const { id } = req.params;
    const coffeeChat = coffeeChats.find(chat => chat.id === id);

    if (!coffeeChat) {
        return res.status(404).json({ message: '커피챗을 찾을 수 없습니다.' });
    }

    res.json(coffeeChat);
});

// 새로운 커피챗 생성
app.post('/api/coffee-chats', (req, res) => {
    const newChat: CoffeeChat = {
        id: Date.now().toString(),
        ...req.body,
        currentParticipants: 0,
        status: 'open'
    };

    coffeeChats.push(newChat);
    res.status(201).json(newChat);
});

// 커피챗 참여
app.post('/api/coffee-chats/:id/join', (req, res) => {
    const { id } = req.params;
    const coffeeChat = coffeeChats.find(chat => chat.id === id);

    if (!coffeeChat) {
        return res.status(404).json({ message: '커피챗을 찾을 수 없습니다.' });
    }

    if (coffeeChat.status !== 'open') {
        return res.status(400).json({ message: '참여할 수 없는 커피챗입니다.' });
    }

    if (coffeeChat.currentParticipants >= coffeeChat.maxParticipants) {
        coffeeChat.status = 'full';
        return res.status(400).json({ message: '참여 인원이 가득 찼습니다.' });
    }

    coffeeChat.currentParticipants += 1;

    if (coffeeChat.currentParticipants >= coffeeChat.maxParticipants) {
        coffeeChat.status = 'full';
    }

    res.json(coffeeChat);
});

// 국가별 커피챗 조회
app.get('/api/coffee-chats/country/:country', (req, res) => {
    const { country } = req.params;
    const filteredChats = coffeeChats.filter(chat =>
        chat.country.toLowerCase() === country.toLowerCase()
    );
    res.json(filteredChats);
});

// 직업별 커피챗 조회
app.get('/api/coffee-chats/job/:job', (req, res) => {
    const { job } = req.params;
    const filteredChats = coffeeChats.filter(chat =>
        chat.job.toLowerCase().includes(job.toLowerCase())
    );
    res.json(filteredChats);
});

// 서버 시작
app.listen(PORT, () => {
    console.log(`서버가 포트 ${PORT}에서 실행 중입니다.`);
});
