// 환경변수 설정
export const config = {
  // API 기본 URL
  API_BASE_URL: process.env.REACT_APP_API_BASE_URL || 'https://global-coffee-chat.vercel.app',
  
  // 사이트 정보
  SITE_NAME: process.env.REACT_APP_SITE_NAME || '트립챗',
  SITE_DESCRIPTION: process.env.REACT_APP_SITE_DESCRIPTION || '해외 취업 커피챗 커뮤니티',
  
  // 환경 설정
  ENV: process.env.REACT_APP_ENV || 'production',
  VERSION: process.env.REACT_APP_VERSION || '1.0.0',
  
  // 소셜 미디어
  SITE_URL: process.env.REACT_APP_SITE_URL || 'https://global-coffee-chat.vercel.app',
  OG_IMAGE_URL: process.env.REACT_APP_OG_IMAGE_URL || 'https://global-coffee-chat.vercel.app/og-image.png',
  
  // API 엔드포인트
  API_ENDPOINTS: {
    COFFEE_CHATS: '/api/coffee-chats',
    COFFEE_CHAT_BY_ID: (id: string) => `/api/coffee-chats/${id}`,
    JOIN_COFFEE_CHAT: (id: string) => `/api/coffee-chats/${id}`,
    FILTER_BY_COUNTRY: (country: string) => `/api/coffee-chats/country/${country}`,
    FILTER_BY_JOB: (job: string) => `/api/coffee-chats/job/${job}`,
  }
};

// 환경변수 유효성 검사
export const validateConfig = () => {
  const requiredVars = ['REACT_APP_API_BASE_URL'];
  const missingVars = requiredVars.filter(varName => !process.env[varName]);
  
  if (missingVars.length > 0) {
    console.warn(`⚠️ 다음 환경변수가 설정되지 않았습니다: ${missingVars.join(', ')}`);
    console.warn('📝 client/.env 파일을 생성하고 환경변수를 설정해주세요.');
  }
  
  return missingVars.length === 0;
};
