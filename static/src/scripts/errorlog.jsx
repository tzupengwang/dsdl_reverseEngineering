import React from 'react';
import Draggable from 'react-draggable';
import moment from 'moment';

class Errorlog extends React.Component {
  render() {
    const { logs , ...props } = this.props ;
    return (
      <div className="error-log" {...props}>
        <div className='title'>logs</div>
        <div className='error-box'>
        { logs.reverse().map((msg, key) => {
            return <div className='error' key={key}>{msg}</div> ;
          })
        }
        </div>
      </div>
    );
  }
}

export default Errorlog;
