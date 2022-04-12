/*
  Warnings:

  - You are about to drop the column `listname` on the `List` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `List` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `name` to the `List` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "List_listname_key";

-- AlterTable
ALTER TABLE "List" DROP COLUMN "listname",
ADD COLUMN     "name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Member" ADD COLUMN     "userID" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "List_name_key" ON "List"("name");

-- AddForeignKey
ALTER TABLE "Member" ADD CONSTRAINT "Member_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
