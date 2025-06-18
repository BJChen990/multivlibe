CREATE TABLE `repositories` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text,
	`url` text NOT NULL,
	`credentialType` text NOT NULL,
	`email` text,
	`password` text,
	`token` text,
	`created` integer,
	`updated` integer
);
--> statement-breakpoint
CREATE UNIQUE INDEX `repositories_url_unique` ON `repositories` (`url`);