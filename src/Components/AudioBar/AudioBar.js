import React from 'react';
import './AudioBar.css';

class AudioBar extends React.Component {
    render() {
        return (
        <audio id="audioPreview" controls>
            <source 
                src={this.props.audioSrc}
                type="audio/mpeg"></source> 
                Player not supported in your browser.
        </audio>
        );
    }
}


export default AudioBar;