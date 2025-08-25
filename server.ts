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

// 익명 커뮤니티 API

// 모든 익명 게시글 조회
app.get('/api/anonymous-posts', async (req, res) => {
    try {
        const { category, page = '1', limit = '20' } = req.query;
        const pageNum = parseInt(page as string);
        const limitNum = parseInt(limit as string);
        const skip = (pageNum - 1) * limitNum;

        const where = category ? { category: category as string } : {};

        const [posts, total] = await Promise.all([
            prisma.anonymousPost.findMany({
                where,
                orderBy: { createdAt: 'desc' },
                skip,
                take: limitNum,
                select: {
                    id: true,
                    title: true,
                    nickname: true,
                    category: true,
                    viewCount: true,
                    createdAt: true,
                    updatedAt: true
                }
            }),
            prisma.anonymousPost.count({ where })
        ]);

        res.json({
            posts,
            total,
            page: pageNum,
            totalPages: Math.ceil(total / limitNum)
        });
    } catch (error) {
        console.error('익명 게시글 조회 오류:', error);
        res.status(500).json({ message: '서버 오류가 발생했습니다.' });
    }
});

// 특정 익명 게시글 조회 (조회수 증가)
app.get('/api/anonymous-posts/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const post = await prisma.anonymousPost.findUnique({
            where: { id }
        });

        if (!post) {
            return res.status(404).json({ message: '게시글을 찾을 수 없습니다.' });
        }

        // 조회수 증가
        await prisma.anonymousPost.update({
            where: { id },
            data: { viewCount: { increment: 1 } }
        });

        // 비밀번호는 제외하고 반환
        const { password, ...postWithoutPassword } = post;
        res.json(postWithoutPassword);
    } catch (error) {
        console.error('익명 게시글 조회 오류:', error);
        res.status(500).json({ message: '서버 오류가 발생했습니다.' });
    }
});

// 새로운 익명 게시글 생성
app.post('/api/anonymous-posts', async (req, res) => {
    try {
        const { title, content, nickname, password, category = '일반' } = req.body;

        if (!title || !content || !nickname || !password) {
            return res.status(400).json({ message: '필수 필드가 누락되었습니다.' });
        }

        // 간단한 비밀번호 해시 (실제로는 bcrypt 사용 권장)
        const hashedPassword = Buffer.from(password).toString('base64');

        const newPost = await prisma.anonymousPost.create({
            data: {
                title,
                content,
                nickname,
                password: hashedPassword,
                category
            }
        });

        // 비밀번호는 제외하고 반환
        const { password: _, ...postWithoutPassword } = newPost;
        res.status(201).json(postWithoutPassword);
    } catch (error) {
        console.error('익명 게시글 생성 오류:', error);
        res.status(500).json({ message: '서버 오류가 발생했습니다.' });
    }
});

// 익명 게시글 삭제 (비밀번호 확인)
app.delete('/api/anonymous-posts/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { password } = req.body;

        if (!password) {
            return res.status(400).json({ message: '비밀번호를 입력해주세요.' });
        }

        const post = await prisma.anonymousPost.findUnique({
            where: { id }
        });

        if (!post) {
            return res.status(404).json({ message: '게시글을 찾을 수 없습니다.' });
        }

        // 비밀번호 확인
        const hashedPassword = Buffer.from(password).toString('base64');
        if (post.password !== hashedPassword) {
            return res.status(401).json({ message: '비밀번호가 일치하지 않습니다.' });
        }

        await prisma.anonymousPost.delete({
            where: { id }
        });

        res.json({ message: '게시글이 삭제되었습니다.' });
    } catch (error) {
        console.error('익명 게시글 삭제 오류:', error);
        res.status(500).json({ message: '서버 오류가 발생했습니다.' });
    }
});

// Graceful shutdown
process.on('SIGINT', async () => {
    await prisma.$disconnect();
    process.exit(0);
});
