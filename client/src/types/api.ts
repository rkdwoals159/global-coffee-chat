// 커피챗 상태 타입
export type CoffeeChatStatus = 'open' | 'full' | 'completed';

// 커피챗 기본 인터페이스
export interface CoffeeChat {
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
    status: CoffeeChatStatus;
}

// 커피챗 생성 요청 타입 (id, currentParticipants, status 제외)
export interface CreateCoffeeChatRequest {
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
    description: string;
    tags: string[];
}

// 커피챗 생성 응답 타입
export interface CreateCoffeeChatResponse extends CoffeeChat { }

// 커피챗 참여 요청 타입
export interface JoinCoffeeChatRequest {
    participantName?: string;
    participantEmail?: string;
}

// 커피챗 참여 응답 타입
export interface JoinCoffeeChatResponse {
    success: boolean;
    message: string;
    chat?: CoffeeChat;
}

// API 응답 래퍼 타입
export interface ApiResponse<T> {
    data: T;
    message?: string;
    status: number;
}

// 에러 응답 타입
export interface ApiError {
    message: string;
    status: number;
    errors?: Record<string, string[]>;
}

// 필터링 쿼리 파라미터 타입
export interface CoffeeChatFilters {
    country?: string;
    job?: string;
    status?: CoffeeChatStatus;
    date?: string;
}

// 페이지네이션 타입
export interface PaginationParams {
    page?: number;
    limit?: number;
}

// 페이지네이션 응답 타입
export interface PaginatedResponse<T> {
    data: T[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
}
