'use client'
import { useSession } from "next-auth/react"

export default function Welcome() {
    const { data: session, update } = useSession()
    const handleClick = async () => {
        update({
            email: "adharsh.d@updated.com"
        })
    }
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-white text-amber-300">
            <div>
                Hi, Welcome Mr {session?.user?.email}
            </div>
            <div>
                <button
                    className="p-4 bg-amber-900 rounded-2xl mt-8"
                    onClick={() => handleClick()}
                >
                    UPDATE SESSION
                </button>
            </div>
        </div>
    )
}