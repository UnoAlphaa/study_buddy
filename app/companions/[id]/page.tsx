import CompanionComponent from "@/components/CompanionComponent";
import { getCompanion } from "@/lib/actions/companions.actions";
import { getSubjectColor } from "@/lib/utils";
import { currentUser } from "@clerk/nextjs/server";
import Image from "next/image";
import { redirect } from "next/navigation";

interface CompanionSessionPageProp {
  params : Promise<{id : string}>
}

const CompanionSession = async({params} : CompanionSessionPageProp) => {
  const {id} = await params;
  const companion = await getCompanion(id);
  const user = await currentUser();
  const {name,topic,subject,duration,title} = companion

  if(!user) redirect('/sign-in');
  if(!name) redirect("/companions");


  return (
    <main>
      <article className="flex justify-between rounded-border p-6 max-md:flex-col">
          <div className="flex items-center gap-2">
            <div className="size-[72px] flex items-center justify-center rounded-lg max-md:hidden"
            style={{backgroundColor : getSubjectColor(subject)}}
            >
              <Image src={`/icons/${subject}.svg`} alt={subject} width={35} height={35} />
            </div>
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center gap-2">
                <p className="font-bold text-2xl">{name}</p>
              <p className="subject-badge max-sm:hidden">{subject}</p>
              </div>
              <p className="text-sm text-gray-600">{topic}</p>
            </div>
          </div>

          <div className="items-start text-xl max-md:hidden">{duration} Mins</div>
      </article>

      <CompanionComponent 
      {...companion}
      companionId={id}
      userName={user.firstName!}
      userImage={user.imageUrl!}

      />
    </main>
  )
}

export default CompanionSession