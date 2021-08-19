import React from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      searchResults: [{name: 'name1', artist: 'artist1', album: 'album1', id:1}, {name: 'name2', artist: 'artist2', album: 'album2', id:2}, {name: 'name3', artist: 'artist3', album: 'album3', id:3}],
      playlistName: 'My Playlist',
      playlistTracks : [{name: 'name4', artist: 'artist4', album: 'album4', id:4}, {name: 'name5', artist: 'artist5', album: 'album5', id:5}, {name: 'name6', artist: 'artist6', album: 'album6', id:6}]
    };
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
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

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar />
          <div className="App-playlist">
            <SearchResults 
              searchResults={this.state.searchResults} 
              onAdd={this.addTrack} />
            <Playlist 
              playlistName={this.state.playlistName} 
              playlistTracks={this.state.playlistTracks}
              onRemove={this.removeTrack}
              onNameChange={this.updatePlaylistName} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;