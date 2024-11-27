// import React, { useEffect, useState } from "react";
// import { useFaucet } from "../context/ContractFactory";
// import { useAppKitAccount } from "@reown/appkit/react";

// const Faucets = () => {
//   const { address } = useAppKitAccount();
//   const {
//     faucets,
//     userFaucets,
//     totalContracts,
//     getTokenInfo,
//     claimFaucet,
//     getBalanceFromDeployedContract,
//   } = useFaucet();

//   const [tokenInfos, setTokenInfos] = useState({});
//   const [balances, setBalances] = useState({});

//   useEffect(() => {
//     faucets.forEach(async (faucet) => {
//       await handleGetTokenInfo(faucet.contract);
//     });
//   }, [faucets, userFaucets, totalContracts, address]);

//   const handleClaim = async (contractAddress) => {
//     await claimFaucet(contractAddress);
//   };

//   const handleGetTokenInfo = async (contractAddress) => {
//     const info = await getTokenInfo(contractAddress);
//     setTokenInfos((prevInfos) => ({
//       ...prevInfos,
//       [contractAddress]: info,
//     }));
//   };

//   const handleGetBalance = async (contractAddress) => {
//     try {
//       const balance = await getBalanceFromDeployedContract(contractAddress);
//       setBalances((prevBalances) => ({
//         ...prevBalances,
//         [contractAddress]: balance.toString(),
//       }));
      
//       console.log(`Balance updated for ${contractAddress}: ${balance}`);
//     } catch (error) {
//       console.error("Error getting balance:", error);
      
//     }
//   };

//   return (
//     <div className="min-h-screen bg-[#D1FAE5] rounded border-5 py-10 px-6">
//       <h1 className="text-3xl font-bold text-gray-800 text-center mb-10">
//         Faucet Dashboard
//       </h1>
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
//         {faucets.map((faucet, index) => {
//           const isDeployer =
//             address?.toLowerCase() === faucet.deployer.toLowerCase();
//           const tokenInfo = tokenInfos[faucet.contract];

//           return (
//             <div
//               key={index}
//               className="bg-white shadow-sm rounded-lg p-6 hover:shadow-md transition-shadow duration-200 flex flex-col justify-between h-full"
//             >
//               <div>
//                 <div className="flex items-start justify-between mb-4">
//                   <h2 className="text-2xl font-semibold text-gray-900">
//                     {tokenInfo?.name || `Faucet ${index + 1}`}
//                   </h2>
//                   <button
//                     onClick={() =>
//                       isDeployer
//                         ? handleGetBalance(faucet.contract)
//                         : handleClaim(faucet.contract)
//                     }
//                     className="w-20 h-10 rounded-full border-2 border-gray-200 flex items-center justify-center hover:border-gray-300 transition-colors"
//                     aria-label={isDeployer ? "Get Balance" : "Claim Tokens"}
//                   >
//                     <span className="sr-only">
//                       {isDeployer ? "Get Balance" : "Claim Tokens"}
//                     </span>
//                     {isDeployer ? "🥇" : "🪙"}
//                   </button>
//                 </div>
//                 <p className="text-lg text-gray-600 mb-4">
//                   {tokenInfo?.symbol || "Loading..."}
//                 </p>
//                 {balances[faucet.contract] && (
//                   <p className="text-sm text-gray-600 mt-2">
//                     <span className="font-semibold">Balance:</span>{" "}
//                     {balances[faucet.contract]}
//                   </p>
//                 )}
//                 <div className="text-sm text-gray-600 mb-4">
//                   <p className="mb-1">
//                     <span className="font-semibold">Contract:</span>{" "}
//                     {faucet.contract}
//                   </p>
//                   {isDeployer && (
//                     <p>
//                       <span className="font-semibold">Deployer:</span>{" "}
//                       {faucet.deployer}
//                     </p>
//                   )}
//                 </div>
//               </div>
//               <div className="flex flex-wrap gap-2 mt-4">
//                 {!isDeployer && (
//                   <button
//                     onClick={() => handleClaim(faucet.contract)}
//                     className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:ring focus:ring-blue-300 transition-colors"
//                   >
//                     Claim Tokens
//                   </button>
//                 )}
//                 {isDeployer && (
//                   <>
//                     <button
//                       onClick={() => handleGetTokenInfo(faucet.contract)}
//                       className="px-4 py-2 bg-[#D1FAE5] text-white rounded-md hover:bg-green-700 focus:ring focus:ring-green-300 transition-colors"
//                     >
//                       Get Token Info
//                     </button>
//                     <button
//                       onClick={() => handleGetBalance(faucet.contract)}
//                       className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 focus:ring focus:ring-gray-300 transition-colors"
//                     >
//                       Get Balance
//                     </button>
//                   </>
//                 )}
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// export default Faucets;


