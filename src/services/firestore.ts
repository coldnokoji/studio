


'use server';

import admin from 'firebase-admin';
import type { Award, Event, ContactMessage, TeamMember, VolunteerApplication, ImpactStory, NewsArticle, GalleryImage, Donation } from '@/lib/types';

// Your web app's Firebase configuration
const serviceAccount = {
  projectId: process.env.FIREBASE_PROJECT_ID,
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
};

if (!admin.apps.length) {
  try {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  } catch (error) {
    console.error('Firebase admin initialization error', error);
  }
}

const db = admin.firestore();

// Awards
export async function getAwards(): Promise<Award[]> {
  const awardsCol = db.collection('awards');
  const q = awardsCol.orderBy('year', 'desc');
  const awardsSnapshot = await q.get();
  return awardsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Award));
}

export async function getAwardById(id: string): Promise<Award | null> {
    const doc = await db.collection('awards').doc(id).get();
    if (!doc.exists) {
        return null;
    }
    return { id: doc.id, ...doc.data() } as Award;
}

export async function saveAward(id: string | undefined, data: Omit<Award, 'id'>): Promise<string> {
    if (id) {
        await db.collection('awards').doc(id).set(data, { merge: true });
        return id;
    }
    const docRef = await db.collection('awards').add(data);
    return docRef.id;
}

export async function deleteAward(id: string): Promise<void> {
    await db.collection('awards').doc(id).delete();
}


// Events
export async function getPastEvents(): Promise<Event[]> {
  const eventsCol = db.collection('events');
  const q = eventsCol.orderBy('date', 'desc');
  const eventsSnapshot = await q.get();
  return eventsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Event));
}

export async function getEventById(id: string): Promise<Event | null> {
    const doc = await db.collection('events').doc(id).get();
    if (!doc.exists) {
        return null;
    }
    return { id: doc.id, ...doc.data() } as Event;
}

export async function saveEvent(id: string | undefined, data: Omit<Event, 'id'>): Promise<string> {
    if (id) {
        await db.collection('events').doc(id).set(data, { merge: true });
        return id;
    }
    const docRef = await db.collection('events').add(data);
    return docRef.id;
}

export async function deleteEvent(id: string): Promise<void> {
    await db.collection('events').doc(id).delete();
}

// Team Members
export async function getTeamMembers(): Promise<TeamMember[]> {
  const membersCol = db.collection('teamMembers');
  const q = membersCol.orderBy('name');
  const membersSnapshot = await q.get();
  return membersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as TeamMember));
}

export async function getTeamMemberById(id: string): Promise<TeamMember | null> {
    const doc = await db.collection('teamMembers').doc(id).get();
    if (!doc.exists) {
        return null;
    }
    return { id: doc.id, ...doc.data() } as TeamMember;
}

export async function saveTeamMember(id: string | undefined, data: Omit<TeamMember, 'id'>): Promise<string> {
    if (id) {
        await db.collection('teamMembers').doc(id).set(data, { merge: true });
        return id;
    }
    const docRef = await db.collection('teamMembers').add(data);
    return docRef.id;
}

export async function deleteTeamMember(id: string): Promise<void> {
    await db.collection('teamMembers').doc(id).delete();
}


// Contact Messages
export async function saveContactMessage(message: Omit<ContactMessage, 'id' | 'createdAt'>): Promise<string> {
    const messagesCol = db.collection('contactMessages');
    const docRef = await messagesCol.add({
        ...message,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });
    return docRef.id;
}

// Volunteer Applications
export async function saveVolunteerApplication(application: Omit<VolunteerApplication, 'id' | 'createdAt'>): Promise<string> {
    const col = db.collection('volunteerApplications');
    const docRef = await col.add({
        ...application,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });
    return docRef.id;
}

export async function getVolunteerApplications(): Promise<VolunteerApplication[]> {
    const col = db.collection('volunteerApplications');
    const q = col.orderBy('createdAt', 'desc');
    const snapshot = await q.get();
    return snapshot.docs.map(doc => {
        const data = doc.data();
        return { 
            id: doc.id, 
            ...data,
            // Convert timestamp to string
            createdAt: data.createdAt.toDate().toISOString(),
        } as VolunteerApplication
    });
}

