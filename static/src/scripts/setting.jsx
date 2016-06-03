import React from 'react';

class Setting extends React.Component {
  render() {
    const { active, toggle_overlay , set_mode , cur_mode } = this.props;
    let wrapped_set_mode = (x) => {
      set_mode(x);
    };
    var myclass;
    if (active == true) myclass = 'overlay active';
    else myclass = 'overlay';

    return (
      <div className={myclass}>
        <div className='set-col'>
          <ul className='list-menu'>
            <li className='list-item'>
              <div onClick={toggle_overlay} className='close'>
                <div className='icon'/>
              </div>
            </li>
            <li className='list-item'>
              <div className='flex-div'>
                <div onClick={wrapped_set_mode.bind(this, 1)} className={(cur_mode == 1) ? 'checkbox on' : 'checkbox'}>
                  <div className='icon'/>
                </div>
                <span className='list-item-text'>Mealy Machine</span>
              </div>
            </li>
            <li className='list-item'>
              <div className='flex-div'>
                <div onClick={wrapped_set_mode.bind(this, 2)} className={(cur_mode == 2) ? 'checkbox on' : 'checkbox'}>
                  <div className='icon'/>
                </div>
                <span className='list-item-text'>Moore Machine</span>
              </div>
            </li>
            <li className='list-item'>
              <span className='list-item-text'><span style={{fontSize: '10px'}}>By</span> Paul Wang <span style={{fontSize: '10px'}}>and</span> Momo Huang</span>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default Setting;
