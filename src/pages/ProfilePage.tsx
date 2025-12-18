import { ArrowLeft, Trophy, Target, Flame, Star, Lock, Camera, Palette, Moon, Sun, Check, LogOut, LogIn } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { BottomNav } from '@/components/BottomNav';
import { useApp } from '@/context/AppContext';
import { useAuth } from '@/contexts/AuthContext';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';

const themes = [
  { id: 'default', name: 'Teal', color: 'bg-[hsl(174,62%,35%)]' },
  { id: 'ocean', name: 'Ocean', color: 'bg-[hsl(200,80%,45%)]' },
  { id: 'sunset', name: 'Sunset', color: 'bg-[hsl(15,85%,55%)]' },
  { id: 'forest', name: 'Forest', color: 'bg-[hsl(140,60%,40%)]' },
  { id: 'royal', name: 'Royal', color: 'bg-[hsl(262,83%,58%)]' },
] as const;

export default function ProfilePage() {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const { 
    achievements, 
    studyStreak, 
    totalQuestionsAnswered, 
    correctAnswers,
    username,
    avatarUrl,
    theme,
    isDarkMode,
    setUsername,
    setAvatarUrl,
    setTheme,
    toggleDarkMode,
  } = useApp();

  const handleSignOut = async () => {
    try {
      await signOut();
      toast({
        title: 'Signed out',
        description: 'You have been signed out successfully.',
      });
    } catch (error: any) {
      toast({
        title: 'Error',
        description: 'Failed to sign out. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const [isEditingName, setIsEditingName] = useState(false);
  const [tempName, setTempName] = useState(username);

  const accuracy = totalQuestionsAnswered > 0 
    ? Math.round((correctAnswers / totalQuestionsAnswered) * 100) 
    : 0;

  const unlockedAchievements = achievements.filter(a => a.unlockedAt);
  const lockedAchievements = achievements.filter(a => !a.unlockedAt);

  const handleSaveName = () => {
    if (tempName.trim()) {
      setUsername(tempName.trim());
    }
    setIsEditingName(false);
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      <header className="gradient-hero text-primary-foreground px-4 pt-12 pb-8 rounded-b-[2rem]">
        <div className="flex items-center gap-3 mb-6">
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-xl font-bold">Your Profile</h1>
        </div>

        {/* Avatar & Name */}
        <div className="flex items-center gap-4 mb-6">
          <div className="relative">
            <div className="w-20 h-20 rounded-full bg-primary-foreground/20 overflow-hidden flex items-center justify-center">
              {avatarUrl ? (
                <img src={avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
              ) : (
                <span className="text-3xl font-bold">{username.charAt(0).toUpperCase()}</span>
              )}
            </div>
            <label className="absolute -bottom-1 -right-1 p-2 bg-primary-foreground text-primary rounded-full cursor-pointer hover:bg-primary-foreground/90 transition-colors">
              <Camera className="w-4 h-4" />
              <input 
                type="file" 
                accept="image/*" 
                className="hidden" 
                onChange={handleAvatarChange}
              />
            </label>
          </div>
          
          <div className="flex-1">
            {isEditingName ? (
              <div className="flex gap-2">
                <Input
                  value={tempName}
                  onChange={(e) => setTempName(e.target.value)}
                  className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50"
                  autoFocus
                  onKeyDown={(e) => e.key === 'Enter' && handleSaveName()}
                />
                <button
                  onClick={handleSaveName}
                  className="px-3 py-2 bg-primary-foreground/20 rounded-lg hover:bg-primary-foreground/30 transition-colors"
                >
                  <Check className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button 
                onClick={() => {
                  setTempName(username);
                  setIsEditingName(true);
                }}
                className="text-left"
              >
                <p className="text-2xl font-bold">{username}</p>
                <p className="text-sm opacity-70">Tap to edit</p>
              </button>
            )}
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-primary-foreground/10 rounded-2xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Flame className="w-5 h-5" />
              <span className="text-sm opacity-80">Study Streak</span>
            </div>
            <p className="text-3xl font-bold">{studyStreak} days</p>
          </div>
          <div className="bg-primary-foreground/10 rounded-2xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Target className="w-5 h-5" />
              <span className="text-sm opacity-80">Accuracy</span>
            </div>
            <p className="text-3xl font-bold">{accuracy}%</p>
          </div>
          <div className="bg-primary-foreground/10 rounded-2xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Star className="w-5 h-5" />
              <span className="text-sm opacity-80">Questions</span>
            </div>
            <p className="text-3xl font-bold">{totalQuestionsAnswered}</p>
          </div>
          <div className="bg-primary-foreground/10 rounded-2xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Trophy className="w-5 h-5" />
              <span className="text-sm opacity-80">Achievements</span>
            </div>
            <p className="text-3xl font-bold">{unlockedAchievements.length}/{achievements.length}</p>
          </div>
        </div>
      </header>

      <main className="px-4 py-6 space-y-8">
        {/* Appearance Settings */}
        <section>
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Palette className="w-5 h-5 text-muted-foreground" />
            Appearance
          </h2>
          
          <div className="bg-card rounded-2xl p-4 shadow-sm border border-border/50 space-y-4">
            {/* Dark Mode Toggle */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {isDarkMode ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
                <Label htmlFor="dark-mode" className="font-medium">Dark Mode</Label>
              </div>
              <Switch id="dark-mode" checked={isDarkMode} onCheckedChange={toggleDarkMode} />
            </div>
            
            {/* Theme Selection */}
            <div>
              <Label className="text-sm text-muted-foreground mb-3 block">Theme Color</Label>
              <div className="flex gap-3">
                {themes.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setTheme(t.id)}
                    className={cn(
                      "w-12 h-12 rounded-xl transition-all flex items-center justify-center",
                      t.color,
                      theme === t.id && "ring-2 ring-offset-2 ring-offset-card ring-foreground"
                    )}
                    title={t.name}
                  >
                    {theme === t.id && <Check className="w-5 h-5 text-white" />}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Account Section */}
        <section>
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <LogIn className="w-5 h-5 text-muted-foreground" />
            Account
          </h2>
          
          <div className="bg-card rounded-2xl p-4 shadow-sm border border-border/50">
            {user ? (
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-lg font-bold text-primary">
                      {user.email?.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{user.email}</p>
                    <p className="text-xs text-muted-foreground">Signed in with Google</p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={handleSignOut}
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </Button>
              </div>
            ) : (
              <div className="text-center py-2">
                <p className="text-sm text-muted-foreground mb-3">
                  Sign in to sync your progress across devices
                </p>
                <Button
                  onClick={() => navigate('/auth')}
                  className="w-full"
                >
                  <LogIn className="w-4 h-4 mr-2" />
                  Sign In
                </Button>
              </div>
            )}
          </div>
        </section>

        {/* Achievements */}
        <section>
          <h2 className="text-lg font-semibold mb-4">Achievements</h2>
          
          {/* Unlocked */}
          {unlockedAchievements.length > 0 && (
            <div className="mb-4">
              <p className="text-sm text-muted-foreground mb-2">Unlocked</p>
              <div className="grid grid-cols-2 gap-3">
                {unlockedAchievements.map(achievement => (
                  <div
                    key={achievement.id}
                    className="bg-gradient-to-br from-success/10 to-success/5 border border-success/20 rounded-2xl p-4"
                  >
                    <span className="text-3xl mb-2 block">{achievement.icon}</span>
                    <h4 className="font-semibold text-sm">{achievement.title}</h4>
                    <p className="text-xs text-muted-foreground">{achievement.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Locked */}
          {lockedAchievements.length > 0 && (
            <div>
              <p className="text-sm text-muted-foreground mb-2">Locked</p>
              <div className="grid grid-cols-2 gap-3">
                {lockedAchievements.map(achievement => (
                  <div
                    key={achievement.id}
                    className="bg-muted/50 border border-border rounded-2xl p-4 opacity-60"
                  >
                    <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center mb-2">
                      <Lock className="w-5 h-5 text-muted-foreground" />
                    </div>
                    <h4 className="font-semibold text-sm">{achievement.title}</h4>
                    <p className="text-xs text-muted-foreground">{achievement.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>
      </main>

      <BottomNav />
    </div>
  );
}
