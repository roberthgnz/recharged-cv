'use client';
import Link from 'next/link';
import { useContext, useState } from 'react';
import { toast } from 'react-hot-toast';

import { Col, Card, Text, Title, Grid, Button } from '@tremor/react';
import { LinkIcon, RefreshCcw } from 'lucide-react';

import { formatDate } from '@/utils/date';
import { CVEditorContext } from '@/cv-editor';

import languages from '@/data/language.json';

import { ResumeScore } from './ResumeScore';

export const CVEditorPreview = () => {
  const [isSharing, setIsSharing] = useState(false);

  const { state } = useContext<any>(CVEditorContext);

  const shareLink = async () => {
    try {
      setIsSharing(true);
      const response = await fetch('/api/cv/generate-url', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ cv: state })
      });

      const data = await response.json();

      const url = `${window.location.origin}${data.url}`;

      if (!navigator.share) {
        navigator.clipboard.writeText(url);
        return toast.success('Link copied to clipboard');
      }

      const shareData = {
        title: 'Recharged CV',
        text: 'Check out my CV created with Recharged CV',
        url
      };

      await navigator.share(shareData);
    } catch (error) {
      console.error(error);
      toast.error('Error generating link');
    } finally {
      setIsSharing(false);
    }
  };

  const getSkillLabel = (level: string) => {
    return { bajo: 'Novice', medio: 'Skillful', alto: 'Expert' }[level];
  };

  const getLanguageName = (id: number) => {
    return languages.find((item: any) => item.id === id)?.value;
  };

  const getLanguageSkillLabel = (level: string) => {
    return {
      nulo: 'None',
      elemental: 'Elementary',
      conversacion: 'Intermediate',
      negociacion: 'Advanced',
      nativo: 'Native'
    }[level];
  };

  return (
    <div className="h-full bg-gray-600 p-8 relative">
      <div className="h-hull sticky top-8">
        <Col className="h-[210mm] select-none">
          <Card className="h-full">
            <Title className="font-bold text-lg">
              {state.personaldata.name} {state.personaldata.surname1}{' '}
              {state.personaldata.surname2}
            </Title>
            <Text className="text-xs">{state.futurejob.preferredPosition}</Text>
            <Grid numCols={3} className="mt-6 gap-6">
              <Col numColSpan={2}>
                <div className="space-y-6">
                  {state.personaldata.summary && (
                    <div>
                      <Text className="mb-1 font-bold text-gray-700">
                        Profile
                      </Text>
                      <p
                        className="text-xs"
                        dangerouslySetInnerHTML={{
                          __html: state.personaldata.summary
                        }}
                      ></p>
                    </div>
                  )}
                  {state.experience.experience.length ? (
                    <div>
                      <Text className="mb-1 font-bold text-gray-700">
                        Employment History
                      </Text>
                      <div className="space-y-3">
                        {state.experience.experience.map((experience: any) => (
                          <div key={experience.id}>
                            <p className="text-xs">
                              {experience.job} at {experience.company}
                            </p>
                            {experience.institutionName && (
                              <Text className="text-xs">
                                {experience.institutionName}
                              </Text>
                            )}
                            <Text className="text-xs">
                              {formatDate(experience.startingDate)} -{' '}
                              {experience.onCourse
                                ? 'Present'
                                : formatDate(experience.finishingDate)}
                            </Text>
                            <p
                              className="[&>p]:before:content-['\2022'] [&>p]:before:mr-1 text-xs space-y-1 mt-1"
                              dangerouslySetInnerHTML={{
                                __html: experience.description
                              }}
                            ></p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : null}
                  {state.education.education.length ? (
                    <div>
                      <Text className="mb-1 font-bold text-gray-700">
                        Education
                      </Text>
                      <div className="space-y-3">
                        {state.education.education.map((study: any) => (
                          <div key={study.id}>
                            <p className="text-xs">{study.courseName}</p>
                            {study.institutionName && (
                              <Text className="text-xs">
                                {study.institutionName}
                              </Text>
                            )}
                            <Text className="text-xs">
                              {formatDate(study.startingDate)} -{' '}
                              {study.stillEnrolled
                                ? 'Present'
                                : formatDate(study.finishingDate)}
                            </Text>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : null}
                </div>
              </Col>
              {Object.keys(state.personaldata).length ? (
                <Col>
                  <Text className="mb-1 font-bold text-gray-700">Details</Text>
                  <ul className="text-xs">
                    <li>
                      {state.personaldata.cityName},{' '}
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
                  <Text className="mt-3">Date of Birth</Text>
                  <p className="font-normal text-xs">
                    {formatDate(state.personaldata.birthDay)}
                  </p>
                  {state.skills.expertise.length ? (
                    <div className="mt-3">
                      <Text className="mb-1 font-bold text-gray-700">
                        Skills
                      </Text>
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
                      <Text className="mb-1 font-bold text-gray-700">
                        Skills
                      </Text>
                      <div className="space-y-3">
                        {state.skills.language.map((item: any) => (
                          <div key={item.id}>
                            <p className="text-xs">
                              {getLanguageName(item.id)} -{' '}
                              {getLanguageSkillLabel(item.speaking)}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : null}
                </Col>
              ) : null}
            </Grid>
          </Card>
          <div className="space-x-3 absolute bottom-2.5 right-0">
            <Button
              size="xs"
              icon={LinkIcon}
              onClick={shareLink}
              loading={isSharing}
            >
              Share Link
            </Button>
          </div>
        </Col>
        <div className="mt-8">
          <ResumeScore />
        </div>
      </div>
    </div>
  );
};
