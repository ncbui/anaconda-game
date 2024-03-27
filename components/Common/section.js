import React, { useRef } from 'react';
import {
  Text,
  useColorScheme,
  View, 
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';
import { styles } from '../../systems/Styles';

export default function Section({children, title}: SectionProps): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: !isDarkMode ? Colors.white : '#4c243b',
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
}