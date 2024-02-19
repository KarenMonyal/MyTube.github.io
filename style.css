// JavaScript code for Video Upload

// Video list
var videoList = document.getElementById('video-list');

// Array to store video data
var videos = [];

// Upload button
var uploadButton = document.getElementById('upload-button');
uploadButton.addEventListener('click', handleUpload);

// Handle upload
function handleUpload() {
    var fileInput = document.getElementById('video-upload');
    var file = fileInput.files[0];

    if (file) {
        var video = {
            src: URL.createObjectURL(file),
            views: 0
        };

        videos.push(video);

        var videoItem = document.createElement('li');
        var videoElement = document.createElement('video');
        videoElement.src = video.src;
        videoElement.controls = true;

        var viewCountSpan = document.createElement('span');
        viewCountSpan.textContent = 'Views: ' + video.views;

        videoItem.appendChild(videoElement);
        videoItem.appendChild(viewCountSpan);
        videoList.appendChild(videoItem);

        videoElement.addEventListener('play', function() {
            video.views++;
            viewCountSpan.textContent = 'Views: ' + video.views;
        });
    }

    fileInput.value = '';

    // Save video data to GitHub Gist
    saveVideoData();
}

// Save video data to GitHub Gist
function saveVideoData() {
    var gistData = {
        description: 'Video Upload Data',
        public: true,
        files: {
            'video-data.json': {
                content: JSON.stringify(videos)
            }
        }
    };

    fetch('https://api.github.com/gists', {
        method: 'POST',
        body: JSON.stringify(gistData)
    })
    .then(response => response.json())
    .then(data => console.log('Video data saved:', data.html_url))
    .catch(error => console.error('Error saving video data:', error));
}
