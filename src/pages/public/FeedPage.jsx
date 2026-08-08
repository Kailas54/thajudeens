import React, { useState } from 'react';
import HeroSection from '../../components/HeroSection';
import ServicesSection from '../../components/ServicesSection';
import FoundersSection from '../../components/FoundersSection';
import PostCard from '../../components/PostCard';
import TagChip from '../../components/TagChip';
import { usePosts } from '../../hooks/usePosts';

export default function FeedPage() {
  const { posts, loading } = usePosts(false);
  const [selectedTag, setSelectedTag] = useState(null);

  // Extract all unique tags
  const allTags = Array.from(
    new Set(posts.flatMap((post) => post.tags || []))
  );

  // Filter posts if a tag is selected
  const filteredPosts = selectedTag
    ? posts.filter((post) => post.tags && post.tags.includes(selectedTag))
    : posts;

  return (
    <div className="w-full flex flex-col min-h-screen">
      {/* Hero Section */}
      <HeroSection />

      {/* About / Leadership Section */}
      <FoundersSection />

      {/* Services Section */}
      <ServicesSection />

      {/* Posts Feed Section */}
      <section className="bg-ds-blue w-full px-6 py-16 md:px-12 flex flex-col items-center">
        {/* Section Heading */}
        <div className="text-center mb-10 select-none">
          <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight uppercase">
            Our Updates
          </h2>
          <div className="w-24 h-1.5 bg-ds-yellow mx-auto mt-3 rounded-full" />
        </div>

        {/* Tag Filters */}
        {allTags.length > 0 && (
          <div className="w-full max-w-6xl mb-8 flex flex-wrap gap-2 justify-center">
            {allTags.map((tag) => (
              <TagChip
                key={tag}
                tag={tag}
                isActive={selectedTag === tag}
                onClick={() => setSelectedTag(tag)}
                onClear={() => setSelectedTag(null)}
              />
            ))}
          </div>
        )}

        {/* Loading / Empty States */}
        {loading ? (
          <div className="text-white font-extrabold text-lg py-12 animate-pulse uppercase tracking-widest">
            Loading updates...
          </div>
        ) : filteredPosts.length === 0 ? (
          <div className="text-white font-bold text-base py-12 uppercase tracking-widest opacity-80">
            No updates found.
          </div>
        ) : (
          /* Feed Grid */
          <div className="w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <PostCard key={post.id} post={post} isAdminContext={false} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
