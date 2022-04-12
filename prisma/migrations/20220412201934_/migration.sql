/*
  Warnings:

  - You are about to drop the `Member` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `member` to the `List` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Member" DROP CONSTRAINT "Member_listID_fkey";

-- DropForeignKey
ALTER TABLE "Member" DROP CONSTRAINT "Member_userID_fkey";

-- AlterTable
ALTER TABLE "List" ADD COLUMN     "member" TEXT NOT NULL;

-- DropTable
DROP TABLE "Member";
