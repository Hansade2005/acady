'use client';

import React from 'react';
import { themes, themeNames, type ThemeName } from '@/lib/themes';

interface ThemeSelectorProps {
  selectedTheme: ThemeName;
  onThemeChange: (theme: ThemeName) => void;
  className?: string;
}

export default function ThemeSelector({ selectedTheme, onThemeChange, className = '' }: ThemeSelectorProps) {
  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {themeNames.map((themeName) => {
        const theme = themes[themeName];
        const isSelected = selectedTheme === themeName;

        return (
          <button
            key={themeName}
            onClick={() => onThemeChange(themeName)}
            className={`
              relative px-4 py-2 rounded-lg border-2 transition-all duration-200
              hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2
              ${isSelected
                ? 'border-blue-500 shadow-lg'
                : 'border-gray-200 hover:border-gray-300'
              }
            `}
            style={{
              backgroundColor: isSelected ? theme.colors.primary : theme.colors.surface,
              color: isSelected ? '#ffffff' : theme.colors.text,
              borderColor: isSelected ? theme.colors.primary : theme.colors.border,
            }}
            title={theme.description}
          >
            <div className="flex items-center space-x-2">
              {/* Theme preview swatches */}
              <div className="flex space-x-1">
                <div
                  className="w-3 h-3 rounded-full border border-gray-300"
                  style={{ backgroundColor: theme.colors.primary }}
                ></div>
                <div
                  className="w-3 h-3 rounded-full border border-gray-300"
                  style={{ backgroundColor: theme.colors.accent }}
                ></div>
                <div
                  className="w-3 h-3 rounded-full border border-gray-300"
                  style={{ backgroundColor: theme.colors.surface }}
                ></div>
              </div>
              <span className="font-medium text-sm">{theme.label}</span>
            </div>

            {/* Selection indicator */}
            {isSelected && (
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            )}
          </button>
        );
      })}
    </div>
  );
}