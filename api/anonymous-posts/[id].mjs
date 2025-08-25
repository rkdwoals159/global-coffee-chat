import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// 특정 익명 게시글 조회 (조회수 증가)
export async function GET(req, { params }) {
  try {
    const { id } = params;

    const post = await prisma.anonymousPost.findUnique({
      where: { id },
    });

    if (!post) {
      return new Response(
        JSON.stringify({ message: "게시글을 찾을 수 없습니다." }),
        {
          status: 404,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // 조회수 증가
    await prisma.anonymousPost.update({
      where: { id },
      data: { viewCount: { increment: 1 } },
    });

    // 비밀번호는 제외하고 반환
    const { password, ...postWithoutPassword } = post;
    return new Response(JSON.stringify(postWithoutPassword), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
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

// 익명 게시글 삭제 (비밀번호 확인)
export async function DELETE(req, { params }) {
  try {
    const { id } = params;
    const { password } = await req.json();

    if (!password) {
      return new Response(
        JSON.stringify({ message: "비밀번호를 입력해주세요." }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const post = await prisma.anonymousPost.findUnique({
      where: { id },
    });

    if (!post) {
      return new Response(
        JSON.stringify({ message: "게시글을 찾을 수 없습니다." }),
        {
          status: 404,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // 비밀번호 확인
    const hashedPassword = Buffer.from(password).toString("base64");
    if (post.password !== hashedPassword) {
      return new Response(
        JSON.stringify({ message: "비밀번호가 일치하지 않습니다." }),
        {
          status: 401,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    await prisma.anonymousPost.delete({
      where: { id },
    });

    return new Response(
      JSON.stringify({ message: "게시글이 삭제되었습니다." }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("익명 게시글 삭제 오류:", error);
    return new Response(
      JSON.stringify({ message: "서버 오류가 발생했습니다." }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
