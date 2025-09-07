

export type Award = {
  id: string;
  title: string;
  issuer: string;
  year: string;
  image: string;
  aiHint: string;
};

export type Event = {
  id:string;
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

export type VolunteerApplication = {
    id: string;
    name: string;
    email: string;
    phone: string;
    areaOfInterest: string;
    availability: string;
    createdAt: string;
}

export type ImpactStory = {
    id: string;
    title: string;
    quote: string;
    story: string;
    personName: string;
    image: string;
    aiHint: string;
}

export type NewsArticle = {
    id: string;
    title: string;
    author: string;
    summary: string;
    content: string;
    image: string;
    aiHint: string;
    createdAt: string;
}

export type GalleryImage = {
    id: string;
    title: string;
    imageUrl: string;
    aiHint: string;
}