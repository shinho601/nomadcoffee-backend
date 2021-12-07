/*
  Warnings:

  - You are about to drop the column `shopId` on the `CoffeeShopPhoto` table. All the data in the column will be lost.
  - Added the required column `coffeeShopId` to the `CoffeeShopPhoto` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "CoffeeShopPhoto" DROP CONSTRAINT "CoffeeShopPhoto_shopId_fkey";

-- AlterTable
ALTER TABLE "CoffeeShopPhoto" DROP COLUMN "shopId",
ADD COLUMN     "coffeeShopId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "CoffeeShopPhoto" ADD CONSTRAINT "CoffeeShopPhoto_coffeeShopId_fkey" FOREIGN KEY ("coffeeShopId") REFERENCES "CoffeeShop"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
