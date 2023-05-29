import { useContext, useEffect, useState } from 'react';
import { Disclosure } from '@headlessui/react';
import { ChevronUpIcon } from '@heroicons/react/24/outline';
import { toast } from 'react-hot-toast';
import {
  Button,
  Col,
  Grid,
  SelectBox,
  SelectBoxItem,
  Text
} from '@tremor/react';
import classNames from 'classnames';
import { CVEditorContext } from '@/cv-editor';
import { PlusIcon } from 'lucide-react';

import languages from '@/data/language.json';

export const LanguageCard = ({ isNew, id, level }: any) => {
  const { state, setState } = useContext<any>(CVEditorContext);

  const [language, setLanguage] = useState<any>({ id, level });

  useEffect(() => {
    if (!isNew) {
      const lang = languages.find((item: any) => item.id === id);
      setLanguage(() => ({
        id,
        level,
        name: lang?.value
      }));
    }
  }, []);

  const onDelete = () => {
    if (!confirm('Are you sure you want to delete this skill?')) return;
    setState((prev: any) => ({
      ...prev,
      skills: {
        ...prev.skills,
        language: prev.skills.language.filter((item: any) => item.id !== id)
      }
    }));
  };

  const onSave = () => {
    if (!language.id || !language.level)
      return toast.error('Please fill all the fields');

    const lang = languages.find((item: any) => item.id === language.id);

    setLanguage((prev: any) => ({
      ...prev,
      name: lang?.value
    }));

    if (isNew) {
      setState((prev: any) => ({
        ...prev,
        skills: {
          ...prev.skills,
          language: [
            ...prev.skills.language,
            {
              ...language,
              speaking: language.level
            }
          ]
        }
      }));
      setLanguage(() => ({}));
    } else {
      setState((prev: any) => ({
        ...prev,
        skills: {
          ...prev.skills,
          language: prev.skills.language.map((item: any) => {
            return item.id === id
              ? {
                  ...language,
                  speaking: language.level
                }
              : item;
          })
        }
      }));
    }
  };

  const onCancel = () => {
    if (isNew) {
      setLanguage(() => ({}));
    } else {
      const lang = languages.find((item: any) => item.id === id);
      setLanguage(() => ({
        id,
        level,
        name: lang?.value
      }));
    }
  };

  return (
    <Disclosure as={'div'} className={'p-4 border rounded-md'}>
      {({ open }) => (
        <>
          <Disclosure.Button
            className={'w-full flex items-center justify-between'}
          >
            <span className={classNames(isNew && 'text-blue-500')}>
              {isNew ? 'Add language' : language.name}
            </span>

            {isNew && !open ? (
              <PlusIcon width={16} height={16} className="text-blue-500" />
            ) : (
              <ChevronUpIcon
                width={16}
                height={16}
                className={open ? 'rotate-180 transform' : ''}
              />
            )}
          </Disclosure.Button>
          <Disclosure.Panel as="div" className={'py-4'}>
            <Grid numCols={2} className="gap-2">
              <Col>
                <Text>Language</Text>
                <SelectBox
                  value={language.id}
                  onValueChange={(value) => {
                    setLanguage((prev: any) => ({
                      ...prev,
                      id: value
                    }));
                  }}
                >
                  {languages.map((item: any) => (
                    <SelectBoxItem
                      key={item.id}
                      value={item.id}
                      text={item.value}
                    />
                  ))}
                </SelectBox>
              </Col>
              <Col>
                <Text>Level</Text>
                <SelectBox
                  value={language.level}
                  onValueChange={(value) =>
                    setLanguage((prev: any) => ({
                      ...prev,
                      level: value
                    }))
                  }
                >
                  <SelectBoxItem value="nulo" text="Null" />
                  <SelectBoxItem value="elemental" text="Elementary" />
                  <SelectBoxItem value="conversacion" text="Intermediate" />
                  <SelectBoxItem value="negociacion" text="Advanced" />
                  <SelectBoxItem value="nativo" text="Native" />
                </SelectBox>
              </Col>
            </Grid>

            <div className="flex justify-between mt-6">
              {!isNew ? (
                <Button
                  size="xs"
                  color="red"
                  variant="secondary"
                  onClick={onDelete}
                >
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
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};
