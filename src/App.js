// Imports
// ========================================================
import React, { useEffect, useState } from 'react'
import { useAccount, useConnect, useNetwork } from 'wagmi'

// Main Component
// ========================================================
const App = () => {
  // State / Props
  const [showConnections, setShowConnections] = useState(false);

  // Hooks
  // /**
  //  * 
  //  */
  // const [
  //   {
  //     data: { connector, connectors },
  //     error,
  //     loading,
  //   },
  //   connect,
  // ] = useConnect();

  const [
    {
      data: { connector, connectors },
      error,
      loading,
    },
    connect,
  ] = useConnect()

  /**
   * 
   */
   const [{ data: accountData }, disconnect] = useAccount({})

  /**
   * 
   */
   const [{ data: networkData }] = useNetwork();

  /**
   * Hides modal if account data is there
   */
  useEffect(() => {
    if (!accountData || loading) return;
    setShowConnections(false);
  }, [accountData, loading]);

  /**
   * Shows a modal to allow the user to connect
   */
  const onClickConnectWallet = async () => {
    setShowConnections(true);
  }

  /**
   * 
   */
  const onClickDisconnectWallet = () => {
    disconnect();
  };

  return <div>
    <main>
      <section className="w-full px-4">
        <div className="w-full max-w-md m-auto mt-48">
          {accountData 
            ? <div>
                <div className="text-center mb-2">
                  Connected to <strong>{networkData.chain?.name ?? networkData.chain?.id}{' '}</strong>
                  {networkData.chain?.unsupported && '(unsupported)'}
                </div>
                <code title={accountData?.address ?? 'Unknown Address'} className="bg-slate-300 mb-4 rounded-full pr-4 pl-10 w-full text-gray-700 h-10 leading-10 block relative text-ellipsis overflow-hidden">
                  <span className="w-4 h-4 block bg-slate-700 absolute left-4 top-0 bottom-0 my-auto"></span>
                  {accountData?.address ?? 'Unknown Address'}
                </code>
                <button onClick={onClickDisconnectWallet} className="h-11 w-full mb-4 px-4 rounded-lg bg-red-500 text-white font-semibold">Disconnect Wallet</button>
            </div>
          : <div>
            <button onClick={onClickConnectWallet} className="h-11 px-4 rounded-lg bg-blue-500 text-white font-semibold w-full">Connect Wallet</button></div>}
        </div>
      </section>
    </main>

    {/* MODAL */}
    {showConnections 
      ? <div className="fixed inset-0 bg-opacity-70 bg-black flex justify-center items-center">
          <div className="w-full max-w-xl p-8 rounded-2xl shadow-sm bg-white absolute">
            {connectors.map((x) => (
              <button className="w-full py-9" disabled={!x.ready} key={x.name} onClick={() => connect(x)}>
                <div className="w-12 h-12 block bg-slate-400 mb-3 mx-auto"></div>
                <h2 className="text-3xl font-bold text-black">{x.name}</h2>
                <p className="text-slate-400 text-lg">{!x.ready ? ' (unsupported)' : 'Connect to your MetaMask Wallet'}</p>
                {loading && x.name === connector?.name && 'Loading...'}
              </button>
            ))}
            <div>{error && (error?.message ?? 'Failed to connect')}</div>
          </div>
        </div>
      : null}
    {/* end MODAL */}
  </div>
}

// Exports
// ========================================================
export default App
