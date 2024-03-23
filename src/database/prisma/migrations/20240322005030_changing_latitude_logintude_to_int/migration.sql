/*
  Warnings:

  - Changed the type of `latitude` on the `spots` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `longitude` on the `spots` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "spots" ALTER COLUMN "rate" SET DEFAULT 0,
DROP COLUMN "latitude",
ADD COLUMN     "latitude" INTEGER NOT NULL,
DROP COLUMN "longitude",
ADD COLUMN     "longitude" INTEGER NOT NULL,
ALTER COLUMN "deleted" SET DEFAULT false;