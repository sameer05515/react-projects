import { useCallback, useEffect, useState } from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useNavigate } from 'react-router-dom'
import { SPPAppRoutes } from './routes/SPPAppRoutes'
import { HorizontalMenu } from './routes/HorizontalMenu'

function App() {
	const [port, setPort] = useState<number | null>(null)
	const [isAuthenticated, setIsAuthenticated] = useState(false)
	const navigate = useNavigate()

	useEffect(() => {
		// Vite dev server port is configured in vite.config.ts
		setPort(3004)
		// naive auth mimic; redirect to /login if not authenticated
		if (!isAuthenticated && window.location.pathname !== '/register') {
			navigate('/login')
		}
	}, [isAuthenticated, navigate])

	const handleLogin = useCallback(() => {
		setIsAuthenticated(true)
	}, [])

	const handleLogout = useCallback(() => {
		setIsAuthenticated(false)
		navigate('/login')
	}, [navigate])
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
			<div className="z-[2000]">
				<ToastContainer position="top-center" autoClose={4000} hideProgressBar theme="light" />
			</div>
			{isAuthenticated && (
				<div className="mx-auto max-w-6xl px-4 pt-4">
					<HorizontalMenu isAuthenticated={isAuthenticated} handleLogout={handleLogout} />
				</div>
			)}
			<main className="mx-auto max-w-6xl px-4 py-6">
				<SPPAppRoutes isAuthenticated={isAuthenticated} handleLogin={handleLogin} />
			</main>
		</div>
	)
}

export default App


