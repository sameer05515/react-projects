import { Component, inject } from '@angular/core';
import { TopicsService } from './topics.service';
import { TreePageComponent, TreeConfig } from '../../shared/pages/tree.page';
import { Topic } from '../../core/models/api.models';

/**
 * Topics Tree Page
 * Uses the generic TreePageComponent with Topics-specific configuration
 */
@Component({
	selector: 'app-topics-tree-page',
	standalone: true,
	imports: [TreePageComponent],
	template: `
		<app-tree-page
			title="Topics Tree"
			[data$]="topicsService.list()"
			[config]="treeConfig"
			routePattern="/topics/:id"
			emptyMessage="No topics found."
		/>
	`
})
export class TopicsTreePage {
	protected topicsService = inject(TopicsService);

	protected treeConfig: TreeConfig<Topic> = {
		getId: (topic) => topic.uniqueId,
		getParentId: (topic) => topic['parentId'],
		getLabel: (topic) => topic.name
	};
}


