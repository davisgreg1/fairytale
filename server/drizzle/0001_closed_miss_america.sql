ALTER TABLE `users` MODIFY COLUMN `emailVerified` timestamp;--> statement-breakpoint
ALTER TABLE `users` ADD `createdAt` timestamp NOT NULL;--> statement-breakpoint
ALTER TABLE `users` ADD `bookCount` int DEFAULT 0 NOT NULL;--> statement-breakpoint
CREATE INDEX `bookCount_idx` ON `users` (`bookCount`);--> statement-breakpoint
CREATE UNIQUE INDEX `email_idx` ON `users` (`email`);