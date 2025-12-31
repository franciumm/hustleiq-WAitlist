import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Phone } from 'lucide-react';

const businessTypes = [
  'E-Com',
  'Crypto',
  'SMMA',
  'Dropshipping',
  'AI Automation',
  'Copywriting',
];

const budgetRanges = [
  '$0 - $500',
  '$500 - $2,000',
  '$2,000 - $5,000',
  '$5,000+',
];

const helpOptions = [
  { id: 'starting', label: 'Starting' },
  { id: 'scaling', label: 'Scaling' },
  { id: 'clarity', label: 'Clarity' },
  { id: 'execution', label: 'Execution' },
  { id: 'accountability', label: 'Accountability' },
];

interface StrategyCallFormProps {
  trigger?: React.ReactNode;
}

const StrategyCallForm = ({ trigger }: StrategyCallFormProps) => {
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    businessType: '',
    budget: '',
    helpWith: [] as string[],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    setTimeout(() => {
      setSubmitted(true);
    }, 500);
  };

  const toggleHelpOption = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      helpWith: prev.helpWith.includes(id)
        ? prev.helpWith.filter((item) => item !== id)
        : [...prev.helpWith, id],
    }));
  };

  const handleClose = () => {
    setOpen(false);
    // Reset form after closing
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        firstName: '',
        lastName: '',
        businessType: '',
        budget: '',
        helpWith: [],
      });
    }, 300);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline" className="btn-outline gap-2">
            <Phone className="w-4 h-4" />
            Book a Strategy Call
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="glass-card border-border/50 sm:max-w-lg max-h-[90vh] overflow-y-auto">
        {submitted ? (
          <div className="py-8 text-center">
            <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-6">
              <Phone className="w-8 h-8 text-primary" />
            </div>
            <DialogTitle className="text-2xl font-bold text-foreground mb-4">
              Thanks!
            </DialogTitle>
            <DialogDescription className="text-muted-foreground">
              We'll review your request and email you when early access opens.
            </DialogDescription>
            <Button className="btn-primary mt-6" onClick={handleClose}>
              Close
            </Button>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-foreground">
                Book a Strategy Call
              </DialogTitle>
              <DialogDescription className="text-muted-foreground">
                This helps us tailor HustleIQ to your goals. No pitch — just feedback.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="mt-6 space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, firstName: e.target.value }))
                    }
                    className="bg-secondary/50 border-border"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, lastName: e.target.value }))
                    }
                    className="bg-secondary/50 border-border"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Preferred Business Type</Label>
                <Select
                  value={formData.businessType}
                  onValueChange={(value) =>
                    setFormData((prev) => ({ ...prev, businessType: value }))
                  }
                >
                  <SelectTrigger className="bg-secondary/50 border-border">
                    <SelectValue placeholder="Select a business type" />
                  </SelectTrigger>
                  <SelectContent>
                    {businessTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Budget</Label>
                <Select
                  value={formData.budget}
                  onValueChange={(value) =>
                    setFormData((prev) => ({ ...prev, budget: value }))
                  }
                >
                  <SelectTrigger className="bg-secondary/50 border-border">
                    <SelectValue placeholder="Select your budget range" />
                  </SelectTrigger>
                  <SelectContent>
                    {budgetRanges.map((range) => (
                      <SelectItem key={range} value={range}>
                        {range}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <Label>What can we help with?</Label>
                <div className="grid grid-cols-2 gap-3">
                  {helpOptions.map((option) => (
                    <div key={option.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={option.id}
                        checked={formData.helpWith.includes(option.id)}
                        onCheckedChange={() => toggleHelpOption(option.id)}
                      />
                      <label
                        htmlFor={option.id}
                        className="text-sm font-medium text-muted-foreground cursor-pointer"
                      >
                        {option.label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <Button type="submit" className="btn-primary w-full">
                Submit →
              </Button>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default StrategyCallForm;
