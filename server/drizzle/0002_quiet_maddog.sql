CREATE TABLE `fairyTales` (
	`id` varchar(255) PRIMARY KEY NOT NULL,
	`userId` varchar(255) NOT NULL,
	`title` varchar(255) NOT NULL,
	`content` text NOT NULL,
	`createdAt` timestamp NOT NULL);
--> statement-breakpoint
CREATE TABLE `payments` (
	`id` varchar(255) PRIMARY KEY NOT NULL,
	`userId` varchar(255) NOT NULL,
	`fairyTaleId` varchar(255) NOT NULL,
	`amount` int NOT NULL,
	`stripePaymentId` varchar(255),
	`status` varchar(255) NOT NULL,
	`createdAt` timestamp NOT NULL);
--> statement-breakpoint
ALTER TABLE `users` ADD `freeStoriesRemaining` int DEFAULT 3 NOT NULL;--> statement-breakpoint
ALTER TABLE `users` ADD `isSubscribed` int DEFAULT 0 NOT NULL;