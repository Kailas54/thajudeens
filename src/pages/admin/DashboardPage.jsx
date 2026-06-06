import React from 'react';
import AdminSidebar from '../../components/AdminSidebar';
import { usePosts } from '../../hooks/usePosts';
import { IconSettings, IconLink, IconPlus, IconGrid3x3, IconVideo, IconBookmark } from '@tabler/icons-react';
import { Link } from 'react-router-dom';

export default function DashboardPage() {
  const { posts, loading } = usePosts(true);

  // Calculate metrics
  const totalPosts = posts.length;
  const publishedPosts = posts.filter(p => p.status === 'published').length;
  const draftPosts = posts.filter(p => p.status === 'draft').length;

  return (
    <div className="min-h-screen bg-[#000000] flex text-white">
      {/* Instagram Left Sidebar */}
      <AdminSidebar />

      {/* Main Content Area */}
      <main className="flex-1 md:ml-[244px] min-h-screen pb-20 md:pb-0">
        <div className="max-w-[935px] mx-auto pt-8 px-4 md:px-5">
          
          {/* Profile Header Section */}
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-11">
            {/* Profile Picture */}
            <div className="w-[150px] h-[150px] shrink-0 mr-4 md:mr-10">
              <div className="w-full h-full rounded-full p-1 ig-gradient-ring">
                <div className="w-full h-full rounded-full border-[3px] border-black overflow-hidden bg-neutral-900 flex items-center justify-center">
                  <img src="/founder_ajmal.png" alt="Admin Profile" className="w-full h-full object-cover" onError={(e) => e.target.style.display = 'none'} />
                  {/* Fallback avatar text if image fails */}
                  <span className="absolute text-5xl font-black text-white mix-blend-difference pointer-events-none">DS</span>
                </div>
              </div>
            </div>

            {/* Profile Info */}
            <div className="flex flex-col flex-1 w-full text-center md:text-left">
              {/* Username & Actions */}
              <div className="flex flex-col md:flex-row items-center gap-4 mb-4">
                <h1 className="text-xl md:text-2xl font-normal text-white">digitalsurvey_admin</h1>
                <div className="flex items-center gap-2">
                  <Link to="/admin/posts/new" className="bg-neutral-800 hover:bg-neutral-700 text-white text-sm font-semibold py-1.5 px-4 rounded-lg transition-colors">
                    New Post
                  </Link>
                  <button className="bg-neutral-800 hover:bg-neutral-700 text-white text-sm font-semibold py-1.5 px-4 rounded-lg transition-colors">
                    Edit Profile
                  </button>
                  <button className="p-2 hover:bg-neutral-800 rounded-full transition-colors cursor-pointer">
                    <IconSettings size={24} />
                  </button>
                </div>
              </div>

              {/* Stats */}
              <div className="flex items-center justify-center md:justify-start gap-10 mb-4 text-base">
                <div className="flex items-center gap-1.5">
                  <span className="font-semibold text-white">{totalPosts}</span>
                  <span className="text-neutral-300">posts</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="font-semibold text-white">{publishedPosts}</span>
                  <span className="text-neutral-300">published</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="font-semibold text-white">{draftPosts}</span>
                  <span className="text-neutral-300">drafts</span>
                </div>
              </div>

              {/* Bio */}
              <div className="text-sm">
                <p className="font-semibold text-white">Digital Survey Official</p>
                <p className="text-neutral-300 whitespace-pre-line mt-1">
                  Professional Land Surveying Services 🏗️📍{'\n'}
                  Managing projects, equipment, and updates.{'\n'}
                  #DigitalSurvey
                </p>
                <a href="#" className="flex items-center justify-center md:justify-start gap-1 font-semibold text-[#E0F1FF] mt-1 hover:underline">
                  <IconLink size={14} className="text-neutral-400" />
                  digitalsurvey.com
                </a>
              </div>
            </div>
          </div>

          {/* Highlights */}
          <div className="flex gap-4 md:gap-8 mb-12 overflow-x-auto pb-4 hide-scrollbar px-2">
            {['Equipment', 'Sites', 'Team', 'New'].map((item, i) => (
              <div key={item} className="flex flex-col items-center gap-2 cursor-pointer group shrink-0">
                <div className="w-[76px] h-[76px] rounded-full p-0.5 bg-neutral-800 group-hover:bg-neutral-600 transition-colors">
                  <div className="w-full h-full rounded-full border-2 border-black bg-neutral-900 flex items-center justify-center">
                    {item === 'New' ? <IconPlus size={32} className="text-neutral-500" /> : <div className="w-full h-full rounded-full bg-neutral-800" />}
                  </div>
                </div>
                <span className="text-xs font-semibold text-neutral-300 group-hover:text-white transition-colors">{item}</span>
              </div>
            ))}
          </div>

          {/* Tabs */}
          <div className="flex items-center justify-center border-t border-neutral-800 gap-16 mb-4 select-none">
            <div className="flex items-center gap-2 py-4 border-t border-white text-white cursor-pointer uppercase text-xs font-semibold tracking-widest">
              <IconGrid3x3 size={16} />
              <span>POSTS</span>
            </div>
            <div className="flex items-center gap-2 py-4 border-t border-transparent text-neutral-500 hover:text-white transition-colors cursor-pointer uppercase text-xs font-semibold tracking-widest hidden sm:flex">
              <IconVideo size={16} />
              <span>REELS</span>
            </div>
            <div className="flex items-center gap-2 py-4 border-t border-transparent text-neutral-500 hover:text-white transition-colors cursor-pointer uppercase text-xs font-semibold tracking-widest">
              <IconBookmark size={16} />
              <span>SAVED</span>
            </div>
          </div>

          {/* Grid Area */}
          {loading ? (
            <div className="grid grid-cols-3 gap-1 sm:gap-4">
              {[1, 2, 3, 4, 5, 6].map(n => (
                <div key={n} className="aspect-square bg-neutral-900 animate-pulse" />
              ))}
            </div>
          ) : posts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-neutral-500">
              <div className="w-24 h-24 rounded-full border-2 border-neutral-800 flex items-center justify-center mb-4">
                <IconGrid3x3 size={40} className="text-neutral-800" />
              </div>
              <h2 className="text-2xl font-black mb-2 text-white">No Posts Yet</h2>
              <p className="mb-4">Create your first post to see it here.</p>
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-1 sm:gap-4">
              {posts.map((post) => (
                <div key={post.id} className="relative aspect-square bg-neutral-900 group overflow-hidden cursor-pointer">
                  {/* Thumbnail */}
                  <img 
                    src={post.imageUrl || '/elephant.png'} 
                    alt="Post Thumbnail" 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    onError={(e) => e.target.src = '/elephant.png'}
                  />

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all duration-300 pointer-events-none">
                    <p className="text-white text-xs font-semibold line-clamp-2 px-4 text-center">
                      {post.caption}
                    </p>
                  </div>
                  
                  {/* Status Indicator */}
                  {post.status === 'draft' && (
                    <span className="absolute top-2 right-2 bg-neutral-800/80 text-white text-[10px] font-bold px-2 py-1 rounded backdrop-blur-sm uppercase pointer-events-none">
                      Draft
                    </span>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
