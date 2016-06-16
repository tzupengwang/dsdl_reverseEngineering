import React from 'react';
import { DraggableComp } from './ff.jsx';
import Toolkit from './toolkit.jsx';
import Errorlog from './errorlog.jsx';
import moment from 'moment';
import { Map , List } from 'immutable';

class Stage extends React.Component {
  constructor() {
    super();
    this.key_counter = 1;
    this.color_counter = 1;
    this.running = false;
    this.colors = List([`rgb(${255}, ${255}, ${255})`]);
    //console.log(this.colors.get(0));
    //console.log(`rgb(${0}, ${0}, ${0})`);
    this.state = {
      comps: Map.of(
         //1, {group: 'flip-flop', type: 't-ff'},
      ),
      logs: List(),
      focus: 0,
      focusedPort: null,
    };
  }

  genNewColor() {
    // TODO: avoid duplicate color
    this.colors = this.colors.push(`rgb(${Math.round(Math.random() * 200 + 55)}, ${Math.round(Math.random() * 200 + 55)}, ${Math.round(Math.random() * 200 + 55)})`);
    return this.colors.last();
  }

  focus(key) {
    this.setState({focus: key});
  }

  addLog(msg) {
    msg = '[' + moment().format("hh:mm:ss A") + '] ' + msg ;
    if (this.state.logs.size >= 5) {
      this.setState(curState => {
        curState.logs = curState.logs.delete(0).push(msg);
        return curState;
      });
    } else {
      this.setState(curState => {
        curState.logs = curState.logs.push(msg);
        return curState;
      });
    }
  }

  addComp(group, type) {
    let colorList = List();
    switch (type) {
      case 'd-ff':
      case 't-ff':
        colorList = colorList.push(this.genNewColor(), this.genNewColor(), this.colors.first());
        break;
      case 'rs-ff':
      case 'jk-ff':
        colorList = colorList.push(this.genNewColor(), this.genNewColor(), this.colors.first(), this.colors.first());
        break;
      case 'and-gate':
      case 'or-gate':
        colorList = colorList.push(this.genNewColor(), this.colors.first(), this.colors.first());
        break;
      case 'not-gate':
        colorList = colorList.push(this.genNewColor(), this.colors.first());
        break;
      case 'inputg':
        colorList = colorList.push(this.genNewColor());
        break;
      case 'outputg':
        colorList = colorList.push(this.colors.first());
        break;
    }
    this.setState( {comps: this.state.comps.set(this.key_counter ++, {group: group, type: type, colorList: colorList})} );
  }

  clickPort(port) {
    if (this.state.focusedPort == null) this.setState({focusedPort: port});
    else {
      if (port.type != this.state.focusedPort.type) {
        let outport = (port.type == 'output') ? port : this.state.focusedPort ;
        let inport = (port.type == 'input') ? port : this.state.focusedPort ;
        this.setState( {comps: this.state.comps.update(inport.compid, (stat) => {
          stat.colorList = stat.colorList.set(inport.portid, this.state.comps.get(outport.compid).colorList.get(outport.portid));
          return stat;
        })});
      }
      this.setState({focusedPort: null});
    }
  }

  printResult(result) {
    //console.log(result)
    result = eval('(' + result + ')')
    this.props.set_result(result)
    console.log(result)
  }

  compute() {
    this.addLog('Start computing');
    if (socket) {
      let data = {
        machineType: (this.props.cur_mode == 1) ? 'Mealy Machine' : 'Moore Machine',
        numInput: 0,
        numOutput: 0,
        numFF: 0,
        numGate: 0,
        inputs: [],
        outputs: [],
        ffs: [],
        gates: []
      };
      this.state.comps.forEach((comp, key) => {
        switch (comp.group) {
          case 'flip-flop':
            data.numFF += 1;
            data.ffs.push({
              type: comp.type,
              colorList: comp.colorList.toArray().map(x => this.colors.indexOf(x)),
            });
            break;
          case 'logic-gate':
            data.numGate += 1;
            data.gates.push({
              type: comp.type,
              colorList: comp.colorList.toArray().map(x => this.colors.indexOf(x)),
            });
            break;
          case 'input':
            data.numInput += 1;
            data.inputs.push({
              type: comp.type,
              colorList: comp.colorList.toArray().map(x => this.colors.indexOf(x)),
            });
            break;
          case 'output':
            data.numOutput += 1;
            data.outputs.push({
              type: comp.type,
              colorList: comp.colorList.toArray().map(x => this.colors.indexOf(x)),
            });
            break;
        }
      });
      socket.emit('/compute', data, (result, err) => {
        if (err) {
          this.addLog(err);
        } else {
          this.addLog('Computed successfully');
          this.printResult(result);
        }
      });
    } else {
      this.addLog('No connection');
    }
  }

  removeComp() {
    this.setState({
      comps: this.state.comps.delete(this.state.focus),
      focus: 0,
    });
  }

  render() {
    const { toggle_overlay , cur_mode } = this.props;
    return (
      <div className='stage' onClick={this.focus.bind(this, 0)}>
        <div className='title-bar'>
          Reverse Engineering Project
        </div>
        <div className='mode-bar' onClick={toggle_overlay}>
          {(cur_mode == 1) ? 'Mealy Machine' : 'Moore Machine'}
        </div>
        <Toolkit addComp={this.addComp.bind(this)}>
        </Toolkit>
        {
          (this.state.focus != 0) ? <div className='delete-bar active' onClick={(e) => {
            this.removeComp();
            e.stopPropagation();
          }}>delete</div> :
            <div className='delete-bar non-active'>delete</div>
        }
        <div className='run-button' onClick={(e) => {
          if (this.running == false) {
            this.running = true;
            this.compute();
            this.running = false;
          }
        }}>run</div>
        <Errorlog logs={this.state.logs}/>
        {this.state.comps.entrySeq().map(([key, comp]) => {
          return <DraggableComp
            className={comp.group}
            active={(this.state.focus == key)}
            focusedPort={this.state.focusedPort}
            clickPort={this.clickPort.bind(this)}
            {...comp}
            compid={key}
            key={key}
            onClick={(e) => {
              this.focus(key);
              e.stopPropagation();
          }}/>
        })}
      </div>
    );
  }
}

export default Stage;
