import React, { useState } from 'react';
import { Plus, X, Clock, MapPin } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Input } from './ui/input';

interface DailyTodoScreenProps {
  onComplete: (tasks: Array<{ task: string; time: string }>) => void;
}

export function DailyTodoScreen({ onComplete }: DailyTodoScreenProps) {
  const [tasks, setTasks] = useState<Array<{ task: string; time: string }>>([
    { task: '', time: '' },
  ]);

  const addTask = () => {
    setTasks([...tasks, { task: '', time: '' }]);
  };

  const removeTask = (index: number) => {
    if (tasks.length > 1) {
      setTasks(tasks.filter((_, i) => i !== index));
    }
  };

  const updateTask = (index: number, field: 'task' | 'time', value: string) => {
    const newTasks = [...tasks];
    newTasks[index][field] = value;
    setTasks(newTasks);
  };

  const handleGenerateQuest = () => {
    const validTasks = tasks.filter((t) => t.task.trim() && t.time.trim());
    if (validTasks.length > 0) {
      onComplete(validTasks);
    }
  };

  const isValid = tasks.some((t) => t.task.trim() && t.time.trim());

  return (
    <div className="min-h-screen px-6 py-12 pb-24">
      <div className="max-w-md mx-auto space-y-8">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 mb-4">
            <MapPin className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-gray-900">Plan Your Day</h2>
          <p className="text-gray-600">Add your schedule and we'll create your treasure hunt</p>
        </div>

        <div className="space-y-4">
          {tasks.map((task, index) => (
            <Card key={index} className="p-4 bg-white/80 backdrop-blur border-purple-100">
              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <div className="flex-1">
                    <Input
                      type="text"
                      placeholder="What's your activity? (e.g., Gym, Coffee)"
                      value={task.task}
                      onChange={(e) => updateTask(index, 'task', e.target.value)}
                      className="border-purple-200 focus:border-purple-500"
                    />
                  </div>
                  {tasks.length > 1 && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeTask(index)}
                      className="text-gray-400 hover:text-red-500"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-gray-400" />
                  <Input
                    type="time"
                    value={task.time}
                    onChange={(e) => updateTask(index, 'time', e.target.value)}
                    className="border-purple-200 focus:border-purple-500"
                  />
                </div>
              </div>
            </Card>
          ))}

          <Button
            onClick={addTask}
            variant="outline"
            className="w-full border-purple-300 text-purple-600 hover:bg-purple-50"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Another Activity
          </Button>
        </div>

        <div className="space-y-3">
          <Button
            onClick={handleGenerateQuest}
            disabled={!isValid}
            className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700"
            size="lg"
          >
            Generate My Quest
          </Button>
          <p className="text-gray-500 text-center">
            Our AI will optimize your route and create exciting encounters
          </p>
        </div>
      </div>
    </div>
  );
}
