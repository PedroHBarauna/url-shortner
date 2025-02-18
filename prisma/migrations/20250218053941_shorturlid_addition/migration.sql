/*
  Warnings:

  - Added the required column `shortUrlId` to the `Url` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Url" ADD COLUMN     "shortUrlId" VARCHAR(6) NOT NULL;
