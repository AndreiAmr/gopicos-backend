/*
  Warnings:

  - You are about to drop the column `userId` on the `user_activity_confirmations` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "user_activity_confirmations" DROP CONSTRAINT "user_activity_confirmations_userId_fkey";

-- AlterTable
ALTER TABLE "user_activity_confirmations" DROP COLUMN "userId";
