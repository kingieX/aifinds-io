export interface ToolSubmission {
  name: string;
  description: string;
  website: string;
  github?: string;
  categoryId: string;
  tags: string[];
  image: File | null;
  email: string;
}
