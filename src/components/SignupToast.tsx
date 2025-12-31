import { useEffect, useState, useRef } from 'react';
import { useToast } from '@/hooks/use-toast';

const names = [
  { name: 'Marcus', country: 'USA' },
  { name: 'Priya', country: 'India' },
  { name: 'Hiroshi', country: 'Japan' },
  { name: 'Emma', country: 'UK' },
  { name: 'Carlos', country: 'Brazil' },
  { name: 'Fatima', country: 'UAE' },
  { name: 'Johan', country: 'Sweden' },
  { name: 'Mei', country: 'China' },
  { name: 'Ahmed', country: 'Egypt' },
  { name: 'Sofia', country: 'Spain' },
  { name: 'Liam', country: 'Ireland' },
  { name: 'Yuki', country: 'Japan' },
  { name: 'Alex', country: 'Canada' },
  { name: 'Nina', country: 'Germany' },
  { name: 'Kofi', country: 'Ghana' },
  { name: 'Daniel', country: 'Germany' },
  { name: 'Isabella', country: 'Italy' },
  { name: 'Olga', country: 'Russia' },
  { name: 'Chen', country: 'Taiwan' },
  { name: 'Amara', country: 'Nigeria' },
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
      description: `${person.name} from ${person.country} joined the waitlist`,
      duration: 10000, // 10 seconds display
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
