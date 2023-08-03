-- CreateTable
CREATE TABLE `Employees` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `job` VARCHAR(191) NOT NULL,
    `hireDate` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Vacations` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `employeeId` INTEGER NOT NULL,
    `startDate` DATETIME(3) NOT NULL,
    `endDate` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Vacations` ADD CONSTRAINT `Vacations_employeeId_fkey` FOREIGN KEY (`employeeId`) REFERENCES `Employees`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
