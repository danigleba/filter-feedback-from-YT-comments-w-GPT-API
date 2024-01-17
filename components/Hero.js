import { useRouter } from "next/router"
import { Livvic } from "next/font/google"
import Testimonials from "@/components/Testimonials"
import LoomVideo from "@/components/LoomVideo"

const livvic = Livvic({ subsets: ["latin"], weight: "700"})

export default function Hero() {
    const router = useRouter()
    return (
        <div className="hero">
            <div>
                <div className="flex flex-col justify-center items-center lg:items-start space-y-8">
                    <h1 className={livvic.className}>Filter user feedback from your comment section</h1>
                    <p className="text-[#acacac] text-center lg:text-left md:text-lg">Your YouTube videos" comment section is filled with great user insight. But filtering the thousands of meaningless comments is too time-consuming. Let our AI do that for you and get all that user feedback, questions and bug reports in your inbox.</p>
                    <button onClick={() => router.push("/filter-comments")}>Get started</button>
                </div>
                <Testimonials />
            </div>
            <LoomVideo />
        </div>
    )
}