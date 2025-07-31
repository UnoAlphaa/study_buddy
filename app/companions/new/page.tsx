import CompanionForm from "@/components/CompanionForm"
import { newCompanionPermission } from "@/lib/actions/companions.actions";
import { auth } from "@clerk/nextjs/server"
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";


const NewCompanion = async () => {
  const  {userId} = await auth();
  if(!userId) redirect("/sign-in")
  
    const canCreateCompanion = await newCompanionPermission();

  return (
    <main className="min-lg:w-1/3 min-md:w-2/3 items-center justify-center">
      {
        canCreateCompanion ? (
        <article className="w-full gap-4 flex flex-col">
        <h1>Companion Builder</h1>
        <CompanionForm />
      </article>
        ) : (
          <article className="companion-limit">
              <Image src='/images/limit.svg' alt="limit reached" width={360} height={330}/>
              <div className="cta-badge">
                Upgrade to a premium.
              </div>
              <h1>You have reached your companion limit, upgrade to create more companions</h1>
              <Link href='/subscription' className="bg-[#ec4040] text-white py-2 px-3 rounded-md w-full justify-center">
              Upgrade Now
              </Link>
          </article>
        )
      }
      
    </main>
  )
}

export default NewCompanion