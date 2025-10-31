import React, { useState } from 'react';
import { Heart, Map, Trophy, Users } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';

interface OnboardingScreenProps {
  onComplete: (name: string) => void;
}

export function OnboardingScreen({ onComplete }: OnboardingScreenProps) {
  const [step, setStep] = useState(0);
  const [name, setName] = useState('');

  const features = [
    {
      icon: Map,
      title: 'Quest-Based Adventures',
      description: 'Transform your daily routine into exciting treasure hunts',
    },
    {
      icon: Users,
      title: 'Real-World Connections',
      description: 'Meet people spontaneously in person, no endless swiping',
    },
    {
      icon: Trophy,
      title: 'Earn Rewards',
      description: 'Gain XP, climb leaderboards, and unlock exclusive perks',
    },
  ];

  if (step === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12">
        <div className="max-w-md w-full space-y-8 text-center">
          <div className="space-y-4">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-pink-500 to-purple-600">
              <Heart className="w-10 h-10 text-white fill-white" />
            </div>
            <h1 className="text-pink-600">CUPID</h1>
            <p className="text-gray-600">
              Skip the swipes. Start the adventure.
            </p>
          </div>

          <div className="space-y-6 pt-8">
            {features.map((feature, index) => (
              <Card key={index} className="p-6 text-left bg-white/80 backdrop-blur border-purple-100">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-pink-400 to-purple-500 flex items-center justify-center">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-gray-900 mb-1">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <Button
            onClick={() => setStep(1)}
            className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700"
            size="lg"
          >
            Get Started
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-gray-900">What's your name?</h2>
          <p className="text-gray-600">Let's get to know you</p>
        </div>

        <div className="space-y-4">
          <Input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="text-center border-purple-200 focus:border-purple-500"
          />

          <Button
            onClick={() => name.trim() && onComplete(name)}
            disabled={!name.trim()}
            className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700"
            size="lg"
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
}
