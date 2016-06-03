import React from 'react';

import Stage from './stage.jsx';
import Setting from './setting.jsx';
//import master from './master.jsx';
//import cover from './cover.jsx';
//import inpage from './inpage.jsx';
//import introduction from './introduction.jsx';
//import games from './games.jsx';
//import slot from './games/slot.jsx';
//import ranking from './ranking.jsx';
//import share from './share.jsx';
//import sponsor from './sponsor.jsx';

class Wrapper extends React.Component {
  constructor() {
    super();
    this.state = {
      overlay_active: false,
      mode: 1, // 1: Mealy, 2: Moore
    };
  }
  toggle_overlay() {
    this.setState({overlay_active: !this.state.overlay_active});
  }
  set_mode(x) {
    if (x != this.state.mode)
      this.setState({mode: x});
  }
  render() {
    console.log( 'render', this.state.overlay_active ) ;
    return (
      <div className='wrapper'>
        <Stage
          toggle_overlay={this.toggle_overlay.bind(this)}
          cur_mode={this.state.mode}/>
        <Setting
          active={this.state.overlay_active}
          toggle_overlay={this.toggle_overlay.bind(this)}
          set_mode={this.set_mode.bind(this)}
          cur_mode={this.state.mode}/>
      </div>
    );
  }
}

export default Wrapper;