export async function deleteVolunteerApplication(id: string): Promise<void> {
    await db.collection('volunteerApplications').doc(id).delete();
}

// Impact Stories
export async function getImpactStories(): Promise<ImpactStory[]> {
  const storiesCol = db.collection('impactStories');
  const q = storiesCol.orderBy('title');
  const snapshot = await q.get();
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as ImpactStory));
}

export async function getImpactStoryById(id: string): Promise<ImpactStory | null> {
    const doc = await db.collection('impactStories').doc(id).get();
    if (!doc.exists) {
        return null;
    }
    return { id: doc.id, ...doc.data() } as ImpactStory;
}

export async function saveImpactStory(id: string | undefined, data: Omit<ImpactStory, 'id'>): Promise<string> {
    if (id) {
        await db.collection('impactStories').doc(id).set(data, { merge: true });
        return id;
    }
    const docRef = await db.collection('impactStories').add(data);
    return docRef.id;
}

export async function deleteImpactStory(id: string): Promise<void> {
    await db.collection('impactStories').doc(id).delete();
}

// News Articles
export async function getNewsArticles(): Promise<NewsArticle[]> {
  const articlesCol = db.collection('newsArticles');
  const q = articlesCol.orderBy('createdAt', 'desc');
  const snapshot = await q.get();
  return snapshot.docs.map(doc => {
      const data = doc.data();
      return {
          id: doc.id,
          ...data,
          createdAt: data.createdAt.toDate().toISOString(),
      } as NewsArticle
  });
}

export async function getNewsArticleById(id: string): Promise<NewsArticle | null> {
    const doc = await db.collection('newsArticles').doc(id).get();
    if (!doc.exists) {
        return null;
    }
    const data = doc.data();
    if (!data) return null;
    return { 
        id: doc.id, 
        ...data,
        createdAt: data.createdAt.toDate().toISOString(),
    } as NewsArticle;
}

export async function saveNewsArticle(id: string | undefined, data: Omit<NewsArticle, 'id' | 'createdAt'>): Promise<string> {
    if (id) {
        await db.collection('newsArticles').doc(id).set(data, { merge: true });
        return id;
    }
    const docRef = await db.collection('newsArticles').add({
        ...data,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });
    return docRef.id;
}

export async function deleteNewsArticle(id: string): Promise<void> {
    await db.collection('newsArticles').doc(id).delete();
}

// Gallery Images
export async function getGalleryImages(): Promise<GalleryImage[]> {
  const imagesCol = db.collection('galleryImages');
  const snapshot = await imagesCol.orderBy('title').get();
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as GalleryImage));
}

export async function getGalleryImageById(id: string): Promise<GalleryImage | null> {
    const doc = await db.collection('galleryImages').doc(id).get();
    if (!doc.exists) {
        return null;
    }
    return { id: doc.id, ...doc.data() } as GalleryImage;
}

export async function saveGalleryImage(id: string | undefined, data: Omit<GalleryImage, 'id'>): Promise<string> {
    if (id) {
        await db.collection('galleryImages').doc(id).set(data, { merge: true });
        return id;
    }
    const docRef = await db.collection('galleryImages').add(data);
    return docRef.id;
}

export async function deleteGalleryImage(id: string): Promise<void> {
    await db.collection('galleryImages').doc(id).delete();
}

// Donations
export async function saveDonation(donationData: Omit<Donation, 'id' | 'createdAt'>): Promise<string> {
    const docRef = await db.collection('donations').add({
        ...donationData,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });
    return docRef.id;
}

export async function getDonations(): Promise<Donation[]> {
    const snapshot = await db.collection('donations').orderBy('createdAt', 'desc').get();
    return snapshot.docs.map(doc => {
        const data = doc.data();
        return {
            id: doc.id,
            ...data,
            createdAt: data.createdAt.toDate().toISOString(),
        } as Donation;
    });
}