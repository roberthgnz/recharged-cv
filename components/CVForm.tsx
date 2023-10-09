"use client"

import { useContext, useEffect, useState } from "react"
import dynamic from "next/dynamic"
import { CVEditorContext } from "@/cv-editor"
import { Transition } from "@headlessui/react"
import { PlusIcon, Sparkles } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Title } from "@/components/ui/title"

import { DialogSuggestions } from "./DialogSuggestions"
import { ExperienceCard } from "./ExperienceCard"
import { ExperienceEditor } from "./ExperienceEditor"
import { LanguageCard } from "./LanguageCard"
import { SkillCard } from "./SkillCard"
import { StudyCard } from "./StudyCard"
import { StudyEditor } from "./StudyEditor"

const WYSIWYGEditor = dynamic(
  () => import("./WYSIWYGEditor").then((mod) => mod.WYSIWYGEditor),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-[300px] border-2 border-[#eee] rounded-[10px] bg-gray-300 animate-pulse"></div>
    ),
  }
)

export const CVForm = ({ defaultState }: any) => {
  const { state, setState } = useContext<any>(CVEditorContext)

  const [isShowingSummary, setIsShowingSummary] = useState(false)

  const [editingStudy, setEditingStudy] = useState<boolean>(false)
  const [isNewEducation, setIsNewEducation] = useState<boolean>(false)

  const [editingExperience, setEditingExperience] = useState<boolean>(false)
  const [isNewExperience, setIsNewExperience] = useState<boolean>(false)

  const updateByKey = (e: any) => {
    const [key, name] = e.target.name.split(".")
    setState((prev: any) => ({
      ...prev,
      [key]: {
        ...prev[key],
        [name]: e.target.value,
      },
    }))
  }

  const onChangeEditor = (summary: any) => {
    setState((prev: any) => ({
      ...prev,
      personaldata: {
        ...prev.personaldata,
        summary,
      },
    }))
  }

  useEffect(() => {
    setState(defaultState)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultState])

  return (
    <div className="h-full bg-white p-4 relative">
      <Title className="font-extrabold">Personal Details</Title>
      <div className="grid grid-cols-2 gap-2 my-4">
        <div>
          <h3 className="font-semibold text-emphasis">Job Title</h3>
          <Input
            placeholder='e.g. "Software Engineer"'
            name="futurejob.preferredPosition"
            value={state.futurejob.preferredPosition}
            onChange={updateByKey}
          />
        </div>
        <div>
          <h3 className="font-semibold text-emphasis">Date of Birth</h3>
          <Input
            // @ts-ignore
            type="date"
            placeholder='e.g. "Software Engineer"'
            name="personaldata.birthDay"
            value={state.personaldata?.birthDay?.slice(0, 10)}
            onChange={updateByKey}
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2 mb-4">
        <div>
          <h3 className="font-semibold text-emphasis">First Name</h3>
          <Input
            name="personaldata.name"
            value={state.personaldata.name}
            onChange={updateByKey}
          />
        </div>
        <div>
          <h3 className="font-semibold text-emphasis">Last Name</h3>
          <Input
            name="personaldata.surname1"
            value={state.personaldata.surname1}
            onChange={updateByKey}
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2 mb-4">
        <div>
          <h3 className="font-semibold text-emphasis">Email</h3>
          <Input
            name="personaldata.email"
            value={state.personaldata.email}
            onChange={updateByKey}
          />
        </div>
        <div>
          <h3 className="font-semibold text-emphasis">Phone</h3>
          <Input
            name="personaldata.mobilePhone"
            value={state.personaldata.mobilePhone}
            onChange={updateByKey}
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2 mb-4">
        <div>
          <h3 className="font-semibold text-emphasis">City</h3>
          <Input
            name="personaldata.cityName"
            value={state.personaldata.cityName}
            onChange={updateByKey}
          />
        </div>
        <div>
          <h3 className="font-semibold text-emphasis">ZIP Code</h3>
          <Input
            name="personaldata.zipCode"
            value={state.personaldata.zipCode}
            onChange={updateByKey}
          />
        </div>
      </div>
      <div className="flex justify-between items-end mt-8">
        <div>
          <Title className="font-extrabold">Professional Summary</Title>
          <h3 className="text-sm my-4">
            Write 2-4 short & energetic sentences to interest the reader!
            Mention your role, experience & most importantly - your biggest
            achievements, best qualities and skills.
          </h3>
        </div>
        <div className="relative mb-4">
          <Button
            color="secondary"
            onClick={() => setIsShowingSummary(true)}
            disabled={isShowingSummary}
          >
            <Sparkles className="mr-2 h-4 w-4" />
            Suggestions
          </Button>
          <Transition
            show={isShowingSummary}
            enter="transition-opacity duration-75"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity duration-150"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="w-[250%] absolute -right-64 -top-1 z-10">
              <DialogSuggestions
                onSelect={onChangeEditor}
                onClose={() => setIsShowingSummary(false)}
              />
            </div>
          </Transition>
        </div>
      </div>
      <WYSIWYGEditor
        value={state.personaldata.summary}
        onChange={onChangeEditor}
      />
      <Title className="font-extrabold mt-8">Employment History</Title>
      <h3 className="text-sm my-4">
        Highlight your pertinent expertise within the past decade. Employ bullet
        points to emphasize your accomplishments, preferably supported by
        quantifiable data (Attained X, quantified by Y, through Z methodology).
      </h3>
      <div className="space-y-3">
        {!editingExperience &&
          state.experience.experience.map((item: any) => (
            <ExperienceCard
              key={item.id}
              {...item}
              onEdit={setEditingExperience}
            />
          ))}
        {(editingExperience || isNewExperience) && (
          <ExperienceEditor
            isNew={isNewExperience}
            experienceId={editingExperience}
            onCancel={() => {
              setEditingExperience(false)
              setIsNewExperience(false)
            }}
          />
        )}
      </div>
      <Button
        color="secondary"
        className="my-4"
        onClick={() => setIsNewExperience(true)}
      >
        <PlusIcon className="mr-2 h-4 w-4" />
        Add experience
      </Button>
      <Title className="font-extrabold mt-8">Education</Title>
      <h3 className="text-sm my-4">
        A diverse educational background showcased on your resume encapsulates
        the wealth of knowledge and unique perspectives you possess, enhancing
        the immense value you can contribute to any job.
      </h3>
      <div className="space-y-3">
        {!editingStudy &&
          state.education.education.map((item: any) => (
            <StudyCard key={item.id} {...item} onEdit={setEditingStudy} />
          ))}
        {(editingStudy || isNewEducation) && (
          <StudyEditor
            isNew={isNewEducation}
            studyId={editingStudy}
            onCancel={() => {
              setEditingStudy(false)
              setIsNewEducation(false)
            }}
          />
        )}
      </div>
      <Button
        color="secondary"
        className="my-4"
        onClick={() => setIsNewEducation(true)}
      >
        <PlusIcon className="mr-2 h-4 w-4" />
        Add education
      </Button>
      <Title className="font-extrabold mt-8">Skills</Title>
      <h3 className="text-sm my-4">
        Choose 5 important skills that show you fit the position. Make sure they
        match the key skills mentioned in the job listing (especially when
        applying via an online system).
      </h3>
      <div className="space-y-3">
        {state.skills.expertise.map((item: any) => (
          <SkillCard key={item.skill} name={item.skill} level={item.level} />
        ))}
        <SkillCard isNew={true} />
      </div>
      <Title className="font-extrabold mt-8">Languages</Title>
      <div className="space-y-3 mt-4">
        {state.skills.language.map((item: any) => (
          <LanguageCard key={item.skill} id={item.id} level={item.speaking} />
        ))}
        <LanguageCard isNew={true} />
      </div>
    </div>
  )
}
