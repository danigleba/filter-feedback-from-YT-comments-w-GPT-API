import Head from "next/head"
import { useRouter } from "next/router"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { Inter } from "next/font/google"
import { useEffect, useState } from "react"
import PosVSNegBar from '@/components/PosVSNegBar'
import SentimentBar from "@/components/SentimentBar"

const inter = Inter({ subsets: ["latin"]})

export default function Index() {
    const router = useRouter()
    const { report_id } = router.query
    const [report, setReport] = useState()
    const [video, setVideo] = useState()

    const getReport = async () => {
        try {
            const response = await fetch(`/api/firebase/getReport?report_id=${report_id}`, {
              method: "POST", 
              headers: {
                "Content-Type": "application/json",
              }, 
            })
            if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`)
            }
      
            const data = await response.json()
            console.log(data.data)
            setReport(data.data)
          } 
          catch (error) {
            console.error("Error fetching comments:", error.message)
          } 
    }

    const getVideo = async (videoId) => {
        try {
            const response = await fetch(`/api/youtube/getVideo?video_id=${videoId}`)
            const data = await response.json()
            setVideo(data)
          } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if (report_id) getReport()
    }, [report_id])


    useEffect(() => {
        if (report?.video_id) getVideo(report?.video_id)
    }, [report])
    return (
        <>
            <Head>
                {/* Basic Meta Tags */}
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta name="description" content="Your YouTube videos' comment section is filled with great user insight. But filtering the thousands of meaningless comments is too time-consuming. Let our AI do that for you and get all that user feedback, questions and bug reports in your inbox."/>
                {/* Open Graph Meta Tags */}
                <meta property="og:title" content="Feedby | Filter user feedback from your comment section" />
                <meta property="og:description" content="Your YouTube videos' comment section is filled with great user insight. But filtering the thousands of meaningless comments is too time-consuming. Let our AI do that for you and get all that user feedback, questions and bug reports in your inbox." />
                <meta property="og:image" content="/icon.png" />
                <meta property="og:url" content="feedby.danigleba.com" />
                <meta property="og:type" content="website" />
                {/* Twitter Meta Tags */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Feedby | Filter user feedback from your comment section" />
                <meta name="twitter:description" content="Your YouTube videos' comment section is filled with great user insight. But filtering the thousands of meaningless comments is too time-consuming. Let our AI do that for you and get all that user feedback, questions and bug reports in your inbox." />
                <meta name="twitter:image" content="/icon.png" />
                {/* Favicon */}
                <link rel="icon" href="/icon.png" />
                {/* Page Title */}
                <title>Feedby | Filter user feedback from your comment section</title>
            </Head>
            <main className={`${inter.className}`} >
                <Header/>
                <div className="mx-8 md:mx-20 text-center text-sm md:text-base">
                    <p><i>Check your email inbox at {report?.email} for all the data and the link to this page.</i></p>
                </div>
                <h2 className="text-center pt-4 mx-8 md:mx-20">{video?.title}'s video report</h2>
                <PosVSNegBar
                    positivePercentage={report?.positive_percentage}
                    negativePercentage={report?.negative_percentage}
                />
                <SentimentBar 
                    supportive={report?.sentiment.supportive}
                    excited={report?.sentiment.excited}
                    angry={report?.sentiment.angry}
                    dissapointed={report?.sentiment.dissapointed}
                />
                {/*Comments*/}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-between gap-12 text-[#212121] mx-8 md:mx-20 pt-12">
                    <div className="w-full">
                        <p className="section-title pb-2">Feedback</p>
                        <div className="flex flex-col break-words space-y-4">
                            {report?.feedback.map((item, index) => (
                                <a key={index}>
                                    <div className="bg-white rounded-md px-4 py-3">
                                        <p>{item}</p>
                                    </div>
                                </a>
                            ))}
                        </div>
                    </div>
                    <div className="w-full">
                        <p className="section-title pb-2">Questions</p>
                        <div className="flex flex-col break-words space-y-4">
                            {report?.questions.map((item, index) => (
                                <a key={index}>
                                    <div className="bg-white rounded-md px-4 py-3">
                                        <p>{item}</p>
                                    </div>
                                </a>
                            ))}
                        </div>
                       
                    </div>
                    <div className="w-full">
                        <p className="section-title pb-2">Bug reports</p>
                        <div className="flex flex-col break-words space-y-4">
                            {report?.bug_reports.map((item, index) => (
                                <a key={index}>
                                    <div className="bg-white rounded-md px-4 py-3">
                                        <p>{item}</p>
                                    </div>
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
                <Footer />
            </main>
        </>
  )
}
