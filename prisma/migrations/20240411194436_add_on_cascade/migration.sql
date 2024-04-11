-- DropForeignKey
ALTER TABLE "CallbackRequest" DROP CONSTRAINT "CallbackRequest_userId_fkey";

-- DropForeignKey
ALTER TABLE "Incentive" DROP CONSTRAINT "Incentive_userId_fkey";

-- DropForeignKey
ALTER TABLE "IncentivesOnRedeems" DROP CONSTRAINT "IncentivesOnRedeems_incentiveId_fkey";

-- DropForeignKey
ALTER TABLE "IncentivesOnRedeems" DROP CONSTRAINT "IncentivesOnRedeems_redeemId_fkey";

-- DropForeignKey
ALTER TABLE "InrTest" DROP CONSTRAINT "InrTest_userId_fkey";

-- DropForeignKey
ALTER TABLE "Medication" DROP CONSTRAINT "Medication_userId_fkey";

-- DropForeignKey
ALTER TABLE "Notification" DROP CONSTRAINT "Notification_userId_fkey";

-- DropForeignKey
ALTER TABLE "PushToken" DROP CONSTRAINT "PushToken_userId_fkey";

-- DropForeignKey
ALTER TABLE "Reminder" DROP CONSTRAINT "Reminder_medicationId_fkey";

-- DropForeignKey
ALTER TABLE "WellnessScore" DROP CONSTRAINT "WellnessScore_userId_fkey";

-- AddForeignKey
ALTER TABLE "Medication" ADD CONSTRAINT "Medication_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reminder" ADD CONSTRAINT "Reminder_medicationId_fkey" FOREIGN KEY ("medicationId") REFERENCES "Medication"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InrTest" ADD CONSTRAINT "InrTest_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WellnessScore" ADD CONSTRAINT "WellnessScore_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Incentive" ADD CONSTRAINT "Incentive_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IncentivesOnRedeems" ADD CONSTRAINT "IncentivesOnRedeems_incentiveId_fkey" FOREIGN KEY ("incentiveId") REFERENCES "Incentive"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IncentivesOnRedeems" ADD CONSTRAINT "IncentivesOnRedeems_redeemId_fkey" FOREIGN KEY ("redeemId") REFERENCES "Redeem"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CallbackRequest" ADD CONSTRAINT "CallbackRequest_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PushToken" ADD CONSTRAINT "PushToken_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
