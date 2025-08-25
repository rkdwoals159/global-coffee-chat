import React from "react";
import { Link } from "react-router-dom";

const Home: React.FC = () => {
  const features = [
    {
      icon: "🌍",
      title: "글로벌 네트워킹",
      description:
        "전 세계 다양한 국가에서 일하는 사람들과 연결되어 현지 정보를 얻을 수 있습니다.",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: "💼",
      title: "실무 경험 공유",
      description:
        "실제 해외 취업에 성공한 사람들의 생생한 경험과 노하우를 들을 수 있습니다.",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: "🏠",
      title: "라이프스타일 정보",
      description:
        "취업뿐만 아니라 현지 생활, 문화, 비자 등 실용적인 정보도 얻을 수 있습니다.",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: "🤝",
      title: "커뮤니티 형성",
      description:
        "같은 꿈을 가진 사람들과 함께 성장할 수 있는 커뮤니티를 형성합니다.",
      color: "from-orange-500 to-red-500",
    },
  ];

  const stats = [
    { number: "50+", label: "참여 국가", color: "text-blue-600" },
    { number: "200+", label: "성공 사례", color: "text-green-600" },
    { number: "1000+", label: "트립챗 참여자", color: "text-purple-600" },
    { number: "95%", label: "만족도", color: "text-orange-600" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-yellow-500/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-yellow-500 rounded-full shadow-2xl mb-8 animate-bounce">
              <span className="text-4xl">✈️</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              <span className="bg-gradient-to-r from-blue-600 to-yellow-500 bg-clip-text text-transparent">
                트립챗
              </span>
              에서
              <br />
              <span className="text-blue-600">해외 취업의 꿈</span>을 현실로
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-10 max-w-4xl mx-auto leading-relaxed">
              해외에서 성공적으로 취업한 사람들과의 트립챗을 통해
              <br />
              현지 취업 노하우와 라이프스타일을 공유하는 커뮤니티입니다.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/coffee-chats"
                className="btn btn-primary btn-large text-lg font-semibold transform hover:scale-105 transition-transform duration-200"
              >
                트립챗 둘러보기
              </Link>
              <Link
                to="/create"
                className="btn btn-secondary btn-large text-lg font-semibold transform hover:scale-105 transition-transform duration-200"
              >
                트립챗 만들기
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              트립챗만의 특별한 장점
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              해외 취업을 꿈꾸는 모든 분들을 위한 최고의 플랫폼
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group text-center p-8 rounded-2xl bg-white shadow-soft hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div
                  className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl shadow-lg mb-6 group-hover:scale-110 transition-transform duration-300`}
                >
                  <span className="text-3xl">{feature.icon}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-yellow-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center text-white">
                <div className="text-4xl md:text-5xl font-bold mb-2">
                  {stat.number}
                </div>
                <div className="text-lg opacity-90">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            지금 바로 시작해보세요!
          </h2>
          <p className="text-xl text-gray-600 mb-10">
            해외 취업의 꿈을 현실로 만들기 위한 첫 걸음을 내딛어보세요.
          </p>
          <Link
            to="/create"
            className="btn btn-primary btn-large text-xl font-semibold transform hover:scale-105 transition-transform duration-200 shadow-soft hover:shadow-xl"
          >
            첫 트립챗 만들기
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
