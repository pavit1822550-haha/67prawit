export const PET_SPECIES = [
  { value: "dog", label: "สุนัข" },
  { value: "cat", label: "แมว" },
  { value: "bird", label: "นก" },
  { value: "rabbit", label: "กระต่าย" },
  { value: "other", label: "อื่น ๆ" },
] as const;

export const PET_SEXES = [
  { value: "male", label: "ผู้" },
  { value: "female", label: "เมีย" },
  { value: "other", label: "อื่น ๆ" },
] as const;

export type PetSpecies = (typeof PET_SPECIES)[number]["value"];
export type PetSex = (typeof PET_SEXES)[number]["value"];

export interface Pet {
  id: string;
  name: string;
  species: PetSpecies;
  details: string;
  owner: string;
  sex: PetSex;
  imageData?: string;
  createdAt: string;
}

export function getSpeciesLabel(species: PetSpecies) {
  return PET_SPECIES.find((item) => item.value === species)?.label ?? species;
}

export function getSexLabel(sex: PetSex) {
  return PET_SEXES.find((item) => item.value === sex)?.label ?? sex;
}
