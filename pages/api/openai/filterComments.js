import OpenAI from "openai"

export const config = {
    maxDuration: 300
}

export default async function handler(req, res) {
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY})
    const { comments } = req.body
    const prompt  = 
        `Please analyze the following YouTube comments and extract useful feedback (if it can't help make the product better, don't add it. Comments like "Great video thanks" are not useful), bug reports, and clear questions related to the product, service, or video of the specified company or influencer. Also, you will give a number percentage of comments that are positive or negative (for example 20% negative 80% positive, this does not need to add 100% but CAN'T sum >100%). After that you'll do the same for the sentiment of the comments, set a percentage (in total these percentages do need to sum exactly 100%) for: supportive, excited, disappointed and sad. The output has to be in this JSON format (separate different comments in the same section with "<br/> -"):
            {
                "useful_feedback": "- This is a comment from the video <br/> - This is a different comment from the video <br/> - ...",
                "questions": "- This is a comment from the video <br/> - This is a different comment from the video <br/> - ...",
                "bug_reports": "- This is a comment from the video <br/> - This is a different comment from the video <br/> - ...",
                "positive_percentage": 80,
                "negative_percentage": 20,
                "angry": 5,
                "dissapointed": 5
                "supportive": 65,
                "exited": 35
            }
        Note that the comments provided are separated by “-”. Only use the comments provided, don't make new comments. Here are the comments you have to analyze: 
        ${comments}`

    try {
        const completion = await openai.chat.completions.create({
            messages: [{ role: "user", content: prompt }],
            model: "gpt-3.5-turbo-1106",
            temperature: 0,
            response_format:{ "type": "json_object" },
          })
        res.status(200).json({ data: completion.choices[0] })
    } catch (error) {
        res.status(500).json({error: error})
    }
}