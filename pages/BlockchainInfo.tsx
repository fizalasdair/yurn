import React, { useState, useEffect } from 'react';
import { ethers, Signer, Wallet } from 'ethers';

const BlockchainInfo: React.FC = () => {
  const [provider, setProvider] = useState<ethers.providers.JsonRpcProvider | null>(null);
  const [transactionCount, setTransactionCount] = useState<number | null>(null);

  useEffect(() => {
    const connectToBlockchain = async (): Promise<void> => {
      try {
        const connectedProvider: ethers.providers.JsonRpcProvider = await ethers.getDefaultProvider();
        setProvider(connectedProvider);

        // Use the provider to get information about the connected account
        const signer: Signer = connectedProvider.getSigner();

        // Get the connected account's address
        const address: string = await signer.getAddress();

        // Get the transaction count for the connected account
        const count: number = await connectedProvider.getTransactionCount(address);
        setTransactionCount(count);
      } catch (error) {
        console.error('Error connecting to the blockchain:', error.message);
      }
    };

    connectToBlockchain();
  }, []);

  return (
    <div>
      <h2>Blockchain Information</h2>
      {provider ? (
        <div>
          <p>Connected to: {provider.connection?.url || 'N/A'}</p>
          {transactionCount !== null && (
            <p>Transaction Count: {transactionCount}</p>
          )}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default BlockchainInfo;
