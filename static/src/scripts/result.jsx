import React from 'react';
import { List , Map } from 'immutable';

class Result extends React.Component {
  render() {
    let { active, toggle_result , result , cur_mode } = this.props;
    let myclass;
    if (active == true) myclass = 'result active';
    else myclass = 'result';

    if (result == null) return (<div className={myclass}/>);

    if (cur_mode == 1 ) {
      result = Map(result).entrySeq().sort((x, y) => {
        if (x[0] < y[0]) return -1;
        if (x[0] > y[0]) return 1;
        return 0;
      }).toList()
      //console.log(result)
      //console.log(result.first())
      let keys = Map(result.first()[1]).keySeq();
      //console.log(keys)
      keys = keys.sort((x, y) => {
        if (x < y) return -1;
        if (x > y) return 1;
        return 0;
      }).toArray()
      let trash = [ "" ]
      for (let x = 0; x < keys.length; x ++) {
        trash.push("next", "output");
      }
      return (
        <div className={myclass}>
          <div className='set-col'>
            <div onClick={toggle_result} className='close'>
              <div className='icon'/>
            </div>

            <div className='mode-bar'>
              {(cur_mode == 1) ? 'Mealy Machine' : 'Moore Machine'}
            </div>

            <table className='result-table mealy'>
              <tbody>
              <tr>
                <td></td>
                <td colSpan={keys.length * 2}><span>Input</span></td>
              </tr>
              <tr>
                <td>current</td>
                {keys.map((arr) => {
                   return <td colSpan={2} key={arr}>{arr}</td>
                 })
                }
              </tr>
              <tr>
                {trash.map((arr, id) => {
                   return <td className='small' key={id}>{arr}</td>
                 })
                }
              </tr>
              {
                result.map(([curstate, tran]) => {
                  let tmp = [curstate];
                  for (let x = 0 ; x < keys.length ; x ++) {
                    tmp.push(tran[keys[x]]['nxtstate']);
                    tmp.push(tran[keys[x]]['output']);
                  }
                  return (
                    <tr key={curstate}>
                    {tmp.map((arr, id) => {
                        return <td key={id}>{arr}</td>
                      })}
                    </tr>
                  );
                })
              }
              </tbody>
            </table>
          </div>
        </div>
      );
    } else {
      console.log(result)
      result = Map(result).entrySeq().sort((x, y) => {
        console.log(x, y);
        if (x[0] < y[0]) return -1;
        if (x[0] > y[0]) return 1;
        return 0;
      }).toList()
      //console.log(result)
      //console.log(result.first())
      let keys = Map(result.first()[1]).delete("output").keySeq();
      console.log(keys)
      keys = keys.sort((x, y) => {
        if (x < y) return -1;
        if (x > y) return 1;
        return 0;
      }).toArray()
      let trash = [ "" , "" ]
      for (let x = 0; x < keys.length; x ++) {
        trash.push("next");
      }
      console.log(keys)
      return (
        <div className={myclass}>
          <div className='set-col'>
            <div onClick={toggle_result} className='close'>
              <div className='icon'/>
            </div>

            <div className='mode-bar'>
              {(cur_mode == 1) ? 'Mealy Machine' : 'Moore Machine'}
            </div>

            <table className='result-table moore'>
              <tbody>
              <tr>
                <td></td>
                <td></td>
                <td colSpan={keys.length}><span>Input</span></td>
              </tr>
              <tr>
                <td>current</td>
                <td>output</td>
                {keys.map((arr) => {
                   return <td key={arr}>{arr}</td>
                 })
                }
              </tr>
              <tr>
                {trash.map((arr, id) => {
                   return <td className='small' key={id}>{arr}</td>
                 })
                }
              </tr>
              {
                result.map(([curstate, tran]) => {
                  let tmp = [curstate, tran["output"]];
                  for (let x = 0 ; x < keys.length ; x ++) {
                    tmp.push(tran[keys[x]]['nxtstate']);
                  }
                  return (
                    <tr key={curstate}>
                    {tmp.map((arr, id) => {
                        return <td key={id}>{arr}</td>
                      })}
                    </tr>
                  );
                })
              }
              </tbody>
            </table>
          </div>
        </div>
      );
    }
  }
}

export default Result;
