import { useState } from "react"
import { useRouter } from "next/router"
import { PaymentElement, useStripe, useElements, LinkAuthenticationElement } from "@stripe/react-stripe-js"
import LoadingAnimation from "./LoadingAnimation"

export default function CheckoutForm({ clientSecret, numberOfComments, videoId, videoTitle }) {
  const router = useRouter()
  const stripe = useStripe()
  const elements = useElements()
  const paymentElementOptions = {
    layout: "tabs",
  }
  const price = (parseInt(numberOfComments) / 1000) >= 0.5 ?  parseInt(numberOfComments) / 1000 : "1"
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [status, setStatus] = useState("Requires Payment")
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    handleSuccesfulPayment() 
    /*Commenting for now as I want users to test the service for Free for now
    const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: "http://localhost:300",
        },
        redirect: "if_required"
      })
  
      stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
        if (paymentIntent.status == "requires_payment_method") setIsLoading(false)
        if (paymentIntent.status == "succeeded") handleSuccesfulPayment()
    })*/
  }

  const getAllComments = async () => {
    try {
      const response = await fetch(`/api/youtube/getComments?videoId=${videoId}`)
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
      }
      const data = await response.json()
      const comments = data.comments.map(
        (comment, index) =>
          `${comment.text}`
      )

      const allComments = comments.join("-")
      return allComments.replaceAll("<br>", "")
    } 
    catch (error) {
      console.error("Error fetching comments:", error.message)
    } 
  }

  const filterComments = async (comments) => {
    try {
      const response = await fetch("/api/openai/filterComments", {
        method: "POST", 
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ comments }), 
      })
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
      }

      const data = await response.json()
      return data.data.message.content
    } 
    catch (error) {
      console.error("Error fetching comments:", error.message)
    } 
  }

  const uploadToFirebase = async (aiResponse) => {
    try {
      const response = await fetch(`/api/firebase/uploadReport?email=${email}&videoId=${videoId}`, {
        method: "POST", 
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ aiResponse }), 
      })
    } 
    catch (error) {
      console.error("Error fetching comments:", error.message)
    } 
  }

  const sendEmail = async (filteredComments, email) => {
    try {
      const response = await fetch(`/api/resend/sendEmail?email=${email}&videoId=${videoId}&videoTitle=${videoTitle}`, {
        method: "POST", 
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ filteredComments }), 
      })
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
      }
    } 
    catch (error) {
      console.error("Error fetching comments:", error.message)
    } 
  }

  const handleSuccesfulPayment = async () => {
    setStatus("Filtering comments")
    const comments = await getAllComments()
    const filteredComments = await filterComments(comments)
    await uploadToFirebase(filteredComments)
    await sendEmail(filteredComments, email)
    router.push(`/report/${email}-${videoId}`)
  }
  return (
    <>
      {status == "Requires Payment" && (
        <form id="payment-form" onSubmit={handleSubmit}>
          <LinkAuthenticationElement
            id="email-element"
            options={paymentElementOptions}
            onChange={(e) => setEmail(e.value.email)}/> 
            {/*className="pb-3"*/}
          {/*Commenting for now as I want users to test the service for Free for now
          <PaymentElement 
            id="payment-element" 
            options={paymentElementOptions}/>*/}
          <button 
            id="submit"
            disabled={isLoading || !stripe || !elements}
            className="w-full mt-8 hover:scale-100">
            <span id="button-text">
              {isLoading ? 
                <div className="flex justify-center items-center gap-4">
                  Loading...
                  <LoadingAnimation />
                </div> 
                : 
                `Filter comments`} {/*${parseFloat(price).toFixed(2)}`}*/}
            </span>
          </button>
        </form>     
      )}
      {status == "Filtering comments" && (
        <div className="text-center font-bold text-2xl space-y-6 pt-6 md:pt-0">
          <p className="text-green-400">Succes!</p> {/*Payment successful*/}
          <div className="flex items-center justify-center gap-4">
            <p className="text-xl md:text-2xl">Reading your comments...</p>
            <LoadingAnimation />
          </div>
          <p className="text-base font-light">This may take up to a couple of minutes. <br/> Please don"t close this window.</p>
        </div>
      )}
    </>
  )
}