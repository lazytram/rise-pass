"use client";

import { useState, useEffect, useCallback } from "react";
import { getContractAddress } from "../lib/config";

export default function ContractStatus() {
  const [status, setStatus] = useState<string>("Checking...");
  const [totalSupply, setTotalSupply] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [debugInfo, setDebugInfo] = useState<string[]>([]);
  const [hasChecked, setHasChecked] = useState(false);

  const contractAddress = getContractAddress();

  const addDebugInfo = useCallback((info: string) => {
    setDebugInfo((prev) => [...prev, `${new Date().toISOString()}: ${info}`]);
  }, []);

  const checkContractStatus = useCallback(async () => {
    if (hasChecked) return; // Éviter les vérifications multiples

    setDebugInfo([]);

    if (!contractAddress) {
      setStatus("❌ No contract address configured");
      addDebugInfo("No contract address found in environment");
      addDebugInfo(
        `Environment variable: ${
          process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || "undefined"
        }`
      );
      setHasChecked(true);
      return;
    }

    addDebugInfo(`Contract address: ${contractAddress}`);
    addDebugInfo("Starting API test...");

    try {
      setStatus("🔍 Checking contract...");

      // Test simple de l'API
      const response = await fetch(
        `/api/passport?contractAddress=${contractAddress}`
      );

      addDebugInfo(`API response status: ${response.status}`);

      if (response.ok) {
        const data = await response.json();
        setTotalSupply(data.totalSupply || 0);
        setStatus(
          `✅ Contract connected! Total supply: ${data.totalSupply || 0}`
        );
        addDebugInfo(`Successfully retrieved data: ${JSON.stringify(data)}`);
      } else {
        const errorData = await response.json();
        setError(errorData.error || "Unknown error");
        setStatus(`❌ API Error: ${errorData.error || "Unknown error"}`);
        addDebugInfo(`API error response: ${JSON.stringify(errorData)}`);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error";
      setError(errorMessage);
      setStatus(`❌ Connection failed: ${errorMessage}`);
      addDebugInfo(`Exception caught: ${errorMessage}`);
      addDebugInfo(`Error type: ${err?.constructor?.name || "Unknown"}`);
    } finally {
      setHasChecked(true);
    }
  }, [contractAddress, addDebugInfo, hasChecked]);

  // Vérifier le statut une seule fois au montage
  useEffect(() => {
    if (!hasChecked) {
      checkContractStatus();
    }
  }, [checkContractStatus, hasChecked]);

  // Fonction de rafraîchissement manuel
  const handleRefresh = useCallback(async () => {
    setHasChecked(false);
    setStatus("Checking...");
    setError(null);
    setTotalSupply(null);
    await checkContractStatus();
  }, [checkContractStatus]);

  return (
    <div className="bg-white/5 border border-white/10 rounded-lg p-6 mb-6">
      <h3 className="text-lg font-semibold text-white mb-4">Contract Status</h3>

      <div className="space-y-3">
        <div className="flex justify-between">
          <span className="text-white/70">Contract Address:</span>
          <span className="text-white font-mono text-sm">
            {contractAddress
              ? `${contractAddress.slice(0, 6)}...${contractAddress.slice(-4)}`
              : "Not configured"}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-white/70">Status:</span>
          <span
            className={
              status.includes("✅")
                ? "text-green-400"
                : status.includes("❌")
                ? "text-red-400"
                : "text-yellow-400"
            }
          >
            {status}
          </span>
        </div>

        {totalSupply !== null && (
          <div className="flex justify-between">
            <span className="text-white/70">Total Supply:</span>
            <span className="text-white">{totalSupply}</span>
          </div>
        )}

        {error && (
          <div className="mt-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg">
            <p className="text-red-400 text-sm">Error: {error}</p>
          </div>
        )}

        {/* Debug Information */}
        <div className="mt-4">
          <details className="text-sm">
            <summary className="text-white/70 cursor-pointer hover:text-white">
              Debug Information
            </summary>
            <div className="mt-2 space-y-1">
              {debugInfo.map((info, index) => (
                <div key={index} className="text-white/50 font-mono text-xs">
                  {info}
                </div>
              ))}
            </div>
          </details>
        </div>

        {/* Refresh Button */}
        <div className="mt-4 pt-4 border-t border-white/10">
          <button
            onClick={handleRefresh}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
          >
            🔄 Refresh Status
          </button>
        </div>
      </div>
    </div>
  );
}
