import { useContext, useEffect, useState } from "react"
import { CVEditorContext } from "@/cv-editor"
import languages from "@/data/language.json"
import { Disclosure } from "@headlessui/react"
import { ChevronUpIcon } from "@heroicons/react/24/outline"
import classNames from "classnames"
import { PlusIcon } from "lucide-react"
import { toast } from "react-hot-toast"

import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export const LanguageCard = ({ isNew, id, level }: any) => {
  const { state, setState } = useContext<any>(CVEditorContext)

  const [language, setLanguage] = useState<any>({ id, level })

  useEffect(() => {
    if (!isNew) {
      const lang = languages.find((item: any) => item.id === id)
      setLanguage(() => ({
        id,
        level,
        name: lang?.value,
      }))
    }
  }, [])

  const onDelete = () => {
    if (!confirm("Are you sure you want to delete this skill?")) return
    setState((prev: any) => ({
      ...prev,
      skills: {
        ...prev.skills,
        language: prev.skills.language.filter((item: any) => item.id !== id),
      },
    }))
  }

  const onSave = () => {
    if (!language.id || !language.level)
      return toast.error("Please fill all the fields")

    const lang = languages.find((item: any) => item.id === language.id)

    setLanguage((prev: any) => ({
      ...prev,
      name: lang?.value,
    }))

    if (isNew) {
      setState((prev: any) => ({
        ...prev,
        skills: {
          ...prev.skills,
          language: [
            ...prev.skills.language,
            {
              ...language,
              speaking: language.level,
            },
          ],
        },
      }))
      setLanguage(() => ({}))
    } else {
      setState((prev: any) => ({
        ...prev,
        skills: {
          ...prev.skills,
          language: prev.skills.language.map((item: any) => {
            return item.id === id
              ? {
                  ...language,
                  speaking: language.level,
                }
              : item
          }),
        },
      }))
    }
  }

  const onCancel = () => {
    if (isNew) {
      setLanguage(() => ({}))
    } else {
      const lang = languages.find((item: any) => item.id === id)
      setLanguage(() => ({
        id,
        level,
        name: lang?.value,
      }))
    }
  }

  return (
    <Disclosure as={"div"} className={"p-4 border rounded-md"}>
      {({ open }) => (
        <>
          <Disclosure.Button
            className={"w-full flex items-center justify-between"}
          >
            <span className={classNames(isNew && "text-blue-500")}>
              {isNew ? "Add language" : language.name}
            </span>

            {isNew && !open ? (
              <PlusIcon width={16} height={16} className="text-blue-500" />
            ) : (
              <ChevronUpIcon
                width={16}
                height={16}
                className={open ? "rotate-180 transform" : ""}
              />
            )}
          </Disclosure.Button>
          <Disclosure.Panel as="div" className={"py-4"}>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <Select
                  value={language.id}
                  onValueChange={(value) => {
                    setLanguage((prev: any) => ({
                      ...prev,
                      id: value,
                    }))
                  }}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Language" />
                  </SelectTrigger>{" "}
                  <SelectContent>
                    {languages.map((item: any) => (
                      <SelectItem key={item.id} value={item.id}>
                        {item.value}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Select
                  value={language.level}
                  onValueChange={(value) =>
                    setLanguage((prev: any) => ({
                      ...prev,
                      level: value,
                    }))
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Level" />
                  </SelectTrigger>{" "}
                  <SelectContent>
                    <SelectItem value="nulo">Null</SelectItem>
                    <SelectItem value="elemental">Elementary</SelectItem>
                    <SelectItem value="conversacion">Intermediate</SelectItem>
                    <SelectItem value="negociacion">Advanced</SelectItem>
                    <SelectItem value="nativo">Native</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex justify-between mt-6">
              {!isNew ? (
                <Button variant="destructive" onClick={onDelete}>
                  Delete
                </Button>
              ) : (
                <div></div>
              )}
              <div className="space-x-2">
                <Button onClick={onSave}>Save</Button>
                <Button variant="secondary" onClick={onCancel}>
                  Cancel
                </Button>
              </div>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}
