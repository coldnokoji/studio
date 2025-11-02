


'use server';

import type { Award, Event, ContactMessage, TeamMember, VolunteerApplication, ImpactStory, NewsArticle, GalleryImage, Donation, SiteSettings } from '@/lib/types';
import { getDb } from '@/lib/firebase/admin';

// Site Settings
export async function getSiteSettings(): Promise<SiteSettings> {
  const db = await getDb();
  const doc = await db.collection('settings').doc('main').get();
  const defaultSettings: SiteSettings = {
      founderName: "Founder's Name",
      contactAddress: "123 Social Welfare Avenue<br/>Mumbai, 400001, India",
      contactPhone: "+91 123 456 7890",
      contactEmail: "contact@shreyaskar.org",
      homeIntro: "Shreyaskar Social Welfare Foundation is a newly established non-profit organization driven by the principle of \"Seva Paramo Dharma\" - service as the highest duty. We are committed to fostering positive change by focusing on the core pillars of a thriving society.",
      aboutIntro: "Laying the groundwork for a compassionate and self-reliant society through dedicated service.",
      mission: "To empower communities by fostering sustainable development in education, healthcare, environment, and livelihood. We are dedicated to creating a foundation of opportunity for every individual to lead a life of dignity and purpose.",
      vision: "We envision a self-reliant and compassionate India, where all citizens have the resources and opportunities they need to thrive, contributing to a society built on the principles of service, equality, and justice.",
      founderMessage: "\"With a firm belief in 'Seva Paramo Dharma' - service as our highest duty - we have embarked on this journey. Shreyaskar is born from a desire to create tangible change from the ground up. Every small step we take today is a seed planted for a better tomorrow. I invite you to join us in nurturing these seeds of hope and building a brighter future together.\"",
      socialFacebook: "https://facebook.com",
      socialInstagram: "https://instagram.com",
      socialTwitter: "https://twitter.com",
      socialYoutube: "https://youtube.com",
      contactWhatsApp: "911234567890",
      homeHeroVideoUrl: "https://videos.pexels.com/video-files/3209828/3209828-hd_1920_1080_25fps.mp4",
      founderPortrait: 'https://picsum.photos/seed/founder/800/1000',
      homeHeroCommunity: 'https://picsum.photos/seed/community/800/600',
      getInvolvedVolunteer: 'https://picsum.photos/seed/volunteer/600/400',
      programEducationHero: 'https://picsum.photos/seed/edu-hero/800/600',
      programEducationGallery1: 'https://picsum.photos/seed/edu-gal1/600/400',
      programEducationGallery2: 'https://picsum.photos/seed/edu-gal2/600/400',
      programEducationGallery3: 'https://picsum.photos/seed/edu-gal3/600/400',
      programHealthcareHero: 'https://picsum.photos/seed/health-hero/800/600',
      programHealthcareGallery1: 'https://picsum.photos/seed/health-gal1/600/400',
      programHealthcareGallery2: 'https://picsum.photos/seed/health-gal2/600/400',
      programHealthcareGallery3: 'https://picsum.photos/seed/health-gal3/600/400',
      programEnvironmentHero: 'https://picsum.photos/seed/env-hero/800/600',
      programEnvironmentGallery1: 'https://picsum.photos/seed/env-gal1/600/400',
      programEnvironmentGallery2: 'https://picsum.photos/seed/env-gal2/600/400',
      programEnvironmentGallery3: 'https://picsum.photos/seed/env-gal3/600/400',
      programLivelihoodHero: 'https://picsum.photos/seed/live-hero/800/600',
      programLivelihoodGallery1: 'https://picsum.photos/seed/live-gal1/600/400',
      programLivelihoodGallery2: 'https://picsum.photos/seed/live-gal2/600/400',
      programLivelihoodGallery3: 'https://picsum.photos/seed/live-gal3/600/400',
  };

  if (!doc.exists) {
    return defaultSettings;
  }
  
  // Merge defaults with existing data to prevent errors if new fields are added
  return { ...defaultSettings, ...doc.data() } as SiteSettings;
}

export async function saveSiteSettings(data: SiteSettings): Promise<void> {
  const db = await getDb();
  await db.collection('settings').doc('main').set(data, { merge: true });
}

// Awards
export async function getAwards(): Promise<Award[]> {
  const db = await getDb();
  const awardsCol = db.collection('awards');
  const q = awardsCol.orderBy('year', 'desc');
  const awardsSnapshot = await q.get();
  return awardsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Award));
}

export async function getAwardById(id: string): Promise<Award | null> {
    const db = await getDb();
    const doc = await db.collection('awards').doc(id).get();
    if (!doc.exists) {
        return null;
    }
    return { id: doc.id, ...doc.data() } as Award;
}

