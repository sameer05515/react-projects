const steps = ['Stay calm', 'Review', 'Prioritize', 'Revise', 'Practice', 'Retrospect']

export default function Welcome() {
	return (
		<div className="max-w-5xl mx-auto px-4 py-8">
			<header className="gap-12 my-12 mx-auto mb-20 w-[90%] max-w-[75rem] text-xl">
				<h1 className="font-['Montserrat',sans-serif]">
					<span className="bg-gradient-to-r from-orange-500 to-orange-400 bg-clip-text text-transparent text-2xl font-black">
						Welcome Bro!!
					</span>
				</h1>
			</header>

			{/* circle-esque grid to mimic original animation layout without CSS modules */}
			<div className="grid grid-cols-3 sm:grid-cols-6 gap-3 justify-items-center mb-6">
				{steps.map((label, idx) => (
					<div
						key={`step_${idx}`}
						className="w-20 h-20 flex items-center justify-center rounded-full border border-orange-300 bg-orange-50 text-orange-700 text-xs font-semibold shadow-sm"
					>
						{idx + 1}: {label}
					</div>
				))}
			</div>

			<div className="text-center my-6 text-lg font-medium text-gray-700">
				{steps.join(' → ')} → Stay Calm
			</div>

			<div className="whitespace-pre-wrap bg-gray-50 p-6 rounded-lg border border-gray-200 my-6">
				<p className="text-gray-800">
					Main aim of TweetApp is to help users to
				</p>
				<ul className="list-disc pl-6 mt-2 text-gray-700">
					<li className="mb-1"><b>Quickly revise concepts for Interview Preparation.</b></li>
					<li className="mb-1">Learn new things and store learnings securely</li>
					<li>Relate learnings using Memory-maps (Topics, Questions, Tags, Words, etc.)</li>
				</ul>
			</div>
		</div>
	)
}


