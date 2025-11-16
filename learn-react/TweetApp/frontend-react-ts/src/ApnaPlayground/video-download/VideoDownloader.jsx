import React, { useState } from 'react';

const VideoDownloader = () => {
    const [videoUrl, setVideoUrl] = useState('');
    const [videoName, setVideoName] = useState('');

    const downloadVideo = () => {
        if (!videoUrl || !videoName) {
            alert('Please provide both video URL and file name.');
            return;
        }
        const anchor = document.createElement('a');
        anchor.href = videoUrl;
        anchor.download = videoName;
        document.body.appendChild(anchor);
        anchor.click();
        document.body.removeChild(anchor);
    };

    return (
        <div className="text-center mt-5">
            <h1 className="text-3xl font-bold mb-5">Video Downloader</h1>
            <div className="mb-2.5">
                <input
                    type="text"
                    placeholder="Enter video URL"
                    value={videoUrl}
                    onChange={(e) => setVideoUrl(e.target.value)}
                    className="w-4/5 px-2.5 py-2.5 mb-2.5 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
            <div className="mb-2.5">
                <input
                    type="text"
                    placeholder="Enter file name (e.g., video.mp4)"
                    value={videoName}
                    onChange={(e) => setVideoName(e.target.value)}
                    className="w-4/5 px-2.5 py-2.5 mb-2.5 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
            <button
                onClick={downloadVideo}
                className="px-5 py-2.5 bg-blue-600 text-white border-none rounded cursor-pointer hover:bg-blue-700 transition-colors"
            >
                Download Video
            </button>
        </div>
    );
};

export default VideoDownloader;
