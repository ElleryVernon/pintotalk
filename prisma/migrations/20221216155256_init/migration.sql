-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_subpinId_fkey";

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_subpin_id_fkey" FOREIGN KEY ("subpin_id") REFERENCES "Subpin"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
