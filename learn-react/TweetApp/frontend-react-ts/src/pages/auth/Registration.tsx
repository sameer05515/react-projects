import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { BACKEND_APPLICATION_BASE_URL } from '../../config/env'

export default function Registration() {
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		username: '',
		password: '',
		confirmPassword: '',
		mobileNumber: ''
	})
	const [passwordError, setPasswordError] = useState<string | null>(null)
	const [submitting, setSubmitting] = useState(false)
	const [serverError, setServerError] = useState<string | null>(null)
	const [serverSuccess, setServerSuccess] = useState<string | null>(null)

	function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
		const { name, value } = e.target
		setFormData((prev) => ({ ...prev, [name]: value }))
		setPasswordError(null)
		setServerError(null)
		setServerSuccess(null)
	}

	async function handleSubmit(e: React.FormEvent) {
		e.preventDefault()
		if (formData.password !== formData.confirmPassword) {
			setPasswordError('Passwords do not match')
			return
		}
		const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/
		if (!passwordRegex.test(formData.password)) {
			setPasswordError('Password must contain upper, lower, number and special char')
			return
		}
		setSubmitting(true)
		setServerError(null)
		setServerSuccess(null)
		try {
			const res = await fetch(`${BACKEND_APPLICATION_BASE_URL}/api/users/register`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(formData)
			})
			if (res.status === 201) {
				setServerSuccess('User registered successfully')
			} else {
				const data = await res.json().catch(() => ({}))
				setServerError(data?.message ? `Registration error: ${data.message}` : `Registration failed with status ${res.status}`)
			}
		} catch (err: any) {
			setServerError(err?.message || 'Error registering user')
		} finally {
			setSubmitting(false)
		}
	}

	return (
		<div className="max-w-xs mx-auto p-5 border border-gray-300 rounded-lg bg-gray-50">
			<h2 className="text-2xl font-bold mb-4">Registration</h2>
			<form onSubmit={handleSubmit}>
				<div className="block mb-4">
					<label htmlFor="name" className="block font-bold mb-2">Name:</label>
					<input
						type="text"
						id="name"
						name="name"
						value={formData.name}
						onChange={handleChange}
						className="w-full px-3 py-2 border border-gray-300 rounded text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
					/>
				</div>
				<div className="block mb-4">
					<label htmlFor="email" className="block font-bold mb-2">Email ID:</label>
					<input
						type="email"
						id="email"
						name="email"
						value={formData.email}
						onChange={handleChange}
						className="w-full px-3 py-2 border border-gray-300 rounded text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
					/>
				</div>
				<div className="block mb-4">
					<label htmlFor="username" className="block font-bold mb-2">Username:</label>
					<input
						type="text"
						id="username"
						name="username"
						value={formData.username}
						onChange={handleChange}
						required
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
						onChange={handleChange}
						required
						className="w-full px-3 py-2 border border-gray-300 rounded text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
					/>
				</div>
				<div className="block mb-4">
					<label htmlFor="confirmPassword" className="block font-bold mb-2">Confirm Password:</label>
					<input
						type="password"
						id="confirmPassword"
						name="confirmPassword"
						value={formData.confirmPassword}
						onChange={handleChange}
						required
						className="w-full px-3 py-2 border border-gray-300 rounded text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
					/>
				</div>
				<div className="block mb-4">
					<label htmlFor="mobileNumber" className="block font-bold mb-2">Mobile Number:</label>
					<input
						type="tel"
						id="mobileNumber"
						name="mobileNumber"
						value={formData.mobileNumber}
						onChange={handleChange}
						className="w-full px-3 py-2 border border-gray-300 rounded text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
					/>
				</div>
				{passwordError && <div className="text-red-600 mb-2">{passwordError}</div>}
				{serverError && <div className="text-red-600 mb-2">{serverError}</div>}
				{serverSuccess && <div className="text-green-600 mb-2">{serverSuccess}</div>}
				<button
					type="submit"
					disabled={submitting}
					className="w-full py-2 px-4 bg-blue-600 text-white border-none rounded text-base cursor-pointer hover:bg-blue-700 transition-colors mb-4 disabled:opacity-50"
				>
					{submitting ? 'Registering...' : 'Register'}
				</button>
				<div>
					<p>
						Already have an account? <NavLink to="/login" className="text-blue-600 hover:underline">Login</NavLink>
					</p>
				</div>
			</form>
		</div>
	)
}


