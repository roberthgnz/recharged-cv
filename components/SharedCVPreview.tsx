'use client';
import Link from 'next/link';
import { Grid, Card, Col, Title, Text } from '@tremor/react';

import { formatDate } from '@/utils/date';

import languages from '@/data/language.json';

export const SharedCVPreview = ({ cv }: any) => {
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
    <Card className="w-[210mm] h-[297mm] mx-auto mb-8">
      <Title className="font-bold text-lg">
        {cv.personaldata.name} {cv.personaldata.surname1}{' '}
        {cv.personaldata.surname2}
      </Title>
      <Text className="text-xs">{cv.futurejob.preferredPosition}</Text>
      <Grid numCols={3} className="mt-6 gap-6">
        <Col numColSpan={2}>
          <div className="space-y-6">
            {cv.personaldata.summary && (
              <div>
                <Text className="mb-1 font-bold text-gray-700">Profile</Text>
                <p
                  className="text-xs"
                  dangerouslySetInnerHTML={{
                    __html: cv.personaldata.summary
                  }}
                ></p>
              </div>
            )}
            {cv.experience.experience.length ? (
              <div>
                <Text className="mb-1 font-bold text-gray-700">
                  Employment History
                </Text>
                <div className="space-y-3">
                  {cv.experience.experience.map((experience: any) => (
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
                      <Text>{experience.description}</Text>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}
            {cv.education.education.length ? (
              <div>
                <Text className="mb-1 font-bold text-gray-700">Education</Text>
                <div className="space-y-3">
                  {cv.education.education.map((study: any) => (
                    <div key={study.id}>
                      <p className="text-xs">{study.courseName}</p>
                      {study.institutionName && (
                        <Text className="text-xs">{study.institutionName}</Text>
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
        {Object.keys(cv.personaldata).length ? (
          <Col>
            <Text className="mb-1 font-bold text-gray-700">Details</Text>
            <ul className="text-xs">
              <li>
                {cv.personaldata.cityName}, {cv.personaldata.zipCode}
              </li>
              <li>
                <Link href={`tel:${cv.personaldata.mobilePhone}`}>
                  {cv.personaldata.mobilePhone}
                </Link>
              </li>
              <li className="text-blue-500">
                <Link href={`mailto:${cv.personaldata.email}`}>
                  {cv.personaldata.email}
                </Link>
              </li>
            </ul>
            <Text className="mt-3">Date of Birth</Text>
            <p className="font-normal text-xs">
              {formatDate(cv.personaldata.birthDay)}
            </p>
            {cv.skills.expertise.length ? (
              <div className="mt-3">
                <Text className="mb-1 font-bold text-gray-700">Skills</Text>
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
                <Text className="mb-1 font-bold text-gray-700">Skills</Text>
                <div className="space-y-3">
                  {cv.skills.language.map((item: any) => (
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
  );
};
