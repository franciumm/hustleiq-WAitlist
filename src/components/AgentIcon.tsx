import {
    Search,
    Target,
    BarChart3,
    CircleDollarSign,
    ShieldCheck,
    Rocket
} from 'lucide-react';

export const AgentIcon = ({ name, className }: { name: string; className?: string }) => {
    switch (name) {
        case 'Scout': return <Search className={className} />;
        case 'Strategist': return <Target className={className} />;
        case 'Marketer': return <BarChart3 className={className} />;
        case 'CFO': return <CircleDollarSign className={className} />;
        case 'QA': return <ShieldCheck className={className} />;
        case 'Launchpad': return <Rocket className={className} />;
        default: return null;
    }
};
