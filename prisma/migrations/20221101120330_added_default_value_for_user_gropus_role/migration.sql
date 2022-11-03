/*
  Warnings:

  - Made the column `role` on table `usergroups` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `usergroups` MODIFY `role` ENUM('MEMBER', 'ADMIN', 'USER') NOT NULL DEFAULT 'MEMBER';
