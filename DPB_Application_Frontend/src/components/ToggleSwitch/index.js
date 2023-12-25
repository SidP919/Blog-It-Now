import React from 'react';
import {Switch, StyleSheet, Platform, View} from 'react-native';
import useCommonParams from '../../hooks/useCommonParams';

const ToggleSwitch = ({currentVal = false, onToggleSwitch}) => {
  const {theme, Colors} = useCommonParams();
  const styles = style(theme, Colors);

  return (
    <View style={styles.switchView}>
      <Switch
        value={currentVal}
        onValueChange={onToggleSwitch}
        trackColor={{
          false: Colors.trackColor[theme],
          true: Colors.trackColor[theme],
        }}
        thumbColor={
          currentVal ? Colors.thumbColor[theme] : Colors.thumbColor[theme]
        }
        {...Platform.select({
          web: {
            activeThumbColor: currentVal
              ? Colors.thumbColor[theme]
              : Colors.thumbColor[theme],
          },
        })}
      />
    </View>
  );
};

const style = (theme, Colors) =>
  StyleSheet.create({
    switchView: {
      alignSelf: 'center',
      paddingHorizontal: 12,
      paddingVertical: 16,
    },
  });

export default ToggleSwitch;
