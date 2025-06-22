PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_repositories` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text,
	`url` text NOT NULL,
	`credentialType` text NOT NULL,
	`email` text,
	`password` text,
	`token` text,
	`created` integer NOT NULL,
	`updated` integer NOT NULL
);
--> statement-breakpoint
INSERT INTO `__new_repositories`("id", "name", "url", "credentialType", "email", "password", "token", "created", "updated") SELECT "id", "name", "url", "credentialType", "email", "password", "token", "created", "updated" FROM `repositories`;--> statement-breakpoint
DROP TABLE `repositories`;--> statement-breakpoint
ALTER TABLE `__new_repositories` RENAME TO `repositories`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE UNIQUE INDEX `repositories_url_unique` ON `repositories` (`url`);