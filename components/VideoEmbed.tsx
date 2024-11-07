'use client';

import React from 'react';

interface VideoEmbedProps {
    videoId: string;
    platform?: 'youtube' | 'vimeo';
}

export const VideoEmbed = ({ videoId, platform = 'youtube' }: VideoEmbedProps) => {
    const getEmbedUrl = () => {
        switch (platform) {
            case 'youtube':
                return `https://www.youtube.com/embed/${videoId}`;
            case 'vimeo':
                return `https://player.vimeo.com/video/${videoId}`;
            default:
                return `https://www.youtube.com/embed/${videoId}`;
        }
    };

    return (
        <div className="bg-[rgba(20,25,25,0.7)] rounded-2xl overflow-hidden border border-[rgba(255,255,255,0.1)] mb-6">
            <div className="p-6 border-b border-[rgba(255,255,255,0.1)]">
                <h2 className="text-xl font-bold mb-2">Fat Frog Kingdom Anthem</h2>
                <p className="text-gray-400">Watch our community anthem and learn about our vision.</p>
            </div>
            <div className="relative w-full pt-[56.25%]">
                <iframe
                    className="absolute top-0 left-0 w-full h-full"
                    src={getEmbedUrl()}
                    title="Video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                />
            </div>
        </div>
    );
};
