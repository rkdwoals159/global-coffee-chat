import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { coffeeChatAPI } from "../services/api";
import { CoffeeChat } from "../types/api";

const CoffeeChatList: React.FC = () => {
  const [coffeeChats, setCoffeeChats] = useState<CoffeeChat[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedJob, setSelectedJob] = useState("");

  useEffect(() => {
    const fetchCoffeeChats = async () => {
      try {
        setLoading(true);
        const response = await coffeeChatAPI.getAll();
        const data = response.data;
        if (Array.isArray(data)) {
          setCoffeeChats(data);
        } else {
          setError("데이터 형식이 올바르지 않습니다.");
        }
      } catch (err) {
        setError("커피챗 목록을 불러오는데 실패했습니다.");
        console.error("Error fetching coffee chats:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCoffeeChats();
  }, []);

  const filterChats = () => {
    return coffeeChats.filter((chat) => {
      const matchesSearch =
        chat.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        chat.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        chat.host.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCountry =
        !selectedCountry || chat.country === selectedCountry;
      const matchesJob = !selectedJob || chat.job === selectedJob;

      return matchesSearch && matchesCountry && matchesJob;
    });
  };

  const filteredChats = filterChats();

  const countries = Array.from(
    new Set(coffeeChats.map((chat) => chat.country))
  );
  const jobs = Array.from(new Set(coffeeChats.map((chat) => chat.job)));

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
              <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
            <h2 className="text-2xl font-semibold text-gray-900">
              커피챗 목록을 불러오는 중...
            </h2>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
              <span className="text-2xl">⚠️</span>
            </div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              오류가 발생했습니다
            </h2>
            <p className="text-gray-600 mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="btn btn-primary"
            >
              다시 시도
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 페이지 헤더 */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            ✈️ 트립챗 커피챗 목록
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            해외 취업에 성공한 사람들과의 커피챗에 참여해보세요
          </p>
        </div>

        {/* 검색 및 필터 */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                검색
              </label>
              <input
                type="text"
                placeholder="제목, 설명, 호스트로 검색..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                국가
              </label>
              <select
                value={selectedCountry}
                onChange={(e) => setSelectedCountry(e.target.value)}
                className="select"
              >
                <option value="">모든 국가</option>
                {countries.map((country) => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                직업
              </label>
              <select
                value={selectedJob}
                onChange={(e) => setSelectedJob(e.target.value)}
                className="select"
              >
                <option value="">모든 직업</option>
                {jobs.map((job) => (
                  <option key={job} value={job}>
                    {job}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-end">
              <button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCountry("");
                  setSelectedJob("");
                }}
                className="btn btn-secondary w-full"
              >
                필터 초기화
              </button>
            </div>
          </div>
        </div>

        {/* 커피챗 목록 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredChats.map((chat) => (
            <div
              key={chat.id}
              className="card group hover:shadow-xl transition-all duration-300"
            >
              <div className="p-6">
                {/* 헤더 */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-200">
                      {chat.title}
                    </h3>
                    <p className="text-gray-600 text-sm line-clamp-2">
                      {chat.description}
                    </p>
                  </div>
                  <div className="w-3 h-3 rounded-full ml-2 bg-green-500"></div>
                </div>

                {/* 메타 정보 */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-center text-sm text-gray-600">
                    <span className="w-5 h-5 mr-2">🌍</span>
                    <span>{chat.country}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <span className="w-5 h-5 mr-2">💼</span>
                    <span>{chat.job}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <span className="w-5 h-5 mr-2">👤</span>
                    <span>{chat.host}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <span className="w-5 h-5 mr-2">📅</span>
                    <span>
                      {chat.date} {chat.time}
                    </span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <span className="w-5 h-5 mr-2">📍</span>
                    <span>
                      {chat.city}, {chat.country}
                    </span>
                  </div>
                </div>

                {/* 참여자 정보 */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600">참여자:</span>
                    <span className="text-sm font-medium text-blue-600">
                      {chat.currentParticipants}/{chat.maxParticipants}
                    </span>
                  </div>
                  <div
                    className={`badge ${
                      chat.currentParticipants >= chat.maxParticipants
                        ? "badge-warning"
                        : "badge-success"
                    }`}
                  >
                    {chat.currentParticipants >= chat.maxParticipants
                      ? "마감"
                      : "모집중"}
                  </div>
                </div>

                {/* 액션 버튼 */}
                <Link
                  to={`/coffee-chats/${chat.id}`}
                  className="btn btn-primary w-full group-hover:bg-blue-700 transition-colors duration-200"
                >
                  자세히 보기
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* 빈 상태 */}
        {filteredChats.length === 0 && (
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full mb-6">
              <span className="text-4xl">☕</span>
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-2">
              커피챗이 없습니다
            </h3>
            <p className="text-gray-600 mb-6">
              {searchTerm || selectedCountry || selectedJob
                ? "검색 조건에 맞는 커피챗이 없습니다. 다른 조건으로 검색해보세요."
                : "아직 등록된 커피챗이 없습니다. 첫 번째 커피챗을 만들어보세요!"}
            </p>
            <Link to="/create" className="btn btn-primary">
              커피챗 만들기
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default CoffeeChatList;
