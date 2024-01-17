export default async function handler(req, res) {
    const email = req.query.email
    const filteredComments = req.body.filteredComments
    const parsedComments = JSON.parse(filteredComments)

    const sgMail = require("@sendgrid/mail")
    sgMail.setApiKey(process.env.SENDGRID_API_KEY)
    const message = {
        to: email,
        from: "daniglebapuig@gmail.com", 
        subject: "💬 Your users' feedback is ready! - Feedby",
        html: `<h2>Thanks for using Feedby! 🥳 Here are the comments our AI has filtered from your video:</h2> <h3><strong>Useful feedback:</strong></h3> ${parsedComments.useful_feedback} <br/><br/> <h3><strong>Questions:</strong></h3> ${parsedComments.questions} <br/><br/> <h3><strong>Bug reports:</strong></h3> ${parsedComments.bug_reports} `,
    }
    try { 
        sgMail
            .send(message)
        res.status(200).json({ message: "Email sent." })
    } catch (error) {
        res.status(500).json({error: error})
    }
}