/*
  Warnings:

  - You are about to drop the `_ListToUser` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[userName]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `username` to the `List` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_ListToUser" DROP CONSTRAINT "_ListToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_ListToUser" DROP CONSTRAINT "_ListToUser_B_fkey";

-- AlterTable
ALTER TABLE "List" ADD COLUMN     "username" TEXT NOT NULL;

-- DropTable
DROP TABLE "_ListToUser";

-- CreateIndex
CREATE UNIQUE INDEX "User_userName_key" ON "User"("userName");

-- AddForeignKey
ALTER TABLE "List" ADD CONSTRAINT "List_username_fkey" FOREIGN KEY ("username") REFERENCES "User"("userName") ON DELETE RESTRICT ON UPDATE CASCADE;
