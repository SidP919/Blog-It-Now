import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {logger} from '../../utils/utils';
import { FONT_INTER_BOLD } from '../../utils/fontUtils';

const DropDown = ({
  data = null,
  dataContent = null,
  placeholder = 'Select',
  onSelectOption,
  Colors,
  theme='DARK',
  textSize=20
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
      setSelectedOption(dataContent);
    }
  }, [dataContent]);

  const customSelectStyles = {
    control: provided => ({
      ...provided,
      border: '1px solid #ccc',
      borderRadius: '12px',
      boxShadow: 'none',
      minHeight: '48px',
      height: '48px',
      fontSize: textSize,
      fontWeight: '500',
      fontFamily: FONT_INTER_BOLD,
      '&:hover': {
        borderColor: '#999',
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
        : Colors?.text[theme],
      color: state.isSelected ? Colors?.text[theme] : Colors?.bgColor[theme],
      zIndex: 12,
    }),
  };

  const dropDownStyle = {
    width: '97%',
    color: Colors?.inputText[theme],
    zIndex: 4,
    position: 'relative',
  };
  return (
    <View style={styles.container}>
      <Picker
        selectedValue={selectedOption}
        onValueChange={selectedValue => {
          logger('Selected value:', selectedValue);
          setSelectedOption(selectedValue);
          !selectedValue || selectedValue !== placeholder
            ? onSelectOption(selectedValue)
            : onSelectOption('');
        }}
        style={dropDownStyle}
        itemStyle={customSelectStyles.option}>
        {(selectedOption === placeholder || selectedOption === null) && (
          <Picker.Item
            label={placeholder}
            value={placeholder}
            style={[
              styles.fadedText,
              customSelectStyles.option({}, {isSelected: true}),
            ]}
          />
        )}
        {options?.length > 0
          ? options.map(option => (
              <Picker.Item
                key={option.value}
                label={option.label}
                value={option.value}
                style={customSelectStyles.option(
                  {},
                  {isSelected: selectedOption === option.value},
                )}
              />
            ))
          : null}
      </Picker>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    marginBottom: 10,
    fontSize: 16,
    color: 'white',
  },
  picker: {
    height: 50,
    width: 200,
  },
  fadedText: {
    color: 'white',
  },
  selectedText: {
    marginTop: 20,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default DropDown;
