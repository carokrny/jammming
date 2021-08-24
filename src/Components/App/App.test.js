import React from 'react';
import { render } from '@testing-library/react';

import App from './App';
import Spotify from '../../util/Spotify';

// basic rendering test 
test('renders Save to Spotify', () => {
    const { getByText } = render(<App />);
    const textElement = getByText(/save to spotify/i);
    expect(textElement).toBeInTheDocument();
})


// Audio preview tests. 
describe('search fetch request', () => {
    it('returns a track with desired properties', () => {
        const mockSearch= jest.fn().mockReturnValue({
            tracks:
            {
                items: [{
                    id: 1,
                    name: 'Dance Monkey',
                    artist: 'Tones And I',
                    album: 'Dance Monkey (single)',
                    uri: 123456, 
                    previewUrl: 'https://p.scdn.co/mp3-preview/224e046a80e718e9ede0c74219c05d7cf153f7a6?cid=774b29d4f13844c495f206cafdad9c86'
                },
                {
                    id: 2,
                    name: '2nd Favorite Song',
                    artist: '2nd Favorite Artist',
                    album: '2nd Favorite Album',
                    uri: 123457,
                    previewUrl: 'song2'
                }]
            }
        });
        const res = mockSearch();
        expect(res.tracks.items[0].id).toEqual(1);
        expect(res.tracks.items[0].name).toEqual('Dance Monkey');
        expect(res.tracks.items[0].previewUrl).toEqual('https://p.scdn.co/mp3-preview/224e046a80e718e9ede0c74219c05d7cf153f7a6?cid=774b29d4f13844c495f206cafdad9c86');
    });

    it('plays the correct audio in the audio preview', () => {
        const mockSearch= jest.fn().mockReturnValue({
            tracks:
            {
                items: [{
                    id: 1,
                    name: 'Dance Monkey',
                    artist: 'Tones And I',
                    album: 'Dance Monkey (single)',
                    uri: 123456, 
                    previewUrl: 'https://p.scdn.co/mp3-preview/224e046a80e718e9ede0c74219c05d7cf153f7a6?cid=774b29d4f13844c495f206cafdad9c86'
                },
                {
                    id: 2,
                    name: '2nd Favorite Song',
                    artist: '2nd Favorite Artist',
                    album: '2nd Favorite Album',
                    uri: 123457,
                    previewUrl: 'song2'
                }]
            }
        });
        const res = mockSearch();
        expect(res.tracks.items[0].previewUrl).toEqual('https://p.scdn.co/mp3-preview/224e046a80e718e9ede0c74219c05d7cf153f7a6?cid=774b29d4f13844c495f206cafdad9c86');
        
    });
});