import React from 'react';

// --- Image-based Avatar Components ---

// FIX: Replaced JSX with React.createElement to be compatible with a .ts file.
const ImageAvatar1 = ({ className }: { className?: string }) => (
  // The provided className from the calling component will control sizing and styling.
  React.createElement('img', { src: "https://i.imgur.com/zfl97Z1.png", alt: "Avatar 1", className: className, style: { objectFit: 'cover', borderRadius: '50%' }})
);

// FIX: Replaced JSX with React.createElement to be compatible with a .ts file.
const ImageAvatar2 = ({ className }: { className?: string }) => (
  // The provided className from the calling component will control sizing and styling.
  React.createElement('img', { src: "https://i.imgur.com/rne1qdZ.png", alt: "Avatar 2", className: className, style: { objectFit: 'cover', borderRadius: '50%' }})
);

export const AVATARS = [
    { id: 'image1', Component: ImageAvatar1 },
    { id: 'image2', Component: ImageAvatar2 },
];

export const getAvatarById = (id: string | null): React.FC<{ className?: string }> | undefined => {
    return AVATARS.find(avatar => avatar.id === id)?.Component;
};