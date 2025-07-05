export type AITool = {
  id: string;
  name: string;
  description: string;
  category: string;
  categoryId?: string; // optional for future use
  tags: string[];
  website: string;
  image: string;
  isFeatured?: boolean;
  createdAt: string; // ISO format
  upvotes?: number;
  github?: string;
  features?: string[];
  useCases?: string[];
};
