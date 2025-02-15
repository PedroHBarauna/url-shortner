/*
  Warnings:

  - You are about to drop the column `created_at` on the `Url` table. All the data in the column will be lost.
  - You are about to drop the column `deleted_at` on the `Url` table. All the data in the column will be lost.
  - You are about to drop the column `origin_url` on the `Url` table. All the data in the column will be lost.
  - You are about to drop the column `short_url` on the `Url` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `Url` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `Url` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `User` table. All the data in the column will be lost.
  - Added the required column `deletedAt` to the `Url` table without a default value. This is not possible if the table is not empty.
  - Added the required column `originUrl` to the `Url` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shortUrl` to the `Url` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Url` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Url` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Url" DROP CONSTRAINT "Url_user_id_fkey";

-- AlterTable
ALTER TABLE "Url" DROP COLUMN "created_at",
DROP COLUMN "deleted_at",
DROP COLUMN "origin_url",
DROP COLUMN "short_url",
DROP COLUMN "updated_at",
DROP COLUMN "user_id",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "deletedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "originUrl" VARCHAR(100) NOT NULL,
ADD COLUMN     "shortUrl" VARCHAR(100) NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "userId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "created_at",
DROP COLUMN "updated_at",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AddForeignKey
ALTER TABLE "Url" ADD CONSTRAINT "Url_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
