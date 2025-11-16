export default function Login({ onLogin }: { onLogin: () => void }) {
	return (
		<div className="max-w-md mx-auto">
			<div className="rounded-lg border border-menu-light bg-white p-6 shadow-sm">
				<h2 className="text-xl font-semibold mb-4">Login</h2>
				<button
					onClick={onLogin}
					className="bg-menu-dark text-white px-4 py-2 rounded hover:bg-menu-darker"
				>
					Mock Login
				</button>
			</div>
		</div>
	)
}


