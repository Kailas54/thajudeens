import React from 'react';
import AdminSidebar from '../../components/AdminSidebar';
import PostForm from '../../components/PostForm';

export default function CreatePostPage() {
  return (
    <div className="min-h-screen bg-[#000000] flex text-white">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content Area */}
      <main className="flex-1 md:ml-[244px] min-h-screen pb-20 md:pb-0">
        <div className="max-w-[935px] mx-auto pt-8 px-4 md:px-5 space-y-6">
          {/* Header */}
          <div className="border-b border-neutral-800 pb-6">
            <h1 className="text-3xl font-black text-white uppercase tracking-wide">Create New Post</h1>
            <p className="text-sm font-bold text-neutral-400">Publish news, announcements, or project updates</p>
          </div>

          {/* Form */}
          <PostForm isEdit={false} />
        </div>
      </main>
    </div>
  );
}