export async function saveAward(id: string | undefined, data: Omit<Award, 'id'>): Promise<string> {
    const db = await getDb();
    if (id) {
        await db.collection('awards').doc(id).set(data, { merge: true });
        return id;
    }
    const docRef = await db.collection('awards').add(data);
    return docRef.id;
}

export async function deleteAward(id: string): Promise<void> {
    const db = await getDb();
    await db.collection('awards').doc(id).delete();
}


// Events
export async function getPastEvents(): Promise<Event[]> {
  const db = await getDb();
  const eventsCol = db.collection('events');
  const q = eventsCol.orderBy('date', 'desc');
  const eventsSnapshot = await q.get();
  return eventsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Event));
}

export async function getEventById(id: string): Promise<Event | null> {
    const db = await getDb();
    const doc = await db.collection('events').doc(id).get();
    if (!doc.exists) {
        return null;
    }
    return { id: doc.id, ...doc.data() } as Event;
}

export async function saveEvent(id: string | undefined, data: Omit<Event, 'id'>): Promise<string> {
    const db = await getDb();
    if (id) {
        await db.collection('events').doc(id).set(data, { merge: true });
        return id;
    }
    const docRef = await db.collection('events').add(data);
    return docRef.id;
}

export async function deleteEvent(id: string): Promise<void> {
    const db = await getDb();
    await db.collection('events').doc(id).delete();
}

// Team Members
export async function getTeamMembers(): Promise<TeamMember[]> {
  const db = await getDb();
  const membersCol = db.collection('teamMembers');
  const q = membersCol.orderBy('name');
  const membersSnapshot = await q.get();
  return membersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as TeamMember));
}

export async function getTeamMemberById(id: string): Promise<TeamMember | null> {
    const db = await getDb();
    const doc = await db.collection('teamMembers').doc(id).get();
    if (!doc.exists) {
        return null;
    }
    return { id: doc.id, ...doc.data() } as TeamMember;
}

export async function saveTeamMember(id: string | undefined, data: Omit<TeamMember, 'id'>): Promise<string> {
    const db = await getDb();
    if (id) {
        await db.collection('teamMembers').doc(id).set(data, { merge: true });
        return id;
    }
    const docRef = await db.collection('teamMembers').add(data);
    return docRef.id;
}

export async function deleteTeamMember(id: string): Promise<void> {
    const db = await getDb();
    await db.collection('teamMembers').doc(id).delete();
}


// Contact Messages
export async function saveContactMessage(message: Omit<ContactMessage, 'id' | 'createdAt'>): Promise<string> {
    const db = await getDb();
    const messagesCol = db.collection('contactMessages');
    const docRef = await messagesCol.add({
        ...message,
        createdAt: new Date().toISOString(),
    });
    return docRef.id;
}

// Volunteer Applications
export async function saveVolunteerApplication(application: Omit<VolunteerApplication, 'id' | 'createdAt'>): Promise<string> {
    const db = await getDb();
    const col = db.collection('volunteerApplications');
    const docRef = await col.add({
        ...application,
        createdAt: new Date().toISOString(),
    });
    return docRef.id;
}

export async function getVolunteerApplications(): Promise<VolunteerApplication[]> {
    const db = await getDb();
    const col = db.collection('volunteerApplications');
    const q = col.orderBy('createdAt', 'desc');
    const snapshot = await q.get();
    return snapshot.docs.map(doc => {
        const data = doc.data();
        return { 
            id: doc.id, 
            ...data,
            createdAt: data.createdAt, // Already a string
        } as VolunteerApplication
    });
}

export async function deleteVolunteerApplication(id: string): Promise<void> {
    const db = await getDb();
    await db.collection('volunteerApplications').doc(id).delete();
}

// Impact Stories
export async function getImpactStories(): Promise<ImpactStory[]> {
  const db = await getDb();
  const storiesCol = db.collection('impactStories');
  const q = storiesCol.orderBy('title');
  const snapshot = await q.get();
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as ImpactStory));
}

export async function getImpactStoryById(id: string): Promise<ImpactStory | null> {
    const db = await getDb();
    const doc = await db.collection('impactStories').doc(id).get();
    if (!doc.exists) {
        return null;
    }
    return { id: doc.id, ...doc.data() } as ImpactStory;
}

export async function saveImpactStory(id: string | undefined, data: Omit<ImpactStory, 'id'>): Promise<string> {
    const db = await getDb();
    if (id) {
        await db.collection('impactStories').doc(id).set(data, { merge: true });
        return id;
    }
    const docRef = await db.collection('impactStories').add(data);
    return docRef.id;
}

