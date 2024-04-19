-- CreateEnum
CREATE TYPE "ActivityEnum" AS ENUM ('EMAIL_CONFIRMATION', 'RECOVER_PASSWORD');

-- CreateTable
CREATE TABLE "user_activity_confirmations" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "activity" "ActivityEnum" NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted" BOOLEAN NOT NULL DEFAULT false,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "user_activity_confirmations_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "user_activity_confirmations" ADD CONSTRAINT "user_activity_confirmations_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
