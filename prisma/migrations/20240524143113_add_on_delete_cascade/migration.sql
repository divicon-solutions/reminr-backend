-- DropForeignKey
ALTER TABLE "Redeem" DROP CONSTRAINT "Redeem_userId_fkey";

-- AddForeignKey
ALTER TABLE "Redeem" ADD CONSTRAINT "Redeem_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
