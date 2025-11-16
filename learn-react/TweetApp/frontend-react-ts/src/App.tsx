import { useEffect, useState } from 'react'

function App() {
	const [port, setPort] = useState<number | null>(null)
	useEffect(() => {
		// Vite dev server port is configured in vite.config.ts
		setPort(3004)
	}, [])
	return (
		<div className="min-h-screen bg-menu-light text-menu-dark">
			<header className="border-b border-menu-darker bg-white">
				<div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">
					<h1 className="text-2xl font-bold">
						<span className="text-menu-red">Tweet</span>
						<span className="text-menu-dark">App</span> - React TS
					</h1>
					<span className="text-sm text-menu-darker">
						Running on port {port ?? '...'}
					</span>
				</div>
			</header>
			<main className="mx-auto max-w-6xl px-4 py-10">
				<div className="rounded-lg border border-menu-light bg-white p-6 shadow-sm">
					<p className="text-lg">
						This is a minimal React + TypeScript + Tailwind setup mirroring the
						frontend app, served via Vite on port 3004.
					</p>
					<p className="mt-4 text-sm text-gray-600">
						Customize Tailwind colors and components as needed. See{' '}
						<code>tailwind.config.js</code>.
					</p>
				</div>
			</main>
		</div>
	)
}

export default App


