import React from 'react';
import { Trophy, Medal, TrendingUp, Crown } from 'lucide-react';
import { Card } from './ui/card';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Badge } from './ui/badge';

interface LeaderboardScreenProps {
  currentUserXP: number;
}

export function LeaderboardScreen({ currentUserXP }: LeaderboardScreenProps) {
  const leaderboardData = [
    { rank: 1, name: 'Emma Wilson', xp: 2450, avatar: 'EW', streak: 12 },
    { rank: 2, name: 'James Chen', xp: 2180, avatar: 'JC', streak: 8 },
    { rank: 3, name: 'Sarah Johnson', xp: 1920, avatar: 'SJ', streak: 10 },
    { rank: 4, name: 'Michael Brown', xp: 1650, avatar: 'MB', streak: 6 },
    { rank: 5, name: 'You', xp: currentUserXP, avatar: 'ME', streak: 5, isCurrentUser: true },
    { rank: 6, name: 'Lisa Anderson', xp: 1320, avatar: 'LA', streak: 4 },
    { rank: 7, name: 'David Lee', xp: 1100, avatar: 'DL', streak: 3 },
  ];

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="w-6 h-6 text-yellow-500" />;
      case 2:
        return <Medal className="w-6 h-6 text-gray-400" />;
      case 3:
        return <Medal className="w-6 h-6 text-orange-600" />;
      default:
        return <span className="text-gray-600">#{rank}</span>;
    }
  };

  return (
    <div className="min-h-screen pb-24">
      {/* Header */}
      <div className="bg-gradient-to-r from-pink-500 to-purple-600 px-6 py-8 text-white">
        <div className="max-w-md mx-auto text-center space-y-4">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/20 backdrop-blur">
            <Trophy className="w-10 h-10 text-white" />
          </div>
          <div>
            <h2 className="text-white mb-2">Leaderboard</h2>
            <p className="text-pink-100">Top quest seekers this week</p>
          </div>
        </div>
      </div>

      <div className="px-6 py-6">
        <div className="max-w-md mx-auto space-y-4">
          {/* Top 3 Podium */}
          <Card className="p-6 bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200">
            <div className="flex items-end justify-center gap-4">
              {/* 2nd Place */}
              <div className="flex flex-col items-center flex-1">
                <Badge className="bg-gray-400 mb-2">2nd</Badge>
                <Avatar className="w-16 h-16 border-4 border-gray-300">
                  <AvatarFallback className="bg-gradient-to-br from-gray-400 to-gray-500 text-white">
                    {leaderboardData[1].avatar}
                  </AvatarFallback>
                </Avatar>
                <p className="text-gray-900 mt-2">{leaderboardData[1].name}</p>
                <p className="text-gray-600">{leaderboardData[1].xp} XP</p>
              </div>

              {/* 1st Place */}
              <div className="flex flex-col items-center flex-1 -mt-4">
                <Badge className="bg-yellow-500 mb-2">1st</Badge>
                <Avatar className="w-20 h-20 border-4 border-yellow-400">
                  <AvatarFallback className="bg-gradient-to-br from-yellow-400 to-orange-500 text-white">
                    {leaderboardData[0].avatar}
                  </AvatarFallback>
                </Avatar>
                <p className="text-gray-900 mt-2">{leaderboardData[0].name}</p>
                <p className="text-gray-600">{leaderboardData[0].xp} XP</p>
              </div>

              {/* 3rd Place */}
              <div className="flex flex-col items-center flex-1">
                <Badge className="bg-orange-600 mb-2">3rd</Badge>
                <Avatar className="w-16 h-16 border-4 border-orange-400">
                  <AvatarFallback className="bg-gradient-to-br from-orange-500 to-red-500 text-white">
                    {leaderboardData[2].avatar}
                  </AvatarFallback>
                </Avatar>
                <p className="text-gray-900 mt-2">{leaderboardData[2].name}</p>
                <p className="text-gray-600">{leaderboardData[2].xp} XP</p>
              </div>
            </div>
          </Card>

          {/* Full Leaderboard List */}
          <div className="space-y-2">
            {leaderboardData.map((user) => (
              <Card
                key={user.rank}
                className={`p-4 ${
                  user.isCurrentUser
                    ? 'bg-gradient-to-r from-purple-50 to-pink-50 border-purple-300 border-2'
                    : 'bg-white/80 backdrop-blur border-purple-100'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 text-center flex items-center justify-center">
                    {getRankIcon(user.rank)}
                  </div>

                  <Avatar className="w-12 h-12">
                    <AvatarFallback
                      className={
                        user.isCurrentUser
                          ? 'bg-gradient-to-br from-pink-500 to-purple-600 text-white'
                          : 'bg-gradient-to-br from-purple-400 to-pink-400 text-white'
                      }
                    >
                      {user.avatar}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="text-gray-900">{user.name}</p>
                      {user.isCurrentUser && (
                        <Badge className="bg-purple-600">You</Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-3 mt-1">
                      <p className="text-gray-600">{user.xp} XP</p>
                      <div className="flex items-center gap-1 text-orange-500">
                        <TrendingUp className="w-3 h-3" />
                        <span className="text-gray-600">{user.streak} day streak</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
