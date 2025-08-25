import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { config } from "../config/config";

const WriteAnonymousPost: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    nickname: "",
    password: "",
    category: "일반",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const categories = ["일반", "취업", "생활", "기타"];

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.title.trim() ||
      !formData.content.trim() ||
      !formData.nickname.trim() ||
      !formData.password.trim()
    ) {
      setError("모든 필드를 입력해주세요.");
      return;
    }

    if (formData.password.length < 4) {
      setError("비밀번호는 4자 이상 입력해주세요.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      await axios.post(`${config.API_BASE_URL}/api/anonymous-posts`, formData);

      // 성공 시 익명 커뮤니티로 이동
      navigate("/anonymous");
    } catch (error: any) {
      console.error("게시글 작성 오류:", error);
      setError(
        error.response?.data?.message || "게시글 작성 중 오류가 발생했습니다."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 헤더 */}
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-800">
            익명 게시글 작성
          </h1>
          <p className="text-slate-500 mt-2">
            자유롭게 이야기하고 고민을 나누는 익명 공간입니다.
          </p>
        </div>

        {/* 작성 폼 */}
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* 제목 */}
            <div>
              <label
                htmlFor="title"
                className="block mb-2 font-medium text-slate-700"
              >
                제목 *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="제목을 입력하세요"
                maxLength={100}
                required
                className="input"
              />
              <div className="mt-1 text-sm text-slate-500">최대 100자</div>
            </div>

            {/* 그리드 2열: 카테고리 / 닉네임 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="category"
                  className="block mb-2 font-medium text-slate-700"
                >
                  카테고리
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="select"
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label
                  htmlFor="nickname"
                  className="block mb-2 font-medium text-slate-700"
                >
                  닉네임 *
                </label>
                <input
                  type="text"
                  id="nickname"
                  name="nickname"
                  value={formData.nickname}
                  onChange={handleChange}
                  placeholder="닉네임을 입력하세요"
                  maxLength={20}
                  required
                  className="input"
                />
                <div className="mt-1 text-sm text-slate-500">최대 20자</div>
              </div>
            </div>

            {/* 내용 */}
            <div>
              <label
                htmlFor="content"
                className="block mb-2 font-medium text-slate-700"
              >
                내용 *
              </label>
              <textarea
                id="content"
                name="content"
                value={formData.content}
                onChange={handleChange}
                rows={10}
                placeholder="내용을 입력하세요"
                maxLength={2000}
                required
                className="input"
              />
              <div className="mt-1 text-sm text-slate-500">
                {formData.content.length}/2000
              </div>
            </div>

            {/* 비밀번호 */}
            <div>
              <label
                htmlFor="password"
                className="block mb-2 font-medium text-slate-700"
              >
                비밀번호 * (게시글 삭제 시 사용)
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="비밀번호를 입력하세요 (4자 이상)"
                minLength={4}
                required
                className="input"
              />
              <p className="mt-1 text-sm text-slate-500">
                비밀번호는 게시글 삭제 시에만 사용되며, 암호화되어 저장됩니다.
              </p>
            </div>

            {/* 오류 메시지 */}
            {error && (
              <div className="border border-red-200 bg-red-100 text-red-800 rounded-lg px-3 py-2">
                {error}
              </div>
            )}

            {/* 버튼 */}
            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => navigate("/anonymous")}
                className="btn btn-secondary"
              >
                취소
              </button>
              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary"
              >
                {loading ? "작성 중..." : "게시글 작성"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default WriteAnonymousPost;
