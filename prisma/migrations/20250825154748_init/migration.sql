-- CreateEnum
CREATE TYPE "public"."ChatStatus" AS ENUM ('OPEN', 'FULL', 'COMPLETED');

-- CreateTable
CREATE TABLE "public"."CoffeeChat" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "host" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "job" TEXT NOT NULL,
    "company" TEXT NOT NULL,
    "experience" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "time" TEXT NOT NULL,
    "maxParticipants" INTEGER NOT NULL,
    "currentParticipants" INTEGER NOT NULL DEFAULT 0,
    "description" TEXT NOT NULL,
    "tags" TEXT[],
    "status" "public"."ChatStatus" NOT NULL DEFAULT 'OPEN',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CoffeeChat_pkey" PRIMARY KEY ("id")
);
