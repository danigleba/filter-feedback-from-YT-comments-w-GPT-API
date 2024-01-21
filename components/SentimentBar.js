const SentimentBar = ({ supportive, excited, angry, dissapointed }) => {
    return (
      <div className="mx-8 md:mx-20">
          <p className="section-title pb-2">Sentiment analysis</p>
          {/*Legend*/}
          <div className="grid grid-cols-2 lg:grid-cols-4 justify-center items-center gap-4 text-center text-white font-bold pb-4">
                    <div className="w-full px-2 py-2 rounded-lg bg-red-400 border-white border">
                        <p>❤️ Supportive</p>
                    </div>
                    <div className="w-full px-2 py-2 rounded-lg bg-orange-300 border-white border">
                        <p>🥳 Excited</p>
                    </div>
                    <div className="w-full px-2 py-2 rounded-lg bg-pink-300 border-white border">
                        😡 Angry
                    </div>
                    <div className="w-full px-2 py-2 rounded-lg bg-purple-400 border-white border">
                        😒 Dissapointed
                    </div>
            </div>
          <div className="flex items-center border border-white h-8 rounded-full overflow-hidden font-bold text-sm text-white">
            <div
                className="flex items-center justify-center bg-red-400 h-full truncate"
                style={{ width: `${supportive}%` }}
            ><p className="truncate">❤️ {supportive}%</p>
            </div>
            <div
                className="flex items-center justify-center bg-orange-300 h-full truncate"
                style={{ width: `${excited}%` }}
            ><p className="truncate">🥳 {excited}%</p>
            </div>
            <div
                className="flex items-center justify-center bg-pink-300 h-full truncate"
                style={{ width: `${angry}%` }}
            ><p className="truncate">😡 {angry}%</p></div>
            <div
                className="flex items-center justify-center bg-purple-400 h-full truncate"
                style={{ width: `${dissapointed}%` }}
            ><p className="truncate">😒 {dissapointed}%</p></div>
          </div>
      </div>
    )
  }
  
  export default SentimentBar;
  