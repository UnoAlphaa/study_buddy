import CompanionCard from "@/components/CompanionCard";
import SearchInput from "@/components/SearchInput";
import SubjectFilter from "@/components/SubjectFilter";
import { getAllCompanions } from "@/lib/actions/companions.actions";
import { getSubjectColor } from "@/lib/utils";
import Image from "next/image";


const CompanionLibrary = async ({searchParams} : SearchParams ) => {
  
  const filters = await searchParams;
  const subject = filters.subject ? filters.subject : "";
  const topic = filters.topic ? filters.topic : "";

  const companions = await getAllCompanions({subject, topic})

  

  return (
    <main>
      <section className="flex justify-between gap-4 max-sm:flex-col">
        <h1>Companion Library</h1>
        <div className="flex gap-4">

        <SearchInput />
        <SubjectFilter />

        </div>
      </section>
      <section className="companions-grid">
          {companions.map((companion)=>(
            <CompanionCard key={companion.id} {...companion} color={getSubjectColor(companion.subject)} />
          ))}

          {companions.length === 0 && (
            <main className="flex  items-center justify-center">
              <div className="flex flex-col items-center justify-center">
                  <Image src={`/images/caution.png`} alt="caution" width={200} height={200} />
                  <p className="text-primary text-center text-4xl">No companions found</p>
                  <p className="text-center text-sm text-[#F75353] font-bold ">search for a valid companion</p>
              </div>
            </main>
          )}
      </section>
    </main>
  )
}

export default CompanionLibrary