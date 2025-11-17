export interface Prompt {
  id: string;
  title: string;
  content: string;
}

export interface Category {
  id: string;
  name: string;
  prompts: Prompt[];
  subcategories?: Category[];
}

export interface Library {
  id: string;
  name: string;
  isOwned: boolean;
  isActive: boolean;
  categories: Category[];
}

export interface SharedLink {
  id: string;
  url: string;
  name: string;
  createdAt: string;
  addedCount: number;
  selectedCategories: string[];
}
