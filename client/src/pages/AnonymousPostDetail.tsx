import React, { useState, useEffect, useCallback, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Clock, Eye, X } from "lucide-react";
import { anonymousPostAPI } from "../services/api";
import { AnonymousPost } from "../types";

const AnonymousPostDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<AnonymousPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletePassword, setDeletePassword] = useState("");
  const [deleting, setDeleting] = useState(false);

  const hasFetchedRef = useRef(false);
  const fetchPost = useCallback(async () => {
    try {
      setLoading(true);
      const response = await anonymousPostAPI.getById(id!);
      setPost(response.data);
    } catch (error: any) {
      console.error("게시글 조회 오류:", error);
      setError("게시글을 불러올 수 없습니다.");
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (!id) return;
    if (hasFetchedRef.current) return; // StrictMode 중복 호출 방지
    hasFetchedRef.current = true;
    fetchPost();
  }, [id, fetchPost]);

  const getCategoryColor = (category: string) => {
    const colors = {
      일반: "bg-slate-100 text-slate-700 border-slate-200",
      취업: "bg-blue-100 text-blue-700 border-blue-200",
      생활: "bg-green-100 text-green-700 border-green-200",
      기타: "bg-purple-100 text-purple-700 border-purple-200",
    } as const;
    return (
      colors[category as keyof typeof colors] ||
      "bg-gray-100 text-gray-700 border-gray-200"
    );
  };

  const handleDelete = async () => {
    if (!deletePassword.trim()) {
      setError("비밀번호를 입력해주세요.");
      return;
    }

    try {
      setDeleting(true);
      setError("");

      await anonymousPostAPI.delete(id!, deletePassword);

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
    const dateUtc = new Date(dateString);
    return dateUtc.toLocaleString("ko-KR", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-white border border-slate-200 rounded-xl p-8 text-center">
            <div className="mx-auto w-10 h-10 rounded-full bg-slate-100 animate-pulse mb-4" />
            <p className="text-slate-600">게시글을 불러오는 중...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-white border border-red-200 rounded-xl p-8 text-center">
            <h2 className="text-xl font-semibold text-slate-900 mb-2">
              오류 발생
            </h2>
            <p className="text-slate-600 mb-6">
              {error || "게시글을 찾을 수 없습니다."}
            </p>
            <button
              onClick={() => navigate("/anonymous")}
              className="btn btn-secondary"
            >
              목록으로 돌아가기
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 상단 메타 */}
        <div className="flex flex-col flex-1 gap-2 mb-4">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-3">
            {post.title}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600">
            <span
              className={`inline-flex items-center px-3 py-1 rounded-lg border ${getCategoryColor(
                post.category
              )}`}
            >
              {post.category}
            </span>
            <span>{post.nickname}</span>
            <span className="inline-flex items-center gap-1">
              <Eye className="w-4 h-4" /> {post.viewCount.toLocaleString()}
            </span>
            <span className="inline-flex items-center gap-1">
              <Clock className="w-4 h-4" /> {formatDate(post.createdAt)}
            </span>
          </div>
        </div>

        {/* 본문 카드 */}
        <div className="mb-4 bg-white min-h-50 border border-slate-200 rounded-xl shadow-sm p-6">
          <div className="text-slate-800 leading-relaxed whitespace-pre-wrap break-words">
            {post.content}
          </div>
        </div>

        {/* 하단 액션 */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate("/anonymous")}
            className="btn btn-secondary"
          >
            목록으로
          </button>
          <button
            onClick={() => setShowDeleteModal(true)}
            className="btn btn-primary"
          >
            삭제
          </button>
        </div>

        {/* 삭제 모달 */}
        {showDeleteModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div
              className="absolute inset-0 bg-black/50"
              onClick={() => setShowDeleteModal(false)}
            />
            <div className="relative bg-white border border-slate-200 rounded-xl shadow-lg w-full max-w-md p-6 z-50">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-slate-900">
                  게시글 삭제
                </h3>
                <button
                  aria-label="닫기"
                  className="p-1 text-slate-500"
                  onClick={() => setShowDeleteModal(false)}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <p className="text-sm text-slate-600 mb-4">
                게시글을 삭제하려면 작성 시 입력한 비밀번호를 입력하세요.
              </p>
              <input
                type="password"
                value={deletePassword}
                onChange={(e) => setDeletePassword(e.target.value)}
                placeholder="비밀번호를 입력하세요"
                className="input mb-3"
              />
              {error && (
                <div className="border border-red-200 bg-red-100 text-red-800 rounded-lg px-3 py-2 mb-3">
                  {error}
                </div>
              )}
              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  onClick={() => {
                    setShowDeleteModal(false);
                    setDeletePassword("");
                    setError("");
                  }}
                  className="btn btn-secondary"
                >
                  취소
                </button>
                <button
                  onClick={handleDelete}
                  disabled={deleting}
                  className="btn btn-primary"
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
