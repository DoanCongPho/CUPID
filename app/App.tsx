"use client";

import React, { useState } from 'react';
import { LoginScreen } from './components/LoginScreen';
import { RegisterScreen } from './components/RegisterScreen';
import { OnboardingScreen } from './components/OnboardingScreen';
import { ProfileCreation } from './components/ProfileCreation';
import { DailyTodoScreen } from './components/DailyTodoScreen';
import { QuestMapScreen } from './components/QuestMapScreen';
import { PostMeetScreen } from './components/PostMeetScreen';
import { LeaderboardScreen } from './components/LeaderboardScreen';
import { SafetySettings } from './components/SafetySettings';
import { Navigation } from './components/Navigation';

export type Screen = 'login' | 'register' | 'onboarding' | 'profile' | 'todo' | 'map' | 'postmeet' | 'leaderboard' | 'settings';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('login');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    preferences: [] as string[],
    teaserText: '',
    videoUrl: '',
    dailyTasks: [] as Array<{ task: string ; time: string }>,
    xp: 450,
  });

  const handleLogin = (email: string, password: string) => {
    // TODO: Implement actual authentication with Supabase
    console.log('Login:', { email, password });
    setUserData({ ...userData, email });
    setIsAuthenticated(true);
    setCurrentScreen('onboarding');
  };

  const handleRegister = (data: { name: string; email: string; password: string; dateOfBirth: string }) => {
    // TODO: Implement actual registration with Supabase
    console.log('Register:', data);
    setUserData({ ...userData, name: data.name, email: data.email });
    setIsAuthenticated(true);
    setCurrentScreen('onboarding');
  };

  const handleOnboardingComplete = (name: string) => {
    setUserData({ ...userData, name });
    setCurrentScreen('profile');
  };

  const handleProfileComplete = (data: { preferences: string[]; teaserText: string; videoUrl: string }) => {
    setUserData({ ...userData, ...data });
    setCurrentScreen('todo');
  };

  const handleTodoComplete = (tasks: Array<{ task: string; time: string }>) => {
    setUserData({ ...userData, dailyTasks: tasks });
    setCurrentScreen('map');
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'login':
        return (
          <LoginScreen
            onLogin={handleLogin}
            onNavigateToRegister={() => setCurrentScreen('register')}
          />
        );
      case 'register':
        return (
          <RegisterScreen
            onRegister={handleRegister}
            onNavigateToLogin={() => setCurrentScreen('login')}
          />
        );
      case 'onboarding':
        return <OnboardingScreen onComplete={handleOnboardingComplete} />;
      case 'profile':
        return <ProfileCreation onComplete={handleProfileComplete} />;
      case 'todo':
        return <DailyTodoScreen onComplete={handleTodoComplete} />;
      case 'map':
        return <QuestMapScreen userData={userData} />;
      case 'postmeet':
        return <PostMeetScreen onBack={() => setCurrentScreen('map')} />;
      case 'leaderboard':
        return <LeaderboardScreen currentUserXP={userData.xp} />;
      case 'settings':
        return <SafetySettings onBack={() => setCurrentScreen('map')} />;
      default:
        return (
          <LoginScreen
            onLogin={handleLogin}
            onNavigateToRegister={() => setCurrentScreen('register')}
          />
        );
    }
  };

  const showNavigation = isAuthenticated && !['login', 'register', 'onboarding', 'profile'].includes(currentScreen);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
      {renderScreen()}
      {showNavigation && <Navigation currentScreen={currentScreen} onNavigate={setCurrentScreen} />}
    </div>
  );
}
