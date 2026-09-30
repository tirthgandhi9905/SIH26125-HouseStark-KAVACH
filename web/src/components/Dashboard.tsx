"use client";

import { useState } from "react";
import { Shield, Key, Database, AlertCircle, CheckCircle2 } from "lucide-react";

export default function Dashboard() {
  const [walletConnected, setWalletConnected] = useState(false);
  const [hasSbt, setHasSbt] = useState(false);
  const [accessStatus, setAccessStatus] = useState<"idle" | "granted" | "denied">("idle");
  const [logs, setLogs] = useState<string[]>([]);

  const addLog = (msg: string) => {
    setLogs((prev) => [`[${new Date().toLocaleTimeString()}] ${msg}`, ...prev]);
  };

  const handleConnectWallet = () => {
    // In a real app, this calls ethers.BrowserProvider(window.ethereum)
    addLog("Connecting to Metamask...");
    setTimeout(() => {
      setWalletConnected(true);
      addLog("Wallet connected: 0x71C...976F");
    }, 500);
  };

  const handleMintSbt = () => {
    addLog("Requesting Admin to mint Identity SBT (ERC-5192)...");
    setTimeout(() => {
      setHasSbt(true);
      addLog("SBT Minted & Locked to Wallet. Role: Engineer, Clearance: Secret, Dept: R&D");
    }, 1000);
  };

  const handleRequestAccess = () => {
    if (!hasSbt) {
      setAccessStatus("denied");
      addLog("ABAC Error: No valid identity credential found.");
      return;
    }
    
    setAccessStatus("idle");
    addLog("Requesting access to [Radar_Design_Specs.pdf]...");
    addLog("Evaluating ABAC Policies via Smart Contract...");
    
    setTimeout(() => {
      // Mocking the ABAC validation success
      setAccessStatus("granted");
      addLog("Access Granted: Subject attributes match resource requirements.");
    }, 1500);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Left Column - Controls */}
      <div className="lg:col-span-2 space-y-6">
        {/* Step 1: Wallet Connection */}
        <section className="bg-surface border border-slate-700 rounded-xl p-6 shadow-lg">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-blue-500/20 rounded-lg">
              <Key className="text-blue-400 w-6 h-6" />
            </div>
            <h2 className="text-xl font-semibold">1. Account Abstraction Wallet</h2>
          </div>
          <p className="text-slate-400 mb-6">
            Connect your ERC-4337 smart contract wallet. Gas fees are sponsored by the enterprise Paymaster.
          </p>
          <button 
            onClick={handleConnectWallet}
            disabled={walletConnected}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              walletConnected 
                ? "bg-slate-700 text-slate-400 cursor-not-allowed" 
                : "bg-primary hover:bg-sky-400 text-white"
            }`}
          >
            {walletConnected ? "Wallet Connected" : "Connect Smart Wallet"}
          </button>
        </section>

        {/* Step 2: Soulbound Token (Identity) */}
        <section className={`bg-surface border border-slate-700 rounded-xl p-6 shadow-lg transition-opacity ${walletConnected ? "opacity-100" : "opacity-50 pointer-events-none"}`}>
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-purple-500/20 rounded-lg">
              <Shield className="text-purple-400 w-6 h-6" />
            </div>
            <h2 className="text-xl font-semibold">2. Decentralized Identity (SBT)</h2>
          </div>
          <p className="text-slate-400 mb-6">
            Enterprise admins mint a non-transferable ERC-5192 Soulbound Token to represent your identity and clearance level.
          </p>
          <div className="flex items-center justify-between bg-slate-900/50 p-4 rounded-lg border border-slate-800">
            <div>
              <div className="text-sm text-slate-400">Current Status</div>
              <div className="font-semibold text-white">
                {hasSbt ? "Identity verified & anchored" : "No Identity Token Found"}
              </div>
            </div>
            <button 
              onClick={handleMintSbt}
              disabled={hasSbt}
              className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                hasSbt 
                  ? "bg-slate-700 text-slate-400 cursor-not-allowed" 
                  : "bg-purple-600 hover:bg-purple-500 text-white"
              }`}
            >
              {hasSbt ? "Issued" : "Mint SBT"}
            </button>
          </div>
        </section>

        {/* Step 3: ABAC Access Request */}
        <section className={`bg-surface border border-slate-700 rounded-xl p-6 shadow-lg transition-opacity ${hasSbt ? "opacity-100" : "opacity-50 pointer-events-none"}`}>
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-secondary/20 rounded-lg">
              <Database className="text-secondary w-6 h-6" />
            </div>
            <h2 className="text-xl font-semibold">3. Adaptive Access Control (ABAC)</h2>
          </div>
          <p className="text-slate-400 mb-6">
            Request access to a restricted digital asset. The smart contract evaluates your SBT attributes against the resource requirements.
          </p>
          
          <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-800 mb-6 flex justify-between items-center">
             <div>
               <div className="font-medium text-white">Radar_Design_Specs.pdf</div>
               <div className="text-sm text-slate-400 mt-1">Required: Clearance = Secret, Dept = R&D</div>
             </div>
             <button 
                onClick={handleRequestAccess}
                className="px-6 py-2 bg-secondary hover:bg-emerald-400 text-slate-900 font-semibold rounded-lg transition-colors"
              >
                Request Access
              </button>
          </div>

          {accessStatus === "granted" && (
            <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-lg flex items-start gap-3">
              <CheckCircle2 className="text-emerald-500 w-5 h-5 mt-0.5" />
              <div>
                <h4 className="text-emerald-500 font-medium">Access Granted</h4>
                <p className="text-sm text-emerald-400/80 mt-1">Smart contract logic evaluated successfully. Decryption keys provisioned.</p>
              </div>
            </div>
          )}

          {accessStatus === "denied" && (
            <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg flex items-start gap-3">
              <AlertCircle className="text-red-500 w-5 h-5 mt-0.5" />
              <div>
                <h4 className="text-red-500 font-medium">Access Denied</h4>
                <p className="text-sm text-red-400/80 mt-1">You do not meet the strict ABAC criteria required for this asset.</p>
              </div>
            </div>
          )}

        </section>
      </div>

      {/* Right Column - Audit Trail */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-lg h-fit">
        <h3 className="text-lg font-semibold mb-4 text-slate-300">Immutable Audit Trail</h3>
        <div className="space-y-3 font-mono text-sm">
          {logs.length === 0 ? (
            <div className="text-slate-600 italic">No blockchain events recorded yet...</div>
          ) : (
            logs.map((log, i) => (
              <div key={i} className="text-slate-400 border-l-2 border-primary/50 pl-3 py-1">
                {log}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
