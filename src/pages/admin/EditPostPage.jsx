import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db, isFirebaseConfigured } from '../../firebase/firebase';
import AdminSidebar from '../../components/AdminSidebar';
import PostForm from '../../components/PostForm';

export default function EditPostPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getPostData() {
      try {
        if (!isFirebaseConfigured) {
          const localData = localStorage.getItem('mock_survey_posts');
          if (localData) {
            const postsList = JSON.parse(localData);
            const found = postsList.find(p => p.id === id);
            if (found) {
              setPost(found);
            } else {
              alert("Post does not exist.");
              navigate('/admin/posts');
            }
          }
          setLoading(false);
          return;
        }

        const docRef = doc(db, 'posts', id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setPost({ id: docSnap.id, ...docSnap.data() });
        } else {
          alert("Post does not exist.");
          navigate('/admin/posts');
        }
      } catch (err) {
        console.error("Error fetching post to edit:", err);
        alert("Failed to load post data.");
        navigate('/admin/posts');
      } finally {
        setLoading(false);
      }
    }
    getPostData();
  }, [id, navigate]);

  return (
    <div className="min-h-screen bg-[#000000] flex text-white">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content Area */}
      <main className="flex-1 md:ml-[244px] min-h-screen pb-20 md:pb-0">
        <div className="max-w-[935px] mx-auto pt-8 px-4 md:px-5 space-y-6">
          {/* Header */}
          <div className="border-b border-neutral-800 pb-6">
            <h1 className="text-3xl font-black text-white uppercase tracking-wide">Edit Post</h1>
            <p className="text-sm font-bold text-neutral-400">Modify caption, category, tags, or status</p>
          </div>

          {/* Form */}
          {loading ? (
            <div className="text-neutral-500 font-bold text-sm text-center py-12 animate-pulse uppercase tracking-wider">
              Loading post data...
            </div>
          ) : (
            <PostForm initialData={post} isEdit={true} />
          )}
        </div>
      </main>
    </div>
  );
}
