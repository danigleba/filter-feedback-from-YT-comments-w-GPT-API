import { db } from '@/utils/firebase'
import { collection, addDoc } from "firebase/firestore"; 

export default async function (req, res) {
    const student_email = req.query.student_email
    const tutor_email = req.query.tutor_email
    const day = req.query.day
    const time = req.query.time
    const recurring = req.query.recurring
    const nRecurring = req.query.nRecurring
    const profile_url = req.query.profile_url

    const timeDate = new Date(`2000-01-01T${time}:00`);
    timeDate.setHours(timeDate.getHours() + 1);
    const end_time = timeDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit',hour12: false });
    try {
        if (recurring == "true") {
            let currentDate = new Date(day)
            for (let i = 0; i < nRecurring; i++) {
                const newClass = await addDoc(collection(db, "classes"), {
                    profile_url: profile_url,
                    student: student_email,
                    tutor: tutor_email,
                    day: currentDate.toISOString().split('T')[0],
                    start_time: time,
                    end_time: end_time,
                    link: ""
                })
                currentDate.setDate(currentDate.getDate() + 7)
            }
            res.status(200).json({ classCreated: true })
        } else {
            const newClass = await addDoc(collection(db, "classes"), {
                profile_url: profile_url,
                student: student_email,
                tutor: tutor_email,
                day: day,
                start_time: time,
                end_time: end_time,
                link: ""
            })
            res.status(200).json({classCreated: true})
        }
    } catch (error) {
            res.status(500).json(error)
        }
}
