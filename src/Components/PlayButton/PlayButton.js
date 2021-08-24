import React from 'react';
import './PlayButton.css';

class PlayButton extends React.Component {
    constructor(props) {
        super(props);
        this.renderButton = this.renderButton.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) { 
        this.props.onAudioChange(this.props.previewUrl);
    }

    renderButton() {
        if(!this.props.previewUrl) {
            return (
                <button 
                    className="inactive">
                    {String.fromCodePoint(9654)}
                </button>
            );
        } else {
            return (
            <button 
                className="active"
                onClick={this.handleClick} >
                {this.props.isPlaying ? '||' : String.fromCodePoint(9654)}
            </button>
            );
        }
    }

    render() {
        return (
            <>
                {this.renderButton()}
            </>
        );
    }
}

export default PlayButton;
