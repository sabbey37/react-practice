import React, { Component } from 'react';

class WorldClock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      options: {timeZone: this.props.timeZone, timeZoneName: 'short'},
      currentTime: new Date(),
      clockFace: 'normal',
      digital: false,
      color: 'yellow'
    };
  }
  componentDidMount() {
    setInterval(() => {
        this._updateTime(1000)
    }, 1000)
  }
  _updateTime = (timeDifference) => {
    const newTime = new Date(this.state.currentTime.getTime() + timeDifference);
    this.setState({
      currentTime: newTime
    });
  }

  _updateLookAndFeel = (isDigital, newColor) => {
    // isDigital = true;
    // newColor = 'cornflowerblue';
    this.setState({
      digital: isDigital,
      color: newColor
    });
  }
  render() {
      return (
        <div>
            <h2>{this.props.place}</h2>
            <p>{this.state.currentTime.toLocaleTimeString('en-US', this.state.options)}</p>
        </div>
      );
  }

}

export default WorldClock;