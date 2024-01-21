import Head from "next/head"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import Features from "@/components/Features"
import FeaturedOn from "@/components/FeaturedOn"
import Pricing from "@/components/Pricing"
import FinalCTA from "@/components/FinalCTA"
import Hero from "@/components/Hero"
import { Inter } from "next/font/google"

const inter = Inter({ subsets: ["latin"]})

export default function Index() {
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
        <Hero />     
        <FeaturedOn />
        <Features />  
        <Pricing /> 
        <FinalCTA />
        <Footer />
      </main>
    </>
  )
}
