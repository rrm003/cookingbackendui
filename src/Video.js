import React from 'react';
import YouTube from 'react-youtube';

class Video extends React.Component {
  
  render() {
    console.log(this.props)
    const opts = {
      height: '390',
      width: '640',
      playerVars: {
        autoplay: 1,
      },
    };

    return <YouTube videoId={this.props.video} opts={opts} onReady={this._onReady} />;
  }

}

export default  Video;