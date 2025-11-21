import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
	selector: 'app-shell',
	standalone: true,
	imports: [CommonModule, RouterLink, RouterOutlet],
	template: `
		<div class="app-shell">
			<header class="app-header">
				<div class="brand">TweetApp Angular</div>
				<nav class="header-nav">
					<a routerLink="/" class="nav-link">Home</a>
					<a routerLink="/topics" class="nav-link">Topics</a>
					<a routerLink="/tasks" class="nav-link">Tasks</a>
					<a routerLink="/tags" class="nav-link">Tags</a>
					<a routerLink="/links" class="nav-link">Links</a>
					<a routerLink="/memory-maps" class="nav-link">Memory Maps</a>
				</nav>
			</header>
			<div class="app-body">
				<aside class="sidebar">
					<a routerLink="/topics">Topics</a>
					<a routerLink="/tasks">Tasks</a>
					<a routerLink="/tags">Tags</a>
					<a routerLink="/links">Links</a>
					<a routerLink="/memory-maps">Memory Maps</a>
				</aside>
				<main class="content">
					<router-outlet />
				</main>
			</div>
		</div>
	`,
	styles: [`
		.app-shell { display: flex; flex-direction: column; min-height: 100vh; }
		.app-header {
			display: flex; justify-content: space-between; align-items: center;
			height: 56px; padding: 0 16px; background: #0f172a; color: #fff;
		}
		.brand { font-weight: 600; }
		.header-nav { display: flex; gap: 12px; }
		.nav-link { color: #e2e8f0; text-decoration: none; }
		.nav-link:hover { color: #fff; }
		.app-body { display: flex; flex: 1; min-height: 0; }
		.sidebar {
			width: 200px; padding: 12px; background: #f8fafc; border-right: 1px solid #e2e8f0; display: flex; flex-direction: column; gap: 8px;
		}
		.sidebar a { color: #0f172a; text-decoration: none; }
		.sidebar a:hover { text-decoration: underline; }
		.content { flex: 1; padding: 16px; min-width: 0; }
	`]
})
export class AppShellComponent {}


