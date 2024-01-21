import { db } from "@/utils/firebase"
import { collection, addDoc, doc, setDoc } from "firebase/firestore"

export default async function handler(req, res) {
  const videoId = req.query.videoId
  const email = req.query.email
  console.log(req.body.aiResponse)
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
        negative_percentage: JSONData.negative_percentage || 0,
        positive_percentage: JSONData.positive_percentage || 0,
        sentiment: {
          angry: JSONData.sentiment.angry || 0,
          dissapointed: JSONData.sentiment.dissapointed || 0,
          supportive: JSONData.sentiment.supportive || 0,
          excited: JSONData.sentiment.excited || 0,
        }
      })
      res.status(201).json({ data: newReport })
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: "Internal Server Error" })
    }
} 

