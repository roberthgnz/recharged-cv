import { useContext, useEffect, useState } from "react"
import { CVEditorContext } from "@/cv-editor"
import { Transition } from "@headlessui/react"
import { Sparkles } from "lucide-react"
import { toast } from "react-hot-toast"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

import { DialogSuggestions } from "./DialogSuggestions"
import { Label } from "./ui/label"
import { Switch } from "./ui/switch"
import { WYSIWYGEditor } from "./WYSIWYGEditor"

const defaultGeneratedText = `1. Organized and prioritized work to complete assignments in a timely, efficient manner. 2. Worked well independently and on a team to solve problems. 3. Served as a friendly, hardworking, and punctual employee. 4. Worked as a productive and positive team member to design, code, test, report, and debug operations.`

export const ExperienceEditor = ({ isNew, experienceId, onCancel }: any) => {
  const { state, setState } = useContext<any>(CVEditorContext)

  const [experience, setExperience] = useState<any>({
    id: Date.now(),
    job: "",
    startingDate: "",
    finishingDate: "",
    onCourse: false,
  })

  const [prompt, setPrompt] = useState<string>(
    "Generate 8 Professional and energetic CV phrases for Employment History section clearly labeling each section 1. 2. 3. 4. Make sure each generated phrase is at least 50 and 100 max characters"
  )

  const [isShowingSuggestions, setIsShowingSuggestions] = useState(false)

  useEffect(() => {
    if (!isNew) {
      setExperience(() =>
        state.experience.experience.find(
          (experience: any) => experience.id === experienceId
        )
      )
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    setPrompt(
      `Generate 8 Professional and energetic CV phrases for Employment History section clearly labeling each section 1. 2. 3. 4. Make sure each generated phrase is at least 50 and 100 max characters based on this context: Job Title: ${experience.job}, Worked well independently and on a team to solve problems. Served as a friendly, hardworking, and punctual employee. Organized and prioritized work to complete assignments in a timely, efficient manner.`
    )
  }, [experience.job])

  const onChange = (event: any) => {
    const { name, value } = event.target
    setExperience((prev: any) => ({ ...prev, [name]: value }))
  }

  const onChangeEditor = (description: string) => {
    setExperience((prev: any) => ({ ...prev, description }))
  }

  const validate = () => {
    if (!experience.job) {
      return false
    }
    if (!experience.startingDate) {
      return false
    }
    if (!experience.finishingDate && !experience.onCourse) {
      return false
    }
    return true
  }

  const onSave = () => {
    if (!validate()) {
      return toast.error("Please fill all the required fields")
    }

    if (!isNew) {
      setState((prev: any) => ({
        ...prev,
        experience: {
          ...prev.experience,
          experience: prev.experience.experience.map((_experience: any) =>
            _experience.id === experienceId ? experience : _experience
          ),
        },
      }))
    } else {
      setState((prev: any) => ({
        ...prev,
        experience: {
          ...prev.experience,
          experience: [...prev.experience.experience, experience],
        },
      }))
    }
    onCancel()
  }

  const onDelete = () => {
    if (!confirm("Are you sure you want to delete this experience?")) return
    setState((prev: any) => ({
      ...prev,
      experience: {
        ...prev.experience,
        experience: prev.experience.experience.filter(
          (_experience: any) => _experience.id !== experienceId
        ),
      },
    }))
    onCancel()
  }

  return (
    <Card className="rounded-md border p-4">
      <div className="grid grid-cols-2 gap-2">
        <div className="col-span-2">
          <span className="mt-4">Job title</span>
          <Input value={experience.job} name="job" onChange={onChange} />
        </div>
        <div>
          <span className="mt-4">Start date</span>

          <Input
            //  @ts-ignore
            type="date"
            name="startingDate"
            value={experience.startingDate?.slice(0, 10)}
            onChange={onChange}
          />
        </div>
        <div>
          <span className="mt-4">End date</span>
          <Input
            //  @ts-ignore
            type="date"
            name="finishingDate"
            value={experience.finishingDate?.slice(0, 10)}
            onChange={onChange}
            disabled={experience.onCourse}
          />
        </div>
        <div className="flex items-center space-x-2">
          <Label htmlFor="working">Still working here?</Label>
          <Switch
            id="working"
            checked={experience.onCourse}
            onCheckedChange={(value: any) => {
              console.log(value)
              setExperience((prev: any) => ({ ...prev, onCourse: value }))
            }}
          />
        </div>
        <div className="col-span-2">
          <div className="my-4 flex items-end justify-between">
            <div>
              <span className="mb-4">
                Description <span className="text-gray-400">(optional)</span>
              </span>
            </div>
            <div className="relative">
              <Button
                color="secondary"
                className="ring-0 focus:ring-0"
                onClick={() => setIsShowingSuggestions(true)}
                disabled={isShowingSuggestions || !experience.job}
              >
                <Sparkles className="mr-2 h-4 w-4" />
                Suggestions
              </Button>
              <Transition
                show={isShowingSuggestions}
                enter="transition-opacity duration-75"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity duration-150"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="absolute -right-64 -top-1 z-10 w-[33.33vw]">
                  <DialogSuggestions
                    prompt={prompt}
                    defaultContext={experience.job}
                    defaultGeneratedText={defaultGeneratedText}
                    onSelect={(suggestions: string) => {
                      setExperience((prev: any) => ({
                        ...prev,
                        description: `${
                          prev.description ? prev.description + "\n" : ""
                        }${suggestions}`,
                      }))
                    }}
                    onClose={() => setIsShowingSuggestions(false)}
                  />
                </div>
              </Transition>
            </div>
          </div>
          <WYSIWYGEditor
            value={experience.description}
            onChange={onChangeEditor}
          />
        </div>
      </div>
      <div className="mt-6 flex justify-between">
        {!isNew ? (
          <div>
            <Button variant="destructive" onClick={onDelete}>
              Delete
            </Button>
          </div>
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
    </Card>
  )
}
