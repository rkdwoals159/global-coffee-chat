import axios, { AxiosResponse } from 'axios';
import { config } from '../config/config';
import {
  CoffeeChat,
  CreateCoffeeChatRequest,
  CreateCoffeeChatResponse,
  JoinCoffeeChatRequest,
  JoinCoffeeChatResponse,
  CoffeeChatFilters,
  PaginationParams,
  PaginatedResponse,
  AnonymousPost,
  CreateAnonymousPostRequest,
  PostsResponse
} from '../types/api';

// API 기본 설정
const api = axios.create({
  baseURL: config.API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 요청 인터셉터
api.interceptors.request.use(
  (config) => {
    console.log(`🚀 API 요청: ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error('❌ API 요청 오류:', error);
    return Promise.reject(error);
  }
);

// 응답 인터셉터
api.interceptors.response.use(
  (response: AxiosResponse) => {
    console.log(`✅ API 응답: ${response.status} ${response.config.url}`);
    console.log('응답 데이터:', response.data);
    return response;
  },
  (error) => {
    console.error('❌ API 응답 오류:', error.response?.status, error.response?.data);
    return Promise.reject(error);
  }
);

// 트립챗 관련 API 함수들
export const coffeeChatAPI = {
  // 모든 트립챗 조회
  getAll: (filters?: CoffeeChatFilters, pagination?: PaginationParams) =>
    api.get<CoffeeChat[] | PaginatedResponse<CoffeeChat>>(config.API_ENDPOINTS.COFFEE_CHATS, {
      params: { ...filters, ...pagination }
    }),

  // 특정 트립챗 조회
  getById: (id: string) =>
    api.get<CoffeeChat>(config.API_ENDPOINTS.COFFEE_CHAT_BY_ID(id)),

  // 새로운 트립챗 생성
  create: (data: CreateCoffeeChatRequest) =>
    api.post<CreateCoffeeChatResponse>(config.API_ENDPOINTS.COFFEE_CHATS, data),

  // 트립챗 참여
  join: (id: string, data?: JoinCoffeeChatRequest) =>
    api.post<JoinCoffeeChatResponse>(config.API_ENDPOINTS.JOIN_COFFEE_CHAT(id), data),

  // 국가별 필터링
  filterByCountry: (country: string) =>
    api.get<CoffeeChat[]>(config.API_ENDPOINTS.FILTER_BY_COUNTRY(country)),

  // 직업별 필터링
  filterByJob: (job: string) =>
    api.get<CoffeeChat[]>(config.API_ENDPOINTS.FILTER_BY_JOB(job)),
};

// 익명게시글 관련 API 함수들
export const anonymousPostAPI = {
  // 모든 익명게시글 조회
  getAll: (params?: { category?: string; page?: number; limit?: number }) =>
    api.get<PostsResponse>('/api/anonymous-posts', { params }),

  // 특정 익명게시글 조회
  getById: (id: string) =>
    api.get<AnonymousPost>(`/api/anonymous-posts/${id}`),

  // 새로운 익명게시글 생성
  create: (data: CreateAnonymousPostRequest) =>
    api.post<AnonymousPost>('/api/anonymous-posts', data),

  // 익명게시글 삭제
  delete: (id: string, password: string) =>
    api.delete<{ message: string }>(`/api/anonymous-posts/${id}`, { data: { password } }),
};

export default api;
