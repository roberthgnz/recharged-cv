export const getStudy = async (key: string) => {
  const data = await import('../data/study.json');
  return data.default.find((item: any) => item.key === key);
};

export const getStudyDetails = async (key: string) => {
  const data = await import('../data/study-detail.json');
  return data.default.find((item: any) => item.key === key);
};

export const getLanguage = async (id: number) => {
  const data = await import('../data/language.json');
  return data.default.find((item: any) => item.id === id);
};
