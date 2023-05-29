'use client';
import { useContext, useEffect, useState } from 'react';
import { Transition } from '@headlessui/react';
import { Button, Col, Grid, Text, TextInput, Title } from '@tremor/react';
import { PlusIcon, Sparkles } from 'lucide-react';

import { CVEditorContext } from '@/cv-editor';

import { DialogSuggestions } from './DialogSuggestions';

import { StudyCard } from './StudyCard';
import { StudyEditor } from './StudyEditor';
import { ExperienceCard } from './ExperienceCard';
import { ExperienceEditor } from './ExperienceEditor';
import { SkillCard } from './SkillCard';
import { LanguageCard } from './LanguageCard';
import dynamic from 'next/dynamic';

const WYSIWYGEditor = dynamic(
  () => import('./WYSIWYGEditor').then((mod) => mod.WYSIWYGEditor),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-[300px] border-2 border-[#eee] rounded-[10px] bg-gray-300 animate-pulse"></div>
    )
  }
);

export const CVForm = ({ defaultState }: any) => {
  const { state, setState } = useContext<any>(CVEditorContext);

  const [isShowingSummary, setIsShowingSummary] = useState(false);

  const [editingStudy, setEditingStudy] = useState<boolean>(false);
  const [isNewEducation, setIsNewEducation] = useState<boolean>(false);

  const [editingExperience, setEditingExperience] = useState<boolean>(false);
  const [isNewExperience, setIsNewExperience] = useState<boolean>(false);

  const updateByKey = (e: any) => {
    const [key, name] = e.target.name.split('.');
    setState((prev: any) => ({
      ...prev,
      [key]: {
        ...prev[key],
        [name]: e.target.value
      }
    }));
  };

  const onChangeEditor = (summary: any) => {
    setState((prev: any) => ({
      ...prev,
      personaldata: {
        ...prev.personaldata,
        summary
      }
    }));
  };

  useEffect(() => {
    setState(defaultState);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultState]);

  return (
    <Col className="h-full bg-white p-4 relative">
      <Title className="font-extrabold">Personal Details</Title>
      <Grid numCols={2} className="gap-2 my-4">
        <Col>
          <Text>Job Title</Text>
          <TextInput
            placeholder='e.g. "Software Engineer"'
            name="futurejob.preferredPosition"
            value={state.futurejob.preferredPosition}
            onChange={updateByKey}
          />
        </Col>
        <Col>
          <Text>Date of Birth</Text>
          <TextInput
            // @ts-ignore
            type="date"
            placeholder='e.g. "Software Engineer"'
            name="personaldata.birthDay"
            value={state.personaldata?.birthDay?.slice(0, 10)}
            onChange={updateByKey}
          />
        </Col>
      </Grid>
      <Grid numCols={2} className="gap-2 mb-4">
        <Col>
          <Text>First Name</Text>
          <TextInput
            name="personaldata.name"
            value={state.personaldata.name}
            onChange={updateByKey}
          />
        </Col>
        <Col>
          <Text>Last Name</Text>
          <TextInput
            name="personaldata.surname1"
            value={state.personaldata.surname1}
            onChange={updateByKey}
          />
        </Col>
      </Grid>
      <Grid numCols={2} className="gap-2 mb-4">
        <Col>
          <Text>Email</Text>
          <TextInput
            name="personaldata.email"
            value={state.personaldata.email}
            onChange={updateByKey}
          />
        </Col>
        <Col>
          <Text>Phone</Text>
          <TextInput
            name="personaldata.mobilePhone"
            value={state.personaldata.mobilePhone}
            onChange={updateByKey}
          />
        </Col>
      </Grid>
      <Grid numCols={2} className="gap-2 mb-4">
        <Col>
          <Text>City</Text>
          <TextInput
            name="personaldata.cityName"
            value={state.personaldata.cityName}
            onChange={updateByKey}
          />
        </Col>
        <Col>
          <Text>ZIP Code</Text>
          <TextInput
            name="personaldata.zipCode"
            value={state.personaldata.zipCode}
            onChange={updateByKey}
          />
        </Col>
      </Grid>
      <div className="flex justify-between items-end mt-8">
        <div>
          <Title className="font-extrabold">Professional Summary</Title>
          <Text className="text-sm mb-4">
            Write 2-4 short & energetic sentences to interest the reader!
            Mention your role, experience & most importantly - your biggest
            achievements, best qualities and skills.
          </Text>
        </div>
        <div className="relative">
          <Button
            size="xs"
            variant="light"
            className="ring-0 focus:ring-0"
            icon={Sparkles}
            onClick={() => setIsShowingSummary(true)}
            disabled={isShowingSummary}
          >
            AI Summary Suggestions
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
      <Text className="text-sm mb-4">
        Highlight your pertinent expertise within the past decade. Employ bullet
        points to emphasize your accomplishments, preferably supported by
        quantifiable data (Attained X, quantified by Y, through Z methodology).
      </Text>
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
              setEditingExperience(false);
              setIsNewExperience(false);
            }}
          />
        )}
      </div>
      <Button
        size="xs"
        variant="light"
        className="ring-0 focus:ring-0 my-4"
        icon={PlusIcon}
        onClick={() => setIsNewExperience(true)}
      >
        Add experience
      </Button>
      <Title className="font-extrabold mt-8">Education</Title>
      <Text className="text-sm mb-4">
        A diverse educational background showcased on your resume encapsulates
        the wealth of knowledge and unique perspectives you possess, enhancing
        the immense value you can contribute to any job.
      </Text>
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
              setEditingStudy(false);
              setIsNewEducation(false);
            }}
          />
        )}
      </div>
      <Button
        size="xs"
        variant="light"
        className="ring-0 focus:ring-0 my-4"
        icon={PlusIcon}
        onClick={() => setIsNewEducation(true)}
      >
        Add education
      </Button>
      <Title className="font-extrabold mt-8">Skills</Title>
      <Text className="text-sm mb-4">
        Choose 5 important skills that show you fit the position. Make sure they
        match the key skills mentioned in the job listing (especially when
        applying via an online system).
      </Text>
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
    </Col>
  );
};
