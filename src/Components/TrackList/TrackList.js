import React from 'react';
import './TrackList.css';
import Track from '../Track/Track';

class TrackList extends React.Component {
    render() {
        return (
            <div className="TrackList">
                {
                    this.props.tracks.map(element => {
                        return <Track track={element} key={element.id} />
                    })
                }
            </div>
        );
    }
}

export default TrackList;