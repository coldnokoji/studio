




export type Award = {
  id: string;
  title: string;
  issuer: string;
  year: string;
  image: string;
  aiHint?: string;
};

export type Event = {
  id:string;
  title: string;
  date: string;
  description: string;
  image: string;
  aiHint?: string;
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
  aiHint?: string;
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
    aiHint?: string;
}

export type NewsArticle = {
    id: string;
    title: string;
    author: string;
    summary: string;
    content: string;
    image: string;
    aiHint?: string;
    createdAt: string;
}

export type GalleryImage = {
    id: string;
    title: string;
    imageUrl: string;
    aiHint?: string;
}

export type Donation = {
  id: string;
  name: string;
  email: string;
  amount: number;
  txnid: string;
  status: 'success' | 'failure';
  isRecurring: boolean;
  createdAt: string;
}

export type SiteSettings = {
  // Text Content
  founderName: string;
  contactAddress: string;
  contactPhone: string;
  contactEmail: string;
  homeIntro: string;
  aboutIntro: string;
  mission: string;
  vision: string;
  founderMessage: string;

  // Social Media URLs
  socialFacebook: string;
  socialInstagram: string;
  socialTwitter: string;
  socialYoutube: string;
  contactWhatsApp: string;

  // Videos
  homeHeroVideoUrl: string;

  // Images
  founderPortrait: string;
  homeHeroCommunity: string;
  getInvolvedVolunteer: string;

  // Program Images
  programEducationHero: string;
  programEducationGallery1: string;
  programEducationGallery2: string;
  programEducationGallery3: string;

  programHealthcareHero: string;
  programHealthcareGallery1: string;
  programHealthcareGallery2: string;
  programHealthcareGallery3: string;
  
  programEnvironmentHero: string;
  programEnvironmentGallery1: string;
  programEnvironmentGallery2: string;
  programEnvironmentGallery3: string;
  
  programLivelihoodHero: string;
  programLivelihoodGallery1: string;
  programLivelihoodGallery2: string;
  programLivelihoodGallery3: string;
}
