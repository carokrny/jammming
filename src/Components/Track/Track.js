import React from 'react';
import './Track.css';
import PlayButton from '../PlayButton/PlayButton';

class Track extends React.Component {
    constructor(props) {
        super(props);
        this.addTrack = this.addTrack.bind(this);
        this.removeTrack = this.removeTrack.bind(this);
    }
    
    renderAction() {
        if (this.props.isRemoval) {
            return <button className="Track-action" onClick={this.removeTrack}>-</button> 
        } else {
            return <button className="Track-action" onClick={this.addTrack}>+</button>
        }
    }

    addTrack() {
        this.props.onAdd(this.props.track);
    }

    removeTrack() {
        this.props.onRemove(this.props.track);
    }
    
    render() {
        return (
            <div className="Track">
                <PlayButton
                    onAudioChange={this.props.onAudioChange}
                    previewUrl={this.props.track.previewUrl}
                    isPlaying={this.props.track.isPlaying} />
                <div className="Track-information">
                    <h3>{this.props.track.name}</h3>
                    <p>{this.props.track.artist} | {this.props.track.album}</p>
                </div>
                {this.renderAction()}
            </div>
        );
    }
}

export default Track;