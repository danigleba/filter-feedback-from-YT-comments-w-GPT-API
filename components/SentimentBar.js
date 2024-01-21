export default function SentimentBar({ supportive, excited, angry, dissapointed }) {
    return (
        <div>
            <p className="section-title pb-2">Sentiment analysis</p>
            <div className="grid grid-cols-2 lg:grid-cols-4 justify-center items-center gap-4 text-center text-white font-bold pb-4">
                <div className="graph-legend bg-red-400">
                    ❤️ Supportive
                </div>
                <div className="graph-legend bg-orange-300">
                    🥳 Excited
                </div>
                <div className="graph-legend bg-pink-300">
                    😡 Angry
                </div>
                <div className="graph-legend bg-purple-400">
                    😒 Dissapointed
                </div>
            </div>
            <div className="flex items-center border border-white rounded-full overflow-hidden font-bold text-sm text-white h-8">
                <div className="graph-line bg-red-400" style={{ width: `${supportive}%` }}>
                    <p className="truncate">❤️ {supportive}%</p>
                </div>
                <div className="graph-line bg-orange-300" style={{ width: `${excited}%` }}>
                    <p className="truncate">🥳 {excited}%</p>
                </div>
                <div className="graph-line bg-pink-300" style={{ width: `${angry}%` }}>
                    <p className="truncate">😡 {angry}%</p>
                </div>
                <div className="graph-line bg-purple-400" style={{ width: `${dissapointed}%` }}>
                    <p className="truncate">😒 {dissapointed}%</p>
                </div>
            </div>
        </div>
    )
}
  