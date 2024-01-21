import { Resend } from "resend"
const resend = new Resend(process.env.RESEND_API_KEY)

export default async function handler(req, res) {
    const email = req.query.email
    const videoId = req.query.videoId
    const videoTitle = req.query.videoTitle
    const filteredComments = req.body.filteredComments
    const parsedComments = JSON.parse(filteredComments)
    //Turn Arrays into html
    const feedback = parsedComments?.useful_feedback?.map((feedback) => `${feedback}`).join("<br/> · ")
    const questions = parsedComments?.questions?.map((questions) => `${questions}`).join("<br/> · ")
    const bug_reports = parsedComments?.bug_reports?.map((bug_reports) => `${bug_reports}`).join("<br/> · ")
    try { 
        const message = await resend.emails.send({
            from: "feedby@emails.danigleba.com",
            to: email,
            subject: "💬 Your video's feedback is ready!",
            html: `
                <b>Check out your full report here:</b> <a href="https://feedby.danigleba.com/report/${email}-${videoId}" target="_blank">https://feedby.danigleba.com/report/${email}-${videoId}</a> 
                <h2>${videoTitle}'s video report</h2>
                <b><h3>Positive Vs. Negative comments</h3></b> 
                👍 Positive: ${parsedComments.positive_percentage}% <br/> 
                👎 Negative: ${parsedComments.negative_percentage}% 
                <b><h3>Sentiment analysis</h3></b> 
                ❤️ Supportive: ${parsedComments.sentiment.supportive}% <br/> 
                🥳 Excited: ${parsedComments.sentiment.excited}% <br/> 
                😡 Angry: ${parsedComments.sentiment.angry}% <br/> 
                😒 Dissapointer: ${parsedComments.sentiment.dissapointed}% <br/> 
                <b><h3>Feedback</h3></b> 
                · ${feedback} <br/> 
                <b><h3>Questions</h3></b> 
                · ${questions} <br/> 
                <b><h3>Bug reports</h3></b> 
                · ${bug_reports} <br/><br/>
                Thanks for using Feedby! <br/>
                Dani.`,
        })
        res.status(200).json({ data: message })
    } catch (error) {
        res.status(500).json({error: error})
    }
} 