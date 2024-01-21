import { useState, useEffect } from "react"
import Image from "next/image"
import Comment from "./Comment"

export default function Features() {
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        //Checking if the user is on mobile to determine which screenshot to use
        const checkIfMobile = () => {
            const isMobileDevice =
                typeof window !== 'undefined' &&
                window.innerWidth <= 768
            setIsMobile(isMobileDevice)
        }
        checkIfMobile()
      
        window.addEventListener('resize', checkIfMobile);
      
        return () => {
            window.removeEventListener('resize', checkIfMobile);
        }
    }, [])
    return (
        <div id="features" className="pt-12 px-8 md:px-20 pb-24">
            <p className="section-title">Filter all unuseful comments</p>
            <div className="lg:flex lg:justify-center w-full h-full">
                <div className="flex flex-col lg:flex-row items-center gap-6">
                    {/*YouTube video Mockup*/}
                    <div className="h-full w-full lg:w-1/2 rounded-lg bg-white px-3 py-3 border border-[#dddddd]">
                        <div className="aspect-video w-full bg-black rounded-md bg-center bg-cover bg-[url('/comments/video.png')]"></div>
                        <p className="text-black text-md md:text-xl font-bold pt-2">Node compatibility just got a lot better in Deno</p>
                        <div className="flex items-center gap-4 pt-2">
                            <div>
                                <Image 
                                    src={"/logos/supabase.jpeg"}
                                    alt="User Image"
                                    width={250}
                                    height={250}
                                    className="w-8 md:w-10 aspect-square rounded-full bg-black"
                                />
                            </div>
                            <div>
                                <p className="text-black text-md font-semibold">Supabase</p>
                                <p className="text-gray-500 text-xs font-light">19.6k subscribers</p>
                            </div>
                        </div>
                    </div>
                    {/*Bad comments*/}
                    <div className="flex flex-col items-start justify-center gap-6 w-full lg:w-1/2">
                        <Comment 
                            time="2 days ago"
                            comment="This video rekindled my interest in Dadaism." 
                            username="@jessehogan7794"
                            image="/comments/default1.jpeg"/>
                        <Comment 
                            time="6 days ago"
                            comment="good ~" 
                            username="@sodongtongtong"
                            image="/comments/default2.jpeg"/>
                        <Comment 
                            time="22 days ago"
                            comment="Imagine using this hahahaha 😂" 
                            username="@hero_donate23"
                            image="/comments/default5.jpeg"/>
                        <Comment 
                            time="3 weeks ago"
                            comment="Not helpful" 
                            username="@mero_lunar"
                            image="/comments/default3.webp" />
                    </div>
                </div>
            </div>
            <p className="section-title pt-24">Get all feature requests and bug reports in your inbox</p>
            {/*Good comments*/}
            <div className="flex flex-wrap items-start justify-center gap-6 w-full">
                <Comment 
                    time="3 months ago"
                    comment="question. You are setting the expo config plugin. There is no need to touch the native code when building with expo eas" 
                    username="@bartoindahouse"
                    image="/comments/bartoindahouse.jpeg" />
                <Comment 
                    time="2 years ago"
                    comment="It seems like the radio buttons for the CRUD (in this case SIUD!) operation should be checkboxes." 
                    username="@joncrowell9289"
                    image="/comments/joncrowell9289.jpeg" />
                <Comment 
                    time="3 months ago"
                    comment="Please redo this with the app router :)" 
                    username="@jorims8537"
                    image="/comments/jorims8537.jpeg" />
                <Comment 
                    time="2 weeks ago"
                    comment="The Chat function for example no longer deploys (i have pinpointed it to the AI library import from Vercel)  Can you or anyone else reproduce this?" 
                    username="@cjpettigrew"
                    image="/comments/cjpettigrew.jpeg" />
                <Comment 
                    time="2 weeks ago"
                    comment="Please make sure you update license to BSL license if not I would see Cloud operators selling the same." 
                    username="@jamessathyapal"
                    image="/comments/jamessathyapal.jpeg" />    
            </div>
            <p className="section-title pt-24">See how your users feel about the video</p>
            <div className="px-2 py-2 bg-white rounded-lg">
                <div className={`w-full aspect-[9/16] md:aspect-video bg-cover bg-top md:bg-center rounded-lg ${isMobile ? "bg-[url('/screenshot-mobile.png')]" : "bg-[url('/screenshot.png')]"}`}></div>
            </div>
        </div>
    )
}