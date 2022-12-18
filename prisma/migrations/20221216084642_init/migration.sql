/*
  Warnings:

  - You are about to drop the column `wallet_ddress` on the `Comment` table. All the data in the column will be lost.
  - Added the required column `wallet_address` to the `Comment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Comment" DROP COLUMN "wallet_ddress",
ADD COLUMN     "wallet_address" TEXT NOT NULL;
