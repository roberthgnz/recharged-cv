import { useContext, useEffect, useState } from "react"
import { CVEditorContext } from "@/cv-editor"
import courses from "@/data/study-detail.json"
import studies from "@/data/study.json"
import { getStudy, getStudyDetails } from "@/utils/dictionary"
import { SelectItem } from "@radix-ui/react-select"
import { toast } from "react-hot-toast"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"

export const StudyEditor = ({ isNew, studyId, onCancel }: any) => {
  const { state, setState } = useContext<any>(CVEditorContext)

  const [study, setStudy] = useState<any>({
    id: Date.now(),
    educationLevelCode: "",
    educationLevel: "",
    courseCode: "",
    courseName: "",
    institutionName: "",
    startingDate: "",
    finishingDate: "",
    stillEnrolled: false,
  })

  useEffect(() => {
    if (!isNew) {
      setStudy(() =>
        state.education.education.find((study: any) => study.id === studyId)
      )
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onChangeEducation = async (key: string, value: string) => {
    setStudy((prev: any) => ({ ...prev, [key]: value }))

    if (key === "educationLevelCode") {
      const educationLevel = await getStudy(value)
      setStudy((prev: any) => ({
        ...prev,
        educationLevel: educationLevel?.value,
      }))
    }

    if (key === "courseCode") {
      const courseName = await getStudyDetails(value)
      setStudy((prev: any) => ({
        ...prev,
        courseName: courseName?.value,
      }))
    }
  }

  const onChange = (event: any) => {
    const { name, value } = event.target
    setStudy((prev: any) => ({ ...prev, [name]: value }))
  }

  const validate = () => {
    if (!study.educationLevelCode) {
      return false
    }
    if (!study.courseCode) {
      return false
    }
    if (!study.institutionName) {
      return false
    }
    if (!study.startingDate) {
      return false
    }
    if (!study.finishingDate && !study.stillEnrolled) {
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
        education: {
          ...prev.education,
          education: prev.education.education.map((_study: any) =>
            _study.id === studyId ? study : _study
          ),
        },
      }))
    } else {
      setState((prev: any) => ({
        ...prev,
        education: {
          ...prev.education,
          education: [...prev.education.education, study],
        },
      }))
    }
    onCancel()
  }

  const onDelete = () => {
    if (!confirm("Are you sure you want to delete this study?")) return

    setState((prev: any) => ({
      ...prev,
      education: {
        ...prev.education,
        education: prev.education.education.filter(
          (_study: any) => _study.id !== studyId
        ),
      },
    }))
    onCancel()
  }

  return (
    <Card className="p-4 border rounded-md space-y-4">
      <div className="space-y-2">
        <span>Title</span>
        <Select
          value={study.educationLevelCode}
          onValueChange={(value) =>
            onChangeEducation("educationLevelCode", value)
          }
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Title" />
          </SelectTrigger>
          <SelectContent>
            {studies.map((study: any) => (
              <SelectItem key={study.key} value={study.key}>
                {study.value}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <span className="mt-4">Specialization</span>
        <Select
          value={study.courseCode}
          onValueChange={(value) => onChangeEducation("courseCode", value)}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Specialization" />
          </SelectTrigger>
          <SelectContent>
            {courses.map((course: any) => (
              <SelectItem key={course.key} value={course.key}>
                {course.value}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div className="col-span-2">
          <span className="mt-4">Institution</span>
          <Input
            value={study.institutionName}
            name="institutionName"
            onChange={onChange}
          />
        </div>
        <div>
          <span className="mt-4">Start date</span>

          <Input
            type="date"
            name="startingDate"
            value={study.startingDate?.slice(0, 10)}
            onChange={onChange}
          />
        </div>
        <div>
          <span className="mt-4">End date</span>
          <Input
            type="date"
            name="finishingDate"
            value={study.finishingDate?.slice(0, 10)}
            onChange={onChange}
            disabled={study.stillEnrolled}
          />
        </div>
        <div className="flex items-center space-x-2">
          <Label htmlFor="studying">Still studying?</Label>
          <Switch
            id="studying"
            checked={study.stillEnrolled}
            onCheckedChange={(value: any) => {
              console.log(value)
              setStudy((prev: any) => ({ ...prev, stillEnrolled: value }))
            }}
          />
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
    </Card>
  )
}
