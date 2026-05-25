/*
  Warnings:

  - You are about to drop the `dbkey` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "dbkey" DROP CONSTRAINT "dbkey_userId_fkey";

-- DropTable
DROP TABLE "dbkey";
