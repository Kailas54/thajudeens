import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db, isFirebaseConfigured } from '../../firebase/firebase';

export default function PostDetailPage() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchPost() {
      try {
        if (!isFirebaseConfigured) {
          const localData = localStorage.getItem('mock_survey_posts');
          if (localData) {
            const postsList = JSON.parse(localData);
            const found = postsList.find(p => p.id === id);
            if (found) {
              setPost(found);
            } else {
              setError(true);
            }
          } else {
            setError(true);
          }
          return;
        }

        const docRef = doc(db, 'posts', id);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          setPost({ id: docSnap.id, ...docSnap.data() });
        } else {
          setError(true);
        }
      } catch (err) {
        console.error("Error fetching post detail:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchPost();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-ds-blue flex items-center justify-center text-white font-extrabold text-xl uppercase tracking-widest animate-pulse">
        Loading update details...
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-ds-blue flex flex-col items-center justify-center text-white gap-4">
        <h2 className="text-2xl font-black uppercase tracking-wider">Post not found</h2>
        <Link to="/" className="bg-ds-yellow text-ds-dark font-black px-6 py-2.5 rounded-full text-sm uppercase tracking-wider hover:opacity-90 transition-all">
          Go Back Home
        </Link>
      </div>
    );
  }

  const { imageUrl, mediaUrl, mediaType = 'image', caption, tags = [], category, createdAt } = post;
  const src = mediaUrl || imageUrl;
  const formattedDate = createdAt && (createdAt.toDate || typeof createdAt === 'string')
    ? (createdAt.toDate ? createdAt.toDate().toLocaleDateString(undefined, { dateStyle: 'long' }) : new Date(createdAt).toLocaleDateString(undefined, { dateStyle: 'long' }))
    : new Date().toLocaleDateString(undefined, { dateStyle: 'long' });

  return (
    <div className="min-h-screen bg-ds-blue text-white px-6 py-12 md:px-12 flex flex-col items-center">
      <div className="w-full max-w-4xl flex flex-col gap-6">
        <div className="flex justify-start">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 bg-ds-yellow text-ds-dark font-black px-6 py-2.5 rounded-full text-xs uppercase tracking-widest hover:scale-105 transition-all shadow-md"
          >
            ← Back to Updates
          </Link>
        </div>

        <div className="bg-white text-ds-dark rounded-[24px] overflow-hidden shadow-2xl border border-white/10 grid grid-cols-1 md:grid-cols-2">
          <div className="relative aspect-square bg-ds-gray">
            {mediaType === 'video' ? (
              <video
                src={src}
                className="w-full h-full object-cover"
                controls
                playsInline
              />
            ) : (
              <img 
                src={src} 
                alt={caption} 
                className="w-full h-full object-cover"
              />
            )}
            <span className="absolute top-4 left-4 bg-ds-blue text-white font-black text-xs uppercase tracking-wider px-3.5 py-1.5 rounded-md shadow-sm">
              {category}
            </span>
          </div>

          <div className="p-6 md:p-10 flex flex-col justify-between h-full min-h-[400px]">
            <div className="space-y-6">
              <div className="text-xs font-bold uppercase tracking-widest text-ds-dark/40">
                Published {formattedDate}
              </div>

              <p className="text-ds-dark font-semibold text-base md:text-lg leading-relaxed whitespace-pre-wrap">
                {caption}
              </p>
            </div>

            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-6 border-t border-black/10">
                {tags.map((tag, idx) => (
                  <span 
                    key={idx} 
                    className="bg-ds-yellow text-ds-dark font-black text-xs uppercase tracking-wider px-3 py-1 rounded-full shadow-sm"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
