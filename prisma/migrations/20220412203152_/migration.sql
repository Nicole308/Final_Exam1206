/*
  Warnings:

  - You are about to drop the column `username` on the `List` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "List" DROP CONSTRAINT "List_username_fkey";

-- AlterTable
ALTER TABLE "List" DROP COLUMN "username";
