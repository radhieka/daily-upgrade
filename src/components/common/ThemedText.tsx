import React from 'react';
import { Text, TextProps } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { Typography } from '../../theme/typography';

interface ThemedTextProps extends TextProps {
  variant?: keyof typeof Typography;
  color?: 'text' | 'textSecondary' | 'textTertiary' | 'primary' | 'success' | 'streakOrange';
}

export function ThemedText({
  variant = 'body',
  color = 'text',
  style,
  ...props
}: ThemedTextProps) {
  const { colors } = useTheme();
  return (
    <Text
      style={[Typography[variant], { color: colors[color] }, style]}
      {...props}
    />
  );
}
