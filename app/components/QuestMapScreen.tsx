import React, { useState, useEffect } from 'react';
import { MapPin, Trophy, Compass, Zap } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { SpotMatchModal } from './SpotMatchModal';

interface QuestMapScreenProps {
  userData: {
    dailyTasks: Array<{ task: string; time: string }>;
    xp: number;
  };
}

export function QuestMapScreen({ userData }: QuestMapScreenProps) {
  const [showSpotMatch, setShowSpotMatch] = useState(false);
  const [questProgress, setQuestProgress] = useState(33);

  // Simulate spot match trigger after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSpotMatch(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const treasureLocations = [
    { id: 1, x: 35, y: 25, task: 'Gym', completed: true },
    { id: 2, x: 55, y: 45, task: 'Coffee', active: true },
    { id: 3, x: 70, y: 65, task: 'Lunch', completed: false },
  ];

  return (
    <div className="min-h-screen pb-24">
      {/* Header Stats */}
      <div className="bg-gradient-to-r from-pink-500 to-purple-600 px-6 py-6 text-white">
        <div className="max-w-md mx-auto space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-white mb-1">Today's Quest</h2>
              <p className="text-pink-100">2 of 3 locations discovered</p>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-2">
                <Trophy className="w-5 h-5" />
                <span>{userData.xp} XP</span>
              </div>
            </div>
          </div>
          <Progress value={questProgress} className="bg-pink-400/30" />
        </div>
      </div>

      {/* Map View */}
      <div className="px-6 py-6">
        <div className="max-w-md mx-auto">
          <Card className="overflow-hidden border-purple-200">
            <div className="relative bg-gradient-to-br from-blue-100 to-purple-100 h-96">
              {/* Mock Map Background */}
              <div className="absolute inset-0 opacity-20">
                <svg width="100%" height="100%">
                  <pattern
                    id="grid"
                    width="40"
                    height="40"
                    patternUnits="userSpaceOnUse"
                  >
                    <path
                      d="M 40 0 L 0 0 0 40"
                      fill="none"
                      stroke="gray"
                      strokeWidth="1"
                    />
                  </pattern>
                  <rect width="100%" height="100%" fill="url(#grid)" />
                </svg>
              </div>

              {/* Route Line */}
              <svg className="absolute inset-0 w-full h-full">
                <path
                  d={`M ${treasureLocations[0].x}% ${treasureLocations[0].y}% L ${treasureLocations[1].x}% ${treasureLocations[1].y}% L ${treasureLocations[2].x}% ${treasureLocations[2].y}%`}
                  stroke="#9333ea"
                  strokeWidth="3"
                  strokeDasharray="8,4"
                  fill="none"
                />
              </svg>

              {/* Treasure Markers */}
              {treasureLocations.map((location) => (
                <div
                  key={location.id}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2"
                  style={{ left: `${location.x}%`, top: `${location.y}%` }}
                >
                  <div
                    className={`relative ${
                      location.active ? 'animate-pulse' : ''
                    }`}
                  >
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center ${
                        location.completed
                          ? 'bg-green-500'
                          : location.active
                          ? 'bg-gradient-to-br from-pink-500 to-purple-600'
                          : 'bg-gray-400'
                      } shadow-lg`}
                    >
                      {location.completed ? (
                        <Trophy className="w-6 h-6 text-white" />
                      ) : (
                        <MapPin className="w-6 h-6 text-white" />
                      )}
                    </div>
                    {location.active && (
                      <div className="absolute -inset-2 rounded-full border-4 border-purple-400 animate-ping opacity-75" />
                    )}
                  </div>
                  <div className="mt-2 text-center">
                    <Badge
                      className={
                        location.completed
                          ? 'bg-green-500'
                          : location.active
                          ? 'bg-purple-600'
                          : 'bg-gray-400'
                      }
                    >
                      {location.task}
                    </Badge>
                  </div>
                </div>
              ))}

              {/* Current Location Indicator */}
              <div
                className="absolute transform -translate-x-1/2 -translate-y-1/2"
                style={{ left: '55%', top: '42%' }}
              >
                <div className="w-4 h-4 rounded-full bg-blue-500 border-4 border-white shadow-lg" />
              </div>
            </div>
          </Card>

          {/* Quest Details */}
          <div className="mt-6 space-y-4">
            <Card className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                  <Compass className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-gray-900 mb-1">Current Quest</h3>
                  <p className="text-gray-600">
                    Head to the coffee shop and spot the treasure near the counter
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-4 bg-white/80 backdrop-blur border-purple-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-yellow-500" />
                  <span className="text-gray-900">Active Seekers Nearby</span>
                </div>
                <Badge className="bg-gradient-to-r from-pink-500 to-purple-600">3 online</Badge>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* SpotMatch Modal */}
      {showSpotMatch && (
        <SpotMatchModal
          onClose={() => setShowSpotMatch(false)}
          onSpotted={() => {
            setShowSpotMatch(false);
            // This would navigate to PostMeet screen in real app
          }}
        />
      )}
    </div>
  );
}
