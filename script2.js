// JavaScript code for Video Upload

// Video list
var videoList = document.getElementById('video-list');

// Array to store video data
var videos = [];

// Upload button
var uploadButton = document.getElementById('upload-button');
uploadButton.addEventListener('click', handleUpload);

// GitHub repository details
var username = 'KarenMonyal';
var repository = 'MyTube.github.io';
var branch = 'main';
var filePath = 'video-data.json';
var accessToken = 'YOUR_GITHUB_ACCESS_TOKEN';

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

    // Save video data to GitHub
    saveVideoData();
}

// Save video data to GitHub repository
function saveVideoData() {
    var fileContent = JSON.stringify(videos, null, 2);
    var commitMessage = 'Update video data';

    var url = `https://api.github.com/repos/${username}/${repository}/contents/${filePath}`;
    var headers = new Headers();
    headers.append('Authorization', `token ${accessToken}`);

    fetch(url, {
        method: 'GET',
        headers: headers
    })
    .then(response => response.json())
    .then(data => {
        var sha = data.sha;
        var content = btoa(unescape(encodeURIComponent(fileContent)));
        var body = JSON.stringify({
            message: commitMessage,
            content: content,
            sha: sha,
            branch: branch
        });

        return fetch(url, {
            method: 'PUT',
            headers: headers,
            body: body
        });
    })
    .then(response => response.json())
    .then(data => console.log('Video data saved:', data))
    .catch(error => console.error('Error saving video data:', error));
}
