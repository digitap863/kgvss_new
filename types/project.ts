export type ImpactStat = {
  label: string;
  value: string;
};

export type ProjectInput = {
  title: string;
  slug: string;
  description: string;
  category: string;
  images: string[];
  featured: boolean;
  location: string;
  completionDate?: string | Date;
  impactStats: ImpactStat[];
  tags: string[];
};
