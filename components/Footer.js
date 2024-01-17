import Image from "next/image"

export default function Footer() {
    return (  
        <footer className="bg-[#0f0f0f] h-full w-full md:px-12 pb-16 pt-3 mt-24">
            <div className="grid md:grid-cols-2 grid-cols-1 gap-12 mx-8 md:mx-20 mt-12">
                {/*Company summary*/}
                <div className="flex flex-col items-center md:items-start justify-center">
                    <div className="flex items-center justify-center md:justify-start gap-2">
                        <Image alt="icon" src="/icon.png" width={30} height={40}></Image>
                        <p className="text-[#cfcfcf] font-semibold text-lg">Feedby</p>
                    </div>
                    <p className="text-sm pt-3 text-center md:text-left">Filter user feedback from your comment section</p>
                    <p className="text-sm text-center md:text-left">Feedby © 2024 All rights reserved</p>
                </div>
                <div className="md:flex md:justify-end items-center space-y-12 md:space-y-0 gap-24 text-lg md:text-sm">
                    {/*Social*/}
                    <div className="text-center md:text-left">
                        <p className="font-semibold text-lg pb-2">Social</p>
                        <div className="space-y-1">
                            <div>
                                <a href="https://twitter.com/danigleba" target="_blank" className="hover:underline px-12 md:px-0">X</a>
                            </div> 
                            <div>
                                <a href="https://www.linkedin.com/in/danigleba/" target="_blank" className="hover:underline px-12 md:px-0">LinkedIn</a>
                            </div>
                        </div>
                    </div>
                    {/*Legal*/}
                    <div className="text-center md:text-left">
                        <p className="font-semibold text-lg pb-2">Legal</p>
                        <div className="space-y-1">
                            <div>
                                <a href="/terms-of-service" className="hover:underline px-12 md:px-0">Terms of servide</a>
                            </div> 
                            <div>
                                <a href="/privacy-policy" className="hover:underline px-12 md:px-0">Privacy policy</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}