import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log('데이터베이스 시드 시작...');

    // 기존 데이터 삭제
    await prisma.coffeeChat.deleteMany();

    // 샘플 데이터 생성
    const sampleData = [
        {
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
            status: 'OPEN' as const
        },
        {
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
            status: 'FULL' as const
        },
        {
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
            status: 'OPEN' as const
        }
    ];

    for (const data of sampleData) {
        await prisma.coffeeChat.create({
            data
        });
    }

    // 익명 커뮤니티 샘플 데이터
    const anonymousPosts = [
        {
            title: '해외 취업 준비 중인데 조언 부탁드려요',
            content: '현재 일본 IT 업계 취업을 준비하고 있는데, 어떤 준비를 하면 좋을까요? 일본어 공부는 어느 정도 수준까지 해야 할까요?',
            nickname: '일본취업준비생',
            password: Buffer.from('1234').toString('base64'),
            category: '취업'
        },
        {
            title: '도쿄 생활비 얼마나 들까요?',
            content: '도쿄에서 1인 가구로 살면 월 생활비가 얼마나 들까요? 집세, 식비, 교통비 등 구체적으로 알려주세요.',
            nickname: '도쿄생활궁금',
            password: Buffer.from('5678').toString('base64'),
            category: '생활'
        },
        {
            title: '익명으로 고민 상담해요',
            content: '해외에서 일하다 보니 한국 친구들과 연락이 뜸어지고 외로워요. 어떻게 하면 좋을까요?',
            nickname: '외로운해외파',
            password: Buffer.from('9999').toString('base64'),
            category: '일반'
        }
    ];

    for (const post of anonymousPosts) {
        await prisma.anonymousPost.create({
            data: post
        });
    }

    console.log('데이터베이스 시드 완료!');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
