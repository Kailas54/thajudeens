import React from 'react';
import { Link } from 'react-router-dom';

const getDaysAgo = (date) => {
  if (!date) return '';
  const postDate = new Date(date);
  const now = new Date();
  const diffTime = Math.max(0, now - postDate);
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return '1 day ago';
  return `${diffDays} days ago`;
};

export default function PostCard({ post, isAdminContext = false }) {
  const { id, imageUrl, mediaUrl, mediaType = 'image', caption, tags = [], category, status, createdAt } = post;
  const src = mediaUrl || imageUrl;

  const cardContent = (
    <div className="group relative flex flex-col bg-white rounded-2xl shadow-sm border-2 border-transparent transition-all duration-300 hover:scale-105 hover:border-ds-yellow overflow-hidden h-full">
      {/* Category Overlay & Image Container */}
      <div className="relative aspect-square w-full bg-ds-gray overflow-hidden">
        {mediaType === 'video' ? (
          <video
            src={src}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            muted
            loop
            playsInline
            autoPlay
          />
        ) : (
          <img 
            src={src || 'https://placehold.co/600x600/3DA5D9/ffffff?text=DigitalSurvey'} 
            alt={caption || 'Survey post'} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        )}
        
        {/* Category Badge */}
        <span className="absolute top-3 left-3 bg-ds-blue text-white text-xs font-black px-2.5 py-1 rounded-md uppercase tracking-wider">
          {category}
        </span>

        {/* Admin context state badge */}
        {isAdminContext && (
          <span className={`absolute top-3 right-3 text-xs font-black px-2.5 py-1 rounded-md uppercase tracking-wider ${
            status === 'published' ? 'bg-ds-blue text-white' : 'bg-ds-dark/75 text-white border border-white/20'
          }`}>
            {status}
          </span>
        )}
      </div>

      {/* Info Content Section */}
      <div className="flex flex-col flex-1 p-4 justify-between">
        <div>
          {/* Caption */}
          <p className="text-ds-dark font-semibold line-clamp-3 mb-4 text-sm leading-relaxed">
            {caption}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {tags.map((tag, idx) => (
              <span key={idx} className="bg-ds-yellow text-ds-dark font-extrabold text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full">
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Timestamp */}
        <div className="text-[11px] font-bold text-ds-dark/40 uppercase tracking-widest">
          {getDaysAgo(createdAt)}
        </div>
      </div>
    </div>
  );

  // If in admin context, don't link out to detail page automatically
  if (isAdminContext) {
    return <div className="h-full">{cardContent}</div>;
  }

  return (
    <Link to={`/post/${id}`} className="block h-full no-underline">
      {cardContent}
    </Link>
  );
}
