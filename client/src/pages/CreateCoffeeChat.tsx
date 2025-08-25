import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { coffeeChatAPI } from '../services/api';
import './CreateCoffeeChat.css';

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
  const [formData, setFormData] = useState<FormData>({
    title: '',
    host: '',
    country: '',
    city: '',
    job: '',
    company: '',
    experience: '',
    date: '',
    time: '',
    maxParticipants: 8,
    description: '',
    tags: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'maxParticipants' ? parseInt(value) || 0 : value,
    }));
    
    // 에러 메시지 제거
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = '제목을 입력해주세요.';
    }
    if (!formData.host.trim()) {
      newErrors.host = '호스트 이름을 입력해주세요.';
    }
    if (!formData.country.trim()) {
      newErrors.country = '국가를 입력해주세요.';
    }
    if (!formData.city.trim()) {
      newErrors.city = '도시를 입력해주세요.';
    }
    if (!formData.job.trim()) {
      newErrors.job = '직업을 입력해주세요.';
    }
    if (!formData.company.trim()) {
      newErrors.company = '회사를 입력해주세요.';
    }
    if (!formData.experience.trim()) {
      newErrors.experience = '경력을 입력해주세요.';
    }
    if (!formData.date) {
      newErrors.date = '날짜를 선택해주세요.';
    }
    if (!formData.time) {
      newErrors.time = '시간을 입력해주세요.';
    }
    if (formData.maxParticipants < 1) {
      newErrors.maxParticipants = '참여 인원은 1명 이상이어야 합니다.';
    }
    if (!formData.description.trim()) {
      newErrors.description = '설명을 입력해주세요.';
    }
    if (!formData.tags.trim()) {
      newErrors.tags = '태그를 입력해주세요.';
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
      const tagsArray = formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag);
      
      const coffeeChatData = {
        ...formData,
        tags: tagsArray,
      };

      await coffeeChatAPI.create(coffeeChatData);
      
      setSubmitMessage('커피챗이 성공적으로 생성되었습니다! 🎉');
      
      // 2초 후 목록 페이지로 이동
      setTimeout(() => {
        navigate('/coffee-chats');
      }, 2000);
      
    } catch (err: any) {
      setSubmitMessage(err.response?.data?.message || '커피챗 생성 중 오류가 발생했습니다.');
      setTimeout(() => setSubmitMessage(null), 3000);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="create-coffee-chat">
      <div className="container">
        <div className="page-header">
          <h1>✈️ 새로운 트립챗 커피챗 만들기</h1>
          <p>해외 취업 경험을 공유하고 다른 사람들에게 도움을 주세요</p>
        </div>

        {submitMessage && (
          <div className={`submit-message ${submitMessage.includes('성공') ? 'success' : 'error'}`}>
            {submitMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="create-form">
          <div className="form-section">
            <h3>📝 기본 정보</h3>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="title">커피챗 제목 *</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="예: 도쿄 IT 업계 취업 성공기"
                  className={errors.title ? 'error' : ''}
                />
                {errors.title && <span className="error-message">{errors.title}</span>}
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="host">호스트 이름 *</label>
                <input
                  type="text"
                  id="host"
                  name="host"
                  value={formData.host}
                  onChange={handleChange}
                  placeholder="본인의 이름을 입력하세요"
                  className={errors.host ? 'error' : ''}
                />
                {errors.host && <span className="error-message">{errors.host}</span>}
              </div>
            </div>
          </div>

          <div className="form-section">
            <h3>📍 위치 정보</h3>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="country">국가 *</label>
                <input
                  type="text"
                  id="country"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  placeholder="예: 일본, 영국, 독일"
                  className={errors.country ? 'error' : ''}
                />
                {errors.country && <span className="error-message">{errors.country}</span>}
              </div>
              <div className="form-group">
                <label htmlFor="city">도시 *</label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="예: 도쿄, 런던, 베를린"
                  className={errors.city ? 'error' : ''}
                />
                {errors.city && <span className="error-message">{errors.city}</span>}
              </div>
            </div>
          </div>

          <div className="form-section">
            <h3>💼 직업 정보</h3>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="job">직업 *</label>
                <input
                  type="text"
                  id="job"
                  name="job"
                  value={formData.job}
                  onChange={handleChange}
                  placeholder="예: 프론트엔드 개발자, 데이터 분석가"
                  className={errors.job ? 'error' : ''}
                />
                {errors.job && <span className="error-message">{errors.job}</span>}
              </div>
              <div className="form-group">
                <label htmlFor="company">회사 *</label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="현재 근무 중인 회사명"
                  className={errors.company ? 'error' : ''}
                />
                {errors.company && <span className="error-message">{errors.company}</span>}
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="experience">경력 *</label>
                <input
                  type="text"
                  id="experience"
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  placeholder="예: 3년차, 신입, 5년차"
                  className={errors.experience ? 'error' : ''}
                />
                {errors.experience && <span className="error-message">{errors.experience}</span>}
              </div>
            </div>
          </div>

          <div className="form-section">
            <h3>📅 미팅 정보</h3>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="date">날짜 *</label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className={errors.date ? 'error' : ''}
                />
                {errors.date && <span className="error-message">{errors.date}</span>}
              </div>
              <div className="form-group">
                <label htmlFor="time">시간 *</label>
                <input
                  type="time"
                  id="time"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  className={errors.time ? 'error' : ''}
                />
                {errors.time && <span className="error-message">{errors.time}</span>}
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="maxParticipants">최대 참여 인원 *</label>
                <input
                  type="number"
                  id="maxParticipants"
                  name="maxParticipants"
                  value={formData.maxParticipants}
                  onChange={handleChange}
                  min="1"
                  max="20"
                  className={errors.maxParticipants ? 'error' : ''}
                />
                {errors.maxParticipants && <span className="error-message">{errors.maxParticipants}</span>}
              </div>
            </div>
          </div>

          <div className="form-section">
            <h3>📖 상세 정보</h3>
            <div className="form-row">
              <div className="form-group full-width">
                <label htmlFor="description">커피챗 설명 *</label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="커피챗에서 다룰 내용과 참여자들에게 도움이 될 정보를 자세히 설명해주세요"
                  rows={5}
                  className={errors.description ? 'error' : ''}
                />
                {errors.description && <span className="error-message">{errors.description}</span>}
              </div>
            </div>

            <div className="form-row">
              <div className="form-group full-width">
                <label htmlFor="tags">태그 *</label>
                <input
                  type="text"
                  id="tags"
                  name="tags"
                  value={formData.tags}
                  onChange={handleChange}
                  placeholder="예: 일본, IT, 취업, 일본어 (쉼표로 구분)"
                  className={errors.tags ? 'error' : ''}
                />
                {errors.tags && <span className="error-message">{errors.tags}</span>}
                <small>쉼표(,)로 구분하여 여러 태그를 입력할 수 있습니다.</small>
              </div>
            </div>
          </div>

          <div className="form-actions">
            <button
              type="button"
              onClick={() => navigate('/coffee-chats')}
              className="btn btn-secondary"
            >
              취소
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="btn btn-primary"
            >
              {submitting ? '생성 중...' : '커피챗 만들기'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateCoffeeChat;
