/*
  Warnings:

  - Added the required column `culture` to the `Crop` table without a default value. This is not possible if the table is not empty.
  - Added the required column `farmName` to the `Crop` table without a default value. This is not possible if the table is not empty.
  - Added the required column `location` to the `Crop` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Crop" ADD COLUMN     "culture" TEXT NOT NULL,
ADD COLUMN     "farmName" TEXT NOT NULL,
ADD COLUMN     "imageUrl" TEXT,
ADD COLUMN     "location" TEXT NOT NULL;
