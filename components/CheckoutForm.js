import { PaymentElement, useStripe, useElements, LinkAuthenticationElement} from "@stripe/react-stripe-js"
import { useRouter } from "next/router"
import { useEffect, useState  } from "react";

export default function CheckoutForm({ clientSecret, userEmail, numberOfComments, videoId}) {
  const router = useRouter()
  const stripe = useStripe()
  const elements = useElements()
  const [email, setEmail] = useState(userEmail)
  const [message, setMessage] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [userPayed, setUserPayed] = useState(false)
  //const [comments, setComments] = useState("")
  const [filteredComments, setFilteredComments] = useState("")

  useEffect(() => {
    if (!stripe || !clientSecret) {
      return;
    }

    /*const clientSecret2 = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) {
      return;
    }*/

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case "succeeded":
          setMessage("Payment succeeded!");
          break;
        case "processing":
          setMessage("Your payment is processing.");
          break;
        case "requires_payment_method":
          setMessage("");
          break;
        default:
          setMessage("Something went wrong.");
          break;
      }
    });
  }, [stripe]);


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: "http://localhost:300",
      },
      redirect: "if_required"
    });

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      if (paymentIntent.status == "succeeded") handleSuccesfulPayment()
    }
    )
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
      //setComments(comments.join("/"))
        return comments.join("/")
    } catch (error) {
      console.error('Error fetching comments:', error.message)
    } 
  }

  const filterComments = async (comments) => {
    try {
      const response = await fetch('/api/openai/filterComments', {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ comments }), 
      })
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
      }

      const data = await response.json()
      console.log(data)
    } catch (error) {
      console.error('Error fetching comments:', error.message)
    } 
  }

  const handleSuccesfulPayment = async () => {
    setUserPayed(true)
    const comments = await getAllComments()
    filterComments(comments)
    //When we get the answer we send an email
  }

    const paymentElementOptions = {
      layout: "tabs",
    }
  const price = (parseInt(numberOfComments) / 1000) >= 0.5 ?  parseInt(numberOfComments) / 1000 : "1"
  return (
    <>
      {!userPayed && (
        <form id="payment-form" onSubmit={handleSubmit}>
        <LinkAuthenticationElement
          onChange={(e) => setEmail(e)}
          value={email}
        options={paymentElementOptions} 
        className="pb-3"/>
        <PaymentElement id="payment-element" options={paymentElementOptions} />
        <button className="w-full mt-8 hover:scale-100" disabled={isLoading || !stripe || !elements} id="submit">
          <span id="button-text">
            {isLoading ? 
              <div className="flex justify-center items-center gap-4">
                Loading...
                <div role="status">
                                              <svg aria-hidden="true" className="w-6 h-6 text-white animate-spin fill-[#212121]" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                  <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                                  <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                                              </svg>
                                        </div>
              </div> 
              : 
              `Checkout $${parseFloat(price).toFixed(2)}`}
          </span>
        </button>
        {/* Show any error or success messages */}
        {message && <div className="text-center pt-2" id="payment-message">{message}</div>}
      </form>
      )}
      {userPayed && (
        <div>
          <p>Reading your comments...</p>
          <p>Please don't close this wintow</p>
        </div>
      )}
      
    </>
  )
}

