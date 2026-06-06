import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { doc, setDoc, collection } from 'firebase/firestore';
import { db, isFirebaseConfigured } from '../firebase/firebase';
import PostCard from './PostCard';
import { uploadImage } from '../utils/uploadImage';

export default function PostForm({ initialData = null, isEdit = false }) {
  const navigate = useNavigate();
  const [caption, setCaption] = useState('');
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState('');
  const [category, setCategory] = useState('Announcement');
  const [status, setStatus] = useState('draft');
  const [mediaFile, setMediaFile] = useState(null);
  const [mediaUrl, setMediaUrl] = useState('');
  const [mediaType, setMediaType] = useState('image'); // 'image' | 'video'
  
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [dragActive, setDragActive] = useState(false);

  useEffect(() => {
    if (initialData) {
      setCaption(initialData.caption || '');
      setTags(initialData.tags || []);
      setCategory(initialData.category || 'Announcement');
      setStatus(initialData.status || 'draft');
      setMediaUrl(initialData.imageUrl || initialData.mediaUrl || '');
      setMediaType(initialData.mediaType || 'image');
    }
  }, [initialData]);

  const compressImage = (file, maxPx = 1200, quality = 0.8) => {
    return new Promise((resolve) => {
      const img = new Image();
      const objectUrl = URL.createObjectURL(file);
      
      img.onload = () => {
        URL.revokeObjectURL(objectUrl);
        try {
          let { width, height } = img;
          if (width > maxPx || height > maxPx) {
            if (width > height) {
              height = Math.round((height * maxPx) / width);
              width = maxPx;
            } else {
              width = Math.round((width * maxPx) / height);
              height = maxPx;
            }
          }
          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          if (!ctx) {
            console.warn("Canvas context not available, uploading original file");
            resolve(file);
            return;
          }
          ctx.drawImage(img, 0, 0, width, height);
          
          if (!canvas.toBlob) {
            console.warn("canvas.toBlob is not supported, uploading original file");
            resolve(file);
            return;
          }
          
          canvas.toBlob((blob) => {
            if (blob) {
              resolve(blob);
            } else {
              console.warn("toBlob returned null, uploading original file");
              resolve(file);
            }
          }, 'image/jpeg', quality);
        } catch (err) {
          console.error("Error during image compression, uploading original file:", err);
          resolve(file);
        }
      };

      img.onerror = (err) => {
        URL.revokeObjectURL(objectUrl);
        console.error("Failed to load image for compression, uploading original file:", err);
        resolve(file);
      };

      img.src = objectUrl;
    });
  };

  // Read file as Base64 for mock environment
  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      const isVideo = file.type.startsWith('video/');
      setMediaFile(file);
      setMediaType(isVideo ? 'video' : 'image');
      if (!isFirebaseConfigured) {
        const base64 = await convertToBase64(file);
        setMediaUrl(base64);
      } else {
        setMediaUrl(URL.createObjectURL(file));
      }
    }
  };

  const handleFileChange = async (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const isVideo = file.type.startsWith('video/');
      setMediaFile(file);
      setMediaType(isVideo ? 'video' : 'image');
      if (!isFirebaseConfigured) {
        const base64 = await convertToBase64(file);
        setMediaUrl(base64);
      } else {
        setMediaUrl(URL.createObjectURL(file));
      }
    }
  };

  const handleTagKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      const cleaned = tagInput.trim().replace(/^#/, '').replace(/,/g, '');
      if (cleaned && !tags.includes(cleaned)) {
        setTags([...tags, cleaned]);
      }
      setTagInput('');
    }
  };

  const removeTag = (indexToRemove) => {
    setTags(tags.filter((_, idx) => idx !== indexToRemove));
  };

  const handleSave = async (customStatus) => {
    const finalStatus = customStatus || status;
    if (!caption.trim()) {
      alert("Please write a caption.");
      return;
    }
    if (!mediaUrl) {
      alert("Please upload an image or video.");
      return;
    }

    setUploading(true);
    setUploadProgress(0);
    try {
      const docId = isEdit ? initialData.id : `mock-id-${Date.now()}`;

      if (!isFirebaseConfigured) {
        // Save locally to localStorage
        const localData = localStorage.getItem('mock_survey_posts');
        let postsList = localData ? JSON.parse(localData) : [];

        const mockPost = {
          id: docId,
          caption,
          tags,
          category,
          status: finalStatus,
          mediaType,
          imageUrl: mediaUrl,
          mediaUrl: mediaUrl,
          updatedAt: new Date().toISOString(),
          createdAt: isEdit ? initialData.createdAt : new Date().toISOString()
        };

        if (isEdit) {
          postsList = postsList.map(p => p.id === docId ? mockPost : p);
        } else {
          postsList.unshift(mockPost);
        }

        localStorage.setItem('mock_survey_posts', JSON.stringify(postsList));
        window.dispatchEvent(new Event('mock-posts-updated'));
        navigate('/admin/posts');
        return;
      }

      let finalMediaUrl = mediaUrl;
      const firebaseDocId = isEdit ? initialData.id : doc(collection(db, 'posts')).id;

      if (mediaFile) {
        setUploadProgress(20);
        
        let fileToUpload = mediaFile;
        if (mediaType === 'image') {
          // Compress image before uploading to Cloudinary to save bandwidth
          fileToUpload = await compressImage(mediaFile);
          setUploadProgress(40);
        } else {
          // For videos, warn if too large
          if (mediaFile.size > 10 * 1024 * 1024) { // Cloudinary free tier supports larger files but let's keep it sane
            alert("Video file is too large. Please keep it under 10 MB.");
            setUploading(false);
            return;
          }
        }

        try {
          setUploadProgress(60);
          finalMediaUrl = await uploadImage(fileToUpload);
          setUploadProgress(90);
        } catch (uploadErr) {
          console.error("Cloudinary upload failed:", uploadErr);
          alert(`Upload Failed: ${uploadErr.message}`);
          setUploading(false);
          return;
        }
      }

      const postData = {
        caption,
        tags,
        category,
        status: finalStatus,
        mediaType,
        imageUrl: finalMediaUrl,
        mediaUrl: finalMediaUrl,
        updatedAt: new Date()
      };

      if (isEdit) {
        await setDoc(doc(db, 'posts', firebaseDocId), postData, { merge: true });
      } else {
        postData.createdAt = new Date();
        await setDoc(doc(db, 'posts', firebaseDocId), postData);
      }

      setUploadProgress(100);
      navigate('/admin/posts');
    } catch (err) {
      console.error("Error saving post:", err);
      alert("Failed to save post.");
    } finally {
      setUploading(false);
    }
  };

  const previewPost = {
    imageUrl: mediaUrl,
    mediaUrl: mediaUrl,
    mediaType: mediaType,
    caption: caption || 'Write a caption...',
    tags: tags,
    category: category,
    status: status,
    createdAt: initialData?.createdAt || new Date().toISOString()
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-6xl mx-auto py-4">
      {/* LEFT COLUMN */}
      <div className="lg:col-span-6 space-y-6">
        <h3 className="text-lg font-black text-white uppercase tracking-wider">Image & Preview</h3>
        
        <div 
          onDragEnter={handleDrag}
          onDragOver={handleDrag}
          onDragLeave={handleDrag}
          onDrop={handleDrop}
          onClick={() => document.getElementById('file-upload-input').click()}
          className={`border-2 border-dashed rounded-2xl p-8 flex flex-col items-center justify-center cursor-pointer min-h-[220px] transition-all ${
            dragActive ? 'border-neutral-500 bg-neutral-800' : 'border-neutral-700 bg-neutral-900 hover:border-neutral-500'
          }`}
        >
          <input 
            type="file" 
            id="file-upload-input" 
            className="hidden" 
            accept="image/*,video/*" 
            onChange={handleFileChange} 
          />
          {mediaUrl && mediaType === 'video' ? (
            <video src={mediaUrl} className="w-full max-h-40 object-contain rounded-xl mb-2" muted />
          ) : mediaUrl && mediaType === 'image' ? (
            <img src={mediaUrl} className="w-full max-h-40 object-contain rounded-xl mb-2" alt="preview" />
          ) : (
            <svg className="w-10 h-10 text-neutral-500 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          )}
          <p className="text-sm font-bold text-white mb-1">Drag and drop image or video here</p>
          <p className="text-xs text-neutral-400 font-semibold">or click to browse from device</p>
        </div>

        <div className="border-t border-neutral-800 pt-4">
          <p className="text-xs font-black uppercase text-neutral-500 tracking-widest mb-3">Live Feed Preview</p>
          <div className="max-w-[340px] mx-auto">
            <PostCard post={previewPost} isAdminContext={true} />
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN */}
      <div className="lg:col-span-6 bg-neutral-900 border border-neutral-800 rounded-2xl p-6 space-y-6 shadow-sm">
        <div className="space-y-1.5">
          <textarea
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            placeholder="Write a caption..."
            rows="4"
            className="w-full bg-transparent border-none resize-none focus:ring-0 p-0 text-white placeholder-neutral-500 font-medium text-sm leading-relaxed outline-none"
          />
        </div>

        <div className="space-y-2 border-t border-neutral-800 pt-4">
          <label className="block text-xs font-black uppercase tracking-wider text-neutral-400">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full bg-[#121212] border border-neutral-700 rounded-xl px-4 py-2.5 text-sm font-bold text-white focus:outline-none focus:border-neutral-500"
          >
            <option value="Announcement">Announcement</option>
            <option value="Survey">Survey</option>
            <option value="Blog">Blog</option>
            <option value="Update">Update</option>
          </select>
        </div>

        <div className="space-y-2 border-t border-neutral-800 pt-4">
          <label className="block text-xs font-black uppercase tracking-wider text-neutral-400">Tags</label>
          <input
            type="text"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={handleTagKeyDown}
            placeholder="Type tag name and press Enter or comma..."
            className="w-full bg-[#121212] border border-neutral-700 rounded-xl px-4 py-2.5 text-sm font-semibold text-white focus:outline-none focus:border-neutral-500"
          />
          <div className="flex flex-wrap gap-1.5 pt-1">
            {tags.map((tag, idx) => (
              <span key={idx} className="inline-flex items-center gap-1 bg-neutral-800 text-white text-xs font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full">
                #{tag}
                <button 
                  type="button" 
                  onClick={() => removeTag(idx)}
                  className="w-3.5 h-3.5 hover:bg-neutral-600 rounded-full inline-flex items-center justify-center font-bold text-[10px]"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-neutral-800 pt-4">
          <span className="text-xs font-black uppercase tracking-wider text-neutral-400">Status</span>
          <div className="flex items-center bg-[#121212] rounded-full p-1 border border-neutral-700">
            <button
              type="button"
              onClick={() => setStatus('draft')}
              className={`px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider transition-all ${
                status === 'draft' ? 'bg-neutral-800 text-white shadow-sm' : 'text-neutral-500 hover:text-white'
              }`}
            >
              Draft
            </button>
            <button
              type="button"
              onClick={() => setStatus('published')}
              className={`px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider transition-all ${
                status === 'published' ? 'bg-[#0095F6] text-white shadow-sm' : 'text-neutral-500 hover:text-white'
              }`}
            >
              Published
            </button>
          </div>
        </div>

        <div className="space-y-3 pt-4 border-t border-neutral-800">
          {/* Progress bar — shown while uploading */}
          {uploading && (
            <div className="space-y-1.5">
              <div className="flex justify-between text-[11px] font-black uppercase tracking-wider text-neutral-400">
                <span>
                  {uploadProgress === 0
                    ? 'Compressing…'
                    : uploadProgress < 100
                    ? `Uploading ${uploadProgress}%`
                    : 'Saving…'}
                </span>
                <span>{uploadProgress}%</span>
              </div>
              <div className="w-full bg-neutral-800 rounded-full h-1.5 overflow-hidden">
                <div
                  className="h-1.5 rounded-full bg-[#0095F6] transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
            </div>
          )}
          <button
            type="button"
            disabled={uploading}
            onClick={() => handleSave('published')}
            className="w-full bg-[#0095F6] hover:bg-[#1877F2] text-white font-black text-sm uppercase py-3.5 rounded-xl transition-all shadow-sm flex items-center justify-center disabled:opacity-60"
          >
            {uploading ? `${uploadProgress < 100 ? `Uploading ${uploadProgress}%` : 'Saving…'}` : 'Share Now'}
          </button>
          <button
            type="button"
            disabled={uploading}
            onClick={() => handleSave('draft')}
            className="w-full bg-transparent text-white border border-neutral-700 font-black text-sm uppercase py-3.5 rounded-xl hover:bg-neutral-800 active:scale-[0.99] transition-all disabled:opacity-50"
          >
            Save as Draft
          </button>
        </div>
      </div>
    </div>
  );
}
