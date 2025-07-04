CREATE TABLE `tasks` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`instanceId` integer NOT NULL,
	`runner` text DEFAULT 'DryRun' NOT NULL,
	`title` text NOT NULL,
	`created` integer NOT NULL,
	`updated` integer NOT NULL
);