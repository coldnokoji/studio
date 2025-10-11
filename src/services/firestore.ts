
'use server';

import type { Award, Event, ContactMessage, TeamMember, VolunteerApplication, ImpactStory, NewsArticle, GalleryImage, Donation } from '@/lib/types';
import { getDb } from '@/lib/firebase/admin';

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
export async function saveDonation(donationData: Omit<Donation, 'id' | 'createdAt'>): Promise<string> {
    const db = await getDb();
    // Check if a donation with this txnid already exists to prevent duplicates
    const existing = await db.collection('donations').where('txnid', '==', donationData.txnid).limit(1).get();
    if (!existing.empty) {
        console.log(`Donation with txnid ${donationData.txnid} already exists. Skipping save.`);
        return existing.docs[0].id;
    }
    
    const docRef = await db.collection('donations').add({
        ...donationData,
        createdAt: new Date().toISOString(),
    });
    return docRef.id;
}

export async function getDonations(): Promise<Donation[]> {
    const db = await getDb();
    const snapshot = await db.collection('donations').orderBy('createdAt', 'desc').get();
    return snapshot.docs.map(doc => {
        const data = doc.data();
        return {
            id: doc.id,
            ...data,
            createdAt: data.createdAt,
        } as Donation;
    });
}

export async function getDonationByTxnId(txnid: string): Promise<Donation | null> {
    const db = await getDb();
    const snapshot = await db.collection('donations').where('txnid', '==', txnid).limit(1).get();
    if (snapshot.empty) {
        return null;
    }
    const doc = snapshot.docs[0];
    const data = doc.data();
    return { 
        id: doc.id,
         ...data,
        createdAt: data.createdAt
    } as Donation;
}
