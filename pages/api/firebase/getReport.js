import { db } from "@/utils/firebase"
import { doc, getDoc } from "firebase/firestore"

export default async function handler(req, res) {
    const report_id = req.query.report_id
    const reportRef = doc(db, "reports", report_id)
    const reportSnap = await getDoc(reportRef)
    try {
        res.status(200).json({ data: reportSnap.data() })
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" })
    }
} 
