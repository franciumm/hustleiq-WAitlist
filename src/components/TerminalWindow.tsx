export const TerminalWindow = () => {
    const LOGS = [
        { time: '09:41:22', tag: '[Scout]', msg: 'Scanning 4 micro-SaaS niches...', tagClass: 't-tag-scout' },
        { time: '09:41:24', tag: '[Strategist]', msg: 'Roadmap & Moat v2.1 validated', tagClass: 't-tag-arch' },
        { time: '09:41:28', tag: '[Marketer]', msg: 'Growth loops locked. Routing...', tagClass: 't-tag-mkt', bright: true },
        { time: '09:41:35', tag: '[CFO]', msg: 'Runway: 92 days @ $500/mo', tagClass: 't-tag-cfo' },
        { time: '09:41:40', tag: '[QA]', msg: 'Plan audit score: 9.8/10', tagClass: 't-tag-qa' },
        { time: '09:41:48', tag: '[Launchpad]', msg: 'Day 1 blueprint ready.', tagClass: 't-tag-launch', bright: true, cursor: true },
    ];

    return (
        <div className="hero-terminal">
            <div className="terminal-bar">
                <div className="t-dot t-red" />
                <div className="t-dot t-yellow" />
                <div className="t-dot t-green-dot" />
                <span className="t-title">pipeline_activity.log</span>
            </div>
            <div className="terminal-body">
                {LOGS.map((log, i) => (
                    <div key={i} className="t-line">
                        <span className="t-time">{log.time}</span>
                        <span className={log.tagClass}>{log.tag}</span>
                        <span className={`t-msg ${log.bright ? 'bright' : ''}`}>
                            {log.msg}
                            {log.cursor && <span className="t-cursor" />}
                        </span>
                    </div>
                ))}
            </div>
            <div className="terminal-footer">
                <span className="t-pct">68%</span>
                <div className="t-progress-bar">
                    <div className="t-progress-fill" />
                </div>
                <span className="t-pct">Pipeline running</span>
            </div>
        </div>
    );
};
