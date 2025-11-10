import React, { useState } from 'react';
import { Shield, Eye, EyeOff, AlertTriangle, Phone, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Switch } from './ui/switch';
import { Alert, AlertDescription } from './ui/alert';

interface SafetySettingsProps {
  onBack: () => void;
}

export function SafetySettings({ onBack }: SafetySettingsProps) {
  const [ghostMode, setGhostMode] = useState(false);
  const [sosTestComplete, setSosTestComplete] = useState(false);
  const [locationSharing, setLocationSharing] = useState(true);
  const [notifications, setNotifications] = useState(true);

  const handleSOSTest = () => {
    setSosTestComplete(true);
    setTimeout(() => setSosTestComplete(false), 3000);
  };

  return (
    <div className="min-h-screen pb-24">
      {/* Header */}
      <div className="bg-gradient-to-r from-pink-500 to-purple-600 px-6 py-6 text-white">
        <div className="max-w-md mx-auto">
          <button onClick={onBack} className="flex items-center gap-2 text-white/90 hover:text-white mb-4">
            <ArrowLeft className="w-5 h-5" />
            <span>Back</span>
          </button>
          <div className="text-center space-y-2">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/20 backdrop-blur">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-white">Safety & Privacy</h2>
            <p className="text-pink-100">Your safety is our priority</p>
          </div>
        </div>
      </div>

      <div className="px-6 py-6">
        <div className="max-w-md mx-auto space-y-6">
          {/* Ghost Mode */}
          <Card className="p-6 bg-white/80 backdrop-blur border-purple-100">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  {ghostMode ? (
                    <EyeOff className="w-5 h-5 text-purple-600" />
                  ) : (
                    <Eye className="w-5 h-5 text-purple-600" />
                  )}
                  <h3 className="text-gray-900">Ghost Mode</h3>
                </div>
                <p className="text-gray-600">
                  Make yourself invisible to other users. You won't appear in SpotMatch alerts.
                </p>
              </div>
              <Switch checked={ghostMode} onCheckedChange={setGhostMode} />
            </div>
            {ghostMode && (
              <Alert className="mt-4 border-purple-200 bg-purple-50">
                <AlertDescription className="text-purple-900">
                  You are now invisible to other users
                </AlertDescription>
              </Alert>
            )}
          </Card>

          {/* SOS Button */}
          <Card className="p-6 bg-white/80 backdrop-blur border-purple-100">
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="w-5 h-5 text-red-600" />
                <h3 className="text-gray-900">Emergency SOS</h3>
              </div>
              <p className="text-gray-600">
                In case of emergency, this button will alert your emergency contacts and local authorities.
              </p>
              <Button
                onClick={handleSOSTest}
                variant="outline"
                className="w-full border-red-300 text-red-600 hover:bg-red-50"
              >
                <Phone className="w-4 h-4 mr-2" />
                Test SOS Alert
              </Button>
              {sosTestComplete && (
                <Alert className="border-green-200 bg-green-50">
                  <CheckCircle2 className="w-4 h-4 text-green-600" />
                  <AlertDescription className="text-green-900">
                    SOS test successful! Your emergency contacts would be notified.
                  </AlertDescription>
                </Alert>
              )}
            </div>
          </Card>

          {/* Location Sharing */}
          <Card className="p-6 bg-white/80 backdrop-blur border-purple-100">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <h3 className="text-gray-900 mb-2">Location Sharing</h3>
                <p className="text-gray-600">
                  Allow the app to access your location for SpotMatch features
                </p>
              </div>
              <Switch checked={locationSharing} onCheckedChange={setLocationSharing} />
            </div>
          </Card>

          {/* Notifications */}
          <Card className="p-6 bg-white/80 backdrop-blur border-purple-100">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <h3 className="text-gray-900 mb-2">SpotMatch Notifications</h3>
                <p className="text-gray-600">
                  Receive alerts when potential matches are nearby
                </p>
              </div>
              <Switch checked={notifications} onCheckedChange={setNotifications} />
            </div>
          </Card>

          {/* Safety Tips */}
          <Card className="p-6 bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200">
            <h3 className="text-gray-900 mb-3">Safety Tips</h3>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-start gap-2">
                <span className="text-purple-600 mt-1">•</span>
                <span>Always meet in public places</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-600 mt-1">•</span>
                <span>Tell a friend where you're going</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-600 mt-1">•</span>
                <span>Trust your instincts</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-600 mt-1">•</span>
                <span>Use Ghost Mode if you feel uncomfortable</span>
              </li>
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
}
