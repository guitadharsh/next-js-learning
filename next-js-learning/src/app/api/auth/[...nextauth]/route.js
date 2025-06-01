import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"

const nextAuth = NextAuth({
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: "email", type: "text" },
                password: { label: "password", type: "text" }
            },
            async authorize(credentials) {
                const { email, password } = credentials
                console.log('credentials....', email, password)
                return {
                    username: email,
                    email: email
                }
            }
        })
    ],
    pages: {
        signIn: "/auth/login",
    },
    session: {
        strategy: "jwt"
    },
    secret: 'secret-key'
})

export { nextAuth as GET, nextAuth as POST }