/*
  Warnings:

  - You are about to drop the column `voteCount` on the `candidates` table. All the data in the column will be lost.
  - You are about to drop the column `hasVoted` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `candidates` DROP COLUMN `voteCount`,
    MODIFY `vision` TEXT NOT NULL,
    MODIFY `mission` TEXT NOT NULL;

-- AlterTable
ALTER TABLE `users` DROP COLUMN `hasVoted`,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- CreateTable
CREATE TABLE `votes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `userId` INTEGER NOT NULL,
    `candidateId` INTEGER NOT NULL,

    UNIQUE INDEX `votes_userId_key`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `votes` ADD CONSTRAINT `votes_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `votes` ADD CONSTRAINT `votes_candidateId_fkey` FOREIGN KEY (`candidateId`) REFERENCES `candidates`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