export async function deleteImpactStory(id: string): Promise<void> {
    const db = await getDb();
    await db.collection('impactStories').doc(id).delete();
}

// News Articles
export async function getNewsArticles(): Promise<NewsArticle[]> {
  const db = await getDb();
  const articlesCol = db.collection('newsArticles');
  const q = articlesCol.orderBy('createdAt', 'desc');
  const snapshot = await q.get();
  return snapshot.docs.map(doc => {
      const data = doc.data();
      return {
          id: doc.id,
          ...data,
          createdAt: data.createdAt,
      } as NewsArticle
  });
}

export async function getNewsArticleById(id: string): Promise<NewsArticle | null> {
    const db = await getDb();
    const doc = await db.collection('newsArticles').doc(id).get();
    if (!doc.exists) {
        return null;
    }
    const data = doc.data();
    if (!data) return null;
    return { 
        id: doc.id, 
        ...data,
        createdAt: data.createdAt,
    } as NewsArticle;
}

export async function saveNewsArticle(id: string | undefined, data: Omit<NewsArticle, 'id' | 'createdAt'>): Promise<string> {
    const db = await getDb();
    if (id) {
        await db.collection('newsArticles').doc(id).set({
            ...data,
            updatedAt: new Date().toISOString(),
        }, { merge: true });
        return id;
    }
    const docRef = await db.collection('newsArticles').add({
        ...data,
        createdAt: new Date().toISOString(),
    });
    return docRef.id;
}

export async function deleteNewsArticle(id: string): Promise<void> {
    const db = await getDb();
    await db.collection('newsArticles').doc(id).delete();
}

// Gallery Images
export async function getGalleryImages(): Promise<GalleryImage[]> {
  const db = await getDb();
  const imagesCol = db.collection('galleryImages');
  const snapshot = await imagesCol.orderBy('title').get();
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as GalleryImage));
}

export async function getGalleryImageById(id: string): Promise<GalleryImage | null> {
    const db = await getDb();
    const doc = await db.collection('galleryImages').doc(id).get();
    if (!doc.exists) {
        return null;
    }
    return { id: doc.id, ...doc.data() } as GalleryImage;
}

export async function saveGalleryImage(id: string | undefined, data: Omit<GalleryImage, 'id'>): Promise<string> {
    const db = await getDb();
    if (id) {
        await db.collection('galleryImages').doc(id).set(data, { merge: true });
        return id;
    }
    const docRef = await db.collection('galleryImages').add(data);
    return docRef.id;
}

export async function deleteGalleryImage(id: string): Promise<void> {
    const db = await getDb();
    await db.collection('galleryImages').doc(id).delete();
}

// Donations
export async function saveDonation(data: Omit<Donation, 'id'>): Promise<string> {
  const db = await getDb();
  
  // Use the txnid as the document ID, just like the webhook does
  const docRef = db.collection("donations").doc(data.txnid);
  
  // Set the complete data object
  await docRef.set(data);
  
  return data.txnid;
}

export async function getAllDonations(): Promise<Donation[]> {
    const db = await getDb();
  const snapshot = await db
    .collection("donations")
    .orderBy("donationDate", "desc") // Use the new 'donationDate' field
    .get();

  return snapshot.docs.map((doc:any) => {
    // This is the safe way to cast
    const data = doc.data() as Omit<Donation, "id">;
    return {
      id: doc.id,
      ...data,
    };
  });
}

type CreateDonationData = Omit<Donation, 'id'>;


export async function createDonation(data: CreateDonationData) {
  const { txnid } = data;
  const db = await getDb();
  try {
    const donationRef = db.collection('donations').doc(txnid);
    
    // 'data' already contains all fields (pan, address, etc.)
    // from the webhook, so we just set it.
    await donationRef.set(data);

    console.log(`Donation ${txnid} created successfully.`);
    return txnid;
  } catch (error) {
    console.error('Error creating donation:', error);
    throw new Error('Failed to create donation in Firestore');
  }
}

export async function getDonationByTxnId(txnid: string): Promise<Donation | null> {
    const db = await getDb();
  try {
    const donationRef = db.collection("donations").doc(txnid);
    const doc = await donationRef.get();

    if (!doc.exists) {
      console.log("No such donation!", txnid);
      return null;
    }

    // Cast the data to the Donation type
    const donation = doc.data() as Omit<Donation, 'id'>;
    
    return { ...donation, id: doc.id };
  } catch (error)
  {
    console.error("Error getting donation by txnid:", error);
    return null;
  }
}
