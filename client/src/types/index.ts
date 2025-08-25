// API 관련 타입들
export * from './api';

// 컴포넌트에서 사용하는 공통 타입들
export interface FormErrors {
    [key: string]: string | undefined;
}

export interface LoadingState {
    loading: boolean;
    error: string | null;
}
