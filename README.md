# 🌍 글로벌 커피챗 - 해외 취업 커뮤니티

해외에서 실제로 일하고 있는 사람들과 커피챗을 통해 현실적인 조언과 경험을 나누는 커뮤니티 플랫폼입니다.

## ✨ 주요 기능

- **커피챗 목록 조회**: 국가, 직업별로 필터링하여 원하는 커피챗을 찾을 수 있습니다
- **커피챗 상세 보기**: 호스트 정보, 미팅 정보, 상세 설명을 확인할 수 있습니다
- **커피챗 참여**: 모집 중인 커피챗에 참여할 수 있습니다
- **커피챗 생성**: 본인의 해외 취업 경험을 나누고 싶은 분들이 새로운 커피챗을 만들 수 있습니다
- **검색 및 필터링**: 제목, 설명, 호스트, 국가, 직업으로 검색할 수 있습니다

## 🛠️ 기술 스택

### Backend

- **Node.js** + **Express**
- **TypeScript**
- **CORS** 지원

### Frontend

- **React** 18
- **TypeScript**
- **React Router** (라우팅)
- **Axios** (HTTP 클라이언트)

## 🚀 설치 및 실행

### 1. 프로젝트 클론

```bash
git clone <repository-url>
cd tokyo
```

### 2. 백엔드 의존성 설치 및 실행

```bash
# 루트 디렉토리에서
npm install
npm run dev
```

백엔드 서버가 `http://localhost:5000`에서 실행됩니다.

### 3. 프론트엔드 의존성 설치 및 실행

```bash
cd client
npm install
npm start
```

프론트엔드가 `http://localhost:3000`에서 실행됩니다.

## 📁 프로젝트 구조

```
tokyo/
├── server.ts              # Express 서버 메인 파일
├── tsconfig.json          # TypeScript 설정
├── package.json           # 백엔드 의존성
├── client/                # React 프론트엔드
│   ├── src/
│   │   ├── components/    # 공통 컴포넌트
│   │   │   ├── Header.tsx
│   │   │   └── Header.css
│   │   ├── pages/         # 페이지 컴포넌트
│   │   │   ├── Home.tsx
│   │   │   ├── Home.css
│   │   │   ├── CoffeeChatList.tsx
│   │   │   ├── CoffeeChatList.css
│   │   │   ├── CoffeeChatDetail.tsx
│   │   │   ├── CoffeeChatDetail.css
│   │   │   ├── CreateCoffeeChat.tsx
│   │   │   └── CreateCoffeeChat.css
│   │   ├── App.tsx        # 메인 앱 컴포넌트
│   │   └── App.css        # 전역 스타일
│   └── package.json       # 프론트엔드 의존성
└── README.md
```

## 🔧 API 엔드포인트

### 커피챗 관련

- `GET /api/coffee-chats` - 모든 커피챗 조회
- `GET /api/coffee-chats/:id` - 특정 커피챗 조회
- `POST /api/coffee-chats` - 새로운 커피챗 생성
- `POST /api/coffee-chats/:id/join` - 커피챗 참여
- `GET /api/coffee-chats/country/:country` - 국가별 커피챗 조회
- `GET /api/coffee-chats/job/:job` - 직업별 커피챗 조회

## 🎨 UI/UX 특징

- **모던한 디자인**: 그라데이션과 그림자를 활용한 세련된 디자인
- **반응형 웹**: 모바일과 데스크톱 모두에서 최적화된 사용자 경험
- **직관적인 네비게이션**: 사용자가 쉽게 원하는 정보를 찾을 수 있도록 설계
- **시각적 피드백**: 호버 효과와 애니메이션으로 상호작용성 향상

## 📱 주요 페이지

### 1. 홈페이지 (`/`)

- 서비스 소개 및 주요 기능 설명
- 통계 정보 표시
- 커피챗 둘러보기/만들기 버튼

### 2. 커피챗 목록 (`/coffee-chats`)

- 모든 커피챗을 카드 형태로 표시
- 검색 및 필터링 기능
- 상태별 배지 표시 (모집중/마감/완료)

### 3. 커피챗 상세 (`/coffee-chats/:id`)

- 호스트 정보, 위치, 미팅 정보 상세 표시
- 커피챗 참여 기능
- 태그 및 설명 정보

### 4. 커피챗 생성 (`/create`)

- 단계별 폼 구성
- 실시간 유효성 검사
- 사용자 친화적인 입력 가이드

## 🔮 향후 개발 계획

- [ ] 사용자 인증 시스템
- [ ] 실시간 채팅 기능
- [ ] 알림 시스템
- [ ] 리뷰 및 평점 시스템
- [ ] 다국어 지원
- [ ] 모바일 앱 개발

## 🤝 기여하기

1. 이 저장소를 포크합니다
2. 새로운 기능 브랜치를 생성합니다 (`git checkout -b feature/amazing-feature`)
3. 변경사항을 커밋합니다 (`git commit -m 'Add some amazing feature'`)
4. 브랜치에 푸시합니다 (`git push origin feature/amazing-feature`)
5. Pull Request를 생성합니다

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다.

## 📞 문의

프로젝트에 대한 문의사항이 있으시면 이슈를 생성해주세요.

---

**글로벌 커피챗**과 함께 해외 취업의 꿈을 현실로 만들어보세요! 🌍✨
