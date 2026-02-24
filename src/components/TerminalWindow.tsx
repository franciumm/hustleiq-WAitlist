import { useEffect, useState, useRef } from 'react';

const LOGS = [
    { time: '09:41:22', tag: '[Scout]', msg: 'Scanning 4 micro-SaaS niches...', color: 'text-[#1DFF7A]' },
    { time: '09:41:24', tag: '[Strategist]', msg: 'Roadmap & Moat v2.1 validated', color: 'text-[#B59AFF]' },
    { time: '09:41:28', tag: '[Marketer]', msg: 'Growth loops locked. Routing...', color: 'text-[#FF6B9D]', bright: true },
    { time: '09:41:35', tag: '[CFO]', msg: 'Runway: 92 days @ $500/mo', color: 'text-[#06D6FF]' },
    { time: '09:41:40', tag: '[QA]', msg: 'Plan audit score: 9.8/10', color: 'text-[#28C840]' },
    { time: '09:41:48', tag: '[Launchpad]', msg: 'Day 1 blueprint ready.', color: 'text-[#FF9A3C]', bright: true, cursor: true },
];

export const TerminalWindow = () => {
    return (
        <div className="w-[440px] bg-surface border border-border rounded-[16px] overflow-hidden shadow-[0_0_80px_rgba(29,255,122,0.06),0_40px_80px_rgba(0,0,0,0.5)]">
            <div className="bg-surface-2 px-[18px] py-[14px] flex items-center gap-[8px] border-b border-border">
                <div className="w-[10px] h-[10px] rounded-full bg-[#FF5F57]"></div>
                <div className="w-[10px] h-[10px] rounded-full bg-[#FFBD2E]"></div>
                <div className="w-[10px] h-[10px] rounded-full bg-[#28C840]"></div>
                <span className="ml-[8px] font-mono text-[11px] text-white/20">pipeline_activity.log</span>
            </div>
            <div className="p-[24px]">
                {LOGS.map((log, i) => (
                    <div key={i} className="font-mono text-[12px] leading-[2] flex gap-[12px] items-start">
                        <span className="text-primary/35 min-w-[70px]">{log.time}</span>
                        <span className={log.color}>{log.tag}</span>
                        <span className={`${log.bright ? 'text-foreground font-medium' : 'text-foreground/70'}`}>
                            {log.msg}
                            {log.cursor && <span className="inline-block w-[7px] h-[13px] bg-primary ml-[4px] align-middle animate-pulse" />}
                        </span>
                    </div>
                ))}
            </div>
            <div className="px-[24px] py-[14px] border-top border-border flex items-center gap-[10px]">
                <span className="font-mono text-[11px] text-primary">68%</span>
                <div className="flex-1 h-[3px] bg-surface-2 rounded-full overflow-hidden">
                    <div className="h-full w-[68%] bg-primary rounded-full shadow-[0_0_8px_var(--green)] animate-pulse" />
                </div>
                <span className="font-mono text-[11px] text-primary">Pipeline running</span>
            </div>
        </div>
    );
};
