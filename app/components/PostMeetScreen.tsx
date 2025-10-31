import React, { useState } from 'react';
import { MessageCircle, Gift, Star, Gamepad2, Send, ArrowLeft } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

interface PostMeetScreenProps {
  onBack: () => void;
}

export function PostMeetScreen({ onBack }: PostMeetScreenProps) {
  const [message, setMessage] = useState('');
  const [rating, setRating] = useState(0);
  const [gameAnswer, setGameAnswer] = useState('');

  const messages = [
    { id: 1, text: 'Hey! Great to meet you at the coffee shop!', sent: false, time: '2:30 PM' },
    { id: 2, text: 'Yeah! What a fun way to connect 😊', sent: true, time: '2:31 PM' },
    { id: 3, text: 'Want to play the icebreaker game?', sent: false, time: '2:32 PM' },
  ];

  return (
    <div className="min-h-screen pb-24">
      {/* Header */}
      <div className="bg-gradient-to-r from-pink-500 to-purple-600 px-6 py-6 text-white">
        <div className="max-w-md mx-auto">
          <button onClick={onBack} className="flex items-center gap-2 text-white/90 hover:text-white mb-4">
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Map</span>
          </button>
          <div className="flex items-center gap-4">
            <Avatar className="w-16 h-16 border-4 border-white/30">
              <AvatarFallback className="bg-gradient-to-br from-purple-400 to-pink-400 text-white">
                AS
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h2 className="text-white mb-1">Alex Smith</h2>
              <p className="text-pink-100">Person who loves ancient books</p>
              <Badge className="mt-2 bg-white/20 text-white border-white/30">
                +50 XP Earned
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 py-6">
        <div className="max-w-md mx-auto">
          <Tabs defaultValue="chat" className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-purple-100">
              <TabsTrigger value="chat" className="data-[state=active]:bg-white">
                <MessageCircle className="w-4 h-4 mr-2" />
                Chat
              </TabsTrigger>
              <TabsTrigger value="game" className="data-[state=active]:bg-white">
                <Gamepad2 className="w-4 h-4 mr-2" />
                Game
              </TabsTrigger>
              <TabsTrigger value="rate" className="data-[state=active]:bg-white">
                <Star className="w-4 h-4 mr-2" />
                Rate
              </TabsTrigger>
            </TabsList>

            {/* Chat Tab */}
            <TabsContent value="chat" className="space-y-4 mt-6">
              <Card className="p-4 bg-white/80 backdrop-blur border-purple-100 max-h-96 overflow-y-auto">
                <div className="space-y-4">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex ${msg.sent ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[75%] rounded-lg px-4 py-2 ${
                          msg.sent
                            ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white'
                            : 'bg-gray-100 text-gray-900'
                        }`}
                      >
                        <p>{msg.text}</p>
                        <p
                          className={`mt-1 ${
                            msg.sent ? 'text-pink-100' : 'text-gray-500'
                          }`}
                        >
                          {msg.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              <div className="flex gap-2">
                <Input
                  placeholder="Type a message..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="flex-1 border-purple-200 focus:border-purple-500"
                />
                <Button className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700">
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </TabsContent>

            {/* Icebreaker Game Tab */}
            <TabsContent value="game" className="space-y-4 mt-6">
              <Card className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
                <div className="text-center space-y-4">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-pink-500 to-purple-600">
                    <Gamepad2 className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-gray-900 mb-2">Icebreaker Challenge</h3>
                    <p className="text-gray-600">
                      Guess each other's favorite book genre!
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-white/80 backdrop-blur border-purple-100">
                <h3 className="text-gray-900 mb-4">Your Answer</h3>
                <Textarea
                  placeholder="What's your guess?"
                  value={gameAnswer}
                  onChange={(e) => setGameAnswer(e.target.value)}
                  className="border-purple-200 focus:border-purple-500 mb-4"
                />
                <Button className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700">
                  Submit Answer
                </Button>
              </Card>
            </TabsContent>

            {/* Rating Tab */}
            <TabsContent value="rate" className="space-y-4 mt-6">
              <Card className="p-6 bg-white/80 backdrop-blur border-purple-100">
                <h3 className="text-gray-900 mb-4 text-center">Rate Your Experience</h3>
                <div className="flex justify-center gap-2 mb-6">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => setRating(star)}
                      className="transition-transform hover:scale-110"
                    >
                      <Star
                        className={`w-10 h-10 ${
                          star <= rating
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-gray-300'
                        }`}
                      />
                    </button>
                  ))}
                </div>
                <Button className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700">
                  Submit Rating
                </Button>
              </Card>

              <Card className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
                <div className="text-center space-y-4">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-green-500 to-emerald-600">
                    <Gift className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-gray-900 mb-2">Reward Unlocked!</h3>
                    <p className="text-gray-600 mb-4">
                      15% off at Local Coffee Shop
                    </p>
                    <Button className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700">
                      Claim Reward
                    </Button>
                  </div>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
