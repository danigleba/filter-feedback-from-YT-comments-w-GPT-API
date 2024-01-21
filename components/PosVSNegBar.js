const PosVSNegBar = ({ positivePercentage, negativePercentage }) => {
  return (
    <div className="pb-12 mx-8 md:mx-20">
        <p className="section-title pb-2">Positive Vs. Negative comments</p>
        <div className="flex items-center bg-white border border-white h-8 rounded-full overflow-hidden font-bold text-sm text-white">
            <div
                className="flex items-center justify-center bg-gradient-to-r from-rose-400 to-orange-300 h-full"
                style={{ width: `${positivePercentage}%` }}
            >👍 {positivePercentage}%</div>
            {100-positivePercentage-negativePercentage > 0 && (
                <div
                className="flex items-center justify-center bg-[#212121] h-full"
                style={{ width: `${100-negativePercentage-positivePercentage}%` }}
            >🫤 {`${100-negativePercentage-positivePercentage}`}%</div>
            )}
            
            <div
                className="flex items-center justify-center bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400 h-full"
                style={{ width: `${negativePercentage}%` }}
            >👎 {negativePercentage}%</div>
            
        </div>
    </div>
  );
};

export default PosVSNegBar;
