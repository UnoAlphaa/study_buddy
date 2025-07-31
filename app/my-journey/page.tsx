
import CompanionsList from "@/components/CompanionsList";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { getUserCompanions, getUserSessions } from "@/lib/actions/companions.actions";
import { currentUser } from "@clerk/nextjs/server"
import Image from "next/image";
import { redirect } from "next/navigation";

const Profile = async () => {
  const user = await currentUser()
  
  if(!user) redirect('/sign-up');

  const companions = await getUserCompanions(user.id);
  const sessionHistory = await getUserSessions(user.id);


  return (
    <main className="min-lg:w-3/4">

      <section className="flex justify-between gap-4 max-sm:flex-col items-center">
          <div className="flex gap-4 items-center">
                <Image src={user.imageUrl} alt="userImage" width={110} height={110}
                className="rounded-lg"
                />

                <div className="flex flex-col gap-2">
                    <p className="font-bold text-2xl">{user.firstName!}</p>
                    <p className="text-xs text-muted-foreground">{user.emailAddresses[0].emailAddress}</p>
                </div>
          </div>

          <div className="flex items-center gap-3">
                <div className="border-black rounded-lg border p-3 flex flex-col items-start h-fit">
                    <div className="flex items-center gap-2">
                        <Image src="/icons/check.svg" alt="checkImage" width={22} height={22} />
                        <p className="text-2xl font-bold">{sessionHistory.length}</p>
                    </div>
                    <div>Lessons completed</div>
                </div>

                <div className="border-black rounded-lg border p-3 flex flex-col items-start h-fit">
                    <div className="flex items-center gap-2">
                        <Image src="/icons/cap.svg" alt="checkImage" width={22} height={22} />
                        <p className="text-2xl font-bold">{companions.length}</p>
                    </div>
                    <div>Companions created</div>
                </div>

          </div>
      </section>

      <Accordion type="multiple">
        <AccordionItem value="recent">
          <AccordionTrigger className="text-2xl font-bold">Recent Session</AccordionTrigger>
          <AccordionContent>
            <CompanionsList title="Recent Session" companions={sessionHistory}/>
          </AccordionContent>
        </AccordionItem>
         <AccordionItem value="companions">
          <AccordionTrigger className="text-2xl font-bold">
            My Companions {`(${companions.length})`}
          </AccordionTrigger>
          <AccordionContent>
            <CompanionsList title="My Companions" companions={companions} />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </main>
  )
}

export default Profile