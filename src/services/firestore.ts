
'use server';

import admin from 'firebase-admin';
import type { Award, Event, ContactMessage } from '@/lib/types';

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

export async function getAwards(): Promise<Award[]> {
  const awardsCol = db.collection('awards');
  const q = awardsCol.orderBy('year', 'desc');
  const awardsSnapshot = await q.get();
  const awardsList = awardsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Award));
  return awardsList;
}

export async function getPastEvents(): Promise<Event[]> {
  const eventsCol = db.collection('events');
  const q = eventsCol.orderBy('date', 'desc');
  const eventsSnapshot = await q.get();
  const eventList = eventsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Event));
  return eventList;
}

export async function saveContactMessage(message: Omit<ContactMessage, 'id' | 'createdAt'>): Promise<string> {
    const messagesCol = db.collection('contactMessages');
    const docRef = await messagesCol.add({
        ...message,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });
    return docRef.id;
}
