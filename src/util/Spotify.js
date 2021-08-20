let accessToken;
const clientId = 'db87855b0dd94e7595e81abe5e8dd641';
const redirectUri = 'http://localhost:3000/';

const Spotify = {
    getAccessToken() {
        // check if access token has alreaady been set 
        if(accessToken) {
            return accessToken;
        }

        // check for an access token match in current url
        const currentUrl = window.location.href;
        const accessTokenFromUrl = currentUrl.match(/access_token=([^&]*)/);
        const expiresInFromUrl = currentUrl.match(/expires_in=([^&]*)/);
        
        if(accessTokenFromUrl && expiresInFromUrl) {
            window.setTimeout(() => {
                accessToken = accessTokenFromUrl[1];
                const expiresIn = Number(expiresInFromUrl[1]);

                // Clear the parameters from the URL, so the app doesn’t try grabbing the access token after it has expired
                window.setTimeout(() => accessToken = '', expiresIn*1000);
                window.history.pushState('Access Token', null, '/');
                return accessToken;
            })
        } else {
            // Otherwise, redirect the user to log into their Spotify to get access token 
            const redirectUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
            window.location = redirectUrl;
        }
    },

    search(term) {
        // get the current access token
        const currentAccessToken = Spotify.getAccessToken();

        // fetch search from spotify 
        return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
            headers: {Authorization: `Bearer ${currentAccessToken}`}
        }).then(response => {
            return response.json();
        }).then(json => {
            // if results are empty return an empty array
            if(!json.tracks) {
                return [];
            } 
            
            // return an array of track objects extracted from the json data
            return (json.tracks.items.map(track => {
                return { id: track.id,
                    name: track.name,
                    artist: track.artists[0].name,
                    album: track.album.name,
                    uri: track.uri
                };
            }));
        });
    }, 

    savePlaylist(name, trackUris) {
        // return if inputs are invalid 
        if (!name || !trackUris.length) {
            return;
        }
        
        // initialize variables for fetches
        const currentAccessToken = Spotify.getAccessToken();
        const headers = { Authorization: `Bearer ${currentAccessToken}` };

        // return a promise
        return (
            // fecth the userId 
            fetch(`https://api.spotify.com/v1/me`, { headers: headers }
            ).then(response => {
                return response.json();
            }).then(json => {
                const userId = json.id;
                // use userId to post a new playlist with the specified name
                return (fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
                    headers: headers,
                    method: 'POST', 
                    body: JSON.stringify({ name: name })
                }).then(response => {
                    return response.json();
                }).then(json => {
                    const playlistId = json.id;
                    // use playlistId to add the specified tracks to the playlist
                    return (fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
                        headers: headers, 
                        method: 'POST', 
                        body: JSON.stringify({ uris: trackUris })
                    }));
                }));
            })
        );
    }
} 

export default Spotify;