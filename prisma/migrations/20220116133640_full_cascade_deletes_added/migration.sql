-- DropForeignKey
ALTER TABLE "BodyAreaMoveScore" DROP CONSTRAINT "BodyAreaMoveScore_moveId_fkey";

-- DropForeignKey
ALTER TABLE "BodyTrackingEntry" DROP CONSTRAINT "BodyTrackingEntry_userId_fkey";

-- DropForeignKey
ALTER TABLE "Club" DROP CONSTRAINT "Club_userId_fkey";

-- DropForeignKey
ALTER TABLE "Collection" DROP CONSTRAINT "Collection_userId_fkey";

-- DropForeignKey
ALTER TABLE "CompletedWorkoutPlanDayWorkout" DROP CONSTRAINT "CompletedWorkoutPlanDayWorkout_workoutPlanDayWorkoutId_fkey";

-- DropForeignKey
ALTER TABLE "CompletedWorkoutPlanDayWorkout" DROP CONSTRAINT "CompletedWorkoutPlanDayWorkout_workoutPlanEnrolmentId_fkey";

-- DropForeignKey
ALTER TABLE "GymProfile" DROP CONSTRAINT "GymProfile_userId_fkey";

-- DropForeignKey
ALTER TABLE "JournalGoal" DROP CONSTRAINT "JournalGoal_userId_fkey";

-- DropForeignKey
ALTER TABLE "JournalMood" DROP CONSTRAINT "JournalMood_userId_fkey";

-- DropForeignKey
ALTER TABLE "JournalNote" DROP CONSTRAINT "JournalNote_userId_fkey";

-- DropForeignKey
ALTER TABLE "LoggedWorkout" DROP CONSTRAINT "LoggedWorkout_userId_fkey";

-- DropForeignKey
ALTER TABLE "LoggedWorkoutMove" DROP CONSTRAINT "LoggedWorkoutMove_loggedWorkoutSetId_fkey";

-- DropForeignKey
ALTER TABLE "LoggedWorkoutMove" DROP CONSTRAINT "LoggedWorkoutMove_moveId_fkey";

-- DropForeignKey
ALTER TABLE "LoggedWorkoutMove" DROP CONSTRAINT "LoggedWorkoutMove_userId_fkey";

-- DropForeignKey
ALTER TABLE "LoggedWorkoutSection" DROP CONSTRAINT "LoggedWorkoutSection_userId_fkey";

-- DropForeignKey
ALTER TABLE "LoggedWorkoutSet" DROP CONSTRAINT "LoggedWorkoutSet_loggedWorkoutSectionId_fkey";

-- DropForeignKey
ALTER TABLE "LoggedWorkoutSet" DROP CONSTRAINT "LoggedWorkoutSet_userId_fkey";

-- DropForeignKey
ALTER TABLE "Move" DROP CONSTRAINT "Move_userId_fkey";

-- DropForeignKey
ALTER TABLE "ScheduledWorkout" DROP CONSTRAINT "ScheduledWorkout_userId_fkey";

-- DropForeignKey
ALTER TABLE "UserBenchmark" DROP CONSTRAINT "UserBenchmark_userId_fkey";

-- DropForeignKey
ALTER TABLE "UserBenchmarkEntry" DROP CONSTRAINT "UserBenchmarkEntry_userBenchmarkId_fkey";

-- DropForeignKey
ALTER TABLE "Workout" DROP CONSTRAINT "Workout_userId_fkey";

-- DropForeignKey
ALTER TABLE "WorkoutMove" DROP CONSTRAINT "WorkoutMove_moveId_fkey";

-- DropForeignKey
ALTER TABLE "WorkoutMove" DROP CONSTRAINT "WorkoutMove_userId_fkey";

-- DropForeignKey
ALTER TABLE "WorkoutMove" DROP CONSTRAINT "WorkoutMove_workoutSetId_fkey";

-- DropForeignKey
ALTER TABLE "WorkoutPlan" DROP CONSTRAINT "WorkoutPlan_userId_fkey";

-- DropForeignKey
ALTER TABLE "WorkoutPlanDay" DROP CONSTRAINT "WorkoutPlanDay_userId_fkey";

-- DropForeignKey
ALTER TABLE "WorkoutPlanDay" DROP CONSTRAINT "WorkoutPlanDay_workoutPlanId_fkey";

-- DropForeignKey
ALTER TABLE "WorkoutPlanDayWorkout" DROP CONSTRAINT "WorkoutPlanDayWorkout_userId_fkey";

-- DropForeignKey
ALTER TABLE "WorkoutPlanDayWorkout" DROP CONSTRAINT "WorkoutPlanDayWorkout_workoutId_fkey";

-- DropForeignKey
ALTER TABLE "WorkoutPlanDayWorkout" DROP CONSTRAINT "WorkoutPlanDayWorkout_workoutPlanDayId_fkey";

-- DropForeignKey
ALTER TABLE "WorkoutPlanEnrolment" DROP CONSTRAINT "WorkoutPlanEnrolment_userId_fkey";

-- DropForeignKey
ALTER TABLE "WorkoutPlanEnrolment" DROP CONSTRAINT "WorkoutPlanEnrolment_workoutPlanId_fkey";

-- DropForeignKey
ALTER TABLE "WorkoutPlanReview" DROP CONSTRAINT "WorkoutPlanReview_userId_fkey";

-- DropForeignKey
ALTER TABLE "WorkoutPlanReview" DROP CONSTRAINT "WorkoutPlanReview_workoutPlanId_fkey";

-- DropForeignKey
ALTER TABLE "WorkoutSection" DROP CONSTRAINT "WorkoutSection_userId_fkey";

