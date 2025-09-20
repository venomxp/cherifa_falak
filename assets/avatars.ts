import React from 'react';

// --- Image-based Avatar Components ---

const ImageAvatar1 = ({ className }: { className?: string }) => (
  React.createElement('img', { src: "https://i.postimg.cc/fTSBW09p/1.png", alt: "Avatar 1", className: className, style: { objectFit: 'cover', borderRadius: '50%' }})
);

const ImageAvatar2 = ({ className }: { className?: string }) => (
  React.createElement('img', { src: "https://i.postimg.cc/W4Tn7WHc/2.png", alt: "Avatar 2", className: className, style: { objectFit: 'cover', borderRadius: '50%' }})
);

const ImageAvatar3 = ({ className }: { className?: string }) => (
  React.createElement('img', { src: "https://i.postimg.cc/fR45VT7L/3.png", alt: "Avatar 3", className: className, style: { objectFit: 'cover', borderRadius: '50%' }})
);

const ImageAvatar4 = ({ className }: { className?: string }) => (
  React.createElement('img', { src: "https://i.postimg.cc/g0sKtVCX/4.png", alt: "Avatar 4", className: className, style: { objectFit: 'cover', borderRadius: '50%' }})
);

const ImageAvatar5 = ({ className }: { className?: string }) => (
  React.createElement('img', { src: "https://i.postimg.cc/mgQjCfVS/5.png", alt: "Avatar 5", className: className, style: { objectFit: 'cover', borderRadius: '50%' }})
);

const ImageAvatar6 = ({ className }: { className?: string }) => (
  React.createElement('img', { src: "https://i.postimg.cc/ydNyMJKf/6.png", alt: "Avatar 6", className: className, style: { objectFit: 'cover', borderRadius: '50%' }})
);


export const AVATARS = [
    { id: 'image1', Component: ImageAvatar1 },
    { id: 'image2', Component: ImageAvatar2 },
    { id: 'image3', Component: ImageAvatar3 },
    { id: 'image4', Component: ImageAvatar4 },
    { id: 'image5', Component: ImageAvatar5 },
    { id: 'image6', Component: ImageAvatar6 },
];

export const getAvatarById = (id: string | null): React.FC<{ className?: string }> | undefined => {
    return AVATARS.find(avatar => avatar.id === id)?.Component;
};
