import React from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import Spotify from '../../util/Spotify';
import AudioBar from '../AudioBar/AudioBar';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      searchResults: [],
      playlistName: 'New Playlist',
      playlistTracks : [], 
      audioSrc: '',
      audioPlaying: false,
    };
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
    this.setAudio = this.setAudio.bind(this);
  } 
  
  addTrack(track) {
    const tracks = this.state.playlistTracks;
    
    // determine if track is already in the playlist by id 
    if (tracks.find(currentTrack => currentTrack.id === track.id)) {
      return;
    }
    
    // if track is not already on the playlist, add it to playlist 
    tracks.push(track);
    this.setState({ playlistTracks: tracks });
  }

  removeTrack(track) {
    //filter out any instances of the track based on id
    const updatedTracks = this.state.playlistTracks.filter(currentTrack => currentTrack.id !== track.id);
    this.setState({ playlistTracks: updatedTracks });
  } 

  updatePlaylistName(newName) {
    this.setState({ playlistName: newName });
  }

  savePlaylist() {
    const trackUris = this.state.playlistTracks.map(track => track.uri);
    Spotify.savePlaylist(this.state.playlistName, trackUris).then(() => {
      this.setState({ playlistName: 'New Playlist', playlistTracks: [] })
    });
  }

  search(searchTerm) {
    Spotify.search(searchTerm).then(spotifyResults => {
      this.setState({ searchResults: spotifyResults })
    });
  }

  setAudio(newSrc) {
    // capture the audio element from the DOM 
    const audioPreview = document.getElementById('audioPreview');
    // declare local variable for keeping track of new state. 
    let isPreviewPlaying;

    // determine if same audio source, else update to a new audio source
    if(this.state.audioSrc === newSrc){
      // same source has no need to update audio src 
      // toggle whether audio is playing 
      isPreviewPlaying = !this.state.audioPlaying;
    } else {
      // new source need to update audio src and reload
      this.setState({ audioSrc: newSrc });
      audioPreview.load();
      // set isPreviewPlaying to true always for starting a new audio
      isPreviewPlaying = true;
    }

    // update isPlaying for each track so correct button displays
    // i.e., play or pause button for each track. 
    const updatedSearchResults = this.state.searchResults.map(track => {
      if(track.previewUrl === newSrc) {
        track.isPlaying = isPreviewPlaying;
      } else {
        track.isPlaying = false;
      }
      return track;
    });
    const updatedPlaylistTracks = this.state.playlistTracks.map(track => {
      if(track.previewUrl === newSrc) {
        track.isPlaying = isPreviewPlaying;
      } else {
        track.isPlaying = false;
      }
      return track;
    });

    // turn audio on/off 
    if (isPreviewPlaying) {
      audioPreview.play();
    } else {
      audioPreview.pause();
    }
    // update state to trigger re-render
    this.setState({ audioPlaying: isPreviewPlaying,
                    searchResults: updatedSearchResults,
                    playlistTracks: updatedPlaylistTracks });
  }

  componentDidMount() {
    window.addEventListener('load', () => {Spotify.getAccessToken()});
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar
            onSearch={this.search} />
          <AudioBar 
            audioSrc={this.state.audioSrc} />
          <div className="App-playlist">
            <SearchResults 
              searchResults={this.state.searchResults} 
              onAdd={this.addTrack}
              onAudioChange={this.setAudio} />
            <Playlist 
              playlistName={this.state.playlistName} 
              playlistTracks={this.state.playlistTracks}
              onRemove={this.removeTrack}
              onNameChange={this.updatePlaylistName}
              onSave={this.savePlaylist}
              onAudioChange={this.setAudio} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;