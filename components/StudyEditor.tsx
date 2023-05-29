import { useContext, useEffect, useState } from 'react';
import { CVEditorContext } from '@/cv-editor';
import {
  Grid,
  Card,
  Text,
  SelectBox,
  SelectBoxItem,
  Toggle,
  ToggleItem,
  Col,
  Button,
  TextInput
} from '@tremor/react';
import { toast } from 'react-hot-toast';

import studies from '@/data/study.json';
import courses from '@/data/study-detail.json';

import { getStudy, getStudyDetails } from '@/utils/dictionary';

export const StudyEditor = ({ isNew, studyId, onCancel }: any) => {
  const { state, setState } = useContext<any>(CVEditorContext);

  const [study, setStudy] = useState<any>({
    id: Date.now(),
    educationLevelCode: '',
    educationLevel: '',
    courseCode: '',
    courseName: '',
    institutionName: '',
    startingDate: '',
    finishingDate: '',
    stillEnrolled: false
  });

  useEffect(() => {
    if (!isNew) {
      setStudy(() =>
        state.education.education.find((study: any) => study.id === studyId)
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onChangeEducation = async (key: string, value: string) => {
    setStudy((prev: any) => ({ ...prev, [key]: value }));

    if (key === 'educationLevelCode') {
      const educationLevel = await getStudy(value);
      setStudy((prev: any) => ({
        ...prev,
        educationLevel: educationLevel?.value
      }));
    }

    if (key === 'courseCode') {
      const courseName = await getStudyDetails(value);
      setStudy((prev: any) => ({
        ...prev,
        courseName: courseName?.value
      }));
    }
  };

  const onChange = (event: any) => {
    const { name, value } = event.target;
    setStudy((prev: any) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    if (!study.educationLevelCode) {
      return false;
    }
    if (!study.courseCode) {
      return false;
    }
    if (!study.institutionName) {
      return false;
    }
    if (!study.startingDate) {
      return false;
    }
    if (!study.finishingDate && !study.stillEnrolled) {
      return false;
    }
    return true;
  };

  const onSave = () => {
    if (!validate()) {
      return toast.error('Please fill all the required fields');
    }

    if (!isNew) {
      setState((prev: any) => ({
        ...prev,
        education: {
          ...prev.education,
          education: prev.education.education.map((_study: any) =>
            _study.id === studyId ? study : _study
          )
        }
      }));
    } else {
      setState((prev: any) => ({
        ...prev,
        education: {
          ...prev.education,
          education: [...prev.education.education, study]
        }
      }));
    }
    onCancel();
  };

  const onDelete = () => {
    if (!confirm('Are you sure you want to delete this study?')) return;

    setState((prev: any) => ({
      ...prev,
      education: {
        ...prev.education,
        education: prev.education.education.filter(
          (_study: any) => _study.id !== studyId
        )
      }
    }));
    onCancel();
  };

  return (
    <Card>
      <Text>Title</Text>
      <SelectBox
        value={study.educationLevelCode}
        onValueChange={(value) =>
          onChangeEducation('educationLevelCode', value)
        }
      >
        {studies.map((study: any) => (
          <SelectBoxItem key={study.key} value={study.key} text={study.value} />
        ))}
      </SelectBox>

      <Text className="mt-4">Specialization</Text>
      <SelectBox
        value={study.courseCode}
        onValueChange={(value) => onChangeEducation('courseCode', value)}
      >
        {courses.map((course: any) => (
          <SelectBoxItem
            key={course.key}
            value={course.key}
            text={course.value}
          />
        ))}
      </SelectBox>

      <Grid numCols={2} className="gap-2">
        <Col numColSpan={2}>
          <Text className="mt-4">Institution</Text>
          <TextInput
            value={study.institutionName}
            name="institutionName"
            onChange={onChange}
          />
        </Col>
        <Col>
          <Text className="mt-4">Start date</Text>

          <TextInput
            //  @ts-ignore
            type="date"
            name="startingDate"
            value={study.startingDate?.slice(0, 10)}
            onChange={onChange}
          />
        </Col>
        <Col>
          <Text className="mt-4">End date</Text>
          <TextInput
            //  @ts-ignore
            type="date"
            name="finishingDate"
            value={study.finishingDate?.slice(0, 10)}
            onChange={onChange}
            disabled={study.stillEnrolled}
          />
        </Col>
        <Col>
          <Text className="mt-4">Still studying?</Text>
          <Toggle
            color="zinc"
            defaultValue="0"
            onValueChange={(value) => {
              setStudy((prev: any) => ({
                ...prev,
                stillEnrolled: value === '1'
              }));
            }}
          >
            <ToggleItem value="0" text="No" />
            <ToggleItem value="1" text="Yes" />
          </Toggle>
        </Col>
      </Grid>

      <div className="flex justify-between mt-6">
        {!isNew ? (
          <Button size="xs" color="red" variant="secondary" onClick={onDelete}>
            Delete
          </Button>
        ) : (
          <div></div>
        )}
        <div className="space-x-2">
          <Button size="xs" onClick={onSave}>
            Save
          </Button>
          <Button size="xs" variant="secondary" onClick={onCancel}>
            Cancel
          </Button>
        </div>
      </div>
    </Card>
  );
};
