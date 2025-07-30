import CompanionCard from "@/components/CompanionCard"
import CompanionsList from "@/components/CompanionsList"
import Cta from "@/components/CTA"
import { recentSessions } from "@/constants"
import { getAllCompanions } from "@/lib/actions/companions.actions"
import { getSubjectColor } from "@/lib/utils"

const Page = async () => {

  const companions = await getAllCompanions({limit : 3});
  const recentCompanionSessions = await getAllCompanions({limit : 10});

  return (
    <main>
     <h1 className="text-2xl underline">Popular Companions</h1>
     <section className="home-section">

        {
          companions.map(({id,name,topic,subject,duration})=>(
            <CompanionCard 
            key={id}
            id={id}
            name = {name}
            topic = {topic}
            subject = {subject}
            duration = {duration}
            color = {getSubjectColor(subject)}
            />
          ))
        }
        
        
       
     </section>

     <section className="home-section">
      <CompanionsList
      title = "Recently completed sessions"
      companions = {recentCompanionSessions}
      classNames = "w-2/3 max-lg:w-full"
      />
      <Cta/>
     </section>
    </main>
  )
}

export default Page