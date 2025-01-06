import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import jwt from "jsonwebtoken"; 

const JWT_SECRET = "your-static-jwt-secret"; 
const NEXTAUTH_SECRET = "your-static-nextauth-secret"; 

// Define the NextAuth options with TypeScript
export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Example of custom authorization (replace with your actual authentication API)
        const res = await fetch("http://localhost:5000/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: credentials?.email,
            password: credentials?.password,
          }),
        });
        console.log('respnose', res)

        const user = await res.json();

        // Check if user exists and the response is successful
        if (res.ok && user) {
          // Returning user object that will be available in JWT callback
          return {
            id: user.id,
            email: user.email,
            name: user.name,
            token: user.token, // This token might be used for further API calls
          };
        }

        // Return null if login fails
        return null;
      },
    }),
  ],

  callbacks: {
    // This callback is triggered whenever the JWT is updated (on login or session refresh)
    async jwt({ token, user }) {
      // If the user object is available, populate the JWT token
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.jwt = user.token;  // Attach token to JWT for use in API calls
      }

      // You can further validate or extend the JWT here
      if (token.jwt) {
        try {
          // Verify JWT (Optional, for security, to ensure the token is valid)
          jwt.verify(token.jwt, JWT_SECRET);  // Verify the token is signed properly
        } catch (error) {
          console.error("Invalid token:", error);
          return {};  // If invalid, reset the token (optional)
        }
      }

      return token;  // Return the updated token object
    },

    // This callback is triggered when the session is being returned
    async session({ session, token }) {
      // Attach token data to the session object
      if (token) {
        session.id = token.id;
        session.email = token.email;
        session.name = token.name;
        session.token = token.jwt;  // Add JWT to session to access in client-side
      }
      return session;  // Return session with the added token
    },
  },

  // Set a secret key for session and JWT token signing
  secret: NEXTAUTH_SECRET, 

  // Session configuration
  session: {
    strategy: "jwt",  // Store session as a JWT instead of in a database
  },

  pages: {
    // Redirect user to the login page if not authenticated
    signIn: "/auth",
  },

  // JWT configuration
  jwt: {
    secret: JWT_SECRET,  // Secret used to sign JWT
  },
};

export default NextAuth(authOptions);
