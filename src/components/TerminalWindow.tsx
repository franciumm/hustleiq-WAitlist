export const TerminalWindow = () => {
    const LOGS = [
        { time: '09:41:22', tag: '[Scout]', msg: 'Scanning 4 micro-SaaS niches...', color: 'text-[var(--green)]' },
        { time: '09:41:24', tag: '[Strategist]', msg: 'Roadmap & Moat v2.1 validated', color: 'text-[#B59AFF]' },
        { time: '09:41:28', tag: '[Marketer]', msg: 'Growth loops locked. Routing...', color: 'text-[#FF6B9D]', bright: true },
        { time: '09:41:35', tag: '[CFO]', msg: 'Runway: 92 days @ $500/mo', color: 'text-[#06D6FF]' },
        { time: '09:41:40', tag: '[QA]', msg: 'Plan audit score: 9.8/10', color: 'text-[#28C840]' },
        { time: '09:41:48', tag: '[Launchpad]', msg: 'Day 1 blueprint ready.', color: 'text-[#FF9A3C]', bright: true, cursor: true },
    ];

    return (
        <div className="w-[440px] bg-[var(--surface)] border border-[var(--border)] rounded-[16px] overflow-hidden shadow-[0_0_80px_rgba(29,255,122,0.06),0_40px_80px_rgba(0,0,0,0.5)]">
            <div className="bg-[var(--surface-2)] p-[14px_18px] flex items-center gap-2 border-b border-[var(--border)]">
                <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
                <span className="ml-2 font-mono text-[11px] text-[var(--text-dim)]">pipeline_activity.log</span>
            </div>
            <div className="p-6">
                {LOGS.map((log, i) => (
                    <div key={i} className="font-mono text-[12px] leading-[2] flex gap-3 items-start">
                        <span className="text-[rgba(29,255,122,0.35)] min-w-[70px]">{log.time}</span>
                        <span className={log.color}>{log.tag}</span>
                        <span className={log.bright ? "text-[var(--text-primary)] font-medium" : "text-[rgba(240,255,244,0.7)]"}>
                            {log.msg}
                            {log.cursor && <span className="inline-block w-[7px] h-[13px] bg-[var(--green)] ml-1 align-middle animate-pulse" />}
                        </span>
                    </div>
                ))}
            </div>
            <div className="p-[14px_24px] border-t border-[var(--border)] flex items-center gap-2.5">
                <span className="font-mono text-[11px] text-[var(--green)]">68%</span>
                <div className="flex-1 h-[3px] bg-[var(--surface-2)] rounded-full overflow-hidden">
                    <div className="h-full w-[68%] bg-[var(--green)] rounded-full shadow-[0_0_8px_var(--green)] animate-pulse" />
                </div>
                <span className="font-mono text-[11px] text-[var(--green)]">Pipeline running</span>
            </div>
        </div>
    );
};
