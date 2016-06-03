import React from 'react';

class FF extends React.Component {
  render() {
    return (
      <div className='flip-flop'>
        <button onClick={this.props.toggle_overlay}>Hello</button>
      </div>
    );
  }
}

export default FF;
