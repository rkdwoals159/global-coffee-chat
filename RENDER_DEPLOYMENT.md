# 🚀 Render.com 백엔드 배포 가이드

트립챗 백엔드 서버를 Render.com에 배포하는 방법을 안내합니다.

## 📋 **사전 준비사항**

1. **GitHub 계정**: 코드가 GitHub에 푸시되어 있어야 함
2. **Render.com 계정**: [render.com](https://render.com)에서 가입
3. **Node.js 22.x**: 프로젝트에서 사용 중

## 🔧 **1단계: Render.com 프로젝트 생성**

### **1-1. Render 대시보드 접속**

- [render.com](https://render.com)에 로그인
- "New +" 버튼 클릭
- "Web Service" 선택

### **1-2. GitHub 저장소 연결**

- "Connect a repository" 섹션에서 GitHub 계정 연결
- `rkdwoals159/global-coffee-chat` 저장소 선택

### **1-3. 프로젝트 설정**

```
Name: tripchat-backend
Region: Oregon (US West) 또는 가까운 지역
Branch: main
Root Directory: (비워두기 - 루트에서 실행)
Runtime: Node
Build Command: npm install && npm run build
Start Command: npm run start:render
```

## ⚙️ **2단계: 환경변수 설정**

### **2-1. 환경변수 추가**

Render 대시보드에서 다음 환경변수를 추가:

```
NODE_ENV=production
PORT=10000
```

### **2-2. 고급 설정**

- **Auto-Deploy**: Yes (GitHub 푸시 시 자동 배포)
- **Health Check Path**: `/api/coffee-chats`

## 🚀 **3단계: 배포 실행**

### **3-1. 배포 시작**

- "Create Web Service" 버튼 클릭
- 배포 진행 상황 모니터링

### **3-2. 배포 완료 확인**

- "Live" 상태가 되면 배포 완료
- 제공된 URL 확인 (예: `https://tripchat-backend.onrender.com`)

## 🔗 **4단계: 프론트엔드 연동**

### **4-1. 환경변수 업데이트**

`client/.env` 파일에서:

```bash
# 기존
REACT_APP_API_BASE_URL=https://global-coffee-chat.vercel.app

# 변경
REACT_APP_API_BASE_URL=https://tripchat-backend.onrender.com
```

### **4-2. GitHub 푸시**

```bash
git add .
git commit -m "Update: API URL을 Render 백엔드로 변경"
git push origin main
```

## 📊 **5단계: 테스트 및 확인**

### **5-1. API 엔드포인트 테스트**

브라우저에서 직접 접근:

```
https://tripchat-backend.onrender.com/api/coffee-chats
```

**예상 응답 (JSON):**

```json
[
  {
    "id": "1",
    "title": "도쿄 IT 업계 취업 성공기",
    "host": "김민수",
    "country": "일본",
    ...
  }
]
```

### **5-2. 프론트엔드 테스트**

- Vercel에서 프론트엔드 재배포 완료 대기
- 커피챗 목록 페이지에서 데이터 로딩 확인

## 🔍 **6단계: 문제 해결**

### **6-1. 일반적인 문제들**

**빌드 실패:**

- `package.json`의 `start:render` 스크립트 확인
- Node.js 버전이 22.x인지 확인

**API 응답 없음:**

- 환경변수 `PORT` 설정 확인
- Health Check Path 설정 확인

**CORS 오류:**

- `server.ts`의 CORS 설정 확인
- 프론트엔드 도메인이 허용되는지 확인

### **6-2. 로그 확인**

- Render 대시보드에서 "Logs" 탭 확인
- 에러 메시지 및 디버깅 정보 확인

## 💰 **비용 정보**

### **무료 티어 제한사항:**

- **월 사용량**: 750시간
- **서버 성능**: 512MB RAM, 0.1 CPU
- **자동 슬립**: 15분 비활성 시 자동 슬립
- **첫 요청 지연**: 슬립 상태에서 깨어날 때 10-30초 지연

### **유료 플랜 (필요시):**

- **Starter**: $7/월 - 1GB RAM, 0.5 CPU
- **Standard**: $25/월 - 2GB RAM, 1 CPU

## 🎯 **장점**

1. **안정성**: API 라우팅 문제 없음
2. **확장성**: 나중에 데이터베이스 연동 용이
3. **비용 효율성**: 무료 티어로 충분
4. **자동 배포**: GitHub 연동으로 자동화

## 📞 **지원**

문제가 발생하면:

1. Render 로그 확인
2. GitHub Issues 생성
3. Render 커뮤니티 포럼 활용

---

**트립챗** 백엔드가 Render.com에서 안정적으로 작동할 것입니다! ✈️☕✨
