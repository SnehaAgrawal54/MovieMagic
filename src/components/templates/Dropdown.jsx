import React from 'react';

const Dropdown = ({ title, options, fnx }) => {
  return (
    <div className='select'>
      <select name="format" id="format" defaultValue="0" onChange={fnx}>
        <option value="0" disabled>
          {title}
        </option>
        {options.map((item, idx) => (
          <option key={idx} value={item}>
            {item.toUpperCase()}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
