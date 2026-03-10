import React from 'react';
import { View, ViewProps } from 'react-native';
import { useTheme } from '../../context/ThemeContext';

interface ThemedViewProps extends ViewProps {
  variant?: 'background' | 'surface' | 'surfaceSecondary';
}

export function ThemedView({ variant = 'background', style, ...props }: ThemedViewProps) {
  const { colors } = useTheme();
  return (
    <View
      style={[{ backgroundColor: colors[variant] }, style]}
      {...props}
    />
  );
}
