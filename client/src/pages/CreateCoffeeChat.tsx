import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./CreateCoffeeChat.css";

interface CoffeeChatForm {
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
  title?: string;
  host?: string;
  country?: string;
  city?: string;
  job?: string;
  company?: string;
  experience?: string;
  date?: string;
  time?: string;
  maxParticipants?: string;
  description?: string;
  tags?: string;
}

const CreateCoffeeChat: React.FC = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState<CoffeeChatForm>({
    title: "",
    host: "",
    country: "",
    city: "",
    job: "",
    company: "",
    experience: "",
    date: "",
    time: "",
    maxParticipants: 6,
    description: "",
    tags: "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});

  const countries = [
    "미국",
    "캐나다",
    "영국",
    "독일",
    "프랑스",
    "일본",
    "호주",
    "뉴질랜드",
    "싱가포르",
    "홍콩",
    "대만",
    "중국",
    "인도",
    "브라질",
    "멕시코",
    "기타",
  ];

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "maxParticipants" ? parseInt(value) || 0 : value,
    }));

    // 에러 메시지 제거
    if (errors[name as keyof CoffeeChatForm]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!form.title.trim()) {
      newErrors.title = "제목을 입력해주세요";
    }
    if (!form.host.trim()) {
      newErrors.host = "호스트 이름을 입력해주세요";
    }
    if (!form.country) {
      newErrors.country = "국가를 선택해주세요";
    }
    if (!form.city.trim()) {
      newErrors.city = "도시를 입력해주세요";
    }
    if (!form.job.trim()) {
      newErrors.job = "직업을 입력해주세요";
    }
    if (!form.company.trim()) {
      newErrors.company = "회사를 입력해주세요";
    }
    if (!form.experience.trim()) {
      newErrors.experience = "경력을 입력해주세요";
    }
    if (!form.date) {
      newErrors.date = "날짜를 선택해주세요";
    }
    if (!form.time) {
      newErrors.time = "시간을 입력해주세요";
    }
    if (form.maxParticipants < 2 || form.maxParticipants > 20) {
      newErrors.maxParticipants = "참여 인원은 2-20명 사이여야 합니다";
    }
    if (!form.description.trim()) {
      newErrors.description = "상세 설명을 입력해주세요";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const tagsArray = form.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag);

      const coffeeChatData = {
        ...form,
        tags: tagsArray,
      };

      await axios.post(
        "https://tokyo-3j7eqskv3-rkdwoals159s-projects.vercel.app/api/coffee-chats",
        coffeeChatData
      );

      alert("커피챗이 성공적으로 생성되었습니다!");
      navigate("/coffee-chats");
    } catch (error) {
      console.error("커피챗 생성에 실패했습니다:", error);
      alert("커피챗 생성에 실패했습니다. 다시 시도해주세요.");
    } finally {
      setLoading(false);
    }
  };

  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  return (
    <div className="create-coffee-chat">
      <div className="container">
        <div className="page-header">
          <h1>새로운 커피챗 만들기</h1>
          <p>해외 취업 경험을 나누고 싶은 분들을 위한 커피챗을 만들어보세요</p>
        </div>

        <div className="form-container">
          <form onSubmit={handleSubmit} className="coffee-chat-form">
            <div className="form-section">
              <h3>기본 정보</h3>

              <div className="form-group">
                <label htmlFor="title">커피챗 제목 *</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  placeholder="예: 도쿄 IT 업계 취업 성공기"
                  className={errors.title ? "error" : ""}
                />
                {errors.title && (
                  <span className="error-message">{errors.title}</span>
                )}
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="host">호스트 이름 *</label>
                  <input
                    type="text"
                    id="host"
                    name="host"
                    value={form.host}
                    onChange={handleChange}
                    placeholder="본인 이름"
                    className={errors.host ? "error" : ""}
                  />
                  {errors.host && (
                    <span className="error-message">{errors.host}</span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="experience">경력 *</label>
                  <input
                    type="text"
                    id="experience"
                    name="experience"
                    value={form.experience}
                    onChange={handleChange}
                    placeholder="예: 3년차"
                    className={errors.experience ? "error" : ""}
                  />
                  {errors.experience && (
                    <span className="error-message">{errors.experience}</span>
                  )}
                </div>
              </div>
            </div>

            <div className="form-section">
              <h3>직업 정보</h3>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="job">직업 *</label>
                  <input
                    type="text"
                    id="job"
                    name="job"
                    value={form.job}
                    onChange={handleChange}
                    placeholder="예: 프론트엔드 개발자"
                    className={errors.job ? "error" : ""}
                  />
                  {errors.job && (
                    <span className="error-message">{errors.job}</span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="company">회사 *</label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={form.company}
                    onChange={handleChange}
                    placeholder="예: Google"
                    className={errors.company ? "error" : ""}
                  />
                  {errors.company && (
                    <span className="error-message">{errors.company}</span>
                  )}
                </div>
              </div>
            </div>

            <div className="form-section">
              <h3>위치 정보</h3>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="country">국가 *</label>
                  <select
                    id="country"
                    name="country"
                    value={form.country}
                    onChange={handleChange}
                    className={errors.country ? "error" : ""}
                  >
                    <option value="">국가를 선택하세요</option>
                    {countries.map((country) => (
                      <option key={country} value={country}>
                        {country}
                      </option>
                    ))}
                  </select>
                  {errors.country && (
                    <span className="error-message">{errors.country}</span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="city">도시 *</label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={form.city}
                    onChange={handleChange}
                    placeholder="예: 도쿄"
                    className={errors.city ? "error" : ""}
                  />
                  {errors.city && (
                    <span className="error-message">{errors.city}</span>
                  )}
                </div>
              </div>
            </div>

            <div className="form-section">
              <h3>미팅 정보</h3>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="date">날짜 *</label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    value={form.date}
                    onChange={handleChange}
                    min={getCurrentDate()}
                    className={errors.date ? "error" : ""}
                  />
                  {errors.date && (
                    <span className="error-message">{errors.date}</span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="time">시간 *</label>
                  <input
                    type="time"
                    id="time"
                    name="time"
                    value={form.time}
                    onChange={handleChange}
                    className={errors.time ? "error" : ""}
                  />
                  {errors.time && (
                    <span className="error-message">{errors.time}</span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="maxParticipants">최대 참여 인원 *</label>
                  <input
                    type="number"
                    id="maxParticipants"
                    name="maxParticipants"
                    value={form.maxParticipants}
                    onChange={handleChange}
                    min="2"
                    max="20"
                    className={errors.maxParticipants ? "error" : ""}
                  />
                  {errors.maxParticipants && (
                    <span className="error-message">
                      {errors.maxParticipants}
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="form-section">
              <h3>상세 정보</h3>

              <div className="form-group">
                <label htmlFor="description">상세 설명 *</label>
                <textarea
                  id="description"
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  placeholder="커피챗에서 다룰 내용과 참여자들에게 도움이 될 정보를 자세히 설명해주세요"
                  rows={5}
                  className={errors.description ? "error" : ""}
                />
                {errors.description && (
                  <span className="error-message">{errors.description}</span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="tags">태그 (쉼표로 구분)</label>
                <input
                  type="text"
                  id="tags"
                  name="tags"
                  value={form.tags}
                  onChange={handleChange}
                  placeholder="예: 일본, IT, 취업, 일본어"
                />
                <small>관련 키워드를 쉼표로 구분하여 입력하세요</small>
              </div>
            </div>

            <div className="form-actions">
              <button
                type="button"
                onClick={() => navigate("/coffee-chats")}
                className="btn btn-secondary"
              >
                취소
              </button>
              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary"
              >
                {loading ? "생성 중..." : "커피챗 만들기"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateCoffeeChat;
