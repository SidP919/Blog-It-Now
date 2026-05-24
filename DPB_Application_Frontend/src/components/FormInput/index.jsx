import {StyleSheet, Text, TextInput, View} from 'react-native';
import React from 'react';
import {formCardStyle} from '../../utils/commonStyles';
import useCommonParams from '../../hooks/useCommonParams';
import DropDown from '../DropDown';
import {isMobileNative, isWeb} from '../../utils/utils';

const FormInput = ({
  mainTitle = '',
  formContent = null,
  data = null,
  setData,
  setFormContent,
}) => {
  const {
    screenHeight,
    screenWidth,
    theme,
    isLandscapeMode,
    Colors,
    bigSize,
    mdSize,
    smSize,
    mdText,
    smText,
  } = useCommonParams();
  const formCardStyles = formCardStyle(
    theme,
    isLandscapeMode,
    screenWidth,
    screenHeight,
    Colors,
    bigSize,
    mdSize,
    smSize,
    mdText,
    smText,
  );
  const customStyles = style(
    theme,
    isLandscapeMode,
    screenWidth,
    screenHeight,
    Colors,
    bigSize,
    mdSize,
    smSize,
    mdText,
    smText,
  );
  const handleChangeContent = (label, content) => {
    setData({...data, [label]: content});
    setFormContent(
      formContent?.map(field => {
        if (field.dataLabel === label) {
          field.dataContent = content;
        }
        return field;
      }),
    );
  };

  return (
    <View style={[formCardStyles.cardContainer, customStyles.cardContainer]}>
      <Text style={[formCardStyles.mainTitle]}>{mainTitle}</Text>
      {formContent?.map(item => (
        <View key={`formInput_${item?.dataLabel}`}>
          <Text style={[formCardStyles.dataTitle]}>{item?.dataTitle}</Text>
          <View style={[formCardStyles.inputContainer]}>
            {item?.dataType === 'text' && (
              <TextInput
                inputMode={item?.dataType}
                style={[formCardStyles.inputView, customStyles.inputView]}
                placeholder={item?.dataContentPH}
                placeholderTextColor={Colors.inputText[theme]}
                value={item?.dataContent}
                readOnly={item?.disabled}
              />
            )}
            {item?.dataType === 'textInput' && (
              <TextInput
                multiline
                inputMode={'text'}
                style={[formCardStyles.inputView, customStyles.inputView]}
                placeholder={item?.dataContentPH}
                placeholderTextColor={Colors.inputText[theme]}
                value={item?.dataContent}
                onChangeText={content =>
                  handleChangeContent(item?.dataLabel, content)
                }
                readOnly={item?.disabled}
              />
            )}
            {item?.dataType === 'dropdown' && (
              <DropDown
                data={item?.dropdownOptions}
                placeholder={item?.dataContentPH}
                dataContent={item?.dataContent}
                onSelectOption={content =>
                  handleChangeContent(item?.dataLabel, content)
                }
                Colors={Colors}
                theme={theme}
                textSize={smText}
              />
            )}
            {item?.dataType === 'textarea' && (
              <TextInput
                multiline
                rows={500}
                inputMode="text"
                style={[
                  formCardStyles.inputView,
                  customStyles.inputView,
                  customStyles.textAreaView,
                ]}
                placeholder={
                  !isWeb && isMobileNative && !isLandscapeMode
                    ? item?.dataContentPH.slice(0, 1280).trim()
                    : item?.dataContentPH
                }
                placeholderTextColor={Colors.inputText[theme]}
                value={item?.dataContent}
                onChangeText={content =>
                  handleChangeContent(item?.dataLabel, content)
                }
                readOnly={item?.disabled}
              />
            )}
          </View>
        </View>
      ))}
    </View>
  );
};

export default FormInput;

const style = (
  theme,
  isLandscapeMode,
  screenWidth,
  screenHeight,
  Colors,
  bigSize,
  mdSize,
  smSize,
  mdText,
  smText,
) => {
  // Determine device type and calculate width of the form card on parent screen
  let containerWidth;

  if (screenWidth >= 1024) {
    // Large devices (laptops): 80% width
    containerWidth = screenWidth * 0.8;
  } else if (screenWidth >= 768 && isLandscapeMode) {
    // Medium devices (tablets) in landscape: 85% width
    containerWidth = screenWidth * 0.85;
  } else {
    // Small devices (smartphones): 90% width
    containerWidth = screenWidth * 0.9;
  }

  return StyleSheet.create({
    cardContainer: {
      width: containerWidth,
      backgroundColor: Colors.cardBg[theme],
      borderRadius: 32,
      borderWidth: 2,
      borderColor: Colors.border[theme],
      paddingHorizontal: 16,
      paddingVertical: 8,
      maxWidth: containerWidth,
    },
    inputView: {
      height: bigSize * 2.4,
      flex: 1,
      borderWidth: 0,
      minWidth: 0,
      borderColor: 'transparent',
      color: Colors.inputText[theme],
      fontSize: smText,
      fontWeight: '500',
      borderRadius: 12,
      zIndex: 2,
      paddingStart: 16,
      paddingVertical: 8,
    },
    textAreaView: {
      height: bigSize * 40,
      verticalAlign: 'top',
      paddingVertical: 8,
      paddingHorizontal: 8,
    },
  });
};
