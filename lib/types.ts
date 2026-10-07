export type NoteMeta = {
  slug: string;
  title: string;
  category: string;
  summary: string;
  updated: string;
};

export type Note = NoteMeta & {
  contentHtml: string;
  handout: string | null;
};
