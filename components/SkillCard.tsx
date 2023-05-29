import { useContext, useState } from 'react';
import { Disclosure } from '@headlessui/react';
import { ChevronUpIcon } from '@heroicons/react/24/outline';
import { toast } from 'react-hot-toast';
import {
  Button,
  Col,
  Grid,
  SelectBox,
  SelectBoxItem,
  Text,
  TextInput
} from '@tremor/react';
import classNames from 'classnames';

import { CVEditorContext } from '@/cv-editor';
import { PlusIcon } from 'lucide-react';

export const SkillCard = ({ isNew, name, level }: any) => {
  const { setState } = useContext<any>(CVEditorContext);

  const [skill, setSkill] = useState<any>(() => ({
    name: name || '',
    level: level || ''
  }));

  const onDelete = () => {
    if (!confirm('Are you sure you want to delete this skill?')) return;
    setState((prev: any) => ({
      ...prev,
      skills: {
        ...prev.expertise,
        expertise: prev.skills.expertise.filter(
          (item: any) => item.skill !== name
        )
      }
    }));
  };

  const onSave = () => {
    if (!skill.name || !skill.level)
      return toast.error('Please fill all the fields');

    if (isNew) {
      setState((prev: any) => ({
        ...prev,
        skills: {
          ...prev.skills,
          expertise: [
            ...prev.skills.expertise,
            {
              skill: skill.name,
              level: skill.level
            }
          ]
        }
      }));
    } else {
      setState((prev: any) => ({
        ...prev,
        skills: {
          ...prev.skills,
          expertise: prev.skills.expertise.map((item: any) => {
            return item.skill === name
              ? {
                  skill: skill.name,
                  level: skill.level
                }
              : item;
          })
        }
      }));
    }
    setSkill(() => ({
      name: 'Not specified',
      level: ''
    }));
  };

  const onCancel = () => {
    if (isNew) {
      setSkill(() => ({
        name: '',
        level: ''
      }));
    } else {
      setSkill(() => ({
        name,
        level
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
              {isNew ? 'Add skill' : name}
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
                <Text>Skill</Text>
                <TextInput
                  name="name"
                  value={skill.name}
                  onChange={(e) => {
                    setSkill((prev: any) => ({
                      ...prev,
                      name: e.target.value
                    }));
                  }}
                />
              </Col>
              <Col>
                <Text>Level</Text>
                <SelectBox
                  value={skill.level}
                  onValueChange={(value) =>
                    setSkill((prev: any) => ({
                      ...prev,
                      level: value
                    }))
                  }
                >
                  <SelectBoxItem value="bajo" text="Novice" />
                  <SelectBoxItem value="medio" text="Skillful" />
                  <SelectBoxItem value="alto" text="Expert" />
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