-- DropForeignKey
ALTER TABLE "WorkoutSection" DROP CONSTRAINT "WorkoutSection_workoutId_fkey";

-- DropForeignKey
ALTER TABLE "WorkoutSet" DROP CONSTRAINT "WorkoutSet_userId_fkey";

-- DropForeignKey
ALTER TABLE "WorkoutSet" DROP CONSTRAINT "WorkoutSet_workoutSectionId_fkey";

-- DropForeignKey
ALTER TABLE "WorkoutTag" DROP CONSTRAINT "WorkoutTag_userId_fkey";

-- AddForeignKey
ALTER TABLE "BodyAreaMoveScore" ADD CONSTRAINT "BodyAreaMoveScore_moveId_fkey" FOREIGN KEY ("moveId") REFERENCES "Move"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Move" ADD CONSTRAINT "Move_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Collection" ADD CONSTRAINT "Collection_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GymProfile" ADD CONSTRAINT "GymProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ScheduledWorkout" ADD CONSTRAINT "ScheduledWorkout_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserBenchmark" ADD CONSTRAINT "UserBenchmark_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserBenchmarkEntry" ADD CONSTRAINT "UserBenchmarkEntry_userBenchmarkId_fkey" FOREIGN KEY ("userBenchmarkId") REFERENCES "UserBenchmark"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Club" ADD CONSTRAINT "Club_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Workout" ADD CONSTRAINT "Workout_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkoutTag" ADD CONSTRAINT "WorkoutTag_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkoutSection" ADD CONSTRAINT "WorkoutSection_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkoutSection" ADD CONSTRAINT "WorkoutSection_workoutId_fkey" FOREIGN KEY ("workoutId") REFERENCES "Workout"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkoutSet" ADD CONSTRAINT "WorkoutSet_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkoutSet" ADD CONSTRAINT "WorkoutSet_workoutSectionId_fkey" FOREIGN KEY ("workoutSectionId") REFERENCES "WorkoutSection"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkoutMove" ADD CONSTRAINT "WorkoutMove_moveId_fkey" FOREIGN KEY ("moveId") REFERENCES "Move"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkoutMove" ADD CONSTRAINT "WorkoutMove_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkoutMove" ADD CONSTRAINT "WorkoutMove_workoutSetId_fkey" FOREIGN KEY ("workoutSetId") REFERENCES "WorkoutSet"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkoutPlan" ADD CONSTRAINT "WorkoutPlan_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkoutPlanDay" ADD CONSTRAINT "WorkoutPlanDay_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkoutPlanDay" ADD CONSTRAINT "WorkoutPlanDay_workoutPlanId_fkey" FOREIGN KEY ("workoutPlanId") REFERENCES "WorkoutPlan"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkoutPlanDayWorkout" ADD CONSTRAINT "WorkoutPlanDayWorkout_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkoutPlanDayWorkout" ADD CONSTRAINT "WorkoutPlanDayWorkout_workoutId_fkey" FOREIGN KEY ("workoutId") REFERENCES "Workout"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkoutPlanDayWorkout" ADD CONSTRAINT "WorkoutPlanDayWorkout_workoutPlanDayId_fkey" FOREIGN KEY ("workoutPlanDayId") REFERENCES "WorkoutPlanDay"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkoutPlanEnrolment" ADD CONSTRAINT "WorkoutPlanEnrolment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkoutPlanEnrolment" ADD CONSTRAINT "WorkoutPlanEnrolment_workoutPlanId_fkey" FOREIGN KEY ("workoutPlanId") REFERENCES "WorkoutPlan"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompletedWorkoutPlanDayWorkout" ADD CONSTRAINT "CompletedWorkoutPlanDayWorkout_workoutPlanDayWorkoutId_fkey" FOREIGN KEY ("workoutPlanDayWorkoutId") REFERENCES "WorkoutPlanDayWorkout"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompletedWorkoutPlanDayWorkout" ADD CONSTRAINT "CompletedWorkoutPlanDayWorkout_workoutPlanEnrolmentId_fkey" FOREIGN KEY ("workoutPlanEnrolmentId") REFERENCES "WorkoutPlanEnrolment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkoutPlanReview" ADD CONSTRAINT "WorkoutPlanReview_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkoutPlanReview" ADD CONSTRAINT "WorkoutPlanReview_workoutPlanId_fkey" FOREIGN KEY ("workoutPlanId") REFERENCES "WorkoutPlan"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LoggedWorkout" ADD CONSTRAINT "LoggedWorkout_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LoggedWorkoutSection" ADD CONSTRAINT "LoggedWorkoutSection_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LoggedWorkoutSet" ADD CONSTRAINT "LoggedWorkoutSet_loggedWorkoutSectionId_fkey" FOREIGN KEY ("loggedWorkoutSectionId") REFERENCES "LoggedWorkoutSection"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LoggedWorkoutSet" ADD CONSTRAINT "LoggedWorkoutSet_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LoggedWorkoutMove" ADD CONSTRAINT "LoggedWorkoutMove_moveId_fkey" FOREIGN KEY ("moveId") REFERENCES "Move"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LoggedWorkoutMove" ADD CONSTRAINT "LoggedWorkoutMove_loggedWorkoutSetId_fkey" FOREIGN KEY ("loggedWorkoutSetId") REFERENCES "LoggedWorkoutSet"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LoggedWorkoutMove" ADD CONSTRAINT "LoggedWorkoutMove_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BodyTrackingEntry" ADD CONSTRAINT "BodyTrackingEntry_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JournalNote" ADD CONSTRAINT "JournalNote_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JournalMood" ADD CONSTRAINT "JournalMood_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JournalGoal" ADD CONSTRAINT "JournalGoal_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
