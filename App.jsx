import { useState, useEffect, useCallback } from 'react';
import {
  generateInitialTransactions,
  generateTransaction,
  generateTimeSeriesData,
  generateRiskDistribution,
  generateTopAlerts,
  generateStats,
} from './utils/mockData';
import StatsGrid from './components/StatsGrid';
import TransactionTable from './components/TransactionTable';
import TransactionModal from './components/TransactionModal';
import AlertFeed from './components/AlertFeed';
import { FraudTrendChart, RiskDistributionChart, BlockedVsFlaggedChart } from './components/Charts';
import { Shield, Activity, Bell, Settings, RefreshCw, Wifi } from 'lucide-react';

export default function App() {
  const [transactions, setTransactions] = useState(() => generateInitialTransactions(50));
  const [selected, setSelected] = useState(null);
  const [alerts, setAlerts] = useState(() => generateTopAlerts());
  const [timeSeries] = useState(() => generateTimeSeriesData(30));
  const [riskDist] = useState(() => generateRiskDistribution());
  const [liveCount, setLiveCount] = useState(0);
  const [isLive, setIsLive] = useState(true);
  const [tab, setTab] = useState('dashboard');

  const stats = generateStats(transactions);

  // Simulate live transaction stream
  useEffect(() => {
    if (!isLive) return;
    const interval = setInterval(() => {
      const newTxn = generateTransaction();
      setTransactions(prev => [newTxn, ...prev].slice(0, 200));
      setLiveCount(c => c + 1);
      if (newTxn.isFraud) {
        setAlerts(prev => [newTxn, ...prev].slice(0, 10));
      }
    }, 2200);
    return () => clearInterval(interval);
  }, [isLive]);

  return (
    <div className="min-h-screen bg-midnight flex flex-col">
      {/* Top nav */}
      <header className="border-b border-border bg-surface/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-screen-2xl mx-auto px-4 py-3 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-accent/10 border border-accent/30 rounded-lg flex items-center justify-center">
              <Shield size={16} className="text-accent" />
            </div>
            <div>
              <div className="font-display font-bold text-text-primary leading-tight">FraudShield</div>
              <div className="text-text-muted text-xs leading-tight">Financial Detection Engine</div>
            </div>
          </div>

          {/* Nav tabs */}
          <nav className="hidden md:flex items-center gap-1">
            {['dashboard', 'transactions', 'analytics', 'rules'].map(t => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`px-4 py-1.5 rounded-lg text-xs font-medium capitalize transition-colors ${
                  tab === t
                    ? 'bg-accent/10 text-accent border border-accent/20'
                    : 'text-text-secondary hover:text-text-primary'
                }`}
              >
                {t}
              </button>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-3">
            {/* Live toggle */}
            <button
              onClick={() => setIsLive(v => !v)}
              className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border transition-colors ${
                isLive
                  ? 'bg-accent/10 border-accent/30 text-accent'
                  : 'bg-surface border-border text-text-secondary'
              }`}
            >
              <Wifi size={12} />
              {isLive ? 'LIVE' : 'PAUSED'}
            </button>
            <div className="text-text-muted text-xs font-mono hidden sm:block">
              +{liveCount} new
            </div>
            <button className="text-text-muted hover:text-text-primary">
              <Bell size={16} />
            </button>
            <button className="text-text-muted hover:text-text-primary">
              <Settings size={16} />
            </button>
          </div>
        </div>
      </header>

      {/* Body */}
      <main className="flex-1 max-w-screen-2xl mx-auto w-full px-4 py-5 flex flex-col gap-5">

        {/* Stats */}
        <StatsGrid stats={stats} />

        {tab === 'dashboard' && (
          <>
            {/* Charts row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <div className="lg:col-span-2">
                <FraudTrendChart data={timeSeries} />
              </div>
              <RiskDistributionChart data={riskDist} />
            </div>

            {/* Main content: table + alert feed */}
            <div className="grid grid-cols-1 xl:grid-cols-4 gap-4">
              <div className="xl:col-span-3">
                <TransactionTable transactions={transactions} onSelect={setSelected} />
              </div>
              <div className="xl:col-span-1" style={{ minHeight: 500 }}>
                <AlertFeed alerts={alerts} onSelect={setSelected} />
              </div>
            </div>
          </>
        )}

        {tab === 'transactions' && (
          <TransactionTable transactions={transactions} onSelect={setSelected} />
        )}

        {tab === 'analytics' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <FraudTrendChart data={timeSeries} />
            <RiskDistributionChart data={riskDist} />
            <BlockedVsFlaggedChart data={timeSeries} />
            <div className="panel p-6 flex flex-col gap-4">
              <h3 className="font-display font-semibold text-text-primary">Detection Model Stats</h3>
              {[
                { label: 'Precision', value: 99.2, color: '#00E5B0' },
                { label: 'Recall', value: 94.7, color: '#10B981' },
                { label: 'F1 Score', value: 96.9, color: '#F59E0B' },
                { label: 'AUC-ROC', value: 98.4, color: '#3B82F6' },
              ].map(m => (
                <div key={m.label}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-text-secondary">{m.label}</span>
                    <span className="font-mono" style={{ color: m.color }}>{m.value}%</span>
                  </div>
                  <div className="h-1.5 bg-border rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-1000"
                      style={{ width: `${m.value}%`, background: m.color }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === 'rules' && (
          <div className="panel p-6">
            <h3 className="font-display font-semibold text-text-primary mb-4">Detection Rules</h3>
            <div className="space-y-3">
              {[
                { name: 'High Amount Threshold', desc: 'Flag transactions > ₹50,000', active: true, hits: 142 },
                { name: 'Velocity Check', desc: '>5 transactions in 10 minutes', active: true, hits: 89 },
                { name: 'Geolocation Anomaly', desc: 'Transaction from unusual country', active: true, hits: 231 },
                { name: 'New Device Detection', desc: 'First-time device for user', active: true, hits: 56 },
                { name: 'Round Amount Pattern', desc: 'Exactly round amounts (e.g. ₹1000.00)', active: false, hits: 0 },
                { name: 'Night Time Transaction', desc: 'Transactions between 1am–5am', active: false, hits: 0 },
              ].map(rule => (
                <div key={rule.name} className="flex items-center gap-4 p-4 bg-surface border border-border rounded-lg">
                  <div className={`w-2 h-8 rounded-full ${rule.active ? 'bg-accent' : 'bg-border'}`} />
                  <div className="flex-1">
                    <div className="text-text-primary text-sm font-medium">{rule.name}</div>
                    <div className="text-text-muted text-xs">{rule.desc}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-mono text-xs text-text-secondary">{rule.hits} hits today</div>
                    <div className={`text-xs ${rule.active ? 'text-accent' : 'text-text-muted'}`}>
                      {rule.active ? 'Active' : 'Disabled'}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-3 px-4 text-center text-text-muted text-xs">
        FraudShield v1.0 — Cloud-Ready Financial Fraud Detection • Powered by ML &amp; Real-time Analytics
      </footer>

      {/* Modal */}
      {selected && (
        <TransactionModal transaction={selected} onClose={() => setSelected(null)} />
      )}
    </div>
  );
}
