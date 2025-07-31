import Link from "next/link"


const HomeBtn = () => {
  return (
    <div>
        <Link href="/" className="bg-primary text-white py-2 px-4 rounded-md w-full justify-center">
            Back to Home
        </Link>
    </div>
  )
}

export default HomeBtn