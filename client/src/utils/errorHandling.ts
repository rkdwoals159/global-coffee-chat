import { ApiError } from '../types/api';

// Axios 에러에서 메시지 추출하는 함수
export const extractErrorMessage = (error: unknown): string => {
    if (error && typeof error === 'object' && 'response' in error) {
        const response = (error as { response?: { data?: { message?: string } } }).response;
        if (response?.data?.message) {
            return response.data.message;
        }
    }

    if (error instanceof Error) {
        return error.message;
    }

    return '알 수 없는 오류가 발생했습니다.';
};

// API 에러인지 확인하는 타입 가드
export const isApiError = (error: unknown): error is ApiError => {
    return Boolean(error && typeof error === 'object' && 'message' in error && 'status' in error);
};
