CREATE TABLE `productWaitlist` (
	`id` int AUTO_INCREMENT NOT NULL,
	`email` varchar(320) NOT NULL,
	`productName` varchar(180) NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `productWaitlist_id` PRIMARY KEY(`id`),
	CONSTRAINT `productWaitlist_email_unique` UNIQUE(`email`)
);
