import Link from "next/link"
import NavItems from "./NavItems"
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs"

const Navbar = () => {
  return (
    <nav className="navbar">
        <Link href="/" className="flex items-center gap-2.5 cursor-pointer">
           <div className="border px-4 rounded-md shadow-lg">
             <p className="text-2xl font-extrabold bg-gradient-to-r from-[#FE5933] via-[#f76a4a] to-[#f74118] 
            bg-clip-text text-transparent
            ">StudyBud</p>
           </div>
        </Link>

        <div className="flex items-center gap-8">
            <NavItems/>
            <SignedOut>
                <SignInButton>
                  <button className="btn-signin">Sign In</button>
                </SignInButton>
            </SignedOut>
            <SignedIn>
              <UserButton/>
            </SignedIn>
        </div>
    </nav>
  )
}

export default Navbar