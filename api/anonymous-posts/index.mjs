import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// 모든 익명 게시글 조회
export async function GET(req) {
  try {
    const url = new URL(req.url);
    const category = url.searchParams.get("category");
    const page = url.searchParams.get("page") || "1";
    const limit = url.searchParams.get("limit") || "20";

    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;

    const where = category ? { category } : {};

    const [posts, total] = await Promise.all([
      prisma.anonymousPost.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip,
        take: limitNum,
        select: {
          id: true,
          title: true,
          nickname: true,
          category: true,
          viewCount: true,
          createdAt: true,
          updatedAt: true,
        },
      }),
      prisma.anonymousPost.count({ where }),
    ]);

    return new Response(
      JSON.stringify({
        posts,
        total,
        page: pageNum,
        totalPages: Math.ceil(total / limitNum),
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("익명 게시글 조회 오류:", error);
    return new Response(
      JSON.stringify({ message: "서버 오류가 발생했습니다." }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}

// 새로운 익명 게시글 생성
export async function POST(req) {
  try {
    const {
      title,
      content,
      nickname,
      password,
      category = "일반",
    } = await req.json();

    if (!title || !content || !nickname || !password) {
      return new Response(
        JSON.stringify({ message: "필수 필드가 누락되었습니다." }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // 간단한 비밀번호 해시 (실제로는 bcrypt 사용 권장)
    const hashedPassword = Buffer.from(password).toString("base64");

    const newPost = await prisma.anonymousPost.create({
      data: {
        title,
        content,
        nickname,
        password: hashedPassword,
        category,
      },
    });

    // 비밀번호는 제외하고 반환
    const { password: _, ...postWithoutPassword } = newPost;
    return new Response(JSON.stringify(postWithoutPassword), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("익명 게시글 생성 오류:", error);
    return new Response(
      JSON.stringify({ message: "서버 오류가 발생했습니다." }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
