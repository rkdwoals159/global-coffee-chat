import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { config } from "../config/config";

interface AnonymousPost {
  id: string;
  title: string;
  content: string;
  nickname: string;
  category: string;
  viewCount: number;
  createdAt: string;
  updatedAt: string;
}

const AnonymousPostDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<AnonymousPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletePassword, setDeletePassword] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (id) {
      fetchPost();
    }
  }, [id]);

  const fetchPost = async () => {
    try {
      setLoading(true);
      const response = await axios.get<AnonymousPost>(
        `${config.API_BASE_URL}/api/anonymous-posts/${id}`
      );
      setPost(response.data);
    } catch (error: any) {
      console.error("게시글 조회 오류:", error);
      setError("게시글을 불러올 수 없습니다.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!deletePassword.trim()) {
      setError("비밀번호를 입력해주세요.");
      return;
    }

    try {
      setDeleting(true);
      setError("");

      await axios.delete(`${config.API_BASE_URL}/api/anonymous-posts/${id}`, {
        data: { password: deletePassword },
      });

      // 성공 시 익명 커뮤니티로 이동
      navigate("/anonymous");
    } catch (error: any) {
      console.error("게시글 삭제 오류:", error);
      setError(
        error.response?.data?.message || "게시글 삭제 중 오류가 발생했습니다."
      );
    } finally {
      setDeleting(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString("ko-KR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">게시글을 불러오는 중...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">오류 발생</h2>
            <p className="text-gray-600 mb-6">
              {error || "게시글을 찾을 수 없습니다."}
            </p>
            <button
              onClick={() => navigate("/anonymous")}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
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
      <div className="max-w-4xl mx-auto px-4">
        {/* 헤더 */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex justify-between items-start mb-4">
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {post.title}
              </h1>
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                  {post.category}
                </span>
                <span>익명: {post.nickname}</span>
                <span>조회 {post.viewCount}</span>
                <span>{formatDate(post.createdAt)}</span>
              </div>
            </div>
            <button
              onClick={() => setShowDeleteModal(true)}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
            >
              삭제
            </button>
          </div>
        </div>

        {/* 게시글 내용 */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="prose max-w-none">
            <div className="whitespace-pre-wrap text-gray-800 leading-relaxed">
              {post.content}
            </div>
          </div>
        </div>

        {/* 목록으로 돌아가기 */}
        <div className="text-center">
          <button
            onClick={() => navigate("/anonymous")}
            className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
          >
            목록으로 돌아가기
          </button>
        </div>

        {/* 삭제 모달 */}
        {showDeleteModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                게시글 삭제
              </h3>
              <p className="text-gray-600 mb-4">
                게시글을 삭제하려면 작성 시 입력한 비밀번호를 입력하세요.
              </p>

              <input
                type="password"
                value={deletePassword}
                onChange={(e) => setDeletePassword(e.target.value)}
                placeholder="비밀번호를 입력하세요"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-4"
              />

              {error && (
                <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
                  {error}
                </div>
              )}

              <div className="flex space-x-3">
                <button
                  onClick={() => {
                    setShowDeleteModal(false);
                    setDeletePassword("");
                    setError("");
                  }}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  취소
                </button>
                <button
                  onClick={handleDelete}
                  disabled={deleting}
                  className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {deleting ? "삭제 중..." : "삭제"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AnonymousPostDetail;
