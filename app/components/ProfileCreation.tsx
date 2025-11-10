import React, { useState } from 'react';
import { Book, Dumbbell, Coffee, Music, Camera, Plane, Plus, X } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';

interface ProfileCreationProps {
  onComplete: (data: { preferences: string[]; teaserText: string; videoUrl: string }) => void;
}

const interestOptions = [
  { icon: Book, label: 'Books', value: 'books' },
  { icon: Dumbbell, label: 'Gym', value: 'gym' },
  { icon: Coffee, label: 'Coffee', value: 'coffee' },
  { icon: Music, label: 'Music', value: 'music' },
  { icon: Camera, label: 'Photography', value: 'photography' },
  { icon: Plane, label: 'Travel', value: 'travel' },
];

export function ProfileCreation({ onComplete }: ProfileCreationProps) {
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [teaserText, setTeaserText] = useState('');
  const [hasVideo, setHasVideo] = useState(false);

  const toggleInterest = (value: string) => {
    if (selectedInterests.includes(value)) {
      setSelectedInterests(selectedInterests.filter((i) => i !== value));
    } else {
      setSelectedInterests([...selectedInterests, value]);
    }
  };

  const handleComplete = () => {
    if (selectedInterests.length > 0 && teaserText.trim()) {
      onComplete({
        preferences: selectedInterests,
        teaserText: teaserText.trim(),
        videoUrl: hasVideo ? 'mock-video-url' : '',
      });
    }
  };

  return (
    <div className="min-h-screen px-6 py-12 pb-24">
      <div className="max-w-md mx-auto space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-gray-900">Create Your Profile</h2>
          <p className="text-gray-600">Help us match you with the right people</p>
        </div>

        <div className="space-y-6">
          {/* Interests Selection */}
          <Card className="p-6 bg-white/80 backdrop-blur border-purple-100">
            <h3 className="text-gray-900 mb-4">Select Your Interests</h3>
            <div className="grid grid-cols-2 gap-3">
              {interestOptions.map((interest) => (
                <button
                  key={interest.value}
                  onClick={() => toggleInterest(interest.value)}
                  className={`flex items-center gap-3 p-4 rounded-lg border-2 transition-all ${
                    selectedInterests.includes(interest.value)
                      ? 'border-purple-500 bg-purple-50'
                      : 'border-gray-200 bg-white hover:border-purple-300'
                  }`}
                >
                  <interest.icon
                    className={`w-5 h-5 ${
                      selectedInterests.includes(interest.value) ? 'text-purple-600' : 'text-gray-400'
                    }`}
                  />
                  <span className="text-gray-900">{interest.label}</span>
                </button>
              ))}
            </div>
          </Card>

          {/* Indirect Teaser */}
          <Card className="p-6 bg-white/80 backdrop-blur border-purple-100">
            <h3 className="text-gray-900 mb-2">Your Indirect Teaser</h3>
            <p className="text-gray-600 mb-4">
              This is how others will spot you (e.g., "Person who loves ancient books")
            </p>
            <Textarea
              placeholder="Describe yourself indirectly..."
              value={teaserText}
              onChange={(e) => setTeaserText(e.target.value)}
              className="border-purple-200 focus:border-purple-500 min-h-[100px]"
              maxLength={100}
            />
            <p className="text-gray-500 mt-2">{teaserText.length}/100</p>
          </Card>

          {/* Video Verification */}
          <Card className="p-6 bg-white/80 backdrop-blur border-purple-100">
            <h3 className="text-gray-900 mb-2">Verification Video</h3>
            <p className="text-gray-600 mb-4">Optional: Add a short video to verify your identity</p>
            <Button
              onClick={() => setHasVideo(!hasVideo)}
              variant={hasVideo ? 'default' : 'outline'}
              className={hasVideo ? 'bg-gradient-to-r from-pink-500 to-purple-600 w-full' : 'w-full'}
            >
              {hasVideo ? (
                <>
                  <X className="w-4 h-4 mr-2" />
                  Remove Video
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4 mr-2" />
                  Upload Video
                </>
              )}
            </Button>
          </Card>

          {/* Selected Interests Preview */}
          {selectedInterests.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {selectedInterests.map((interest) => (
                <Badge key={interest} className="bg-purple-100 text-purple-700">
                  {interestOptions.find((i) => i.value === interest)?.label}
                </Badge>
              ))}
            </div>
          )}
        </div>

        <Button
          onClick={handleComplete}
          disabled={selectedInterests.length === 0 || !teaserText.trim()}
          className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700"
          size="lg"
        >
          Complete Profile
        </Button>
      </div>
    </div>
  );
}
