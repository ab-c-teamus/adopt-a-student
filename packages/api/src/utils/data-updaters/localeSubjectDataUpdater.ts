import { Country, LocaleCode, LocaleSubjectData } from '@adopt-a-student/common';

import { DataMutatorMap as DataMutatorMap, DataUpdater } from '../../declarations/types';

interface Props {
  existingData: LocaleSubjectData;
  updates: any;
}

const localeSubjectDataUpdater: DataUpdater<LocaleSubjectData> = ({
  updates,
  existingData,
}: Props) => {
  if (!updates) return { ...existingData };

  const newData: LocaleSubjectData = { ...existingData };

  const mutators: DataMutatorMap<LocaleSubjectData> = {
    id: null,
    relatedStudents: null, // change handled by a different request
    relatedTutors: null, // change handled by a different request
    country: (value) =>
      typeof value === "string" ? (newData.country = value as Country) : null,
    description: (value) =>
      typeof value === "string" ? (newData.description = value) : null,
    parentId: (value) =>
      typeof value === "string" ? (newData.parentId = value) : null,
    locale: (value) =>
      typeof value === "string" ? (newData.locale = value as LocaleCode) : null,
  };

  // apply mutations where allowed
  Object.entries(updates).forEach(([key, value]) => {
    const mutator = mutators[key as keyof LocaleSubjectData];
    if (mutator) mutator(value);
  });

  return newData;
};

export default localeSubjectDataUpdater;
