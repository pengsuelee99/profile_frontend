export interface Project {
  _id?: string;
  id?: number;
  title: string;
  title_la: string;
  title_th: string;
  title_en: string;
  description: string;
  description_la: string;
  description_th: string;
  description_en: string;
  fullDescription?: string;
  tags: string[];
  link: string;
  status: string;
  image?: string;
  gallery?: string[];
  category?: string;
}
