import React, { useState, useEffect } from 'react';
import { Eye, Clock, Sparkles, X } from 'lucide-react';
import { Dialog, DialogContent } from './ui/dialog';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { motion } from 'motion/react';

interface SpotMatchModalProps {
  onClose: () => void;
  onSpotted: () => void;
}

export function SpotMatchModal({ onClose, onSpotted }: SpotMatchModalProps) {
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleClose();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    onClose();
  };

  const handleSpotted = () => {
    setIsOpen(false);
    onSpotted();
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const progressValue = (timeLeft / 300) * 100;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-md mx-auto bg-gradient-to-br from-pink-50 to-purple-50 border-purple-200 p-0 overflow-hidden">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-pink-500 to-purple-600 px-6 py-6 text-white relative overflow-hidden">
            <div className="absolute inset-0 opacity-20">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.3),transparent_50%)]" />
            </div>
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 text-white/80 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="relative text-center space-y-2">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/20 backdrop-blur mb-2"
              >
                <Sparkles className="w-8 h-8 text-white" />
              </motion.div>
              <h2 className="text-white">SpotMatch Alert!</h2>
              <p className="text-pink-100">Someone special is nearby</p>
            </div>
          </div>

          {/* Timer */}
          <div className="px-6 py-6 space-y-4">
            <div className="text-center space-y-3">
              <div className="flex items-center justify-center gap-2">
                <Clock className="w-5 h-5 text-purple-600" />
                <span className="text-gray-600">Time remaining</span>
              </div>
              <div className="text-purple-600">
                {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
              </div>
              <Progress value={progressValue} className="h-2 bg-purple-100" />
            </div>

            {/* Teaser Card */}
            <div className="bg-white rounded-lg p-6 border-2 border-purple-200 space-y-4">
              <div className="flex items-center gap-2 text-purple-600">
                <Eye className="w-5 h-5" />
                <span>Spot the person:</span>
              </div>
              
              <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-lg p-4 border border-purple-200">
                <p className="text-gray-900 text-center">
                  "Wearing a blue shirt with a coffee cup"
                </p>
              </div>

              <div className="text-gray-600 space-y-2">
                <p className="flex items-start gap-2">
                  <span className="text-purple-600">📍</span>
                  <span>Location: Near the coffee counter</span>
                </p>
                <p className="flex items-start gap-2">
                  <span className="text-purple-600">💡</span>
                  <span>Interests: Books, Coffee</span>
                </p>
              </div>
            </div>

            {/* Action Button */}
            <Button
              onClick={handleSpotted}
              className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700"
              size="lg"
            >
              <Eye className="w-5 h-5 mr-2" />
              I Spotted Them!
            </Button>

            <p className="text-gray-500 text-center">
              Tap the button when you've found your match
            </p>
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}
