/*
  Warnings:

  - You are about to drop the column `expiredAt` on the `user_activity_confirmations` table. All the data in the column will be lost.
  - Added the required column `expiresAt` to the `user_activity_confirmations` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "user_activity_confirmations" DROP COLUMN "expiredAt",
ADD COLUMN     "expiresAt" TIMESTAMP(3) NOT NULL;
