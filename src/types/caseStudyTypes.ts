export type getAllCaseStudyType = {
  page?: number;
  limit?: number;
};

type Solution = {
  h: string;
  p: string;
};

type Typography = {
  name: string;
  cdn: string;
};

export type CaseStudyItemType = {
  _id: string;
  projectName: string;
  description: string;
  companyLogo: string;
  mainImage: string;
  platform: string;
  duration: string;
  industry: string;
  problem: string[];
  solution: Solution[];
  devProcess: string[];
  challenges: string[];
  color: string[];
  typography: Typography[];
  conclusion: string[];
  features: string[];
  isActive: boolean;
  tech: string[];
};
