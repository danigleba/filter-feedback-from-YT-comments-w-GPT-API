import { db } from "@/utils/firebase"
import { doc, setDoc } from "firebase/firestore"

export default async function handler(req, res) {
  const videoId = req.query.videoId
  const email = req.query.email
  const data = req.body.aiResponse
  const JSONData = JSON.parse(data)
  try {
    const newReportRef = doc(db, "reports", `${email}-${videoId}`);
    const newReport = await setDoc(newReportRef, {
      email: email,
      video_id: videoId,
      feedback: JSONData.useful_feedback,
      questions: JSONData.questions,
      bug_reports: JSONData.bug_reports,
      negative_percentage: JSONData.negative_percentage,
      positive_percentage: JSONData.positive_percentage,
      sentiment: {
        angry: JSONData.sentiment.angry,
        dissapointed: JSONData.sentiment.dissapointed,
        supportive: JSONData.sentiment.supportive,
        excited: JSONData.sentiment.excited,
      }
    })
    res.status(201).json({ data: newReport })
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" })
  }
} 

