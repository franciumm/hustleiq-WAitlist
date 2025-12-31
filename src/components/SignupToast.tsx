import { useEffect, useState, useRef } from 'react';
import { useToast } from '@/hooks/use-toast';

const names = [
  { name: 'Marcus', country: 'USA', flag: '🇺🇸' },
  { name: 'Priya', country: 'India', flag: '🇮🇳' },
  { name: 'Hiroshi', country: 'Japan', flag: '🇯🇵' },
  { name: 'Emma', country: 'UK', flag: '🇬🇧' },
  { name: 'Carlos', country: 'Brazil', flag: '🇧🇷' },
  { name: 'Fatima', country: 'UAE', flag: '🇦🇪' },
  { name: 'Johan', country: 'Sweden', flag: '🇸🇪' },
  { name: 'Mei', country: 'China', flag: '🇨🇳' },
  { name: 'Ahmed', country: 'Egypt', flag: '🇪🇬' },
  { name: 'Sofia', country: 'Spain', flag: '🇪🇸' },
  { name: 'Liam', country: 'Ireland', flag: '🇮🇪' },
  { name: 'Yuki', country: 'Japan', flag: '🇯🇵' },
  { name: 'Alex', country: 'Canada', flag: '🇨🇦' },
  { name: 'Nina', country: 'Germany', flag: '🇩🇪' },
  { name: 'Kofi', country: 'Ghana', flag: '🇬🇭' },
  { name: 'Daniel', country: 'Germany', flag: '🇩🇪' },
  { name: 'Isabella', country: 'Italy', flag: '🇮🇹' },
  { name: 'Olga', country: 'Russia', flag: '🇷🇺' },
  { name: 'Chen', country: 'Taiwan', flag: '🇹🇼' },
  { name: 'Amara', country: 'Nigeria', flag: '🇳🇬' },
];

const SignupToast = () => {
  const { toast } = useToast();
  const [shown, setShown] = useState(new Set<number>());
  const visibleCount = useRef(0);

  const showRandomToast = () => {
    // Max 2 visible at once
    if (visibleCount.current >= 2) return;

    const availableIndices = names
      .map((_, i) => i)
      .filter((i) => !shown.has(i));
    
    if (availableIndices.length === 0) {
      setShown(new Set());
      return;
    }

    const randomIndex = availableIndices[Math.floor(Math.random() * availableIndices.length)];
    const person = names[randomIndex];

    visibleCount.current += 1;

    toast({
      title: "Welcome to HustleIQ",
      description: `${person.name} from ${person.country} joined the waitlist ${person.flag}`,
      duration: 10000,
      className: 'signup-toast',
    });

    // Decrease visible count after toast disappears
    setTimeout(() => {
      visibleCount.current = Math.max(0, visibleCount.current - 1);
    }, 10000);

    setShown((prev) => new Set([...prev, randomIndex]));
  };

  useEffect(() => {
    // Initial delay before first toast
    const initialDelay = setTimeout(() => {
      showRandomToast();
    }, 6000);

    return () => clearTimeout(initialDelay);
  }, []);

  useEffect(() => {
    if (shown.size === 0) return;
    
    // Random interval between 8-14 seconds
    const interval = setTimeout(() => {
      showRandomToast();
    }, 8000 + Math.random() * 6000);

    return () => clearTimeout(interval);
  }, [shown]);

  return null;
};

export default SignupToast;
