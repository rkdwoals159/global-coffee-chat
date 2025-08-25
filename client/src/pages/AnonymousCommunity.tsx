import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Plus, MessageSquare, ChevronRight, Search, X } from "lucide-react";
import { anonymousPostAPI } from "../services/api";
import { AnonymousPost } from "../types";

const AnonymousCommunity: React.FC = () => {
  const [posts, setPosts] = useState<AnonymousPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<string>("전체");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [sortKey] = useState<keyof AnonymousPost>("createdAt");
  const [sortOrder] = useState<"asc" | "desc">("desc");
  const [pageSize, setPageSize] = useState(20);
  const navigate = useNavigate();

  const categories = ["전체", "일반", "취업", "생활", "기타"];

  const fetchPosts = useCallback(async () => {
    try {
      setLoading(true);
      const category = selectedCategory === "전체" ? "" : selectedCategory;
      const response = await anonymousPostAPI.getAll({
        category,
        page: currentPage,
        limit: pageSize,
      });
      setPosts(response.data.posts);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("게시글 조회 오류:", error);
    } finally {
      setLoading(false);
    }
  }, [currentPage, selectedCategory, pageSize]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const formatDate = (dateString: string) => {
    const dateUtc = new Date(dateString); // 서버 UTC 시간
    const now = new Date();
    const diffSec = Math.floor((now.getTime() - dateUtc.getTime()) / 1000);

    if (diffSec < 60) return "방금";
    if (diffSec < 60 * 60) return `${Math.floor(diffSec / 60)}분 전`;
    if (diffSec < 60 * 60 * 24) return `${Math.floor(diffSec / 3600)}시간 전`;

    const diffDays = Math.floor(diffSec / (60 * 60 * 24));
    if (diffDays === 1) return "어제";
    if (diffDays < 7) return `${diffDays}일 전`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)}주 전`;

    // 로컬 타임존으로 YYYY. M. D. 형식
    return dateUtc.toLocaleString("ko-KR", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      일반: "bg-slate-100 text-slate-700 border-slate-200",
      취업: "bg-blue-100 text-blue-700 border-blue-200",
      생활: "bg-green-100 text-green-700 border-green-200",
      기타: "bg-purple-100 text-purple-700 border-purple-200",
    };
    return (
      colors[category as keyof typeof colors] ||
      "bg-gray-100 text-gray-700 border-gray-200"
    );
  };

  const filteredPosts = useMemo(() => {
    const lowered = searchTerm.toLowerCase();
    const filtered = posts.filter((post) =>
      post.title.toLowerCase().includes(lowered)
    );
    const sorted = [...filtered].sort((a, b) => {
      const aVal = a[sortKey];
      const bVal = b[sortKey];
      let compare = 0;
      if (sortKey === "viewCount") {
        compare = (aVal as number) - (bVal as number);
      } else if (sortKey === "createdAt" || sortKey === "updatedAt") {
        compare =
          new Date(aVal as string).getTime() -
          new Date(bVal as string).getTime();
      } else {
        compare = String(aVal).localeCompare(String(bVal));
      }
      return sortOrder === "asc" ? compare : -compare;
    });
    return sorted;
  }, [posts, searchTerm, sortKey, sortOrder]);

  // 검색 디바운스 적용
  useEffect(() => {
    const id = setTimeout(() => setSearchTerm(searchInput), 300);
    return () => clearTimeout(id);
  }, [searchInput]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* 상단 헤더 */}
        <div className="mt-10 mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-800">
              익명 커뮤니티
            </h1>
            <p className="text-slate-500 mt-2">
              자유롭게 이야기하고 고민을 나누는 공간
            </p>
          </div>

          <Link
            to="/anonymous/write"
            className="inline-flex w-fit items-center gap-2 px-4 py-3 rounded-xl text-white bg-opacity-80 bg-blue-600 shadow-sm hover:shadow transition"
          >
            <Plus className="w-5 h-5" />
            <span>글쓰기</span>
          </Link>
        </div>

        {/* 툴바 */}
        <div className="mb-6 p-4 bg-white border border-slate-200 rounded-xl md:p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 md:gap-6">
            <div className="relative flex-1 min-w-0">
              <input
                type="text"
                placeholder="제목 검색"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Escape") {
                    setSearchInput("");
                    setSearchTerm("");
                  }
                }}
                className="w-full pl-11 pr-3 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Search className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              {searchInput && (
                <button
                  aria-label="검색어 지우기"
                  onClick={() => {
                    setSearchInput("");
                    setSearchTerm("");
                  }}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
            <div className="flex flex-wrap gap-2 overflow-x-auto whitespace-nowrap md:pl-4 md:ml-4 md:border-l md:border-slate-200 md:py-1">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => {
                    setSelectedCategory(category);
                    setCurrentPage(1);
                  }}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition ${
                    selectedCategory === category
                      ? "bg-blue-600 text-white shadow-sm"
                      : "bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 테이블 카드 */}
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm w-full">
              <thead className="hidden sm:table-header-group bg-slate-50 text-slate-600 sticky top-0 z-10">
                <tr>
                  <th scope="col" className="p-4 text-left font-semibold">
                    카테고리
                  </th>
                  <th
                    scope="col"
                    className="p-4 text-left font-semibold"
                    aria-sort={
                      sortKey === "title"
                        ? sortOrder === "asc"
                          ? "ascending"
                          : "descending"
                        : "none"
                    }
                  >
                    <button
                      className={`inline-flex items-center gap-1 hover:text-slate-900 ${
                        sortKey === "title" ? "text-slate-900" : ""
                      }`}
                      // onClick={() => toggleSort("title")}
                    >
                      제목
                      {/* {sortKey !== "title" && (
                        <ArrowUpDown className="w-4 h-4" />
                      )}
                      {sortKey === "title" &&
                        (sortOrder === "asc" ? (
                          <ArrowUp className="w-4 h-4" />
                        ) : (
                          <ArrowDown className="w-4 h-4" />
                        ))} */}
                    </button>
                  </th>
                  <th scope="col" className="p-4 text-left font-semibold">
                    작성자
                  </th>
                  <th
                    scope="col"
                    className="p-4 text-right font-semibold"
                    aria-sort={
                      sortKey === "viewCount"
                        ? sortOrder === "asc"
                          ? "ascending"
                          : "descending"
                        : "none"
                    }
                  >
                    <button
                      className={`inline-flex items-center gap-1 hover:text-slate-900 ${
                        sortKey === "viewCount" ? "text-slate-900" : ""
                      }`}
                      // onClick={() => toggleSort("viewCount")}
                    >
                      조회수
                      {/* {sortKey !== "viewCount" && (
                        <ArrowUpDown className="w-4 h-4" />
                      )}
                      {sortKey === "viewCount" &&
                        (sortOrder === "asc" ? (
                          <ArrowUp className="w-4 h-4" />
                        ) : (
                          <ArrowDown className="w-4 h-4" />
                        ))} */}
                    </button>
                  </th>
                  <th
                    scope="col"
                    className="p-4 text-right font-semibold"
                    aria-sort={
                      sortKey === "createdAt"
                        ? sortOrder === "asc"
                          ? "ascending"
                          : "descending"
                        : "none"
                    }
                  >
                    <button
                      className={`inline-flex items-center gap-1 hover:text-slate-900 ${
                        sortKey === "createdAt" ? "text-slate-900" : ""
                      }`}
                      // onClick={() => toggleSort("createdAt")}
                    >
                      작성일
                      {/* {sortKey !== "createdAt" && (
                        <ArrowUpDown className="w-4 h-4" />
                      )}
                      {sortKey === "createdAt" &&
                        (sortOrder === "asc" ? (
                          <ArrowUp className="w-4 h-4" />
                        ) : (
                          <ArrowDown className="w-4 h-4" />
                        ))} */}
                    </button>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {loading &&
                  Array.from({ length: 8 }).map((_, idx) => (
                    <tr key={`skeleton-${idx}`} className="animate-pulse">
                      <td className="hidden sm:table-cell p-4">
                        <div className="h-6 w-16 bg-slate-100 rounded" />
                      </td>
                      <td className="p-4">
                        <div className="h-6 w-72 bg-slate-100 rounded" />
                      </td>
                      <td className="hidden sm:table-cell p-4">
                        <div className="h-6 w-24 bg-slate-100 rounded" />
                      </td>
                      <td className="hidden sm:table-cell p-4 text-center">
                        <div className="h-6 w-16 bg-slate-100 rounded inline-block" />
                      </td>
                      <td className="p-4 text-center">
                        <div className="h-6 w-24 bg-slate-100 rounded inline-block" />
                      </td>
                    </tr>
                  ))}

                {!loading && filteredPosts.length === 0 && (
                  <tr>
                    <td colSpan={5} className="p-16 text-center">
                      <div className="flex flex-col items-center gap-4 py-8">
                        <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center">
                          <MessageSquare className="w-8 h-8 text-slate-300" />
                        </div>
                        <div className="text-slate-900 font-semibold text-lg">
                          {searchTerm
                            ? "검색 결과가 없습니다"
                            : "아직 게시글이 없습니다"}
                        </div>
                        <div className="text-slate-500">
                          {searchTerm
                            ? "다른 키워드로 검색해보세요."
                            : "첫 게시글을 작성하여 커뮤니티를 시작해보세요."}
                        </div>
                        {!searchTerm && (
                          <Link
                            to="/anonymous/write"
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-white bg-blue-600 hover:bg-blue-700"
                          >
                            <Plus className="w-4 h-4" /> 첫 게시글 작성하기
                          </Link>
                        )}
                      </div>
                    </td>
                  </tr>
                )}

                {!loading &&
                  filteredPosts.map((post) => (
                    <tr
                      key={post.id}
                      className="group hover:bg-slate-50/80 transition cursor-pointer odd:bg-slate-50/40"
                      onClick={() => navigate(`/anonymous/${post.id}`)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          navigate(`/anonymous/${post.id}`);
                        }
                      }}
                      role="button"
                      tabIndex={0}
                      aria-label={`${post.title} - ${formatDate(
                        post.createdAt
                      )}`}
                    >
                      <td className="hidden sm:table-cell p-4 align-middle text-center">
                        <span
                          className={`inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium border ${getCategoryColor(
                            post.category
                          )}`}
                        >
                          {post.category}
                        </span>
                      </td>
                      <td className="p-4 align-middle min-w-[240px] text-center">
                        <span
                          className="text-slate-800 group-hover:text-blue-600 font-medium line-clamp-1"
                          title={post.title}
                        >
                          {post.title}
                        </span>
                        {/* {isNewPost(post.createdAt) && (
                          <span className="ml-2 align-middle inline-flex items-center px-1.5 py-0.5 text-[10px] font-semibold rounded bg-rose-50 text-rose-600 border border-rose-200">
                            NEW
                          </span>
                        )} */}
                      </td>
                      <td className="hidden sm:table-cell p-4 align-middle text-center text-slate-600">
                        <span className="inline-flex items-center gap-1">
                          익명
                        </span>
                      </td>
                      <td className="hidden sm:table-cell p-4 align-middle text-center text-slate-600">
                        <span className="inline-flex items-center gap-1">
                          {post.viewCount || 0}
                        </span>
                      </td>
                      <td className="p-4 sm:table-cell align-middle text-center text-slate-600">
                        <span className="inline-flex items-center gap-1">
                          {/* <Clock className="w-4 h-4" />{" "} */}
                          {formatDate(post.createdAt)}
                        </span>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 페이지네이션 */}
        {totalPages > 1 && (
          <div className="mt-6 flex items-center justify-center gap-2 flex-wrap">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight className="w-4 h-4 mr-1 rotate-180" /> 이전
            </button>
            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`inline-flex items-center justify-center w-9 h-9 text-sm font-medium rounded-lg transition ${
                      currentPage === page
                        ? "bg-blue-600 text-white"
                        : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
                    }`}
                  >
                    {page}
                  </button>
                )
              )}
            </div>
            <div className="mx-2 text-sm text-slate-600">
              {currentPage} / {totalPages}
            </div>
            <div className="flex items-center gap-2 text-sm">
              <label htmlFor="pageSize" className="text-slate-600">
                페이지당
              </label>
              <select
                id="pageSize"
                value={pageSize}
                onChange={(e) => {
                  setPageSize(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="border border-slate-200 rounded-lg px-2 py-1 bg-white"
              >
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
              </select>
            </div>
            <button
              onClick={() =>
                setCurrentPage(Math.min(totalPages, currentPage + 1))
              }
              disabled={currentPage === totalPages}
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              다음 <ChevronRight className="w-4 h-4 ml-1" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AnonymousCommunity;
