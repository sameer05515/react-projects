import { NavLink, useSearchParams } from 'react-router-dom'

function TodoV1() {
	return (
		<div className="mt-6 rounded-lg border border-gray-200 bg-white p-4">
			<h3 className="text-lg font-semibold mb-2">Todo - Version 1</h3>
			<p className="text-sm text-gray-700">Admin module placeholder for creating/updating todos and settings.</p>
		</div>
	)
}

function DataSourcesV1() {
	return (
		<div className="mt-6 rounded-lg border border-gray-200 bg-white p-4">
			<h3 className="text-lg font-semibold mb-2">SourceDetails - Version 1</h3>
			<p className="text-sm text-gray-700">Collect and display source details. Placeholder view.</p>
		</div>
	)
}

export default function MyReportsBase() {
	const [searchParams] = useSearchParams()
	const version = searchParams.get('version') || ''
	return (
		<div className="rounded-lg border border-menu-light bg-white p-6 shadow-sm">
			<h2 className="text-xl font-semibold">My Reports</h2>
			{!version && (
				<div className="mt-4 space-y-6">
					<div className="text-center">
						<NavLink to={`/my-reports?version=todo-v1`} className="text-blue-600 hover:underline font-medium text-sm block">
							<div>Todo - Version 1 -</div>
						</NavLink>
						<div className="text-gray-700 text-sm">
							We plan to develop it as an admin module for create/update of todos and related settings.
						</div>
					</div>
					<div className="text-center">
						<NavLink to={`/my-reports?version=todo-v2`} className="text-blue-600 hover:underline font-medium text-sm block">
							<div>Todo - Version 2</div>
						</NavLink>
						<div className="text-gray-700 text-sm">
							View module for all todos as per access rules (upcoming feature).
						</div>
					</div>
					<div className="text-center">
						<NavLink to={`/my-reports?version=datasources-v1`} className="text-blue-600 hover:underline font-medium text-sm block">
							<div>SourceDetails - Version 1</div>
						</NavLink>
						<div className="text-gray-700 text-sm">We plan to collect and display all SourceDetails here.</div>
					</div>
				</div>
			)}

			{version === 'todo-v1' && <TodoV1 />}
			{version === 'todo-v2' && (
				<div className="text-center text-lg mt-6">
					Due to recent design changes (26/Jan/2025), todo-v2-view is temporarily unavailable. We'll resume v2 soon. Thanks for your patience!
				</div>
			)}
			{version === 'datasources-v1' && <DataSourcesV1 />}
		</div>
	)
}


