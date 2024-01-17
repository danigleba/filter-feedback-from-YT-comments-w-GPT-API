import Head from "next/head"
import { useRouter } from "next/router"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { Livvic } from "next/font/google"
import { IoIosArrowRoundBack } from "react-icons/io"

const livvic = Livvic({ subsets: ["latin"], weight: "700"})

export default function PrivacyPolicy() {
    const router = useRouter()
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
                <meta property="og:url" content="getFeedby.com/privacy-policy" />
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
            <main className="bg-[#212121]">
                <Header />
                <div className="legal-doc">
                    <div className="flex justify-center items-center w-full">
                        <div className="space-y-6 w-full md:w-2/3 ">
                            <button onClick={() => router.push("/")} className="legal-button">
                                <IoIosArrowRoundBack size={20} />
                                Go back
                            </button>
                            <p className={`${livvic.className} font-bold text-2xl md:text-3xl`}>Privacy policy</p>
                            <div>
                                <p className={`${livvic.className} legal-title`}>Overview</p>
                                <p className="legal-text">Thank you for using Feedby ("we," "us," or "our"), a Software as a Service (SaaS) platform available at getFeedby.com. This Privacy Policy outlines how we collect, use, and safeguard your information.
                                </p>
                            </div>
                            <div>
                                <p className={`${livvic.className} legal-title`}>Information Collected</p>
                                <p className="legal-text">We collect personal information you provide when using Feedby, including but not limited to your name, email address, and payment details processed through Stripe.</p>
                            </div>
                            <div>
                                <p className={`${livvic.className} legal-title`}>Use of Information</p>
                                <p className="legal-text">We use your information to provide and improve Feedby services, process payments, and communicate with you. We do not sell or share your information with third parties, except as required by law.</p>
                            </div>
                            <div>
                                <p className={`${livvic.className} legal-title`}>Payment Processing</p>
                                <p className="legal-text">Payment information is securely processed by Stripe. We do not store your payment details on our servers.</p>
                            </div>
                            <div>
                                <p className={`${livvic.className} legal-title`}>Cookies and Tracking</p>
                                <p className="legal-text">Feedby may use cookies and similar technologies to enhance your user experience and gather information about how you use our platform.</p>
                            </div>
                            <div>
                                <p className={`${livvic.className} legal-title`}>Data Security</p>
                                <p className="legal-text">We implement industry-standard security measures to protect your information. However, no method of transmission over the internet or electronic storage is 100% secure.</p>
                            </div>
                            <div>
                                <p className={`${livvic.className} legal-title`}>Third-Party Links</p>
                                <p className="legal-text">Feedby may contain links to third-party websites. We are not responsible for the privacy practices of these websites. Please review the privacy policies of third-party sites.</p>
                            </div>
                            <div>
                                <p className={`${livvic.className} legal-title`}>Children"s Privacy</p>
                                <p className="legal-text">Feedby is not intended for children under 18. We do not knowingly collect or store information from individuals under 18.</p>
                            </div>
                            <div>
                                <p className={`${livvic.className} legal-title`}>Changes to the Privacy Policy</p>
                                <p className="legal-text">We reserve the right to modify this Privacy Policy at any time. Changes will be effective upon posting to the Feedby website.</p>
                            </div>
                            <div>
                                <p className={`${livvic.className} legal-title`}>Governing Law</p>
                                <p className="legal-text">This Privacy Policy is governed by the laws of Spain.</p>
                            </div>
                            <div className="pb-4">
                                <p className={`${livvic.className} legal-title`}>Contact Information:</p>
                                <p className="legal-text">Email: daniglebapuig@gmail.com <br/><br/>For any questions or concerns regarding these Terms of Service, please contact us at the provided email address. <br/><br/> Thank you for using Feedby!</p>
                                <p className="legal-text pt-6">Last updated: 31.12.2023</p>
                            </div>
                            <button onClick={() => router.push("/")} className="legal-button">
                                <IoIosArrowRoundBack size={20} />
                                Go back
                            </button>
                        </div>
                    </div>
                </div>
                <Footer />
            </main>
        </>
    )
}
