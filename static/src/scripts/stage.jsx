import React from 'react';

class Stage extends React.Component {
  render() {
    const { toggle_overlay , cur_mode } = this.props;
    return (
      <div className='stage'>
        <button onClick={toggle_overlay}>Hello</button>
        <div className='title-bar'>
          Reverse Engineering Project
        </div>
        <div className='mode-bar'>
          {(cur_mode == 1) ? 'Mealy Machine' : 'Moore Machine'}
        </div>
      </div>
    );
  }
}

export default Stage;
