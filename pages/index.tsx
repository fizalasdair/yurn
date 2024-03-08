import {
  useActiveClaimConditionForWallet,
  useAddress,
  useClaimConditions,
  useClaimerProofs,
  useClaimIneligibilityReasons,
  useContract,
  useContractMetadata,
  useTokenSupply,
  ConnectWallet,
  Web3Button,
  DropContract,
} from "@thirdweb-dev/react";
import { BigNumber, utils } from "ethers";
import Image from "next/image";
import { useMemo, useState, useEffect } from "react";
import styles from "../styles/Home.module.css";
import { parseIneligibility } from "../utils/parseIneligibility";
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BlockchainInfo from './BlockchainInfo'
import backg from './background.jpg'
import aboutp from './images/index/about.jpg'
import card1 from './images/index/card_1.png'
import card2 from './images/index/card_2.png'
import card3 from './images/index/card_3.png'
import card4 from './images/index/card_4.png'
import socialtwitter from './images/common/social_twitter.png'
import logo from './images/common/logo.png'
import { useGlobalState } from 'use-global-state-react';


toast.configure();

const Home = () => {

  const specificTime = new Date('2024-03-09T02:00:00').getTime();
  const currentTime = new Date().getTime();
  const initialTime = Math.max(0, Math.floor((specificTime - currentTime) / 1000));
    const [time, setTime] = useState(initialTime);


    useEffect(() => {
      const intervalId = setInterval(() => {
        setTime((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
      }, 1000);
  
      // Cleanup function to clear the interval on component unmount
      return () => clearInterval(intervalId);
    }, []);
  
    const formatTime = (seconds: number): string => {
      const hours = Math.floor(seconds / 3600);
      const minutes = Math.floor((seconds % 3600) / 60);
      const remainingSeconds = seconds % 60;
  
      return `${hours}:${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
    };
  
    // Use dangerouslySetInnerHTML to set the initial HTML content
    const initialHTML = `<h1>${formatTime(time)}</h1>`;
  

  let nbsp = "\u00A0"
  const url = "https://base.zkmemes.xyz/progress.php";
  const url2 = "https://base.zkmemes.xyz/post.php";
  const url3 = "https://base.zkmemes.xyz/updateineligibility.php"
  const url4 = "https://base.zkmemes.xyz/ineligiblelist.php"
  const url5 = "https://base.zkmemes.xyz/updateeligibility.php"
  const url6 = "https://base.zkmemes.xyz/eligiblelist.php"
  const url7 = "https://base.zkmemes.xyz/claimedlist.php"
  const tokenAddress = "0x78E3B821d5eEF560b841634ac4b7204e16A245f0";
  const { contract, isLoading: contractLoading, error:contractError } = useContract(tokenAddress, "token-drop");
  const address = useAddress();
  
  const [datam, setDatam] = useState([]);
  const [datamm, setDatamm] = useState([]);
  const [datammm, setDatammm] = useState([]);

  const [urlData, setUrlData] = useState([]);
  const fetchInfo = async () => {
    return await fetch(url).then((res) => res.json()
    ).then((d)=>setUrlData(d.progress))
  }
 


  const fetchInfo2 = async () => {
    try {
      const response = await fetch(url2+"?address="+address);

      if (!response.ok) {
        throw new Error('Failed to send data to PHP endpoint');
      }

      const responseData = await response.json();
      console.log('PHP response:', responseData);
    } catch (error) {
      console.error('Error sending data to PHP:', error);
    }
  };


  const updateIneligibility = async () => {
    try {
      const response = await fetch(url3+"?address="+address);

      if (!response.ok) {
        throw new Error('Failed to send data to PHP endpoint');
      }

      const responseData = response;
      console.log('PHP response:', responseData);
    } catch (error) {
      console.error('Error sending data to PHP:', error);
    }
  };

  const updateeligibility = async () => {
    try {
      const response = await fetch(url5+"?address="+address);

      if (!response.ok) {
        throw new Error('Failed to send data to PHP endpoint');
      }

      const responseData = response;
      console.log('PHP response:', responseData);
    } catch (error) {
      console.error('Error sending data to PHP:', error);
    }
  };


  // Trigger sendDataToPhp when yourValue changes


  const [quantity, setQuantity] = useState(1000000);
  const [showRef, setShowRef] = useState(false);
  const [claimed, setClaimed] = useState(false);
  const [eligible, setEligible] = useState(true);
  const [disableClaim, setDisableClaim] = useState(false);
  const { data: contractMetadata } = useContractMetadata(contract);

  const claimConditions = useClaimConditions(contract);
  const { data: activeClaimCondition, isLoading: activeClaimConditionForWalletLoading, error: activeClaimConditionForWalletError } = useActiveClaimConditionForWallet(contract, address);

  const activePhase = async () => await contract?.erc20.claimConditions.getActive();
{/*const claimerProofs = useClaimerProofs(contract, address || "");*/}
  const { data: claimerProofs, isLoading: claimerProofsLoading, error: claimerProofsError } = useClaimerProofs(contract, address ?? "");
{/*  const claimIneligibilityReasons = useClaimIneligibilityReasons(contract, {
    quantity,
    walletAddress: address || "",
  });*/}


  

  const claimedSupply = useTokenSupply(contract);

  const totalAvailableSupply = useMemo(() => {
    try {
      return BigNumber.from(activeClaimCondition?.availableSupply || 0);
    } catch {
      return BigNumber.from(1_000_000_000);
    }
  }, [activeClaimCondition?.availableSupply]);

  const numberClaimed = useMemo(() => {
    return BigNumber.from(claimedSupply.data?.value || 0).toString();
  }, [claimedSupply]);

  const numberTotal = useMemo(() => {
    const n = totalAvailableSupply.add(
      BigNumber.from(claimedSupply.data?.value || 0)
    );
    if (n.gte(1_000_000_000)) {
      return "";
    }
    return n.toString();
  }, [totalAvailableSupply, claimedSupply]);

  const priceToMint = useMemo(() => {
    if (quantity) {
      const bnPrice = BigNumber.from(
        activeClaimCondition?.currencyMetadata.value|| 0
      );
      return `${utils.formatUnits(
        bnPrice.mul(quantity).toString(),
        activeClaimCondition?.currencyMetadata.decimals || 18
      )} ${activeClaimCondition?.currencyMetadata.symbol}`;
    }
  }, [
    activeClaimCondition?.currencyMetadata.decimals,
    activeClaimCondition?.currencyMetadata.symbol,
    activeClaimCondition?.currencyMetadata.value,
    quantity,
  ]);


  
  

  const maxClaimable = useMemo(() => {
    let bnMaxClaimable;
    try {
      bnMaxClaimable = BigNumber.from(
        activeClaimCondition?.maxClaimableSupply || 0
      );
    } catch (e) {
      bnMaxClaimable = BigNumber.from(1_000_000_000);
    }

    let perTransactionClaimable;
    try {
      perTransactionClaimable = BigNumber.from(
        activeClaimCondition?.maxClaimablePerWallet || 0
      );
    } catch (e) {
      perTransactionClaimable = BigNumber.from(1_000_000_000);
    }

    if (perTransactionClaimable.lte(bnMaxClaimable)) {
      bnMaxClaimable = perTransactionClaimable;
    }

    const snapshotClaimable = claimerProofs?.maxClaimable;

    if (snapshotClaimable) {
      if (snapshotClaimable === "0") {
        // allowed unlimited for the snapshot
        bnMaxClaimable = BigNumber.from(1_000_000_000);
      } else {
        try {
          bnMaxClaimable = BigNumber.from(snapshotClaimable);
        } catch (e) {
          // fall back to default case
        }
      }
    }

    let max;
    if (totalAvailableSupply.lt(bnMaxClaimable)) {
      max = totalAvailableSupply;
    } else {
      max = bnMaxClaimable;
    }

    if (max.gte(1_000_000_000)) {
      return 1_000_000_000;
    }
    return max.toNumber();
  }, [
    claimerProofs?.maxClaimable,
    totalAvailableSupply,
    activeClaimCondition?.maxClaimableSupply,
    activeClaimCondition?.maxClaimablePerWallet,
  ]);

  const isSoldOut = useMemo(() => {
    try {
      return (
        (activeClaimCondition &&
          BigNumber.from(activeClaimCondition?.availableSupply || 0).lte(
            0
          )) ||
        numberClaimed === numberTotal
      );
    } catch (e) {
      return false;
    }
  }, [
    activeClaimCondition,
    activeClaimCondition?.availableSupply,
    !activeClaimConditionForWalletError,
    numberClaimed,
    numberTotal,
  ]);

  const canClaim = useMemo(() => {
    return (
      !activeClaimConditionForWalletError &&
      !isSoldOut
    );
  }, [
    activeClaimConditionForWalletError,
    !activeClaimConditionForWalletError,
    isSoldOut,
  ]);

  const isLoading = useMemo(() => {
    return activeClaimConditionForWalletLoading || !contract;
  }, [activeClaimConditionForWalletLoading, contract]);

  const buttonLoading = useMemo(
    () => {   
    return isLoading },
    [ isLoading]
  );
 

  const API_URL = "https://api.basescan.org/api?module=account&action=txlist&address="+address+"&startblock=0&endblock=99999999&page=1&offset=5&sort=asc&apikey=25TQF9ZS65X625DAHB12JP3IEXRZQ162F2";

  const fetchData = async (): Promise<any> => {
    try {
      const responsez = await fetch(API_URL);
      const datas = await responsez.json();
      if (datas.status === "1") {
        return datas.result;
      } else {
        throw new Error("API error");
      }
    } catch (error) {
      return null;
    }
  };
  


  const retryFetchData = async (): Promise<any> => {
    let retriesz = 50; // Number of retries
    let resultz = null;
  
    while (retriesz > 0) {
      resultz = await fetchData();
      if (resultz !== null) {
        // Successful response, break the loop
        break;
      } else {
        // Wait for 5 seconds before retrying
        await new Promise(resolve => setTimeout(resolve, 5000));
        retriesz--;
      }
    }
  
    return resultz;
  };

 


  const fetchDataAndProcess = async () => {
    const apiData = await retryFetchData();
  
    if (apiData !== null) {
      const numberOfObjects = apiData.length; // Count the number of objects
      console.log("Number of Objects:", numberOfObjects);
      return numberOfObjects;
    } else {
      console.error("Failed to fetch data after multiple retries");
    }
  };

  const fetchAndProcessData = async () => {
    try {
      fetch(url4)
      .then((response) => response.json())
      .then((jsonData) => setDatam(jsonData))
      .catch((error) => console.error('Error fetching data:', error));
      console.log(datam)

      fetch(url6)
      .then((response) => response.json())
      .then((jsonData) => setDatamm(jsonData))
      .catch((error) => console.error('Error fetching data:', error));
      console.log(datamm)

      fetch(url7)
      .then((response) => response.json())
      .then((jsonData) => setDatammm(jsonData))
      .catch((error) => console.error('Error fetching data:', error));
      console.log(datammm)


      const isValueInArray = datam.includes(address);
      const isValueInArray2 = datamm.includes(address);
       const isValueInArray3 = datammm.includes(address);
      console.log(datam.length)
       if (isValueInArray) {

        console.log("ineligibilty already preset")
        setDisableClaim(true);
        setEligible(false);
      } 
      if (isValueInArray2) {

        console.log("eligibilty already preset")

      } 
        if (!isValueInArray && datam.length!==0 && !isValueInArray2) {
      const numberOfObjects = await fetchDataAndProcess();
      console.log("Number of Objects:", numberOfObjects);
  
      // Adjust the condition based on your specific eligibility criteria
  
      if (numberOfObjects < 5) {
        setDisableClaim(true);
        setEligible(false);
        updateIneligibility();
      }      
      }

      if (!isValueInArray2 && datamm.length!==0 && !isValueInArray) {
        const numberOfObjects2 = await fetchDataAndProcess();
        console.log("Number of Objects2:", numberOfObjects2);
        if (numberOfObjects2 > 4) {
      
          updateeligibility();
        }}
        if (isValueInArray3) {
          setDisableClaim(true);
          setClaimed(true);
        
      }
    } catch (error) {
      // Handle errors here
      console.error("Error:", error);
    }
  };

  const buttonText = useMemo(() => {
    if (isSoldOut) {
      return `${nbsp} ${nbsp} ${nbsp}  ${nbsp} ${nbsp} ${nbsp}  ${nbsp} ${nbsp}  ${nbsp} ${nbsp} Loading.. ${nbsp} ${nbsp}   ${nbsp} ${nbsp} ${nbsp}  ${nbsp} ${nbsp} ${nbsp}  ${nbsp} ${nbsp}  ${nbsp} `;
    }


    if (claimed) {
      return `${nbsp} ${nbsp} ${nbsp}  ${nbsp} ${nbsp} ${nbsp}  ${nbsp} ${nbsp}  ${nbsp}   Claimed ${nbsp}  ${nbsp}  ${nbsp}  ${nbsp}  ${nbsp}  ${nbsp}  ${nbsp} ${nbsp} ${nbsp}     `;
    }

    if (canClaim) {
      const pricePerToken = BigNumber.from(
        activeClaimCondition?.currencyMetadata.value || 0
      );
      if (pricePerToken.eq(0)) {
        return "";
      }
      return `${nbsp} ${nbsp} ${nbsp}  ${nbsp} ${nbsp} ${nbsp}  ${nbsp} ${nbsp}  ${nbsp}   Claim Airdrop ${nbsp}  ${nbsp}  ${nbsp}  ${nbsp}  ${nbsp}  ${nbsp}  ${nbsp} ${nbsp} ${nbsp}     `;
    }

    
 
    if (buttonLoading) {
      return `${nbsp} ${nbsp} ${nbsp}  ${nbsp} ${nbsp} ${nbsp}  ${nbsp} ${nbsp}  ${nbsp} ${nbsp} Loading.. ${nbsp} ${nbsp}   ${nbsp} ${nbsp} ${nbsp}  ${nbsp} ${nbsp} ${nbsp}  ${nbsp} ${nbsp}  ${nbsp}`;
    }

    return "Claiming not available";
  }, [
    isSoldOut,
    claimed,
    canClaim,
    buttonLoading,
    activeClaimCondition?.currencyMetadata.value,
    priceToMint,
    quantity,
   
   
    
  ]);



  useEffect(() => {
    fetchInfo();
    fetchAndProcessData();
  }, [contract,address]);
 
  return (
    <>
    <div className="wrapper">

      

{(claimConditions.data &&
        claimConditions.data.length > 0 &&
        activeClaimConditionForWalletError) ||
        (activeClaimCondition &&
          activeClaimCondition.startTime > new Date() && (
            <p>Drop is starting soon. Please check back later.</p>
          ))}

      {claimConditions.data?.length === 0 ||
        (claimConditions.data?.every((cc) => cc.maxClaimableSupply === "0") && (
          <p>
            This drop is not ready to be minted yet. (No claim condition set)
          </p>
        ))}
<div data-v-0432a827="" className="header">
<div data-v-0432a827="" className="inner">
<a data-v-0432a827="" href="#" className="logo router-link-exact-active router-link-active">
<img data-v-0432a827="" src={logo.src} alt="" />
</a>
<div data-v-0432a827="" className="menu">
<a data-v-0432a827="" href="#" className="router-link-exact-active router-link-active">Home</a>
<a data-v-0432a827="" href="#" className="">LP</a>
<a data-v-0432a827="" href="#" className="">Earn</a>
<a data-v-0432a827="" href="#" className="">Lucky Drop</a>
<a data-v-0432a827="" href="#" className="">Rewards</a>

<a data-v-0432a827="" href="#">DAO</a>
</div>











<div data-v-0432a827="" className="walletAccount">




    {isLoading ? (
       <button className=" tw-connect-wallet css-1un3lp3" type="button" style={{
        minWidth: "140px"}}>Loading...</button>
      ) : (
        <>
        <ConnectWallet data-v-0432a827=""  />



   
        </>
      )}

</div> 













  








</div>
<div data-v-0432a827="" className="mobileMask">
</div>
<div data-v-0432a827="" className="slideMask">
</div>
<div data-v-0432a827="" className="slideWrapper">
<div data-v-0432a827="" className="slide">
<a data-v-0432a827="" href="#" className="closeBtn">
</a>
<div data-v-0432a827="" className="nav">
<a data-v-0432a827="" href="#">Home</a>
<a data-v-0432a827="" href="#">LP</a>
<a data-v-0432a827="" href="#">Earn</a>
<a data-v-0432a827="" href="#">Lucky Drop</a>
<a data-v-0432a827="" href="#">Rewards</a>

<a data-v-0432a827="" href="#">DAO</a>
</div>
</div>
</div>

</div>
<div className="pages">
<div data-v-6566204c="" className="index">
<div data-v-6566204c="" className="banner" 
style={{
background: `url(${backg.src}) center 70px no-repeat`,
backgroundSize: "780px auto",
padding: "70px 0 0 0",
}}>
<div data-v-6566204c="" className="description">Proudly Launched on Base</div>
<h2 data-v-6566204c="">Co-built by the Base community</h2>
</div>
<div data-v-6566204c="" className="section">
<div data-v-61401fb6="" data-v-6566204c="" className="inner">
<div data-v-61401fb6="" className="main">
<div data-v-61401fb6="" className="info">
<h3 data-v-61401fb6="">You can claim BASEDOGE now!</h3>
<p data-v-61401fb6="">A total of 100,000,000 BASEDOGE tokens are now available to be claimed by those who have made transactions on L2 Mainnets.</p>
<p data-v-61401fb6=""></p>
</div>
<div data-v-61401fb6="" className="times">
<div data-v-61401fb6ƒimg="" className="box">
<img data-v-61401fb6="" src={require("./images/index/icon_time.png")} alt="" />
<span data-v-61401fb6="">2024.03.08 11:00:00 AM - 2024.03.09 02:00:00 AM</span>
<h1>{}</h1>
<div dangerouslySetInnerHTML={{ __html: initialHTML }} />

</div>
</div>
<div data-v-61401fb6="" className="progress">
<div data-v-61401fb6="" className="title">
<span data-v-61401fb6="">Received</span>
<span data-v-61401fb6="">1,000,000</span>
</div>
<div data-v-61401fb6="" className="progressBar">
<div data-v-61401fb6="" className="progressBarInner"
style={{
width: `${urlData ? urlData : 0}%`,}}>

</div>
</div>
</div>
<div data-v-61401fb6="" className="input">{quantity}</div>




<div data-v-61401fb6="" className="btns">


<Web3Button
         className="btn-action"
          contractAddress={tokenAddress}
          isDisabled= {disableClaim}
          style={{
            minWidth: "282px",
            color: "white",
            maxHeight: "43px",
           


          }}
          
          action={(contract) => contract.erc20.claim(quantity)}
          onSuccess={() => {
            setClaimed(true);
            fetchInfo();
            fetchInfo2();
            fetchAndProcessData();
            toast.success("Claimed Successfully", {
              // Set to 15sec
              position: toast.POSITION.BOTTOM_RIGHT, autoClose:15000})
            }
          }
          onError={(err) => {toast.error("Insufficient Gas or Transaction Cancelled", {
            // Set to 15sec
            
            position: toast.POSITION.BOTTOM_RIGHT, autoClose:15000}); console.log(err);}}
        >
          {eligible ? buttonText : "Sorry You Are Not Eligible"}
        </Web3Button>


        <br />



<a data-v-61401fb6="" className="btn-action" 
onClick={(e) => address ? setShowRef(!showRef) : toast.error("Wallet Not Connected", {
  // Set to 15sec
  position: toast.POSITION.BOTTOM_LEFT, autoClose:6000})} >
<span data-v-61401fb6="" >Invite Friends</span>
</a>
</div> <br />
<div id="inviteLink" data-v-61401fb6="" className="input" 
style={{
wordBreak: "break-word",
display: "flex",}}> {showRef ? "doge.onbased.xyz?ref="+address : "-"} </div>
</div>
</div>
</div>
<div data-v-6566204c="" className="section about">
<div data-v-6566204c="" className="inner">
<div data-v-6566204c="" className="image">
<img data-v-6566204c="" src={aboutp.src} alt="" />

</div>
<div data-v-6566204c="" className="content">
<h3 data-v-6566204c="">What is BASEDOGE?</h3>
<div data-v-6566204c="" className="desc">
<p data-v-6566204c="">BASEDOGE is a deflationary token. It will be used by BASEDOGE ecosystem applications. BASEDOGE belongs to everyone in the Base community and is also a necessary key to unlock the future chapters of the BASEDOGE story.</p>
<p data-v-6566204c="">BASEDOGE has 15% burning tax, so adjusting your slippage tolerance to around 20% is suggested when buying/selling to ensure your successful transactions. Every time you buy BASEDOGE, you will receive a Lucky Drop ticket with a chance to win an OP prize based on the purchase amount. You can also stake your BASEDOGE to earn more. </p>
</div>
<div data-v-6566204c="" className="address"></div>
<div data-v-6566204c="" className="btns">
{/*<a data-v-6566204c="" target="_blank" rel="noreferrer" href="https://app.uniswap.org/#/swap?outputCurrency=0xc35457E32E6fCD8d32019D3A46bc2ECC25FAAb87" className="btn-action">*/}
<a data-v-6566204c="" rel="noreferrer" href="#" className="btn-action">
<span data-v-6566204c="">Buy BASEDOGE</span>
</a>
<a data-v-6566204c=""  rel="noreferrer" href="#" className="btn-action outli">
<span data-v-6566204c="">View On Dexscreener</span>

</a>
</div>
</div>
</div>
</div>
<div data-v-6566204c="" className="section allocation">
<div data-v-6566204c="" className="inner">
<div data-v-6566204c="" className="topTitle">
<h3 data-v-6566204c="">Token Allocation &amp; Funds Distribution</h3>
</div>
<div data-v-6566204c="" className="content">
<div data-v-6566204c="" className="image pc">

</div>
<div data-v-6566204c="" className="image mobile">

</div>
</div>
</div>
</div>
<div data-v-6566204c="" className="section">
<div data-v-6566204c="" className="inner">
<div data-v-6566204c="" className="burn">
<div data-v-6566204c="" className="content">
<div data-v-6566204c="" className="title">Burn Statistics</div>
<div data-v-6566204c="" className="list">
<div data-v-6566204c="" className="item">
<div data-v-6566204c="" className="tit">Total BASEDOGE Destroyed</div>
<div data-v-6566204c="" className="value">1B</div>
</div>
<div data-v-6566204c="" className="item">
<div data-v-6566204c="" className="tit">Amount of Burned BASEDOGE (%)</div>
<div data-v-6566204c="" className="value">10%</div>
</div>
<div data-v-6566204c="" className="item full">
<div data-v-6566204c="" className="tit">Destroyed Address</div>
<div data-v-6566204c="" className="value">
<a data-v-6566204c="" target="_blank" rel="noreferrer" href="https://arbiscan.io/token/0xF1A82bfA7fCEb8B8741e7E04a6B8EfD348cA6393?a=0x000000000000000000000000000000000000dEaD">0x000000000000000000000000000000000000dEaD</a>
</div>
</div>
</div>
</div>
<div data-v-6566204c="" className="image">
<img data-v-6566204c="" src="images/index/burn.png" alt="" />
</div>
</div>
</div>
</div>
<div data-v-6566204c="" className="section statistics">
<div data-v-6566204c="" className="topTitle">
<h3 data-v-6566204c="">Statistics</h3>
<p data-v-6566204c="">Join the industry leaders to discuss where the markets are heading. We accept token payments.</p>
</div>
<div data-v-6566204c="" className="list">
<div data-v-6566204c="" className="item">
<div data-v-6566204c="" className="number">10B</div>
<div data-v-6566204c="" className="title">BASEDOGE Total Supply</div>
</div>
<div data-v-6566204c="" className="item">
<div data-v-6566204c="" className="number">3B</div>
<div data-v-6566204c="" className="title">BASEDOGE Currency Supply</div>
</div>
<div data-v-6566204c="" className="item">
<div data-v-6566204c="" className="number">1B</div>
<div data-v-6566204c="" className="title">BASEDOGE Total Burn</div>
</div>
<div data-v-6566204c="" className="item">
<div data-v-6566204c="" className="number">443K</div>
<div data-v-6566204c="" className="title">BASEDOGE Trading Volume</div>
</div>
<div data-v-6566204c="" className="item">
<div data-v-6566204c="" className="number">113K</div>
<div data-v-6566204c="" className="title">Lucky Drop Reward $ETH</div>
</div>
<div data-v-6566204c="" className="item">
<div data-v-6566204c="" className="number">98K</div>
<div data-v-6566204c="" className="title">BASEDOGE Accumulated $ETH</div>
</div>
</div>
</div>
<div data-v-6566204c="" className="section function">
<div data-v-6566204c="" className="inner">
<div data-v-6566204c="" className="list">
<div data-v-6566204c="" className="item done">
<a data-v-6566204c="" href="#" className="">
<div data-v-6566204c="" className="image">
<img data-v-6566204c="" src={card1.src} alt="" />
</div>
<div data-v-6566204c="" className="info">
<div data-v-6566204c="" className="title">BASEDOGE</div>
<div data-v-6566204c="" className="state">Get started</div>
</div>
</a>
</div>
<div data-v-6566204c="" className="item done">
<a data-v-6566204c="" href="#" className="">
<div data-v-6566204c="" className="image">
<img data-v-6566204c="" src={card2.src} alt="" />
</div>
<div data-v-6566204c="" className="info">
<div data-v-6566204c="" className="title">REWARDS</div>
<div data-v-6566204c="" className="state">Get started</div>
</div>
</a>
</div>
<div data-v-6566204c="" className="item">
<a data-v-6566204c="" href="#">
<div data-v-6566204c="" className="image">
<img data-v-6566204c="" src={card3.src} alt="" />
</div>
<div data-v-6566204c="" className="info">
<div data-v-6566204c="" className="title">NFT Prologue</div>
<div data-v-6566204c="" className="state">Coming soon...</div>
</div>
</a>
</div>
<div data-v-6566204c="" className="item">
<a data-v-6566204c="" href="#">
<div data-v-6566204c="" className="image">
<img data-v-6566204c="" src={card4.src} alt="" />
</div>
<div data-v-6566204c="" className="info">
<div data-v-6566204c="" className="title">BASEDOGE Vault</div>
<div data-v-6566204c="" className="state">Coming soon...</div>
</div>
</a>
</div>
</div>
</div>
</div>
</div>
</div>
<div data-v-3050a45e="" className="footer">
<div data-v-3050a45e="" className="content">
<h3 data-v-3050a45e="">Base Chads always work grind and stay focused. This is the most tight knit community </h3>
<div data-v-3050a45e="" className="social">
<a data-v-3050a45e="" target="_blank" rel="noreferrer" href="#">
<img data-v-3050a45e="" src={socialtwitter.src} alt="" />
</a>


</div>
</div>
<div data-v-3050a45e="" className="inner">
<div data-v-3050a45e="" className="infomation">
<div data-v-3050a45e="" className="info">

<div data-v-3050a45e="" className="illustrate">Base BASEDOGE, an Experiment in the Base Ecosystem.</div>
</div>
<div data-v-3050a45e="" className="navigation">
<div data-v-3050a45e="" className="item">
<div data-v-3050a45e="" className="title">Resources</div>
<a data-v-3050a45e="" target="_blank" rel="noreferrer" href="#">Whitepaper</a>
<a data-v-3050a45e="" target="_blank" rel="noreferrer" href="#">FAQs</a>
</div>
<div data-v-3050a45e="" className="item">
<div data-v-3050a45e="" className="title">Products</div>
<a data-v-3050a45e="" href="#" className="">Lucky Drop</a>
<a data-v-3050a45e="" href="#" className="">Earn</a>
<a data-v-3050a45e="" href="#" className="">Rewards</a>
</div>
<div data-v-3050a45e="" className="item">
<div data-v-3050a45e="" className="title">Press</div>
<a data-v-3050a45e="" target="_blank" rel="noreferrer" href="#">Terms of Use</a>
<a data-v-3050a45e="" target="_blank" rel="noreferrer" href="#">Privacy Policy</a>
<a data-v-3050a45e="" target="_blank" rel="noreferrer" href="#">Brand</a>
</div>
</div>
</div>
</div>
<div data-v-3050a45e="" className="copyright"> © 2023 Base BASEDOGE. All right reserved.</div>
</div>
</div>

    
    </>
    

  );
};

export default Home;
