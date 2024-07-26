/*
  Warnings:

  - You are about to drop the column `from` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `to` on the `Transaction` table. All the data in the column will be lost.
  - Added the required column `from_id` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `to_id` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "from",
DROP COLUMN "to",
ADD COLUMN     "from_id" INTEGER NOT NULL,
ADD COLUMN     "to_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_from_id_fkey" FOREIGN KEY ("from_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_to_id_fkey" FOREIGN KEY ("to_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
