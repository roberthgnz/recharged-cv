'use client';
import { useRef, useState } from 'react';
import { useOnClickOutside } from 'usehooks-ts';
import { toast } from 'react-hot-toast';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export const DialogSuggestions = ({
  prompt,
  defaultContext,
  defaultGeneratedText = '1. Results-driven software engineer with 5+ years of experience in Python development. Proficient in React and passionate about building innovative solutions for complex problems. \n2. Highly skilled and detail-oriented Python developer with expertise in React. Committed to delivering high-quality software products that exceed client expectations. \n3. Experienced software engineer with a strong background in Python and React. Excels at collaborating with cross-functional teams to develop innovative solutions to complex problems. \n4. Expert software engineer with 5+ years of experience in Python development. Skilled in React and passionate about building innovative solutions for complex problems.',
  onClose,
  onSelect
}: any) => {
  const ref = useRef(null);

  const [loading, setLoading] = useState(false);
  const [context, setContext] = useState(defaultContext || '');

  const [generatedText, setGeneratedText] = useState(defaultGeneratedText);

  const generate = async (e: any) => {
    e.preventDefault();
    setGeneratedText('');
    setLoading(true);

    const _prompt =
      prompt ||
      `Generate 4 Professional and energetic CV summary clearly labeling each section 1. 2. 3. 4.
      Make sure each generated summary is at least 150 and 200 max characters based on this context: ${context}`;

    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        prompt: _prompt
      })
    });

    if (!response.ok) {
      return toast.error(response.statusText);
    }

    // This data is a ReadableStream
    const data = response.body;
    if (!data) {
      return;
    }

    const reader = data.getReader();
    const decoder = new TextDecoder();
    let done = false;

    while (!done) {
      const { value, done: doneReading } = await reader.read();
      done = doneReading;
      const chunkValue = decoder.decode(value);
      setGeneratedText((prev: string) => prev + chunkValue);
    }

    setLoading(false);
  };

  useOnClickOutside(ref, (e) => {
    if (loading) return;
    onClose(e);
  });

  return (
    <div ref={ref} className="w-full p-3 border bg-white shadow-lg rounded-md">
      <form onSubmit={generate}>
        <div className="flex items-center space-x-3">
          <Input
            value={context}
            onChange={(e: any) => setContext(e.target.value)}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black my-5"
            placeholder={
              'Use keywords and job title. e.g. "software engineer, python, react"'
            }
            disabled={loading}
          />
          <Button disabled={loading} onClick={generate}>
            Generate
          </Button>
        </div>
      </form>
      <div className="space-y-10">
        {generatedText && (
          <div className="space-y-4">
            {generatedText
              .split(/\d\./)
              .slice(1)
              .map((generated: string, index: number) => {
                return (
                  <div
                    className="flex flex-row gap-4"
                    key={`generated-${index}`}
                  >
                    <div className="w-5 h-5 flex-shrink-0 inline-flex justify-center items-center cursor-default text-blue-700 bg-blue-100 rounded-full text-sm">
                      {index + 1}
                    </div>
                    <div
                      onClick={() => {
                        onSelect(generated.trim());
                      }}
                    >
                      <span className="cursor-pointer select-none rounded-md hover:bg-blue-100">
                        {generated}
                      </span>
                    </div>
                  </div>
                );
              })}
          </div>
        )}
      </div>
    </div>
  );
};
