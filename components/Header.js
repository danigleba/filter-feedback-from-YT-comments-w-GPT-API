import { useRouter } from "next/router"
import Image from "next/image"
import Link from 'next/link'

export default function Headers(props) {
    const router = useRouter()
 
    function smoothScroll(targetId) {
      const targetElement = document.getElementById(targetId);
    
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop,
          behavior: 'smooth',
        });
      }
    }
    return (
        <header className="flex justify-between items-center w-full pt-6 mb-12 md:mb-24 px-8 md:px-20">
          <Link href="/">
            <div className="flex items-center justify-start gap-2">
              <Image alt="icon" src="/icon.png" width={30} height={30}></Image>
              <p className="text-[#cfcfcf] font-semibold text-lg">Cornelio</p>
            </div>
          </Link>
          <div className="flex font-semibold gap-6 md:gap-12 text-[#cfcfcf]">
            <a className="hover:underline cursor-pointer" onClick={() => smoothScroll('pricing')}>Pricing</a>
            <a className="hover:underline cursor-pointer" onClick={() => smoothScroll('features')}>Features</a>
          </div>
        </header>
    )
}
