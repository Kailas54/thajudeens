import React from 'react';

export default function TagChip({ tag, isActive, onClick, onClear }) {
  if (isActive) {
    return (
      <div className="inline-flex items-center gap-1 bg-ds-yellow text-ds-dark px-3 py-1.5 rounded-full text-sm font-extrabold cursor-pointer hover:opacity-90 select-none">
        <span onClick={onClick}>#{tag}</span>
        {onClear && (
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onClear();
            }}
            className="hover:bg-black/10 rounded-full w-4 h-4 inline-flex items-center justify-center font-bold text-xs"
            aria-label="Clear filter"
          >
            ×
          </button>
        )}
      </div>
    );
  }

  return (
    <button
      onClick={onClick}
      className="inline-block bg-white text-ds-dark border border-ds-dark/10 px-3 py-1.5 rounded-full text-sm font-semibold hover:border-ds-dark/40 transition-all select-none"
    >
      #{tag}
    </button>
  );
}
