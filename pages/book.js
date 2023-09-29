import { Inter } from 'next/font/google'
import Header from '@/components/Header'
import { useState, useEffect } from 'react'
import {onAuthStateChanged} from "firebase/auth"
import {auth} from '@/utils/firebase'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { stripe } from "@stripe/stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import { Elements } from "@stripe/react-stripe-js"
import CheckoutForm from '@/components/CheckoutForm'

const inter = Inter({ subsets: ['latin'] })
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY)

export default function Home() {
    const router = useRouter()
    const [state, setState] = useState("Find tutor")
    const [user, setUser] = useState({})
    const [tutor, setTutor] = useState("")
    const [matchTutor, setMatchTutor] = useState({})
    const [paidCalsses, setPaidClasses] = useState()
    const [price, setPrice] = useState(0)
    const [clientSecret, setClientSecret] = useState()

    //Booking classes
    const findTutor = async () => {
        const url = "/api/classes/find_tutor?tutor=" + tutor   
        fetch(url)
            .then(response => response.json())
            .then(data => setMatchTutor(data.data[0]))    
    }

    const addTutor = async () => {
        const url = "/api/classes/add_tutor?matchTutor=" + matchTutor.email + "&email=" + user?.email
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        })
        const data = await response.json()
        
        const url2 = "/api/classes/get_paid_classes?tutor_email=" + matchTutor?.email + "&student_email=" + user?.email
        fetch(url2)
            .then(response => response.json())
            .then(data => setPaidClasses(data.data))
    }

    useEffect(() => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
            const url = "/api/auth/getStudent?email=" + auth.currentUser.email
            fetch(url)
                .then(response => response.json())
                .then(data => setUser(data.data))     
        } 
      })    
    }, [])

    useEffect(() => {
        findTutor()
      }, [tutor])

    useEffect(() => {
        if (paidCalsses > 0) {
            setState("Find spot")
        } else if (paidCalsses == 0) {
            setState("Buy classes")
        }
    }, [paidCalsses])
      

    //Buying classes
    const createPaymentIntent = async () => {
        if (price > 0) {
            const stripe = await stripePromise

            const url = "/api/stripe/create-payment-intent?tutor_email=" + matchTutor?.email + "&student_email" + user?.email + "&price=" + price
            const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                }
            })
            const data = await response.json()
            setClientSecret(data.clientSecret)
        }   
    }
   return (
    <main>
        <Header user={auth.currentUser}/>
        {state == "Find tutor" ? (
             <div className="flex flex-col">
                <label className="block mb-2 text-sm font-medium">Con quién quieres hacer clases</label>
                <input onChange={(e) => setTutor(e.target.value)} placeholder="Nombre Apellido" className="placeholder-[#c9c9c9] border border-[#333533] text-gray-900 sm:text-sm rounded-xl block w-full p-2.5"/>
                {matchTutor ? (
                    <button onClick={addTutor} className='p-8 bg-white shadow-md'>
                        <div className="flex items-center gap-4 justify-center">
                            <div>
                                <p className="font-bold text-lg">{matchTutor?.username}</p>
                            </div>
                            <Image className='rounded-full' alt="Tutor's profile picture" height={50} width={50} src={matchTutor?.profile_url}/>
                        </div>
                    </button>
                ) : (<></>)}
            </div>
        ) : (<></>)}
        
        {state == "Find spot" ? (
            <div>
                <input type="date"></input>
                <input type="time"></input>
                <p>Cada semana?</p>
                <input type="checkbox"></input>
                <p>cuantas clases quieres reservar</p>
                <input type="number"></input>
             </div>
        ) : (<></>)}
        {state == "Buy classes" ? (
            <div>
                {price}
                <p>No te quedan clases con {matchTutor.username}, comprar más para reservar clases</p>
                <div>
                    {price}
                    <button className='px-4 py-2 bg-red-200 rounded' onClick={() => setPrice(1*matchTutor.prices.one_class * 100)} type="submit">Checkout 1 class</button>
                    <button className='px-4 py-2 bg-blue-200 rounded' onClick={() => setPrice(10*matchTutor.prices.ten_classes * 100)} type="submit">Checkout 10 classes</button>
                    <button className='px-4 py-2 bg-green-200 rounded' onClick={() => setPrice(20*matchTutor.prices.twenty_classes * 100)} type="submit">Checkout 20 class</button>

                </div>
                <button onClick={createPaymentIntent}>Chektou</button>

                <Elements stripe={stripePromise}>
                    <CheckoutForm clientSecret={clientSecret} />
                </Elements>
             </div>

        ) : (<></>)}
       


    </main>
  )
}
