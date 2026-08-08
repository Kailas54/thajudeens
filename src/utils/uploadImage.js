export async function uploadImage(file, mediaType = 'image') {
  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

  if (!cloudName || !uploadPreset) {
    throw new Error(
      'Cloudinary is not configured. Add VITE_CLOUDINARY_CLOUD_NAME and VITE_CLOUDINARY_UPLOAD_PRESET to your .env file, then restart the dev server.'
    );
  }

  const resourceType = mediaType === 'video' ? 'video' : 'image';

  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', uploadPreset);

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`,
    { method: 'POST', body: formData }
  );

  if (!res.ok) {
    let message = `Cloudinary upload failed (${res.status})`;
    try {
      const errorData = await res.json();
      message = errorData.error?.message || message;
    } catch {
      // keep default message
    }

    if (message.toLowerCase().includes('preset')) {
      message += ' — check that upload preset "' + uploadPreset + '" exists and is set to Unsigned in Cloudinary.';
    }

    throw new Error(message);
  }

  const data = await res.json();
  return data.secure_url;
}
