# 🌐 환경변수 설정 가이드

트립챗 프로젝트의 환경변수를 설정하는 방법을 안내합니다.

## 📝 .env 파일 생성

프로젝트 루트 디렉토리(`client/`)에 `.env` 파일을 생성하고 다음 내용을 추가하세요:

```bash
# 트립챗 API 설정
REACT_APP_API_BASE_URL=https://global-coffee-chat.vercel.app
REACT_APP_SITE_NAME=트립챗
REACT_APP_SITE_DESCRIPTION=해외 취업 트립챗 커뮤니티

# 개발 환경 설정
REACT_APP_ENV=production
REACT_APP_VERSION=1.0.0

# 소셜 미디어 설정
REACT_APP_SITE_URL=https://global-coffee-chat.vercel.app
REACT_APP_OG_IMAGE_URL=https://global-coffee-chat.vercel.app/og-image.png
```

## 🔧 환경변수 설명

### 필수 환경변수

- `REACT_APP_API_BASE_URL`: 백엔드 API의 기본 URL
- `REACT_APP_SITE_NAME`: 사이트 이름
- `REACT_APP_SITE_DESCRIPTION`: 사이트 설명

### 선택적 환경변수

- `REACT_APP_ENV`: 환경 설정 (development/production)
- `REACT_APP_VERSION`: 앱 버전
- `REACT_APP_SITE_URL`: 사이트 URL
- `REACT_APP_OG_IMAGE_URL`: Open Graph 이미지 URL

## ⚠️ 주의사항

1. **React 환경변수**: 모든 환경변수는 `REACT_APP_` 접두사로 시작해야 합니다.
2. **파일 위치**: `.env` 파일은 `client/` 디렉토리에 위치해야 합니다.
3. **Git 무시**: `.env` 파일은 `.gitignore`에 포함되어 있어 Git에 커밋되지 않습니다.
4. **재시작 필요**: 환경변수 변경 후 개발 서버를 재시작해야 합니다.

## 🚀 개발 서버 실행

환경변수 설정 후 개발 서버를 실행하세요:

```bash
cd client
npm start
```

## 🔍 환경변수 확인

브라우저 콘솔에서 환경변수가 올바르게 설정되었는지 확인할 수 있습니다:

```javascript
console.log(process.env.REACT_APP_API_BASE_URL);
console.log(process.env.REACT_APP_SITE_NAME);
```

## 📱 프로덕션 배포

Vercel에 배포할 때는 Vercel 대시보드에서 환경변수를 설정하거나, 자동으로 GitHub의 환경변수를 사용할 수 있습니다.

---

**참고**: 환경변수가 설정되지 않은 경우 기본값이 사용됩니다.