import React, { useEffect, useState } from "react";
import { useFaucet } from "../context/ContractFactory";
import { useAppKitAccount } from "@reown/appkit/react";

const Faucets = () => {
  const { address } = useAppKitAccount();
  const {
    faucets,
    userFaucets,
    totalContracts,
    getTokenInfo,
    claimFaucet,
    getBalanceFromDeployedContract,
  } = useFaucet();

  const [tokenInfos, setTokenInfos] = useState({});
  const [balances, setBalances] = useState({});

  useEffect(() => {
    faucets.forEach(async (faucet) => {
      await handleGetTokenInfo(faucet.contract);
    });
  }, [faucets, userFaucets, totalContracts, address]);

  const handleClaim = async (contractAddress) => {
    await claimFaucet(contractAddress);
  };

  const handleGetTokenInfo = async (contractAddress) => {
    const info = await getTokenInfo(contractAddress);
    setTokenInfos((prevInfos) => ({
      ...prevInfos,
      [contractAddress]: info,
    }));
  };

  const handleGetBalance = async (contractAddress) => {
    try {
      const balance = await getBalanceFromDeployedContract(contractAddress);
      setBalances((prevBalances) => ({
        ...prevBalances,
        [contractAddress]: balance.toString(),
      }));

      console.log(`Balance updated for ${contractAddress}: ${balance}`);
    } catch (error) {
      console.error("Error getting balance:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 to-indigo-800 text-white py-10 px-6 rounded-xl">
      <h1 className="text-4xl font-extrabold text-center mb-12">
        DLTAfrica Faucet Dashboard 👨‍💻
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {faucets.map((faucet, index) => {
          const isDeployer =
            address?.toLowerCase() === faucet.deployer.toLowerCase();
          const tokenInfo = tokenInfos[faucet.contract];

          return (
            <div
              key={index}
              className="bg-white text-gray-900 rounded-xl shadow-lg p-6 flex flex-col justify-between transition-transform hover:scale-105"
            >
              <div>
                <h2 className="text-2xl font-semibold mb-2">
                  {tokenInfo?.name || `Faucet ${index + 1}`}
                </h2>
                <p className="text-sm text-gray-500 mb-4">
                  Symbol: {tokenInfo?.symbol || "Loading..."}
                </p>
                <p className="text-sm text-gray-500 mb-4">
                  Contract: {faucet.contract}
                </p>
                {balances[faucet.contract] && (
                  <p className="text-sm font-medium">
                    Balance: {balances[faucet.contract]}
                  </p>
                )}
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {!isDeployer ? (
                  <button
                    onClick={() => handleClaim(faucet.contract)}
                    className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:ring focus:ring-indigo-300"
                  >
                    Claim Tokens
                  </button>
                ) : (
                  <>
                    <button
                      onClick={() => handleGetTokenInfo(faucet.contract)}
                      className="px-4 py-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-md shadow-md hover:shadow-lg hover:scale-105 focus:ring focus:ring-orange-300 transition-transform"
                    >
                      Get Token Info
                    </button>
                    <button
                      onClick={() => handleGetBalance(faucet.contract)}
                      className="px-4 py-2 bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-md shadow-md hover:shadow-lg hover:scale-105 focus:ring focus:ring-green-300 transition-transform"
                    >
                      Get Balance
                    </button>
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Faucets;

