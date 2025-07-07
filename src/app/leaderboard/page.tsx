'use client'
import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useUser } from '@/lib/user-context';
import { supabase } from '@/lib/utils';

export default function LeaderboardPage() {
  const [userName, setUserName] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [leaderboard, setLeaderboard] = useState<{ name: string; points: number }[]>([]);
  const { userCards, user } = useUser();

  // Calculate total points (sum of price for all cards)
  const userPoints = userCards.reduce((sum, card) => sum + (card.price || 0), 0);

  // Fetch leaderboard from Supabase
  useEffect(() => {
    const fetchLeaderboard = async () => {
      const { data, error } = await supabase
        .from('leaderboard')
        .select('name, points')
        .order('points', { ascending: false });
      if (!error && data) {
        setLeaderboard(data);
      }
    };
    fetchLeaderboard();
    // Subscribe to changes (realtime)
    const channel = supabase
      .channel('leaderboard-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'leaderboard' }, fetchLeaderboard)
      .subscribe();
    return () => { channel.unsubscribe(); };
  }, []);

  // Update leaderboard entry when name or points change
  useEffect(() => {
    if (submitted && userName) {
      const upsertLeaderboard = async () => {
        await supabase.from('leaderboard').upsert({
          name: userName,
          points: userPoints,
        }, { onConflict: 'name' });
      };
      upsertLeaderboard();
    }
  }, [userName, userPoints, submitted]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    // Refetch leaderboard immediately after submit
    const { data, error } = await supabase
      .from('leaderboard')
      .select('name, points')
      .order('points', { ascending: false });
    if (!error && data) {
      setLeaderboard(data);
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-12 space-y-8">
      <h1 className="text-3xl font-bold text-center mb-6">Leaderboard</h1>
      {!submitted ? (
        <form onSubmit={handleSubmit} className="flex gap-2 justify-center mb-8">
          <Input
            placeholder="Enter your name"
            value={userName}
            onChange={e => setUserName(e.target.value)}
            className="max-w-xs"
            required
          />
          <Button type="submit">Join Leaderboard</Button>
        </form>
      ) : (
        <div className="text-center text-lg mb-8">Welcome, <span className="font-semibold">{userName}</span>! Your points: <span className="font-bold text-green-600">{userPoints}</span></div>
      )}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white dark:bg-gray-900 rounded-lg shadow">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left">Rank</th>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Points</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.map((user, idx) => (
              <tr key={user.name} className={user.name === userName ? 'border-t bg-yellow-50 dark:bg-yellow-900/20' : 'border-t'}>
                <td className="px-4 py-2">{idx + 1}</td>
                <td className="px-4 py-2">{user.name}</td>
                <td className="px-4 py-2 font-semibold">{user.points}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
} 