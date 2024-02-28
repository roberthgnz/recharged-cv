"use client"

import Link from "next/link"
import languages from "@/data/language.json"

import { formatDate } from "@/utils/date"
import { Card, CardContent } from "@/components/ui/card"
import { Title } from "@/components/ui/title"

export const MinimalSharedCVPreview = ({ cv }: any) => {
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
    <Card className="size-full border-0 shadow-none">
      <CardContent className="size-full p-6">
        <Title className="text-lg font-bold">
          {cv.personaldata?.name} {cv.personaldata?.surname1}{" "}
          {cv.personaldata?.surname2}
        </Title>
        <span className="text-xs">{cv.futurejob?.preferredPosition}</span>
        <div className="mt-6 grid grid-cols-3 gap-6">
          <div className="col-span-2">
            <div className="space-y-6">
              {cv.personaldata?.summary && (
                <div>
                  <span className="mb-1 font-bold text-gray-700">Profile</span>
                  <p
                    className="text-xs"
                    dangerouslySetInnerHTML={{
                      __html: cv.personaldata?.summary,
                    }}
                  ></p>
                </div>
              )}
              {cv.experience?.experience.length ? (
                <div>
                  <span className="mb-1 font-bold text-gray-700">
                    Employment History
                  </span>
                  <div className="space-y-3">
                    {cv.experience?.experience.map((experience: any) => (
                      <div key={experience.id}>
                        <p className="text-xs">
                          {experience.job} at {experience.company}
                        </p>
                        {experience.institutionName && (
                          <span className="text-xs">
                            {experience.institutionName}
                          </span>
                        )}
                        <span className="text-xs">
                          {formatDate(experience.startingDate)} -{" "}
                          {experience.onCourse
                            ? "Present"
                            : formatDate(experience.finishingDate)}
                        </span>
                        <p
                          className="mt-1 space-y-1 text-xs [&>p]:before:mr-1 [&>p]:before:content-['\2022']"
                          dangerouslySetInnerHTML={{
                            __html: experience.description,
                          }}
                        ></p>
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}
              {cv.education?.education.length ? (
                <div>
                  <span className="mb-1 font-bold text-gray-700">
                    Education
                  </span>
                  <div className="space-y-3">
                    {cv.education?.education.map((study: any) => (
                      <div key={study.id}>
                        <p className="text-xs">{study.courseName}</p>
                        {study.institutionName && (
                          <span className="text-xs">
                            {study.institutionName}
                          </span>
                        )}
                        <span className="text-xs">
                          {formatDate(study.startingDate)} -{" "}
                          {study.stillEnrolled
                            ? "Present"
                            : formatDate(study.finishingDate)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          </div>
          {cv?.personaldata && Object.keys(cv.personaldata).length ? (
            <div>
              <span className="mb-1 font-bold text-gray-700">Details</span>
              <ul className="text-xs">
                <li>
                  {cv.personaldata?.cityName}, {cv.personaldata?.zipCode}
                </li>
                <li>
                  <Link href={`tel:${cv.personaldata?.mobilePhone}`}>
                    {cv.personaldata?.mobilePhone}
                  </Link>
                </li>
                <li className="text-blue-500">
                  <Link href={`mailto:${cv.personaldata?.email}`}>
                    {cv.personaldata?.email}
                  </Link>
                </li>
              </ul>
              <span className="mt-3">Date of Birth</span>
              <p className="text-xs font-normal">
                {formatDate(cv.personaldata?.birthDay)}
              </p>
              {cv.skills.expertise.length ? (
                <div className="mt-3">
                  <span className="mb-1 font-bold text-gray-700">Skills</span>
                  <div className="space-y-3">
                    {cv.skills.expertise.map((item: any) => (
                      <div key={item.skill}>
                        <p className="text-xs">
                          {item.skill} - {getSkillLabel(item.level)}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}
              {cv.skills.language.length ? (
                <div className="mt-3">
                  <span className="mb-1 font-bold text-gray-700">Skills</span>
                  <div className="space-y-3">
                    {cv.skills.language.map((item: any) => (
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
      </CardContent>
    </Card>
  )
}
