import React from 'react';
import Draggable from 'react-draggable';
import { Comp } from './ff.jsx';

class Toolkit extends React.Component {
  render() {
    const { addComp , ...props } = this.props ;
    return (
      <div className="toolkit" {...props}>
        <div className='title'>Toolkit</div>
        <Comp className='flip-flop' active={false} group='flip-flop' type='d-ff' key={-1} onClick={(e) => {
          addComp('flip-flop', 'd-ff');
          e.stopPropagation();
        }}/>
        <Comp className='flip-flop' active={false} group='flip-flop' type='t-ff' onClick={(e) => {
          addComp('flip-flop', 't-ff');
          e.stopPropagation();
        }}/>
        <Comp className='flip-flop' active={false} group='flip-flop' type='rs-ff' onClick={(e) => {
          addComp('flip-flop', 'rs-ff');
          e.stopPropagation();
        }}/>
        <Comp className='flip-flop' active={false} group='flip-flop' type='jk-ff' onClick={(e) => {
          addComp('flip-flop', 'jk-ff');
          e.stopPropagation();
        }}/>
        <Comp className='logic-gate' active={false} group='logic-gate' type='and-gate' onClick={(e) => {
          addComp('logic-gate', 'and-gate');
          e.stopPropagation();
        }}/>
        <Comp className='logic-gate' active={false} group='logic-gate' type='or-gate' onClick={(e) => {
          addComp('logic-gate', 'or-gate');
          e.stopPropagation();
        }}/>
      </div>
    );
  }
}

export default Toolkit;
