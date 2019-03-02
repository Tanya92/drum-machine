import React, { Component } from 'react';
import { render } from 'react-dom';
import {connect} from 'react-redux';
import {playSound, changePower, changeVolume, changeBank, clearDisplay, playReducer} from './play-reducer';
import './style.css';


export class PlaySound extends Component {
  play(elem) {
    if (this.props.power) {
      this.audioRef.current.src = elem.url;
      this.audioRef.current.volume = parseFloat(this.props.volume);
      this.audioRef.current.play();
      this.props.playSound(elem.keyCode);
    }
    
  }
  handleClick = (bank) => () => {
      this.play(bank);
  }
  handlePress = (event) => {
    var currentElem = this.props.bank.find(elem => elem.keyCode == event.keyCode);
    var currentButton = document.getElementById(currentElem.keyTrigger);
      if (currentElem && this.props.power) {
        this.play(currentElem);
        currentButton.classList.add("active");
    }
  }
  handleUp = (event) => {
    var currentElem = this.props.bank.find(elem => elem.keyCode == event.keyCode);
    var currentButton = document.getElementById(currentElem.keyTrigger);
    if (currentElem) {
      currentButton.classList.remove("active");
    }
  }
  handleBank = () => { 
    if (this.props.power) {
      this.props.changeBank();
    }
  }
  handlePower = () => {
    this.props.changePower();
  }
  componentDidMount() {
    document.addEventListener("keydown", this.handlePress);
    document.addEventListener("keyup", this.handleUp);
  }
  componentWillUnmount(){
    document.removeEventListener("keydown");
    document.removeEventListener("keyup");
  }
  clearDisplay = () => {
    this.props.clearDisplay();
  }
  changeVolume = (event) => {
    if (this.props.power){
      this.props.changeVolume(event.target.value);
      setTimeout(() => this.clearDisplay(), 1000);
    }
  };
  audioRef = React.createRef();
  render() {
    return (
      <div id="drum-machine">
        <div id="toolBar">
          <i><strong>FCC</strong></i>
          <i 
            title="no-stack-dub-sack" 
            className="fa  fa-free-code-camp"
          >
          </i>
        </div>
        <div className="content">
          <div className="pads">
          <audio ref={this.audioRef} volume={this.props.volume}/>
          {
            this.props.bank.map(elem => (
              <button
                className="drum-pad"
                onClick={this.handleClick(elem)}
                id={elem.keyTrigger}
                key={elem.keyTrigger}
                disabled={!this.props.power}
              >
              {elem.keyTrigger}
              </button>
            ))
          }
          </div>
          <div id="control-container">
            <p><strong>Power</strong></p>
            <div className="select" onClick={this.handlePower}>
              <div className={this.props.power ? "inner": "inner inner_left"}></div>
            </div>
            <p id="display">
              <strong>{this.props.display}</strong>
            </p>
            <div id="volume-slider">
              <input 
                type="range" 
                step="0.01" 
                min="0" 
                max="1" 
                value={this.props.volume}
                onChange={this.changeVolume}
              >
              </input>
            <p><strong>Bank</strong></p>
            <div className="select" onClick={this.handleBank} >
              <div className={this.props.isBank ? "inner": "inner inner_left"}></div>
            </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return state;
}

const dispatchToProps = (dispatch) => {
  return {
    playSound: (keyCode) => {
      dispatch(playSound(keyCode));
    },
    changePower: () => {
      dispatch(changePower());
    },
    changeVolume: (volume) => {
      dispatch(changeVolume(volume));
    },
    changeBank: () => {
      dispatch(changeBank());
    },
    clearDisplay: () => {
      dispatch(clearDisplay());
    }
  };
};
export default connect(mapStateToProps, dispatchToProps)(PlaySound);