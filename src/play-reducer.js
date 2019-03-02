const bankOne = [{
    keyCode: 81,
    keyTrigger: 'Q',
    id: 'Heater-1',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3'
  }, {
    keyCode: 87,
    keyTrigger: 'W',
    id: 'Heater-2',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3'
  }, {
    keyCode: 69,
    keyTrigger: 'E',
    id: 'Heater-3',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3'
  }, {
    keyCode: 65,
    keyTrigger: 'A',
    id: 'Heater-4',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3'
  }, {
    keyCode: 83,
    keyTrigger: 'S',
    id: 'Clap',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3'
  }, {
    keyCode: 68,
    keyTrigger: 'D',
    id: 'Open-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3'
  }, {
    keyCode: 90,
    keyTrigger: 'Z',
    id: "Kick-n'-Hat",
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3'
  }, {
    keyCode: 88,
    keyTrigger: 'X',
    id: 'Kick',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3'
  }, {
    keyCode: 67,
    keyTrigger: 'C',
    id: 'Closed-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3'
  },
];

const bankTwo = [{
  keyCode: 81,
  keyTrigger: 'Q',
  id: 'Chord-1',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3'
}, {
  keyCode: 87,
  keyTrigger: 'W',
  id: 'Chord-2',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3'
}, {
  keyCode: 69,
  keyTrigger: 'E',
  id: 'Chord-3',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3'
}, {
  keyCode: 65,
  keyTrigger: 'A',
  id: 'Shaker',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3'
}, {
  keyCode: 83,
  keyTrigger: 'S',
  id: 'Open-HH',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3'
}, {
  keyCode: 68,
  keyTrigger: 'D',
  id: 'Closed-HH',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3'
}, {
  keyCode: 90,
  keyTrigger: 'Z',
  id: 'Punchy-Kick',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3'
}, {
  keyCode: 88,
  keyTrigger: 'X',
  id: 'Side-Stick',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3'
}, {
  keyCode: 67,
  keyTrigger: 'C',
  id: 'Snare',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3'
}];

const KEY_DOWN = "KEY_DOWN";
const SWITCH_POWER = "SWITCH_POWER";
const CHANGE_VOLUME = "CHANGE_VOLUME";
const CHANGE_BANK = "CHANGE_BANK";
const CLEAR_DISPLAY = "CLEAR_DISPLAY";

export const playSound = (keyCode) => {
  return {
    type: KEY_DOWN,
    keyCode
  }
};

export const changePower = () => {
  return {
    type: SWITCH_POWER
  }
};

export const changeVolume  = (volume) => {
  return {
    type: CHANGE_VOLUME,
    volume
  }
};

export const changeBank = () => {
  return {
    type: CHANGE_BANK,
  }
};

export const clearDisplay  = () => {
  return {
    type: CLEAR_DISPLAY
  }
}

const defaultState = {
  power: true,
  display: "",
  volume: "0.05",
  bank: bankOne,
  isBank: true
};

export const playReducer = (state=defaultState, action) => {
  switch(action.type) {
    case KEY_DOWN:
      return {
        ...state,
        display: state.bank.find(elem => elem.keyCode == action.keyCode).id
      };
    case SWITCH_POWER:
      return {
        ...state,
        power: !state.power,
        display: ""
      };
    case CHANGE_VOLUME:
      return {
        ...state,
        display: "Volume: " + Math.round(state.volume * 100),
        volume: action.volume
      };
    case CHANGE_BANK: 
      return {
        ...state,
        bank: state.isBank ? bankTwo : bankOne,
        isBank: !state.isBank,
        display: state.isBank ? "Smooth Piano Kit" : "Heater Kit"
      };
    case CLEAR_DISPLAY:
      return {
        ...state,
        display: ""
      }
    default:
      return state;
  }
}