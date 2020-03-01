const clientId = "295208744617-4g1v0mm429tra9a8orjrd14fp0obb78l.apps.googleusercontent.com";
const discoveryDocs = ["https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest"];
const scopes = "https://www.googleapis.com/auth/youtube.readonly";

const authorizeButton = document.getElementById("authorize-button");
const signoutButton = document.getElementById("signout-button");
const content = document.getElementById("content");
const channelForm = document.getElementById("channel-form");
const channelInput = document.getElementById("channel-input");
const videoContainer = document.getElementById("video-container");

const defaultChannel = "techguyweb";

//Form submit and change channel
channelForm.addEventListener("submit", e => {
    e.preventDefault();
    const channel = channelInput.value;
    getChannel(channel);
});


//Load auth2 library
function handleClientLoad(){
    gapi.load('client:auth2', initClient);
}

//Init Api client library and set up sign in listeners
function initClient(){
    gapi.client.init({
        clientId: clientId,
        discoveryDocs: discoveryDocs,
        scope: scopes
    }).then(() => {
        //listen for sign in changes
        gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);
        //handle initial sign in state
        updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
        authorizeButton.onclick = handleAuthClick;
        signoutButton.onclick = handleSignoutClick;
    })
}

//update UI sign state changes
function updateSigninStatus(isSignedIn){
    if (isSignedIn){
        authorizeButton.style.display = "none";
        signoutButton.style.display = "block";
        content.style.display = "block";
        videoContainer.style.display = "block";
        getChannel(defaultChannel);
    }else{
        authorizeButton.style.display = "block";
        signoutButton.style.display = "none";
        content.style.display = "none";
        videoContainer.style.display = "none";
    }
}

//Handle log in
function handleAuthClick(){
    gapi.auth2.getAuthInstance().signIn();
}

//Handle log out
function handleSignoutClick(){
    gapi.auth2.getAuthInstance().signOut();
}


//Display channel Data
function showChannelData(data){
    const channelData = document.getElementById("channel-data");
    channelData.innerHTML = data;
}



//get channel from API
function getChannel(channel){
    gapi.client.youtube.channels
        .list({
            part:'snippet,contentDetails,statistics',
            forUsername: channel
        })
        .then(res => {
            console.log(res)
            const channel = res.result.items[0];

            const output = `
                <ul class='collection'>
                    <li class='collection-item'>Title: ${channel.snippet.title}</li>
                    <li class='collection-item'>ID: ${channel.id}</li>
                    <li class='collection-item'>Subscribers: ${numberWithDots(channel.statistics.subscriberCount)}</li>
                    <li class='collection-item'>Views: ${numberWithDots(channel.statistics.viewCount)}</li>
                    <li class='collection-item'>Videos: ${numberWithDots(channel.statistics.videoCount)}</li>
                </ul>
                <p>${channel.snippet.description}</p>
                <hr>
                <a class='btn grey darken-2' target='_blank' href='https://youtube.com/${channel.snippet.customUrl}'>Visit Channel</a>
            `;

            showChannelData(output);
            const playListId = channel.contentDetails.relatedPlaylists.uploads;
            requestVideoPlaylist(playListId);
        })
        .catch(err => alert('No Channel By That Name...'))
}


//Show the videos to UI
function requestVideoPlaylist(playListId){
    const requestOptions = {
        playlistId: playListId,
        part: 'snippet',
        maxResults:10
    }
    const request = gapi.client.youtube.playlistItems.list(requestOptions);
    request.execute(res => {
        const playlistItems = res.result.items;
        if (playlistItems){
            let output = `<br><h4 class="center-align">Latest Videos</h4>`
            //loop through videos and append the output
            playlistItems.forEach(item => {
                const videoId = item.snippet.resourceId.videoId;
                output += `<div class="col s3">
                <iframe width="100%" height="auto" src="https://youtube.com/embed/${videoId}" 
                frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
                </div>`
            })
            //output the videos
            videoContainer.innerHTML = output; 
        }else{
            videoContainer.innerHTML = 'No Uploaded Videos...';
        }

    })
}

//add dots to numbers
function numberWithDots(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}
