import React from 'react';
import { Map, Trophy, Settings, ListTodo } from 'lucide-react';
import { Screen } from '../App';

interface NavigationProps {
  currentScreen: Screen;
  onNavigate: (screen: Screen) => void;
}

export function Navigation({ currentScreen, onNavigate }: NavigationProps) {
  const navItems = [
    { id: 'todo' as Screen, icon: ListTodo, label: 'Plan' },
    { id: 'map' as Screen, icon: Map, label: 'Quest' },
    { id: 'leaderboard' as Screen, icon: Trophy, label: 'Ranks' },
    { id: 'settings' as Screen, icon: Settings, label: 'Safety' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-purple-100 shadow-lg z-50">
      <div className="max-w-md mx-auto px-6 py-3">
        <div className="flex items-center justify-around">
          {navItems.map((item) => {
            const isActive = currentScreen === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-all ${
                  isActive
                    ? 'text-purple-600'
                    : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                <item.icon
                  className={`w-6 h-6 ${
                    isActive ? 'fill-purple-100' : ''
                  }`}
                />
                <span className={isActive ? '' : ''}>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
