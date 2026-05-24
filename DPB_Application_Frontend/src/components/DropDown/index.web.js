import React, {useEffect, useState} from 'react';
import Select from 'react-select';
import {logger} from '../../utils/utils';
import {FONT_INTER_BOLD} from '../../utils/fontUtils';

const DropDown = ({
  data = null,
  dataContent = null,
  placeholder = 'Select',
  onSelectOption,
  Colors,
  theme = 'DARK',
  textSize = 20,
}) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const [options, setOptions] = useState([{value: 'Select', label: 'Select'}]);

  useEffect(() => {
    if (data) {
      setOptions(data?.map(option => ({value: option, label: option})));
    }
  }, [data]);

  useEffect(() => {
    if (dataContent) {
      setSelectedOption({
        value: dataContent,
        label: dataContent,
      });
    } else {
      setSelectedOption(null);
    }
  }, [dataContent]);

  const customSelectStyles = {
    control: provided => ({
      ...provided,
      backgroundColor: Colors?.bgColor[theme],
      paddingEnd: 4,
      paddingVertical: 4,
      border: '1px solid #cccccc00',
      borderRadius: 16,
      boxShadow: 'none',
      minHeight: '48px',
      height: '48px',
      fontSize: textSize,
      fontWeight: '500',
      fontFamily: FONT_INTER_BOLD,
      '&:hover': {
        borderColor: '#99999900',
      },
    }),
    menu: provided => ({
      ...provided,
      zIndex: 12,
      position: 'absolute',
    }),
    menuList: provided => ({
      ...provided,
      zIndex: 12,
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected
        ? Colors?.bgColor[theme]
        : state.isFocused
        ? Colors?.text[theme]
        : Colors?.text[theme],
      color: state.isSelected ? Colors?.text[theme] : Colors?.bgColor[theme],
      zIndex: 12,
    }),
    singleValue: provided => ({
      ...provided,
      color: Colors?.inputText[theme],
      backgroundColor: Colors?.bgColor[theme],
      fontSize: textSize,
      fontWeight: '500',
      fontFamily: FONT_INTER_BOLD,
    }),
    placeholder: provided => ({
      ...provided,
      color: Colors?.inputText[theme],
      fontSize: textSize,
      fontWeight: '500',
      fontFamily: FONT_INTER_BOLD,
    }),
  };

  const dropDownStyle = {
    width: '100%',
    color: Colors?.inputText[theme],
    zIndex: 4,
    position: 'relative',
    paddingLeft: 4,
  };

  return (
    <div style={dropDownStyle}>
      <Select
        options={options}
        value={selectedOption}
        onChange={option => onSelectOption(option.value)}
        styles={customSelectStyles}
        placeholder={placeholder}
        menuPortalTarget={document.body}
        menuPosition="absolute"
      />
    </div>
  );
};

export default DropDown;
