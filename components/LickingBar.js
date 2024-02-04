export default function LickingBar({positivePercentage, negativePercentage}) {
    return (
        <div className="pb-12" >
            <p className="section-title pb-2">Positive Vs. Negative comments</p>
            <div className="flex items-center bg-white border border-white rounded-full overflow-hidden font-bold text-sm text-white h-8">
                <div className="graph-line bg-gradient-to-r from-rose-400 to-orange-300" style={{ width: `${positivePercentage}%` }}>
                    👍 {positivePercentage}%
                </div>
                {100-positivePercentage-negativePercentage > 0 && (
                    <div className="graph-line  bg-[#212121]" style={{ width: `${100-negativePercentage-positivePercentage}%` }}>
                        🫤 {`${100-negativePercentage-positivePercentage}`}%
                    </div>
                )}
                <div className="graph-line  bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400" style={{ width: `${negativePercentage}%` }}>
                    👎 {negativePercentage}%
                </div>
            </div>
        </div>
    )   
}
