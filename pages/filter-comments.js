import Head from "next/head"
import Image from "next/image"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import CheckoutForm from "@/components/CheckoutForm"
import LoadingAnimation from "@/components/LoadingAnimation"
import { Inter } from "next/font/google"
import { Livvic } from "next/font/google"
import { FaPaste } from "react-icons/fa6"

const livvic = Livvic({ subsets: ["latin"], weight: "700"})
const inter = Inter({ subsets: ["latin"]})
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY_TEST)

export default function FilterComments() {
    const router = useRouter()
    const [link, setLink] = useState("")
    const [loading, setLoading] = useState(false)
    const [video, setVideo] = useState(null)
    const [videoId, setVideoId] = useState("")
    const [clientSecret, setClientSecret] = useState()
    const appearance = {
        theme: "night",
        variables: {
            colorPrimary: "#ee9d83",
        }
    }
    const loader = "auto"
    const stripeOptions = {
        clientSecret,
        appearance,
        loader
    }

    const pasteFromClipboard = async () => {
        const textFromClipboard = await navigator.clipboard.readText()
        setLink(textFromClipboard)
    }

    const CreatePaymentIntent = async () => {
        const stripe = await stripePromise
        const url = "/api/stripe/create-payment-intent?numberOfComments=" + video?.numberOfComments
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                }
            })
        const data = await response.json()
        setClientSecret(data.clientSecret)
    }
  
    const getVideoData = async () => {
        setLoading(true)
        try {
            const response = await fetch(`/api/youtube/getVideo?video_id=${videoId}`)
            if (!response.ok) {
              Router.reload()
            }
            const data = await response.json()
            setVideo(data)
          } catch (error) {
            router.reload()
        }
    }

    function getVideoId(url) {
        const match = url?.match(/[?&]v=([^?&]+)/)
        if (match && match[1]) setVideoId(match[1])
        else setVideoId("")
    }

    useEffect(() => {
        if (video && loading) {
            setLoading(false)
            CreatePaymentIntent()
        }
    }, [video])

    useEffect(() => {
        getVideoId(link)
    }, [link])
    return (
        <>
            <Head>
                {/* Basic Meta Tags */}
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta name="description" content="Your YouTube videos` comment section is filled with great user insight. But filtering the thousands of meaningless comments is too time-consuming. Let our AI do that for you and get all that user feedback, questions and bug reports in your inbox."/>
                {/* Open Graph Meta Tags */}
                <meta property="og:title" content="Feedby | Filter user feedback from your comment section" />
                <meta property="og:description" content="Your YouTube videos' comment section is filled with great user insight. But filtering the thousands of meaningless comments is too time-consuming. Let our AI do that for you and get all that user feedback, questions and bug reports in your inbox." />
                <meta property="og:image" content="/icon.png" />
                <meta property="og:url" content="getFeedby.com/filter-comments" />
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
            <main className={`${inter.className} bg-[#212121]`}>
                <Header />
                <div className={`flex flex-col items-center justify-center w-full px-8 md:px-20  ${!video ? "mb-48 h-96" : "min-h-96"}`}>
                    {!video && (
                        <>
                            <p className={`${livvic.className} text-center text-2xl md:text-3xl pb-6`}>Paste a YouTube link</p>
                            <div className="w-full md:w-2/3 px-0 lg:px-20">
                                <div className="flex justify-center gap-4 w-full">
                                    <input onChange={(e) => setLink(e.target.value)} value={link} placeholder="Paste your link here" className="w-full py-3 px-3 rounded-md bg-white text-[#212121] text-sm md:text-md" />
                                    <button onClick={() => pasteFromClipboard()} className="px-4 w-max md:w-max  bg-gradient-to-r from-[white] to-[white] hover:from-rose-400 hover:to-orange-300 hover:scale-100 text-[#0f0f0f] hover:text-white duration-0 ease-linear"><FaPaste /></button>
                                </div>
                                <button onClick={() => {videoId != "" ?  getVideoData() : ""}} className={`flex justify-center items-center gap-4 px-4 w-full mt-4 ${loading ? "cursor-auto" : ""} ${videoId == "" ? "bg-gradient-to-r from-[#0f0f0f] to-[#0f0f0f] text-white cursor-auto" : ""} hover:scale-100`}>
                                    {!loading && videoId != "" &&( <p>Scan my video</p> )}
                                    {!loading && videoId == "" &&( <p>Paste a YouTube URL 👆</p> )}
                                    {loading && (
                                        <>
                                            <p>Loading...</p>
                                            <LoadingAnimation />
                                        </>
                                    )}
                                </button>
                            </div>
                        </>
                    )}
                    {video && (
                        <>
                            <p className={`${livvic.className} text-center text-2xl md:text-3xl pb-12`}>Checkout to get {video?.authorName} users" feedback</p>
                            <div className="flex grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-24 md:gap-24 items-start justify-center">
                                {/*Checkout Form*/}
                                <div className="w-full space-y-6 order-2">
                                    {clientSecret && (    
                                        <Elements 
                                            options={stripeOptions} 
                                            stripe={stripePromise} >
                                            <CheckoutForm 
                                                clientSecret={clientSecret} 
                                                numberOfComments={video?.numberOfComments} 
                                                videoId={videoId}/>
                                        </Elements>        
                                    )}
                                </div>
                                {/*Selected video summary*/}
                                <div className="flex flex-col items-center justify-center">
                                    <div className="w-full aspect-video rounded-lg overflow-hidden">
                                    <Image
                                        src={video.thumbnail}
                                        alt="Sample Image"
                                        className="w-full h-auto"
                                        width={750}
                                        height={750}
                                    />                            
                                    </div>
                                    <div className="flex gap-4 pt-4 w-full">
                                        <div className="text-left">
                                            <p className="font-semibold break-words">{video.title}</p>
                                            <p className="text-gray-500">{video.authorName}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}   
                </div>
                <Footer />
            </main>
        </>
    )
}
