ALTER TABLE `accounts` DROP PRIMARY KEY;--> statement-breakpoint
ALTER TABLE `verificationToken` DROP PRIMARY KEY;--> statement-breakpoint
ALTER TABLE `accounts` ADD PRIMARY KEY(`provider`,`providerAccountId`);--> statement-breakpoint
ALTER TABLE `verificationToken` ADD PRIMARY KEY(`identifier`,`token`);