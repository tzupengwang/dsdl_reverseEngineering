import React from 'react';

import Stage from './stage.jsx';
import Setting from './setting.jsx';
import Result from './result.jsx';

class Wrapper extends React.Component {
  constructor() {
    super();
    this.state = {
      overlay_active: false,
      result_active: false,
      result: null,
      mode: 1, // 1: Mealy, 2: Moore
    };
  }
  toggle_overlay() {
    this.setState({overlay_active: !this.state.overlay_active});
  }
  toggle_result() {
    this.setState({result_active: !this.state.result_active});
  }
  set_result(result) {
    console.log('here');
    this.setState({result: result});
    this.toggle_result();
  }
  set_mode(x) {
    if (x != this.state.mode)
      this.setState({mode: x});
  }
  render() {
    return (
      <div className='wrapper'>
        <Stage
          toggle_overlay={this.toggle_overlay.bind(this)}
          set_result={this.set_result.bind(this)}
          toggle_result={this.toggle_result.bind(this)}
          cur_mode={this.state.mode}/>
        <Setting
          active={this.state.overlay_active}
          toggle_overlay={this.toggle_overlay.bind(this)}
          set_mode={this.set_mode.bind(this)}
          cur_mode={this.state.mode}/>
        <Result
          active={this.state.result_active}
          toggle_result={this.toggle_result.bind(this)}
          result={this.state.result}
          cur_mode={this.state.mode}/>
      </div>
    );
  }
}

export default Wrapper;
