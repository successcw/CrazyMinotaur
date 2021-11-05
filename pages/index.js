import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import {useState, useEffect} from 'react'
import Web3 from "web3"
import {ADDRESS, ABI} from "../ABI.js"

export default function Home() {

  const [signedIn, setSignedIn] = useState(false)

  const [walletAddress, setWalletAddress] = useState(null)

/*
  useEffect(async() => {
      signIn()
  }, [])
*/
  async function signIn() {
      if (typeof window.web3 != 'undefined') {
          window.web3 =  new Web3(window.ethereum);
      } else {
          alert("No Ethereum interface injected into browser");
      }

      window.ethereum.enable()
        .then(function(accounts) {
          window.web3.eth.net.getNetworkType()
            .then((network) => {if(network != "rinkeby"){alert("you are on " + network + " network, please change to rinkeby")}});
          setWalletAddress(accounts[0]);
          setSignedIn(true);
        })
      .catch(function(error) {
        console.error(error)
      })
  }

  async function signOut() {
      setSignedIn(false)
  }

  async function mint() {
      if (signedIn) {
          const MinotaurContract = new window.web3.eth.Contract(ABI, ADDRESS);
          const price = await MinotaurContract.methods.crazyMinotaurPrice().call();

          const gasAmount = await MinotaurContract.methods.mint(1).estimateGas({from: walletAddress, value: price});
          console.log("estimated gas", gasAmount);

          console.log({from: walletAddress, value: price});

          /*
          MinotaurContract.methods.burn(0)
                    .send({from: walletAddress, gas: String(gasAmount)});
            */
          MinotaurContract.methods.mint(1)
                    .send({from: walletAddress, value: price, gas: String(gasAmount)})
                    .on('transactionHash', function(hash){
                        console.log("transactionHash", hash)
                    })
      } else {
          alert("please connect Metamask first");
      }

  };

  return (
    <div className={styles.container}>
      <Head>
        <title>CrazyMinotaur</title>
        <meta name="description" content="CrazyMinotaur team" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to CrazyMinotaur!
        </h1>

        <p className={styles.description}>
          Every Minotaur is unique with different name, strength and wisdom. Enjoy it!
        </p>

        <div className={styles.grid}>
          <div className={styles.card}>
            <p>Asterion</p>
            <Image src="/minotaur_1.png" alt="Asterion" width={490} height={340} />
          </div>
          <div className={styles.card}>
            <p>Erinyes</p>
            <Image src="/minotaur_2.png" alt="Erinyes" width={490} height={340} />
          </div>
          <div className={styles.card}>
            <p>Ferdinand</p>
            <Image src="/minotaur_3.png" alt="Ferdinand" width={490} height={340} />
          </div>

        </div>

        <div>
          {!signedIn ? <button onClick={signIn} className={styles.button_1}> Connect Metamask </button> :
              <button onClick={signOut} className={styles.button_1}> Metamask Connected: {walletAddress} </button>}
        </div>
        <div>
          <button onClick={mint} className={styles.button_2}> Mint 1 CrazyMinotaur </button>
        </div>
      </main>

      <footer className={styles.footer}>
          Powered by CrazyMinotaur Co.
      </footer>
    </div>
  )
}
