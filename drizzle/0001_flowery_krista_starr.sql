CREATE TABLE `productOffers` (
	`id` int AUTO_INCREMENT NOT NULL,
	`productName` varchar(180) NOT NULL,
	`productSlug` varchar(180) NOT NULL,
	`summary` text NOT NULL,
	`askingPrice` varchar(64) NOT NULL,
	`currency` varchar(8) NOT NULL,
	`leadingBid` varchar(64),
	`bidCount` int NOT NULL DEFAULT 0,
	`status` enum('open','review','closed') NOT NULL DEFAULT 'review',
	`public` int NOT NULL DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `productOffers_id` PRIMARY KEY(`id`),
	CONSTRAINT `productOffers_productSlug_unique` UNIQUE(`productSlug`)
);
