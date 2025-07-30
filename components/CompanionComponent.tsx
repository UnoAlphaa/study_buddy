"use client"
import { cn, configureAssistant, getSubjectColor } from '@/lib/utils'
import { vapi } from '@/lib/vapi.sdk';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react'
import Lottie, { LottieRefCurrentProps } from "lottie-react";
import soundwaves from '../constants/soundwaves.json'
import { addToSessionHistory } from '@/lib/actions/companions.actions';

enum CallStatus {
    INACTIVE = "INACTIVE",
    CONNECTING = "CONNECTING",
    ACTIVE = "ACTIVE",
    FINISHED = "FINISHED",
}

const CompanionComponent = ({
    companionId, subject, topic, name, userName, userImage, style, voice
}: CompanionComponentProps) => {


    //console.log(companionId);


    const [callStatus, setCallStatus] = useState(CallStatus.INACTIVE);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const lottieRef = useRef<LottieRefCurrentProps>(null);
    const [isMuted, setIsMuted] = useState(false);
    const [messages, setMessages] = useState<SavedMessage[]>([]);


    useEffect(() => {
        if (lottieRef) {
            if (isSpeaking) {
                lottieRef.current?.play();
            } else {
                lottieRef.current?.stop()
            }
        }
    }, [isSpeaking, lottieRef])

    useEffect(() => {
        const onCallStart = () => setCallStatus(CallStatus.ACTIVE);
        const onCallend = () => {
            setCallStatus(CallStatus.FINISHED)
            //addToSessionHistory(companionID)
            addToSessionHistory(companionId);
        };
        const onMessage = (message: Message) => {
            if (message.type === 'transcript' && message.transcriptType === 'final') {
                const newMessage = { role: message.role, content: message.transcript }
                setMessages((prev) => [newMessage, ...prev])
            }
        }
        const onError = (error: Error) => console.log(Error);
        const onSpeechStart = () => setIsSpeaking(true)
        const onSpeechEnd = () => setIsSpeaking(false)


        vapi.on("call-start", onCallStart);
        vapi.on("call-end", onCallend);
        vapi.on("message", onMessage);
        vapi.on("error", onError);
        vapi.on("speech-start", onSpeechStart);
        vapi.on("speech-end", onSpeechEnd);

        return () => {
            vapi.off("call-start", onCallStart);
            vapi.off("call-end", onCallend);
            vapi.off("message", onMessage);
            vapi.off("error", onError);
            vapi.off("speech-start", onSpeechStart);
            vapi.off("speech-end", onSpeechEnd);
        }
    }, []);


    const toggleMicrophone = () => {
        const isMuted = vapi.isMuted();
        vapi.setMuted(!isMuted);
        setIsMuted(!isMuted);
    }

    const handleCall = async () => {
        setCallStatus(CallStatus.CONNECTING)

        const assistantOverrides = {
            variableValues: {
                subject, topic, style
            },

            clientMessages: ['transcript'],
            //severMessages : [],
        }
        //@ts-expect-error
        vapi.start(configureAssistant(voice, style), assistantOverrides)
    }

    const handleDisconnect = async () => {
        setCallStatus(CallStatus.FINISHED);
        vapi.stop();
    }

    return (
        <section className='flex flex-col h-[60vh]'>
            <section className='flex max-md:flex-col gap-8'>
                <div className='companion-section'>
                    <div className='companion-avatar' style={{ backgroundColor: getSubjectColor(subject) }}>
                        <div className={cn("absolute transition-opacity duration-100",
                            callStatus === CallStatus.FINISHED || callStatus === CallStatus.INACTIVE ? 'opacity-100' : 'opacity-0',
                            callStatus === CallStatus.CONNECTING && 'opacity-100 animate-pulse'
                        )}>
                            <Image src={`/icons/${subject}.svg`} alt={subject}
                                width={150} height={150} className='max-sm:w-fit'
                            />
                        </div>

                        <div className={cn('absolute transistion-opacity duration-1000',
                            callStatus === CallStatus.ACTIVE ? 'opacity-100' : 'opacity-0'
                        )}>
                            <Lottie lottieRef={lottieRef}
                                animationData={soundwaves}
                                autoPlay={false}
                                className='companion-lottie'
                            />
                        </div>
                    </div>
                    <p className='font-bold text-2xl'>{name}</p>
                </div>

                <div className='user-section'>
                    <div className='user-avatar'>
                        <Image
                            src={userImage} alt={userName}
                            width={130} height={130}
                            className='rounded-lg'
                        />
                        <p className='font-bold text-2xl'>{userName}</p>
                    </div>

                    <button className='btn-mic' onClick={toggleMicrophone} disabled={callStatus !== CallStatus.ACTIVE}>
                        <Image
                            src={isMuted ? `/icons/mic-off.svg` : `/icons/mic-on.svg`}
                            alt='mic'
                            width={36}
                            height={36}
                        />

                        <p className='max-sm:hidden'>{isMuted ? `Turn on Microphone` : 'Turn off Microphone'}</p>
                    </button>

                    <button className={cn('rounded-lg py-2 cursor-pointer transistion-colors w-full text-white',
                        callStatus === CallStatus.ACTIVE ? 'bg-red-700' : 'bg-[#F75353]',
                        callStatus === CallStatus.CONNECTING && 'animate-pulse'
                    )}
                        onClick={callStatus === CallStatus.ACTIVE ? handleDisconnect : handleCall}
                    >
                        {
                            callStatus === CallStatus.ACTIVE ? 'End Session'
                                : callStatus === CallStatus.CONNECTING ? "Connecting"
                                    : 'Start Session'
                        }
                    </button>

                </div>
            </section>

            <section className="relative flex flex-col gap-4 w-full items-center pt-10 flex-grow">
                <div className="w-full flex flex-col gap-4 max-sm:gap-2 pr-2 h-full max-h-[80px] overflow-y-auto no-scrollbar text-2xl">
                    {messages.map((message, index) => (
                        <p key={index} className={`${message.role === 'assistant' ? '' : 'text-primary'} max-sm:text-sm`}>
                            {message.role === 'assistant'
                                ? `${name.split(' ')[0].replace(/[.,]/g, '')}: ${message.content}`
                                : `${userName}: ${message.content}`}
                        </p>
                    ))}
                </div>

                {/* Gradient fade effect at bottom */}
                <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-10 max-sm:h-10 bg-gradient-to-t from-background via-background/90 to-transparent z-10" />
            </section>

        </section>
    )
}

export default CompanionComponent