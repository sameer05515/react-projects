import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { BACKEND_APPLICATION_BASE_URL } from '../../config/env'

type Props = { onLogin: () => void }

export default function LoginUser({ onLogin }: Props) {
	const navigate = useNavigate()
	const [formData, setFormData] = useState({ username: '', password: '' })
	const [submitting, setSubmitting] = useState(false)
	const [error, setError] = useState<string | null>(null)

	function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
		const { name, value } = e.target
		setFormData((prev) => ({ ...prev, [name]: value }))
	}

	async function handleLogin() {
		setSubmitting(true)
		setError(null)
		try {
			const res = await fetch(`${BACKEND_APPLICATION_BASE_URL}/api/users/login`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(formData)
			})
			if (!res.ok) {
				const data = await res.json().catch(() => ({}))
				throw new Error(data?.message || `Login failed with status ${res.status}`)
			}
			const data = await res.json()
			const token = data?.token
			if (token) {
				localStorage.setItem('token', token)
			}
			onLogin()
			navigate('/')
		} catch (err: any) {
			setError(err?.message || 'Login failed')
		} finally {
			setSubmitting(false)
		}
	}

	return (
		<div className="max-w-xs mx-auto p-5 border border-gray-300 rounded-lg bg-gray-50">
			<h2 className="text-2xl font-bold mb-4">Login</h2>
			<div className="block mb-4">
				<label htmlFor="username" className="block font-bold mb-2">Username:</label>
				<input
					type="text"
					id="username"
					name="username"
					value={formData.username}
					onChange={handleInputChange}
					className="w-full px-3 py-2 border border-gray-300 rounded text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
				/>
			</div>
			<div className="block mb-4">
				<label htmlFor="password" className="block font-bold mb-2">Password:</label>
				<input
					type="password"
					id="password"
					name="password"
					value={formData.password}
					onChange={handleInputChange}
					className="w-full px-3 py-2 border border-gray-300 rounded text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
				/>
			</div>
			{error && <div className="text-red-600 mb-3">{error}</div>}
			<div className="mb-4">
				<button
					type="button"
					onClick={handleLogin}
					disabled={submitting}
					className="w-full py-2 px-4 bg-blue-600 text-white border-none rounded text-base cursor-pointer hover:bg-blue-700 transition-colors disabled:opacity-50"
				>
					{submitting ? 'Signing in...' : 'Login'}
				</button>
			</div>
			<div>
				<p>
					New User? <NavLink to="/register" className="text-blue-600 hover:underline">Sign Up</NavLink>
				</p>
			</div>
		</div>
	)
}


