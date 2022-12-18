/*
  Warnings:

  - Added the required column `subpinId` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_subpin_id_fkey";

-- DropIndex
DROP INDEX "Post_subpin_id_key";

-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "subpinId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Subpin" ADD COLUMN     "postId" TEXT;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_subpinId_fkey" FOREIGN KEY ("subpinId") REFERENCES "Subpin"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
