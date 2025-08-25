import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const prisma = new PrismaClient();

// 미들웨어
const allowedOrigins = process.env.ALLOWED_ORIGINS
    ? process.env.ALLOWED_ORIGINS.split(',')
    : [
        'https://global-coffee-chat.vercel.app',
        'https://global-coffee-chat-git-main-rkdwoals159.vercel.app',
        'http://localhost:3000',
        'http://localhost:3001'
    ];

app.use(cors({
    origin: function (origin, callback) {
        // allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));
app.use(express.json());


// CORS preflight 요청 처리
app.options('*', cors());

// API 엔드포인트

// 모든 트립챗 조회
app.get('/api/coffee-chats', async (req, res) => {
    try {
        const coffeeChats = await prisma.coffeeChat.findMany({
            orderBy: { createdAt: 'desc' }
        });
        res.json(coffeeChats);
    } catch (error) {
        console.error('트립챗 조회 오류:', error);
        res.status(500).json({ message: '서버 오류가 발생했습니다.' });
    }
});

// 특정 트립챗 조회
app.get('/api/coffee-chats/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const coffeeChat = await prisma.coffeeChat.findUnique({
            where: { id }
        });

        if (!coffeeChat) {
            return res.status(404).json({ message: '트립챗을 찾을 수 없습니다.' });
        }

        res.json(coffeeChat);
    } catch (error) {
        console.error('트립챗 조회 오류:', error);
        res.status(500).json({ message: '서버 오류가 발생했습니다.' });
    }
});

// 새로운 트립챗 생성
app.post('/api/coffee-chats', async (req, res) => {
    try {
        const newChat = await prisma.coffeeChat.create({
            data: {
                ...req.body,
                currentParticipants: 0,
                status: 'OPEN'
            }
        });

        res.status(201).json(newChat);
    } catch (error) {
        console.error('트립챗 생성 오류:', error);
        res.status(500).json({ message: '서버 오류가 발생했습니다.' });
    }
});

// 트립챗 참여
app.post('/api/coffee-chats/:id/join', async (req, res) => {
    try {
        const { id } = req.params;
        const coffeeChat = await prisma.coffeeChat.findUnique({
            where: { id }
        });

        if (!coffeeChat) {
            return res.status(404).json({ message: '트립챗을 찾을 수 없습니다.' });
        }

        if (coffeeChat.status !== 'OPEN') {
            return res.status(400).json({ message: '참여할 수 없는 트립챗입니다.' });
        }

        if (coffeeChat.currentParticipants >= coffeeChat.maxParticipants) {
            return res.status(400).json({ message: '참여 인원이 가득 찼습니다.' });
        }

        const updatedChat = await prisma.coffeeChat.update({
            where: { id },
            data: {
                currentParticipants: coffeeChat.currentParticipants + 1,
                status: coffeeChat.currentParticipants + 1 >= coffeeChat.maxParticipants ? 'FULL' : 'OPEN'
            }
        });

        res.json(updatedChat);
    } catch (error) {
        console.error('트립챗 참여 오류:', error);
        res.status(500).json({ message: '서버 오류가 발생했습니다.' });
    }
});

// 국가별 트립챗 조회
app.get('/api/coffee-chats/country/:country', async (req, res) => {
    try {
        const { country } = req.params;
        const filteredChats = await prisma.coffeeChat.findMany({
            where: {
                country: {
                    equals: country,
                    mode: 'insensitive'
                }
            },
            orderBy: { createdAt: 'desc' }
        });
        res.json(filteredChats);
    } catch (error) {
        console.error('국가별 트립챗 조회 오류:', error);
        res.status(500).json({ message: '서버 오류가 발생했습니다.' });
    }
});

// 직업별 트립챗 조회
app.get('/api/coffee-chats/job/:job', async (req, res) => {
    try {
        const { job } = req.params;
        const filteredChats = await prisma.coffeeChat.findMany({
            where: {
                job: {
                    contains: job,
                    mode: 'insensitive'
                }
            },
            orderBy: { createdAt: 'desc' }
        });
        res.json(filteredChats);
    } catch (error) {
        console.error('직업별 트립챗 조회 오류:', error);
        res.status(500).json({ message: '서버 오류가 발생했습니다.' });
    }
});

// 서버 시작
app.listen(PORT, () => {
    console.log(`서버가 포트 ${PORT}에서 실행 중입니다.`);
});

// Graceful shutdown
process.on('SIGINT', async () => {
    await prisma.$disconnect();
    process.exit(0);
});
