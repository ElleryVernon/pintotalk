/*
  Warnings:

  - You are about to drop the column `postId` on the `Comment` table. All the data in the column will be lost.
  - You are about to drop the column `walletAddress` on the `Comment` table. All the data in the column will be lost.
  - You are about to drop the column `crawlId` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `subpinId` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `walletAddress` on the `Post` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[crawl_id]` on the table `Post` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[subpin_id]` on the table `Post` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `post_id` to the `Comment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `wallet_ddress` to the `Comment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `crawl_id` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subpin_id` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `wallet_address` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_postId_fkey";

-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_crawlId_fkey";

-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_subpinId_fkey";

-- DropIndex
DROP INDEX "Post_crawlId_key";

-- DropIndex
DROP INDEX "Post_subpinId_key";

-- AlterTable
ALTER TABLE "Comment" DROP COLUMN "postId",
DROP COLUMN "walletAddress",
ADD COLUMN     "post_id" TEXT NOT NULL,
ADD COLUMN     "wallet_ddress" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "crawlId",
DROP COLUMN "subpinId",
DROP COLUMN "walletAddress",
ADD COLUMN     "crawl_id" TEXT NOT NULL,
ADD COLUMN     "subpin_id" TEXT NOT NULL,
ADD COLUMN     "wallet_address" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Vote" (
    "id" TEXT NOT NULL,
    "post_id" TEXT NOT NULL,
    "wallet_address" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "postId" TEXT,

    CONSTRAINT "Vote_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Post_crawl_id_key" ON "Post"("crawl_id");

-- CreateIndex
CREATE UNIQUE INDEX "Post_subpin_id_key" ON "Post"("subpin_id");

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_crawl_id_fkey" FOREIGN KEY ("crawl_id") REFERENCES "Crawl"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_subpin_id_fkey" FOREIGN KEY ("subpin_id") REFERENCES "Subpin"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vote" ADD CONSTRAINT "Vote_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE SET NULL ON UPDATE CASCADE;
