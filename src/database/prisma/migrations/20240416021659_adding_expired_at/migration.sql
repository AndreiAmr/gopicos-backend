/*
  Warnings:

  - Added the required column `expiredAt` to the `user_activity_confirmations` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "user_activity_confirmations" ADD COLUMN     "expiredAt" TIMESTAMP(3) NOT NULL;
