import React from 'react';
import Draggable from 'react-draggable';

class Port extends React.Component {
  render() {
    let { content , type , compid , portid , focusedPort , clickPort , className , color , ...props } = this.props ;
    if (focusedPort != null &&
        compid == focusedPort.compid &&
        portid == focusedPort.portid) className += ' active';
    //console.log('port', focusedPort);
    return (
      <div className={className} {...props} style={{color: color}} onClick={(e) => {
        clickPort({type: type, compid: compid, portid: portid});
        //e.stopPropagation();
      }}>
        <strong>{ content }</strong>
      </div>
    );
  }
}

export default Port;
