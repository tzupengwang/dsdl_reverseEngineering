import React from 'react';
import Draggable from 'react-draggable';
import Port from './port.jsx';
import { List } from 'immutable';

class FF extends React.Component {
  constructor() {
    super();
  }
  componentDidMount() {
  }
  render() {
    let { type , active , className , compid , focusedPort , colorList , clickPort , ...props } = this.props;
    let ffclass = type;
    if (active) ffclass += ' active';
    if (type == 't-ff') {
      return (
        <div { ...props } className={className}>
        <div className={ffclass}>
          <Port className='port top-left' content='T' type='input' compid={compid} portid={2} focusedPort={focusedPort} clickPort={clickPort} color={colorList.get(2)}/>
          <Port className='port top-right' content='Q' type='output' compid={compid} portid={0} focusedPort={focusedPort} clickPort={clickPort} color={colorList.get(0)}/>
          <Port className='port bottom-right' content="Q'" type='output' compid={compid} portid={1} focusedPort={focusedPort} clickPort={clickPort} color={colorList.get(1)}/>
        </div>
        </div>
      );
    } else if (type == 'd-ff') {
      return (
        <div { ...props } className={className}>
        <div className={ffclass}>
          <Port className='port top-left' content='D' type='input' compid={compid} portid={2} focusedPort={focusedPort} clickPort={clickPort} color={colorList.get(2)}/>
          <Port className='port top-right' content='Q' type='output' compid={compid} portid={0} focusedPort={focusedPort} clickPort={clickPort} color={colorList.get(0)}/>
          <Port className='port bottom-right' content="Q'" type='output' compid={compid} portid={1} focusedPort={focusedPort} clickPort={clickPort} color={colorList.get(1)}/>
        </div>
        </div>
      );
    } else if (type == 'rs-ff') {
      return (
        <div { ...props } className={className}>
        <div className={ffclass}>
          <Port className='port top-left' content='S' type='input' compid={compid} portid={2} focusedPort={focusedPort} clickPort={clickPort} color={colorList.get(2)}/>
          <Port className='port top-right' content='Q' type='output' compid={compid} portid={0} focusedPort={focusedPort} clickPort={clickPort} color={colorList.get(0)}/>
          <Port className='port bottom-right' content="Q'" type='output' compid={compid} portid={1} focusedPort={focusedPort} clickPort={clickPort} color={colorList.get(1)}/>
          <Port className='port bottom-left' content='R' type='input' compid={compid} portid={3} focusedPort={focusedPort} clickPort={clickPort} color={colorList.get(3)}/>
        </div>
        </div>
      );
    } else if (type == 'jk-ff') {
      return (
        <div { ...props } className={className}>
        <div className={ffclass}>
          <Port className='port top-left' content='J' type='input' compid={compid} portid={2} focusedPort={focusedPort} clickPort={clickPort} color={colorList.get(2)}/>
          <Port className='port top-right' content='Q' type='output' compid={compid} portid={0} focusedPort={focusedPort} clickPort={clickPort} color={colorList.get(0)}/>
          <Port className='port bottom-right' content="Q'" type='output' compid={compid} portid={1} focusedPort={focusedPort} clickPort={clickPort} color={colorList.get(1)}/>
          <Port className='port bottom-left' content='K' type='input' compid={compid} portid={3} focusedPort={focusedPort} clickPort={clickPort} color={colorList.get(3)}/>
        </div>
        </div>
      );
    }
  }
}

class LogicGate extends React.Component {
  constructor() {
    super();
  }
  componentDidMount() {
  }
  render() {
    let { type , active , className , compid , focusedPort , colorList , clickPort , ...props } = this.props;
    let ffclass = type;
    if (active) ffclass += ' active';
    if (type == 'and-gate') {
      return (
        <div { ...props } className={className}>
        <div className={ffclass}>
          <Port className='port top-left' content='X1' type='input' compid={compid} portid={1} focusedPort={focusedPort} clickPort={clickPort} color={colorList.get(1)}/>
          <Port className='port bottom-left' content='X2' type='input' compid={compid} portid={2} focusedPort={focusedPort} clickPort={clickPort} color={colorList.get(2)}/>
          <Port className='port center-right' content="O" type='output' compid={compid} portid={0} focusedPort={focusedPort} clickPort={clickPort} color={colorList.get(0)}/>
        </div>
        </div>
      );
    } else if (type == 'or-gate') {
      return (
        <div { ...props } className={className}>
        <div className={ffclass}>
          <span/>
          <span/>
          <Port className='port top-left' content='X1' type='input' compid={compid} portid={1} focusedPort={focusedPort} clickPort={clickPort} color={colorList.get(1)}/>
          <Port className='port bottom-left' content='X2' type='input' compid={compid} portid={2} focusedPort={focusedPort} clickPort={clickPort} color={colorList.get(2)}/>
          <Port className='port center-right' content="O" type='output' compid={compid} portid={0} focusedPort={focusedPort} clickPort={clickPort} color={colorList.get(0)}/>
        </div>
        </div>
      );
    } else if (type == 'not-gate') {
      return (
        <div { ...props } className={className}>
        <div className={ffclass}>
          <Port className='port center-left' content='X' type='input' compid={compid} portid={1} focusedPort={focusedPort} clickPort={clickPort} color={colorList.get(1)}/>
          <Port className='port center-right' content="X'" type='output' compid={compid} portid={0} focusedPort={focusedPort} clickPort={clickPort} color={colorList.get(0)}/>
        </div>
        </div>
      );
    }
  }
}

