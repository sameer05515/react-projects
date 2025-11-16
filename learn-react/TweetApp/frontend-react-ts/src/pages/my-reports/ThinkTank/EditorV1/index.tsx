import { useEffect, useMemo, useState } from 'react'

type TodoItem = {
	id: string
	title: string
	done: boolean
	createdAt: number
}

const STORAGE_KEY = 'myreports_todo_v1'

function loadTodos(): TodoItem[] {
	try {
		const raw = localStorage.getItem(STORAGE_KEY)
		if (!raw) return []
		const parsed = JSON.parse(raw)
		if (Array.isArray(parsed)) {
			return parsed
		}
		return []
	} catch {
		return []
	}
}

function saveTodos(items: TodoItem[]) {
	localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
}

export default function EditorV1() {
	const [items, setItems] = useState<TodoItem[]>(() => loadTodos())
	const [title, setTitle] = useState('')
	const [filter, setFilter] = useState<'all' | 'open' | 'done'>('all')

	useEffect(() => {
		saveTodos(items)
	}, [items])

	function addItem() {
		const t = title.trim()
		if (!t) return
		const newItem: TodoItem = {
			id: crypto.randomUUID(),
			title: t,
			done: false,
			createdAt: Date.now()
		}
		setItems((prev) => [newItem, ...prev])
		setTitle('')
	}

	function toggleItem(id: string) {
		setItems((prev) => prev.map((it) => (it.id === id ? { ...it, done: !it.done } : it)))
	}

	function removeItem(id: string) {
		setItems((prev) => prev.filter((it) => it.id !== id))
	}

	function clearDone() {
		setItems((prev) => prev.filter((it) => !it.done))
	}

	const filtered = useMemo(() => {
		if (filter === 'open') return items.filter((i) => !i.done)
		if (filter === 'done') return items.filter((i) => i.done)
		return items
	}, [items, filter])

	const openCount = items.filter((i) => !i.done).length
	const doneCount = items.length - openCount

	return (
		<div className="mt-6 rounded-lg border border-gray-200 bg-white p-4">
			<div className="flex items-center justify-between mb-4">
				<h3 className="text-lg font-semibold">Todo - Version 1</h3>
				<div className="text-sm text-gray-600">
					<span className="mr-3">Open: {openCount}</span>
					<span>Done: {doneCount}</span>
				</div>
			</div>

			<div className="flex gap-2 mb-4">
				<input
					placeholder="Add a new todo..."
					value={title}
					onChange={(e) => setTitle(e.target.value)}
					onKeyDown={(e) => {
						if (e.key === 'Enter') addItem()
					}}
					className="flex-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
				/>
				<button
					type="button"
					onClick={addItem}
					className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
				>
					Add
				</button>
			</div>

			<div className="flex items-center gap-2 mb-4">
				<button
					className={`px-3 py-1 rounded text-sm ${filter === 'all' ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-800'}`}
					onClick={() => setFilter('all')}
				>
					All
				</button>
				<button
					className={`px-3 py-1 rounded text-sm ${filter === 'open' ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-800'}`}
					onClick={() => setFilter('open')}
				>
					Open
				</button>
				<button
					className={`px-3 py-1 rounded text-sm ${filter === 'done' ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-800'}`}
					onClick={() => setFilter('done')}
				>
					Done
				</button>
				<div className="ml-auto">
					<button
						className="px-3 py-1 rounded text-sm bg-red-50 text-red-700 border border-red-200 hover:bg-red-100"
						onClick={clearDone}
					>
						Clear done
					</button>
				</div>
			</div>

			<ul className="divide-y divide-gray-200">
				{filtered.length === 0 && (
					<li className="py-6 text-center text-gray-500 text-sm">No items</li>
				)}
				{filtered.map((it) => (
					<li key={it.id} className="py-3 flex items-center gap-3">
						<input
							type="checkbox"
							checked={it.done}
							onChange={() => toggleItem(it.id)}
							className="h-4 w-4"
						/>
						<div className={`flex-1 ${it.done ? 'line-through text-gray-400' : ''}`}>
							{it.title}
						</div>
						<button
							onClick={() => removeItem(it.id)}
							className="text-red-600 text-sm hover:underline"
						>
							Delete
						</button>
					</li>
				))}
			</ul>
		</div>
	)
}


