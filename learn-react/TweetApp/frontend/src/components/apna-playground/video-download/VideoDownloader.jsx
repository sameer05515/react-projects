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
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <h1>Video Downloader</h1>
            <div style={{ marginBottom: '10px' }}>
                <input
                    type="text"
                    placeholder="Enter video URL"
                    value={videoUrl}
                    onChange={(e) => setVideoUrl(e.target.value)}
                    style={{
                        width: '80%',
                        padding: '10px',
                        marginBottom: '10px',
                        borderRadius: '5px',
                        border: '1px solid #ccc',
                    }}
                />
            </div>
            <div style={{ marginBottom: '10px' }}>
                <input
                    type="text"
                    placeholder="Enter file name (e.g., video.mp4)"
                    value={videoName}
                    onChange={(e) => setVideoName(e.target.value)}
                    style={{
                        width: '80%',
                        padding: '10px',
                        marginBottom: '10px',
                        borderRadius: '5px',
                        border: '1px solid #ccc',
                    }}
                />
            </div>
            <button
                onClick={downloadVideo}
                style={{
                    padding: '10px 20px',
                    backgroundColor: '#007bff',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                }}
            >
                Download Video
            </button>
        </div>
    );
};

export default VideoDownloader;
