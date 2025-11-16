import { lazy, Suspense } from 'react'
import { Navigate, Outlet, Route, Routes } from 'react-router-dom'

const Welcome = lazy(() => import('../stub-pages/Welcome'))
const Login = lazy(() => import('../pages/auth/LoginUser'))
const Registration = lazy(() => import('../pages/auth/Registration'))
const Notifications = lazy(() => import('../stub-pages/Notifications'))
const TweetBase = lazy(() => import('../stub-pages/TweetBase'))
const TaskBase = lazy(() => import('../stub-pages/TaskBase'))
const UserDashboard = lazy(() => import('../stub-pages/UserDashboard'))
const ResumeForm = lazy(() => import('../stub-pages/ResumeForm'))
const TopicBase = lazy(() => import('../stub-pages/TopicBase'))
const WordList = lazy(() => import('../stub-pages/WordList'))
const InterviewMgmtBase = lazy(() => import('../stub-pages/InterviewMgmtBase'))
const LinksBase = lazy(() => import('../stub-pages/LinksBase'))
const TagsBase = lazy(() => import('../stub-pages/TagsBase'))
const MemoryMapsBase = lazy(() => import('../stub-pages/MemoryMapsBase'))
const RelatedNodesBase = lazy(() => import('../stub-pages/RelatedNodesBase'))
const RelatedNodesBaseV1 = lazy(() => import('../stub-pages/RelatedNodesBaseV1'))
const MyReportsBase = lazy(() => import('../stub-pages/MyReportsBase'))
const ApnaPlaygroundBase = lazy(() => import('../stub-pages/ApnaPlaygroundBase'))

type RoutesProps = { isAuthenticated?: boolean; handleLogin?: () => void }

export function SPPAppRoutes({ isAuthenticated = false, handleLogin = () => {} }: RoutesProps) {
	return (
		<Suspense fallback={<div className="p-4">Loading...</div>}>
			<Routes>
				<Route path="/apna-playground" element={<ApnaPlaygroundBase />} />
				<Route path="/" element={<Layout />}>
					<Route
						index
						element={
							!isAuthenticated ? (
								<Navigate to="/login" />
							) : (
								<Welcome />
							)
						}
					/>
					<Route path="/tweet-base" element={<TweetBase />} />
					<Route path="/task-mgmt" element={<TaskBase />} />
					<Route path="/user-mgmt" element={<UserDashboard />} />
					<Route path="/resume-mgmt" element={<ResumeForm />} />
					<Route path="/topic-mgmt" element={<TopicBase />} />
					<Route path="/words" element={<WordList />} />
					<Route path="/my-resume" element={<ResumeForm />} />
					<Route path="/interview-mgmt" element={<InterviewMgmtBase />} />
					<Route path="/links-mgmt" element={<LinksBase />} />
					<Route path="/tags" element={<TagsBase />} />
					<Route path="/memory-maps" element={<MemoryMapsBase />} />
					<Route path="/node-story" element={<RelatedNodesBase />} />
					<Route path="/node_story_v1" element={<RelatedNodesBaseV1 />} />
					<Route path="/my-reports" element={<MyReportsBase />} />
				</Route>
				<Route path="/login" element={<Login onLogin={handleLogin} />} />
				<Route path="/register" element={<Registration />} />
				<Route path="/notifications" element={<Notifications />} />
				<Route path="*" element={<NotFound />} />
			</Routes>
		</Suspense>
	)
}

function Layout() {
	return (
		<div className="relative pl-6 pt-1 min-h-screen">
			<Outlet />
		</div>
	)
}

function NotFound() {
	return (
		<div className="flex flex-col items-center justify-center min-h-[60vh]">
			<h1 className="text-3xl font-bold text-red-600">404 Not Found</h1>
			<p className="mt-2 text-lg text-gray-500">Oops! Page not found.</p>
		</div>
	)
}


