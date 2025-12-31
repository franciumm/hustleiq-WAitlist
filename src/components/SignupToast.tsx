import { useEffect, useState } from 'react';
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
];

const SignupToast = () => {
  const { toast } = useToast();
  const [shown, setShown] = useState(new Set<number>());

  useEffect(() => {
    // Initial delay before first toast
    const initialDelay = setTimeout(() => {
      showRandomToast();
    }, 8000);

    return () => clearTimeout(initialDelay);
  }, []);

  useEffect(() => {
    if (shown.size === 0) return;
    
    // Random interval between 8-15 seconds
    const interval = setTimeout(() => {
      showRandomToast();
    }, 8000 + Math.random() * 7000);

    return () => clearTimeout(interval);
  }, [shown]);

  const showRandomToast = () => {
    const availableIndices = names
      .map((_, i) => i)
      .filter((i) => !shown.has(i));
    
    if (availableIndices.length === 0) {
      // Reset if all shown
      setShown(new Set());
      return;
    }

    const randomIndex = availableIndices[Math.floor(Math.random() * availableIndices.length)];
    const person = names[randomIndex];

    toast({
      description: `${person.name} from ${person.country} joined the waitlist`,
      duration: 4000,
    });

    setShown((prev) => new Set([...prev, randomIndex]));
  };

  return null;
};

export default SignupToast;
