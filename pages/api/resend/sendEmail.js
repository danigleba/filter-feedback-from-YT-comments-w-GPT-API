import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export default async function handler(req, res) {
    const email = req.query.email
    const filteredComments = req.body.filteredComments
    const parsedComments = JSON.parse(filteredComments)

    try { 
        const message = await resend.emails.send({
            from: "feedby@emails.danigleba.com",
            to: email,
            subject: "💬 Your users' feedback is ready!",
            html: `<h2>Thanks for using Feedby! 🥳 Here are the comments our AI has filtered from your video:</h2> <h3><strong>Useful feedback:</strong></h3> ${parsedComments.useful_feedback} <br/><br/> <h3><strong>Questions:</strong></h3> ${parsedComments.questions} <br/><br/> <h3><strong>Bug reports:</strong></h3> ${parsedComments.bug_reports} `,
        })
        res.status(200).json({ data: message })
    } catch (error) {
        res.status(500).json({error: error})
    }
}