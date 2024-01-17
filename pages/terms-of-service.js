import Head from "next/head"
import { useRouter } from "next/router"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { Livvic } from "next/font/google"
import { IoIosArrowRoundBack } from "react-icons/io"

const livvic = Livvic({ subsets: ["latin"], weight: "700"})

export default function TermsOfService() {
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
                <meta property="og:url" content="getFeedby.com/terms-of-service" />
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
            <main className="bg-[#212121]" >
                <Header />
                <div className="legal-doc">
                    <div className="flex justify-center items-center w-full">
                        <div className="space-y-6 w-full md:w-2/3 ">
                            <button onClick={() => router.push("/")} className="legal-button">
                                <IoIosArrowRoundBack size={20}/>
                                Go back
                            </button>
                            <p className={`${livvic.className} font-bold text-2xl md:text-3xl`}>Terms of service</p>
                            <div>
                                <p className={`${livvic.className} legal-title`}>Overview</p>
                                <p className="legal-text">Thank you for using Feedby ("we," "us," or "our"), a Software as a Service (SaaS) platform available at getFeedby.com. By accessing or using our services, you agree to comply with and be bound by these Terms of Service.
                                </p>
                            </div>
                            <div>
                                <p className={`${livvic.className} legal-title`}>User Agreement</p>
                                <p className="legal-text">By using Feedby, you affirm that you are at least 18 years old and capable of entering into a legally binding agreement.</p>
                            </div>
                            <div >
                                <p className={`${livvic.className} legal-title`}>SaaS Subscription</p>
                                <p className="legal-text">Feedby offers SaaS subscriptions, accessible through getFeedby.com. Payments for subscriptions are processed through Stripe. By subscribing, you agree to Stripe"s terms and conditions.</p>
                            </div>
                            <div >
                                <p className={`${livvic.className} legal-title`}>Payment and Billing</p>
                                <p className="legal-text">All payments are processed securely through Stripe. You agree to provide accurate and complete billing information. Feedby is not responsible for any charges or fees imposed by your financial institution.</p>
                            </div>
                            <div >
                                <p className={`${livvic.className} legal-title`}>Termination</p>
                                <p className="legal-text">We reserve the right to terminate or suspend your account at our discretion, without notice, if we believe you have violated these Terms of Service.</p>
                            </div>
                            <div >
                                <p className={`${livvic.className} legal-title`}>Privacy Policy</p>
                                <p className="legal-text">Your use of Feedby is also governed by our Privacy Policy. Please review the policy at <a href="getFeedby.com/pp" className="underline">getFeedby.com/pp</a>.</p>
                            </div>
                            <div >
                                <p className={`${livvic.className} legal-title`}>Intellectual Property</p>
                                <p className="legal-text">Feedby and its content are protected by intellectual property laws. You may not use, reproduce, or distribute any part of the service without our express written permission.</p>
                            </div>
                            <div >
                                <p className={`${livvic.className} legal-title`}>Limitation of Liability</p>
                                <p className="legal-text">Feedby is provided "as is," and we disclaim any warranties. We are not liable for any indirect, incidental, or consequential damages arising from your use of Feedby.</p>
                            </div>
                            <div >
                                <p className={`${livvic.className} legal-title`}>Governing Law</p>
                                <p className="legal-text">These Terms of Service are governed by the laws of Spain. Any disputes shall be resolved in the courts of Spain.</p>
                            </div>
                            <div className="pb-4">
                                <p className={`${livvic.className} legal-title`}>Contact Information:</p>
                                <p className="legal-text">Email: daniglebapuig@gmail.com <br/><br/>For any questions or concerns regarding these Terms of Service, please contact us at the provided email address. <br/><br/> Thank you for using Feedby!</p>
                                <p className="legal-text pt-6">Last updated: 31.12.2023</p>
                            </div>
                            <button onClick={() => router.push("/")} className="legal-button">
                                <IoIosArrowRoundBack size={20}/>
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
