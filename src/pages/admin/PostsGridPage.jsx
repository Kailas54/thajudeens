import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { doc, deleteDoc } from 'firebase/firestore';
import { IconEdit, IconTrash, IconGrid3x3, IconPlus } from '@tabler/icons-react';
import { db, isFirebaseConfigured } from '../../firebase/firebase';
import AdminSidebar from '../../components/AdminSidebar';
import { usePosts } from '../../hooks/usePosts';

export default function PostsGridPage() {
  const { posts, loading } = usePosts(true);
  const [filter, setFilter] = useState('all');

  const filteredPosts = posts.filter(post => {
    if (filter === 'published') return post.status === 'published';
    if (filter === 'draft') return post.status === 'draft';
    return true;
  });

  const handleDelete = async (postId) => {
    if (!window.confirm("Are you sure you want to delete this post? This action cannot be undone.")) {
      return;
    }

    try {
      if (!isFirebaseConfigured) {
        // Delete locally from localStorage
        const localData = localStorage.getItem('mock_survey_posts');
        if (localData) {
          const postsList = JSON.parse(localData);
          const updated = postsList.filter(p => p.id !== postId);
          localStorage.setItem('mock_survey_posts', JSON.stringify(updated));
          window.dispatchEvent(new Event('mock-posts-updated'));
        }
        return;
      }

      await deleteDoc(doc(db, 'posts', postId));
    } catch (err) {
      console.error("Error deleting post:", err);
      alert("Failed to delete post.");
    }
  };

  return (
    <div className="min-h-screen bg-[#000000] flex text-white">
      <AdminSidebar />

      <main className="flex-1 md:ml-[244px] min-h-screen pb-20 md:pb-0">
        <div className="max-w-[935px] mx-auto pt-8 px-4 md:px-5 space-y-8">
          <div className="flex justify-between items-center border-b border-neutral-800 pb-6">
            <div className="select-none">
              <h1 className="text-3xl font-black text-white uppercase tracking-wide">Manage Posts</h1>
              <p className="text-sm font-bold text-neutral-400">View, edit, and organize updates feed</p>
            </div>
            <Link
              to="/admin/posts/new"
              className="bg-neutral-800 hover:bg-neutral-700 text-white font-semibold text-sm px-5 py-2.5 rounded-lg transition-colors flex items-center gap-2"
            >
              <IconPlus size={18} />
              New Post
            </Link>
          </div>

          <div className="flex gap-2">
            {['all', 'published', 'draft'].map((statusOption) => (
              <button
                key={statusOption}
                onClick={() => setFilter(statusOption)}
                className={`px-5 py-2 rounded-full text-xs font-black uppercase tracking-wider border transition-all ${
                  filter === statusOption
                    ? 'bg-white text-black border-white shadow-sm'
                    : 'bg-transparent text-neutral-500 border-neutral-800 hover:border-neutral-600'
                }`}
              >
                {statusOption}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="grid grid-cols-3 gap-1 sm:gap-4">
              {[1, 2, 3].map(n => (
                <div key={n} className="aspect-square bg-neutral-900 animate-pulse" />
              ))}
            </div>
          ) : filteredPosts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-neutral-500">
              <div className="w-24 h-24 rounded-full border-2 border-neutral-800 flex items-center justify-center mb-4">
                <IconGrid3x3 size={40} className="text-neutral-800" />
              </div>
              <h2 className="text-2xl font-black mb-2 text-white uppercase">No {filter !== 'all' ? filter : ''} posts</h2>
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-1 sm:gap-4">
              {filteredPosts.map((post) => (
                <div key={post.id} className="relative aspect-square bg-neutral-900 group overflow-hidden">
                  {post.mediaType === 'video' ? (
                    <video
                      src={post.mediaUrl || post.imageUrl || ''}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      muted
                      loop
                      playsInline
                      autoPlay
                    />
                  ) : (
                    <img
                      src={post.imageUrl || post.mediaUrl || '/elephant.png'}
                      alt="Thumbnail"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      onError={(e) => e.target.src = '/elephant.png'}
                    />
                  )}

                  <span className={`absolute top-2 right-2 text-[8px] font-black uppercase tracking-wider px-2 py-0.5 rounded backdrop-blur-sm z-10 ${
                    post.status === 'published' ? 'bg-ds-blue/90 text-white' : 'bg-neutral-800/90 text-white'
                  }`}>
                    {post.status}
                  </span>

                  <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 flex flex-col justify-between p-4 transition-all duration-300">
                    <p className="text-white text-xs font-semibold line-clamp-3 leading-relaxed text-center select-none">
                      {post.caption}
                    </p>

                    <div className="flex justify-center gap-4">
                      <Link
                         to={`/admin/posts/${post.id}/edit`}
                        className="w-10 h-10 bg-white/20 hover:bg-white text-white hover:text-black flex items-center justify-center rounded-full transition-all"
                        aria-label="Edit post"
                      >
                        <IconEdit size={18} />
                      </Link>

                      <button
                        onClick={() => handleDelete(post.id)}
                        className="w-10 h-10 bg-white/20 hover:bg-red-600 text-white hover:text-white flex items-center justify-center rounded-full transition-all"
                        aria-label="Delete post"
                      >
                        <IconTrash size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
