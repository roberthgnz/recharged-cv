"use client"

import { useContext, useState } from "react"
import Link from "next/link"
import { CVEditorContext } from "@/cv-editor"
import languages from "@/data/language.json"
import { formatDate } from "@/utils/date"
import { LinkIcon } from "lucide-react"
import { toast } from "react-hot-toast"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Title } from "@/components/ui/title"

import { ResumeScore } from "./ResumeScore"

export const CVEditorPreview = () => {
  const [isSharing, setIsSharing] = useState(false)

  const { state } = useContext<any>(CVEditorContext)

  const shareLink = async () => {
    try {
      setIsSharing(true)
      const response = await fetch("/api/cv/generate-url", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cv: state }),
      })

      const data = await response.json()

      const url = `${window.location.origin}${data.url}`

      if (!navigator.share) {
        navigator.clipboard.writeText(url)
        return toast.success("Link copied to clipboard")
      }

      const shareData = {
        title: "Recharged CV",
        text: "Check out my CV created with Recharged CV",
        url,
      }

      await navigator.share(shareData)
    } catch (error) {
      console.error(error)
      toast.error("Error generating link")
    } finally {
      setIsSharing(false)
    }
  }

  const getSkillLabel = (level: string) => {
    return { bajo: "Novice", medio: "Skillful", alto: "Expert" }[level]
  }

  const getLanguageName = (id: number) => {
    return languages.find((item: any) => item.id === id)?.value
  }

  const getLanguageSkillLabel = (level: string) => {
    return {
      nulo: "None",
      elemental: "Elementary",
      conversacion: "Intermediate",
      negociacion: "Advanced",
      nativo: "Native",
    }[level]
  }

  return (
    <div className="h-full bg-gray-600 p-8 relative">
      <div className="h-hull sticky top-8">
        <div className="h-[210mm] select-none">
          <Card className="h-full">
            <Title className="font-bold text-lg">
              {state.personaldata.name} {state.personaldata.surname1}{" "}
              {state.personaldata.surname2}
            </Title>
            <h3 className="text-xs">{state.futurejob.preferredPosition}</h3>
            <div className="grid grid-cols-3 mt-6 gap-6">
              <div className="col-span-2">
                <div className="space-y-6">
                  {state.personaldata.summary && (
                    <div>
                      <h3 className="mb-1 font-bold text-gray-700">Profile</h3>
                      <p
                        className="text-xs"
                        dangerouslySetInnerHTML={{
                          __html: state.personaldata.summary,
                        }}
                      ></p>
                    </div>
                  )}
                  {state.experience.experience.length ? (
                    <div>
                      <h3 className="mb-1 font-bold text-gray-700">
                        Employment History
                      </h3>
                      <div className="space-y-3">
                        {state.experience.experience.map((experience: any) => (
                          <div key={experience.id}>
                            <p className="text-xs">
                              {experience.job} at {experience.company}
                            </p>
                            {experience.institutionName && (
                              <h3 className="text-xs">
                                {experience.institutionName}
                              </h3>
                            )}
                            <h3 className="text-xs">
                              {formatDate(experience.startingDate)} -{" "}
                              {experience.onCourse
                                ? "Present"
                                : formatDate(experience.finishingDate)}
                            </h3>
                            <p
                              className="[&>p]:before:content-['\2022'] [&>p]:before:mr-1 text-xs space-y-1 mt-1"
                              dangerouslySetInnerHTML={{
                                __html: experience.description,
                              }}
                            ></p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : null}
                  {state.education.education.length ? (
                    <div>
                      <h3 className="mb-1 font-bold text-gray-700">
                        Education
                      </h3>
                      <div className="space-y-3">
                        {state.education.education.map((study: any) => (
                          <div key={study.id}>
                            <p className="text-xs">{study.courseName}</p>
                            {study.institutionName && (
                              <h3 className="text-xs">
                                {study.institutionName}
                              </h3>
                            )}
                            <h3 className="text-xs">
                              {formatDate(study.startingDate)} -{" "}
                              {study.stillEnrolled
                                ? "Present"
                                : formatDate(study.finishingDate)}
                            </h3>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>
              {Object.keys(state.personaldata).length ? (
                <div>
                  <h3 className="mb-1 font-bold text-gray-700">Details</h3>
                  <ul className="text-xs">
                    <li>
                      {state.personaldata.cityName},{" "}
                      {state.personaldata.zipCode}
                    </li>
                    <li>
                      <Link href={`tel:${state.personaldata.mobilePhone}`}>
                        {state.personaldata.mobilePhone}
                      </Link>
                    </li>
                    <li className="text-blue-500">
                      <Link href={`mailto:${state.personaldata.email}`}>
                        {state.personaldata.email}
                      </Link>
                    </li>
                  </ul>
                  <h3 className="mt-3">Date of Birth</h3>
                  <p className="font-normal text-xs">
                    {formatDate(state.personaldata.birthDay)}
                  </p>
                  {state.skills.expertise.length ? (
                    <div className="mt-3">
                      <h3 className="mb-1 font-bold text-gray-700">Skills</h3>
                      <div className="space-y-3">
                        {state.skills.expertise.map((item: any) => (
                          <div key={item.skill}>
                            <p className="text-xs">
                              {item.skill} - {getSkillLabel(item.level)}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : null}
                  {state.skills.language.length ? (
                    <div className="mt-3">
                      <h3 className="mb-1 font-bold text-gray-700">Skills</h3>
                      <div className="space-y-3">
                        {state.skills.language.map((item: any) => (
                          <div key={item.id}>
                            <p className="text-xs">
                              {getLanguageName(item.id)} -{" "}
                              {getLanguageSkillLabel(item.speaking)}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : null}
                </div>
              ) : null}
            </div>
          </Card>
          <div className="space-x-3 absolute bottom-2.5 right-0">
            <Button onClick={shareLink} disabled={isSharing}>
              <LinkIcon className="mr-2 h-4 w-4" />
              Share Link
            </Button>
          </div>
        </div>
        <div className="mt-8">
          <ResumeScore />
        </div>
      </div>
    </div>
  )
}
