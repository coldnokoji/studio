
export type Award = {
  id: string;
  title: string;
  issuer: string;
  year: string;
  image: string;
  aiHint: string;
};

export type Event = {
  id: string;
  title: string;
  date: string;
  description: string;
  image: string;
  aiHint: string;
};

export type ContactMessage = {
  id?: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: Date;
};

export type TeamMember = {
  id: string;
  name: string;
  role: string;
  image: string;
  aiHint: string;
};