class Input extends React.Component {
  render() {
    let { type , active , className , compid , focusedPort , colorList , clickPort , ...props } = this.props;
    let ffclass = type;
    if (active) ffclass += ' active';
    return (
      <div { ...props } className={className}>
      <div className={ffclass}>
        <Port className='port center-right' content="input" type='output' compid={compid} portid={0} focusedPort={focusedPort} clickPort={clickPort} color={colorList.get(0)}/>
      </div>
      </div>
    );
  }
}

class Output extends React.Component {
  render() {
    let { type , active , className , compid , focusedPort , colorList , clickPort , ...props } = this.props;
    let ffclass = type;
    if (active) ffclass += ' active';
    return (
      <div { ...props } className={className}>
      <div className={ffclass}>
        <Port className='port center-left' content="output" type='input' compid={compid} portid={0} focusedPort={focusedPort} clickPort={clickPort} color={colorList.get(0)}/>
      </div>
      </div>
    );
  }
}

export const Comp = (props) => {
  let { group } = props ;
  if ( group == 'flip-flop' ) {
    return (
      <FF
        {...props}
        compid={0}
        focusedPort={0}
        colorList={List(['rgb(255, 255, 255)', 'rgb(255, 255, 255)', 'rgb(255, 255, 255)', 'rgb(255, 255, 255)'])}
        clickPort={() => {}}
        />
    );
  } else if ( group == 'logic-gate' ) {
    return (
      <LogicGate
        {...props}
        compid={0}
        focusedPort={0}
        colorList={List(['rgb(255, 255, 255)', 'rgb(255, 255, 255)', 'rgb(255, 255, 255)', 'rgb(255, 255, 255)'])}
        clickPort={() => {}}
      />
    );
  } else if ( group == 'input' ) {
    return (
      <Input
        {...props}
        compid={0}
        focusedPort={0}
        colorList={List(['rgb(255, 255, 255)', 'rgb(255, 255, 255)', 'rgb(255, 255, 255)', 'rgb(255, 255, 255)'])}
        clickPort={() => {}}
      />
    );
  } else if ( group == 'output' ) {
    return (
      <Output
        {...props}
        compid={0}
        focusedPort={0}
        colorList={List(['rgb(255, 255, 255)', 'rgb(255, 255, 255)', 'rgb(255, 255, 255)', 'rgb(255, 255, 255)'])}
        clickPort={() => {}}
      />
    );
  }
}
export const DraggableComp = (props) => {
  let { group } = props ;
  let width = (window == undefined) ? 1000 : window.innerWidth;
  if ( group == 'flip-flop' ) {
    return (
      <Draggable
        bounds={'parent'}
        defaultPosition={{x: width * 0.22, y: 100}}>
        <FF {...props}/>
      </Draggable>
    );
  } else if ( group == 'logic-gate' ) {
    return (
      <Draggable
        bounds={'parent'}
        defaultPosition={{x: width * 0.22, y: 100}}>
        <LogicGate {...props}/>
      </Draggable>
    );
  } else if ( group == 'input' ) {
    return (
      <Draggable
        bounds={'parent'}
        defaultPosition={{x: width * 0.22, y: 100}}>
        <Input {...props}/>
      </Draggable>
    );
  } else if ( group == 'output' ) {
    return (
      <Draggable
        bounds={'parent'}
        defaultPosition={{x: width * 0.22, y: 100}}>
        <Output {...props}/>
      </Draggable>
    );
  }
}
