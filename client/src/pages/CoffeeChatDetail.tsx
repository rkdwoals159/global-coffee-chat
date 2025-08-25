import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { coffeeChatAPI } from "../services/api";
import { CoffeeChat } from "../types/api";
import { extractErrorMessage } from "../utils/errorHandling";

const CoffeeChatDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [coffeeChat, setCoffeeChat] = useState<CoffeeChat | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [joining, setJoining] = useState(false);
  const [joinMessage, setJoinMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchCoffeeChatDetail = async () => {
      if (!id) return;

      try {
        setLoading(true);
        setError(null);
        const response = await coffeeChatAPI.getById(id);
        setCoffeeChat(response.data);
      } catch (err) {
        setError("커피챗 정보를 불러오는 중 오류가 발생했습니다.");
        console.error("커피챗 상세 조회 오류:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCoffeeChatDetail();
  }, [id]);

  const handleJoin = async () => {
    if (!id) return;

    try {
      setJoining(true);
      const response = await coffeeChatAPI.join(id);
      if (response.data.chat) {
        setCoffeeChat(response.data.chat);
      }
      setJoinMessage("커피챗에 성공적으로 참여했습니다! 🎉");

      // 3초 후 메시지 제거
      setTimeout(() => setJoinMessage(null), 3000);
    } catch (err: unknown) {
      const errorMessage = extractErrorMessage(err);
      setJoinMessage(errorMessage);
      setTimeout(() => setJoinMessage(null), 3000);
    } finally {
      setJoining(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
              <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
            <h2 className="text-2xl font-semibold text-gray-900">
              커피챗 정보를 불러오는 중...
            </h2>
          </div>
        </div>
      </div>
    );
  }

  if (error || !coffeeChat) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
              <span className="text-2xl">⚠️</span>
            </div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              오류가 발생했습니다
            </h2>
            <p className="text-gray-600 mb-6">
              {error || "커피챗을 찾을 수 없습니다."}
            </p>
            <button
              onClick={() => navigate("/coffee-chats")}
              className="btn btn-primary"
            >
              목록으로 돌아가기
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 뒤로가기 버튼 */}
        <div className="mb-8">
          <button
            onClick={() => navigate("/coffee-chats")}
            className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors duration-200"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            <span>커피챗 목록으로</span>
          </button>
        </div>

        {/* 메인 카드 */}
        <div className="card mb-8">
          <div className="p-8">
            {/* 헤더 */}
            <div className="flex items-start justify-between mb-6">
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-gray-900 mb-4">
                  {coffeeChat.title}
                </h1>
                <p className="text-lg text-gray-600 leading-relaxed">
                  {coffeeChat.description}
                </p>
              </div>
              <div className="ml-6">
                <div
                  className={`badge ${
                    coffeeChat.status === "open"
                      ? "badge-success"
                      : "badge-warning"
                  }`}
                >
                  {coffeeChat.status === "open" ? "모집중" : "마감"}
                </div>
              </div>
            </div>

            {/* 호스트 정보 */}
            <div className="bg-blue-50 rounded-xl p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <span className="w-6 h-6 mr-2">👤</span>
                호스트 정보
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center space-x-3">
                  <span className="text-gray-600">이름:</span>
                  <span className="font-medium text-gray-900">
                    {coffeeChat.host}
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-gray-600">경력:</span>
                  <span className="font-medium text-gray-900">
                    {coffeeChat.experience}
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-gray-600">직업:</span>
                  <span className="font-medium text-gray-900">
                    {coffeeChat.job}
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-gray-600">회사:</span>
                  <span className="font-medium text-gray-900">
                    {coffeeChat.company}
                  </span>
                </div>
              </div>
            </div>

            {/* 위치 및 일정 정보 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-green-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <span className="w-6 h-6 mr-2">📍</span>
                  위치 정보
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <span className="text-gray-600">국가:</span>
                    <span className="font-medium text-gray-900">
                      {coffeeChat.country}
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-gray-600">도시:</span>
                    <span className="font-medium text-gray-900">
                      {coffeeChat.city}
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-gray-600">상세 위치:</span>
                    <span className="font-medium text-gray-900">
                      {coffeeChat.city}, {coffeeChat.country}
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-purple-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <span className="w-6 h-6 mr-2">📅</span>
                  일정 정보
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <span className="text-gray-600">날짜:</span>
                    <span className="font-medium text-gray-900">
                      {coffeeChat.date}
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-gray-600">시간:</span>
                    <span className="font-medium text-gray-900">
                      {coffeeChat.time}
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-gray-600">참여 인원:</span>
                    <span className="font-medium text-gray-900">
                      {coffeeChat.currentParticipants}/
                      {coffeeChat.maxParticipants}명
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* 태그 */}
            {coffeeChat.tags && coffeeChat.tags.length > 0 && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <span className="w-6 h-6 mr-2">🏷️</span>
                  태그
                </h3>
                <div className="flex flex-wrap gap-2">
                  {coffeeChat.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 참여 메시지 */}
        {joinMessage && (
          <div
            className={`mb-6 p-4 rounded-lg ${
              joinMessage.includes("성공")
                ? "bg-green-100 text-green-800 border border-green-200"
                : "bg-red-100 text-red-800 border border-red-200"
            }`}
          >
            {joinMessage}
          </div>
        )}

        {/* 액션 버튼 */}
        <div className="flex flex-col sm:flex-row gap-4">
          {coffeeChat.status === "open" &&
          coffeeChat.currentParticipants < coffeeChat.maxParticipants ? (
            <button
              className="btn btn-primary btn-large flex-1"
              onClick={handleJoin}
              disabled={joining}
            >
              {joining ? "참여 중..." : "커피챗 참여하기"}
            </button>
          ) : (
            <div className="flex-1 text-center py-4 bg-gray-100 rounded-lg">
              <p className="text-gray-600">
                {coffeeChat.currentParticipants >= coffeeChat.maxParticipants
                  ? "참여 인원이 마감되었습니다."
                  : "현재 참여를 받고 있지 않습니다."}
              </p>
            </div>
          )}
          <button
            onClick={() => navigate("/coffee-chats")}
            className="btn btn-secondary"
          >
            목록으로 돌아가기
          </button>
        </div>
      </div>
    </div>
  );
};

export default CoffeeChatDetail;
