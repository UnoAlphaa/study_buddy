import Image from "next/image";
import Link from "next/link";

interface CompanionCardProps {
    id : string;
    name : string;
    topic : string;
    subject: string;
    duration : number;
    color: string;
}

const CompanionCard = ({id, name, topic, subject, duration, color} : CompanionCardProps) => {
  return (
    <article className="companion-card" style={{backgroundColor : color}}>
        <div className="flex justify-between items-center">
            <div className="subject-badge">{subject}</div>
            <button className="companion-bookmark">
                <Image src="/icons/bookmark.svg" alt="bookmark" 
                height={15} width={12.5}
                />
            </button>
        </div>

        <h2 className="text-lg font-bold">{name}</h2>
        <p className="text-sm">{topic}</p>

        <div className="flex items-center gap-2">
            <Image src="/icons/clock.svg" alt="clock" width={13.5} height={13.5} /> 
            <p className="text-sm">{duration} minutes</p>
        </div>

        <Link href={`/companions/${id}`} className="w-full text-center bg-[#FE5933] px-2 py-2 rounded-md text-white">
        Launch Lesson 
        </Link>
    </article>
  )
}

export default CompanionCard