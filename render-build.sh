#!/bin/bash

echo "🚀 Render 배포 시작..."

# 의존성 설치
echo "📦 의존성 설치 중..."
npm install

# Prisma 클라이언트 생성
echo "🔧 Prisma 클라이언트 생성 중..."
npm run db:generate

# 데이터베이스 마이그레이션
echo "🗄️ 데이터베이스 마이그레이션 중..."
npm run db:migrate

# 빌드
echo "🏗️ 프로젝트 빌드 중..."
npm run build

echo "✅ 배포 준비 완료!"
