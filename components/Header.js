import { useRouter } from "next/router"
import Image from "next/image"
import Link from "next/link"

export default function Headers() {
  const router = useRouter()

  function smoothScroll(targetId) {
    const targetElement = document.getElementById(targetId)
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop,
        behavior: "smooth",
       })
    }
  }
  return (
    <header className="header">
      <Link href="/">
        <div className="flex items-center justify-start gap-2">
          <Image alt="Icon" src="/icon.png" width={30} height={30}></Image>
          <p className="text-[#cfcfcf] font-semibold text-lg">Feedby</p>
        </div>
      </Link>
      {router.pathname === "/" && (
        <div className="flex font-semibold gap-6 md:gap-12 text-[#cfcfcf]">
          <p className="hover:underline cursor-pointer" onClick={() => smoothScroll("pricing")}>Pricing</p>
          <p className="hover:underline cursor-pointer" onClick={() => smoothScroll("features")}>Features</p>
        </div>
      )}
    </header>
  )
}
