import { useEffect, useState, useRef } from 'react';

const AGENTS = ['Scout', 'Strategist', 'Marketer', 'CFO', 'QA', 'Launchpad'];
const MESSAGES = [
    'Analyzing market gaps...',
    'Architecting tech stack...',
    'Optimizing conversion loops...',
    'Calculating burn rate...',
    'Running integration tests...',
    'Preparing for deployment...',
    'Scraping niche signals...',
    'Validating MVP schema...',
    'Generating copy assets...',
    'Setting up stripe hooks...',
];

export const TerminalWindow = () => {
    const [logs, setLogs] = useState<{ id: number; time: string; agent: string; msg: string; color: string }[]>([]);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const interval = setInterval(() => {
            const time = new Date().toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });
            const agent = AGENTS[Math.floor(Math.random() * AGENTS.length)];
            const msg = MESSAGES[Math.floor(Math.random() * MESSAGES.length)];
            const colors = ['text-green-400', 'text-blue-400', 'text-purple-400', 'text-yellow-400', 'text-cyan-400'];
            const color = colors[Math.floor(Math.random() * colors.length)];

            setLogs((prev) => [...prev.slice(-8), { id: Date.now(), time, agent, msg, color }]);
        }, 2000);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [logs]);

    return (
        <div className="neo-brutalist-card font-mono text-sm h-64 flex flex-col">
            <div className="flex items-center gap-2 mb-4 border-b border-primary/20 pb-2">
                <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
                </div>
                <span className="text-primary/40 text-[10px] uppercase tracking-widest">pipeline_activity.log</span>
            </div>
            <div ref={scrollRef} className="flex-1 overflow-y-auto space-y-1 scrollbar-hide">
                {logs.map((log) => (
                    <div key={log.id} className="flex gap-3 animate-in fade-in slide-in-from-left-2 duration-300">
                        <span className="text-white/20 whitespace-nowrap">{log.time}</span>
                        <span className={`${log.color} font-bold whitespace-nowrap`}>[{log.agent}]</span>
                        <span className="text-white/80">{log.msg}</span>
                    </div>
                ))}
                {logs.length === 0 && (
                    <div className="text-primary animate-pulse">Initializing agents...</div>
                )}
            </div>
        </div>
    );
};
