import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface LoginModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const LoginModal = ({ open, onOpenChange }: LoginModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="glass-card border-border/50 sm:max-w-md">
        <DialogHeader className="text-center">
          <DialogTitle className="text-2xl font-bold text-foreground">
            Coming Soon
          </DialogTitle>
          <DialogDescription className="text-muted-foreground mt-4">
            Early access members will be notified first.
          </DialogDescription>
        </DialogHeader>
        
        <div className="mt-6 text-center">
          <Button
            className="btn-primary w-full"
            onClick={() => {
              onOpenChange(false);
              document.getElementById('top')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Join the Waitlist →
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LoginModal;
