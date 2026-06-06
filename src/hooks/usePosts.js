import { useEffect, useState } from 'react';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db, isFirebaseConfigured } from '../firebase/firebase';

const MOCK_DEFAULT_POSTS = [
  {
    id: 'mock-1',
    imageUrl: '/elephant.png',
    caption: 'Turn On Precision. Turn Off Guesswork with our state-of-the-art surveying tools. We provide mapping that feels accurate, fast, and reliable.',
    tags: ['precision', 'surveying', 'mapping'],
    category: 'Announcement',
    status: 'published',
    createdAt: new Date(Date.now() - 86400000).toISOString()
  },
  {
    id: 'mock-2',
    imageUrl: '/ajmal.png',
    caption: 'Meet Ajmal, one of our key founders directing premium digital land surveying strategies.',
    tags: ['team', 'founder', 'spotlight'],
    category: 'Update',
    status: 'published',
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString()
  },
  {
    id: 'mock-3',
    imageUrl: '/meera.png',
    caption: 'Meera focuses on operations and surveyor training, delivering high-speed project timelines.',
    tags: ['operations', 'founder'],
    category: 'Blog',
    status: 'draft',
    createdAt: new Date(Date.now() - 86400000 * 3).toISOString()
  }
];

export function usePosts(isAdmin = false) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!isFirebaseConfigured) {
      // Mock mode: Load from localStorage or default list
      const loadMockPosts = () => {
        try {
          let localData = localStorage.getItem('mock_survey_posts');
          if (!localData) {
            localStorage.setItem('mock_survey_posts', JSON.stringify(MOCK_DEFAULT_POSTS));
            localData = JSON.stringify(MOCK_DEFAULT_POSTS);
          }
          const parsed = JSON.parse(localData);
          
          if (isAdmin) {
            setPosts(parsed);
          } else {
            setPosts(parsed.filter(post => post.status === 'published'));
          }
        } catch (err) {
          console.error("Mock load error", err);
        } finally {
          setLoading(false);
        }
      };

      loadMockPosts();

      // Simple listener for localStorage change events (e.g., if tabs modify it)
      window.addEventListener('storage', loadMockPosts);
      // Custom event to watch updates from within the same tab
      window.addEventListener('mock-posts-updated', loadMockPosts);
      
      return () => {
        window.removeEventListener('storage', loadMockPosts);
        window.removeEventListener('mock-posts-updated', loadMockPosts);
      };
    }

    try {
      const postsRef = collection(db, 'posts');
      const q = query(postsRef, orderBy('createdAt', 'desc'));

      const unsubscribe = onSnapshot(q, (snapshot) => {
        const fetchedPosts = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt?.toDate ? doc.data().createdAt.toDate().toISOString() : doc.data().createdAt,
          updatedAt: doc.data().updatedAt?.toDate ? doc.data().updatedAt.toDate().toISOString() : doc.data().updatedAt,
        }));

        if (isAdmin) {
          setPosts(fetchedPosts);
        } else {
          setPosts(fetchedPosts.filter(post => post.status === 'published'));
        }
        setLoading(false);
      }, (err) => {
        console.error("Firestore onSnapshot error: ", err);
        setError(err);
        setLoading(false);
      });

      return unsubscribe;
    } catch (err) {
      console.error("usePosts initialization error: ", err);
      setError(err);
      setLoading(false);
    }
  }, [isAdmin]);

  return { posts, loading, error };
}
