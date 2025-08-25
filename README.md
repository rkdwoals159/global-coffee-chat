# ✈️ 트립챗 (TripChat)

해외에서 성공적으로 취업한 사람들과의 커피챗을 통해 현지 취업 노하우와 라이프스타일을 공유하는 커뮤니티 웹사이트입니다.

## 🌟 주요 기능

- **커피챗 목록 조회**: 국가, 직업별로 필터링 가능
- **상세 정보 확인**: 각 커피챗의 상세 정보와 참여 현황
- **커피챗 참여**: 오픈된 커피챗에 참여 신청
- **새 커피챗 생성**: 자신의 해외 취업 경험을 공유하는 커피챗 만들기

## 🛠️ 기술 스택

### Frontend

- React 18 + TypeScript
- React Router (클라이언트 사이드 라우팅)
- Axios (HTTP 요청)
- CSS (스타일링)

### Backend

- Node.js + Express
- TypeScript
- Prisma ORM
- PostgreSQL
- Vercel Serverless Functions

### 배포

- Vercel (프론트엔드 + 백엔드)
- Render (백엔드 + 데이터베이스)
- GitHub (버전 관리)

## 🚀 설치 및 실행

### 1. 저장소 클론

```bash
git clone https://github.com/your-username/tripchat.git
cd tripchat
```

### 2. 의존성 설치

```bash
# 루트 디렉토리
npm install

# 클라이언트 디렉토리
cd client
npm install
```

### 3. 데이터베이스 설정

```bash
# PostgreSQL 데이터베이스 실행 (Docker 사용)
docker-compose up -d

# 환경 변수 설정 (.env 파일 생성)
DATABASE_URL="postgresql://postgres:password@localhost:5432/tokyo_coffee_chats"
PORT=5000

# 데이터베이스 마이그레이션 및 시드
npm run db:migrate
npm run db:seed
```

### 4. 개발 서버 실행

```bash
# 백엔드 (루트 디렉토리)
npm run dev

# 프론트엔드 (클라이언트 디렉토리)
npm start
```

## 📁 프로젝트 구조

```
tripchat/
├── api/                    # Vercel Serverless Functions
│   ├── data/              # 공통 데이터 모듈
│   └── coffee-chats/      # 커피챗 관련 API
├── client/                 # React 프론트엔드
│   ├── src/
│   │   ├── components/    # 재사용 가능한 컴포넌트
│   │   ├── pages/         # 페이지 컴포넌트
│   │   └── App.tsx        # 메인 앱 컴포넌트
│   └── public/            # 정적 파일
├── prisma/                 # 데이터베이스 스키마 및 마이그레이션
│   ├── schema.prisma      # Prisma 스키마
│   └── seed.ts            # 초기 데이터 시드
├── server.ts               # 로컬 개발용 Express 서버
├── docker-compose.yml      # PostgreSQL Docker 설정
├── render.yaml             # Render 배포 설정
└── package.json            # 프로젝트 설정
```

## 🔌 API 엔드포인트

### 커피챗 관련

- `GET /api/coffee-chats` - 모든 커피챗 조회
- `GET /api/coffee-chats/:id` - 특정 커피챗 조회
- `POST /api/coffee-chats` - 새로운 커피챗 생성
- `POST /api/coffee-chats/:id/join` - 커피챗 참여

### 필터링

- `GET /api/coffee-chats/country/:country` - 국가별 필터링
- `GET /api/coffee-chats/job/:job` - 직업별 필터링

## 🎨 UI/UX 특징

- **반응형 디자인**: 모바일과 데스크톱 모두 지원
- **직관적인 네비게이션**: 사용자 친화적인 인터페이스
- **검색 및 필터링**: 원하는 정보를 빠르게 찾을 수 있는 기능
- **모던한 디자인**: 깔끔하고 세련된 UI

## 🚀 배포

### Vercel 배포 (프론트엔드)

1. GitHub 저장소를 Vercel에 연결
2. 자동 배포 설정
3. 프론트엔드 서비스

### Render 배포 (백엔드 + 데이터베이스)

1. GitHub 저장소를 Render에 연결
2. `render.yaml` 파일을 통한 자동 배포
3. PostgreSQL 데이터베이스 자동 생성 및 연결
4. 환경 변수 자동 설정
5. 데이터베이스 마이그레이션 자동 실행

**Render 배포 단계:**
```bash
# 1. GitHub에 코드 푸시
git add .
git commit -m "Add database and deployment config"
git push origin main

# 2. Render에서 자동 배포 확인
# - render.yaml 파일을 읽어서 자동으로 서비스 생성
# - PostgreSQL 데이터베이스 자동 생성
# - 환경 변수 자동 설정
# - 빌드 및 배포 자동 실행
```

### 환경 변수

- `DATABASE_URL`: PostgreSQL 연결 문자열
- `PORT`: 서버 포트 (기본값: 5000)
- `NODE_ENV`: 환경 설정 (development/production)

## 🔮 향후 계획

- [x] 데이터베이스 연동 (PostgreSQL + Prisma)
- [ ] 사용자 인증 시스템
- [ ] 실시간 채팅 기능
- [ ] 알림 시스템
- [ ] 모바일 앱 개발
- [ ] 다국어 지원
- [ ] 이미지 업로드 기능
- [ ] 댓글 및 리뷰 시스템

## 📝 라이선스

MIT License

## 🤝 기여하기

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 문의

프로젝트에 대한 문의사항이 있으시면 이슈를 생성해주세요.

---

**트립챗**으로 해외 취업의 꿈을 현실로 만들어보세요! ✈️☕
