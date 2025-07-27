import Link from "next/link"
import NavItems from "./NavItems"

const Navbar = () => {
  return (
    <nav className="navbar">
        <Link href="/" className="flex items-center gap-2.5 cursor-pointer">
           <div className="border px-4 rounded-md shadow-lg">
             <p className="text-2xl font-extrabold bg-gradient-to-r from-blue-500 via-purple-500 to-green-500 
            bg-clip-text text-transparent
            ">StudyBud</p>
           </div>
        </Link>

        <div className="flex items-center gap-8">
            <NavItems/>
            <p>Sign In</p>
        </div>
    </nav>
  )
}

export default Navbar