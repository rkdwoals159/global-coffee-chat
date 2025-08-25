import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { coffeeChatAPI } from "../services/api";
import { CreateCoffeeChatRequest } from "../types/api";
import { extractErrorMessage } from "../utils/errorHandling";

interface FormData {
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
  tags: string;
}

interface FormErrors {
  [key: string]: string | undefined;
}

const CreateCoffeeChat: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    title: "",
    host: "",
    country: "",
    city: "",
    job: "",
    company: "",
    experience: "",
    date: "",
    time: "",
    maxParticipants: 8,
    description: "",
    tags: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "maxParticipants" ? parseInt(value) || 0 : value,
    }));

    // 에러 메시지 제거
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "제목을 입력해주세요.";
    }
    if (!formData.host.trim()) {
      newErrors.host = "호스트 이름을 입력해주세요.";
    }
    if (!formData.country.trim()) {
      newErrors.country = "국가를 입력해주세요.";
    }
    if (!formData.city.trim()) {
      newErrors.city = "도시를 입력해주세요.";
    }
    if (!formData.job.trim()) {
      newErrors.job = "직업을 입력해주세요.";
    }
    if (!formData.company.trim()) {
      newErrors.company = "회사를 입력해주세요.";
    }
    if (!formData.experience.trim()) {
      newErrors.experience = "경력을 입력해주세요.";
    }
    if (!formData.date) {
      newErrors.date = "날짜를 선택해주세요.";
    }
    if (!formData.time) {
      newErrors.time = "시간을 입력해주세요.";
    }
    if (formData.maxParticipants < 1) {
      newErrors.maxParticipants = "참여 인원은 1명 이상이어야 합니다.";
    }
    if (!formData.description.trim()) {
      newErrors.description = "설명을 입력해주세요.";
    }
    if (!formData.tags.trim()) {
      newErrors.tags = "태그를 입력해주세요.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      setSubmitting(true);

      // 태그를 배열로 변환
      const tagsArray = formData.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag);

      const coffeeChatData: CreateCoffeeChatRequest = {
        title: formData.title,
        host: formData.host,
        country: formData.country,
        city: formData.city,
        job: formData.job,
        company: formData.company,
        experience: formData.experience,
        date: formData.date,
        time: formData.time,
        maxParticipants: formData.maxParticipants,
        description: formData.description,
        tags: tagsArray,
      };

      await coffeeChatAPI.create(coffeeChatData);

      setSubmitMessage("커피챗이 성공적으로 생성되었습니다! 🎉");

      // 2초 후 목록 페이지로 이동
      setTimeout(() => {
        navigate("/coffee-chats");
      }, 2000);
    } catch (err: unknown) {
      const errorMessage = extractErrorMessage(err);
      setSubmitMessage(errorMessage);
      setTimeout(() => setSubmitMessage(null), 3000);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 페이지 헤더 */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            ✈️ 새로운 트립챗 커피챗 만들기
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            해외 취업에 성공한 경험을 공유하고 다른 사람들에게 도움을 주세요
          </p>
        </div>

        {/* 제출 메시지 */}
        {submitMessage && (
          <div
            className={`mb-8 p-4 rounded-lg ${
              submitMessage.includes("성공")
                ? "bg-green-100 text-green-800 border border-green-200"
                : "bg-red-100 text-red-800 border border-red-200"
            }`}
          >
            {submitMessage}
          </div>
        )}

        {/* 폼 */}
        <div className="card">
          <form onSubmit={handleSubmit} className="p-8">
            {/* 기본 정보 섹션 */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
                <span className="w-8 h-8 mr-3">📝</span>
                기본 정보
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    커피챗 제목 *
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="예: 도쿄 IT 업계 취업 성공기"
                    className={`input ${errors.title ? "border-red-500" : ""}`}
                  />
                  {errors.title && (
                    <span className="text-red-600 text-sm mt-1 block">
                      {errors.title}
                    </span>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    호스트 이름 *
                  </label>
                  <input
                    type="text"
                    name="host"
                    value={formData.host}
                    onChange={handleChange}
                    placeholder="본인의 이름을 입력하세요"
                    className={`input ${errors.host ? "border-red-500" : ""}`}
                  />
                  {errors.host && (
                    <span className="text-red-600 text-sm mt-1 block">
                      {errors.host}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* 위치 정보 섹션 */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
                <span className="w-8 h-8 mr-3">📍</span>
                위치 정보
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    국가 *
                  </label>
                  <input
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    placeholder="예: 일본, 영국, 독일"
                    className={`input ${
                      errors.country ? "border-red-500" : ""
                    }`}
                  />
                  {errors.country && (
                    <span className="text-red-600 text-sm mt-1 block">
                      {errors.country}
                    </span>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    도시 *
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="예: 도쿄, 런던, 베를린"
                    className={`input ${errors.city ? "border-red-500" : ""}`}
                  />
                  {errors.city && (
                    <span className="text-red-600 text-sm mt-1 block">
                      {errors.city}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* 직업 정보 섹션 */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
                <span className="w-8 h-8 mr-3">💼</span>
                직업 정보
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    직업 *
                  </label>
                  <input
                    type="text"
                    name="job"
                    value={formData.job}
                    onChange={handleChange}
                    placeholder="예: 프론트엔드 개발자, 데이터 분석가"
                    className={`input ${errors.job ? "border-red-500" : ""}`}
                  />
                  {errors.job && (
                    <span className="text-red-600 text-sm mt-1 block">
                      {errors.job}
                    </span>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    회사 *
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="현재 근무 중인 회사명"
                    className={`input ${
                      errors.company ? "border-red-500" : ""
                    }`}
                  />
                  {errors.company && (
                    <span className="text-red-600 text-sm mt-1 block">
                      {errors.company}
                    </span>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    경력 *
                  </label>
                  <input
                    type="text"
                    name="experience"
                    value={formData.experience}
                    onChange={handleChange}
                    placeholder="예: 3년차, 신입, 5년차"
                    className={`input ${
                      errors.experience ? "border-red-500" : ""
                    }`}
                  />
                  {errors.experience && (
                    <span className="text-red-600 text-sm mt-1 block">
                      {errors.experience}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* 일정 정보 섹션 */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
                <span className="w-8 h-8 mr-3">📅</span>
                일정 정보
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    날짜 *
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    className={`input ${errors.date ? "border-red-500" : ""}`}
                  />
                  {errors.date && (
                    <span className="text-red-600 text-sm mt-1 block">
                      {errors.date}
                    </span>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    시간 *
                  </label>
                  <input
                    type="time"
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    className={`input ${errors.time ? "border-red-500" : ""}`}
                  />
                  {errors.time && (
                    <span className="text-red-600 text-sm mt-1 block">
                      {errors.time}
                    </span>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    최대 참여 인원 *
                  </label>
                  <input
                    type="number"
                    name="maxParticipants"
                    value={formData.maxParticipants}
                    onChange={handleChange}
                    min="1"
                    max="20"
                    className={`input ${
                      errors.maxParticipants ? "border-red-500" : ""
                    }`}
                  />
                  {errors.maxParticipants && (
                    <span className="text-red-600 text-sm mt-1 block">
                      {errors.maxParticipants}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* 상세 정보 섹션 */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
                <span className="w-8 h-8 mr-3">📋</span>
                상세 정보
              </h2>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    커피챗 설명 *
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="커피챗에서 다룰 내용과 참여자들에게 도움이 될 정보를 자세히 설명해주세요"
                    rows={5}
                    className={`input ${
                      errors.description ? "border-red-500" : ""
                    }`}
                  />
                  {errors.description && (
                    <span className="text-red-600 text-sm mt-1 block">
                      {errors.description}
                    </span>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    태그 *
                  </label>
                  <input
                    type="text"
                    name="tags"
                    value={formData.tags}
                    onChange={handleChange}
                    placeholder="예: 일본, IT, 취업, 일본어 (쉼표로 구분)"
                    className={`input ${errors.tags ? "border-red-500" : ""}`}
                  />
                  {errors.tags && (
                    <span className="text-red-600 text-sm mt-1 block">
                      {errors.tags}
                    </span>
                  )}
                  <small className="text-gray-500 text-sm mt-1 block">
                    쉼표(,)로 구분하여 여러 태그를 입력할 수 있습니다.
                  </small>
                </div>
              </div>
            </div>

            {/* 액션 버튼 */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={() => navigate("/coffee-chats")}
                className="btn btn-secondary"
              >
                취소
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="btn btn-primary flex-1"
              >
                {submitting ? "생성 중..." : "커피챗 만들기"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateCoffeeChat;
