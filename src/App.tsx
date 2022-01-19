import "./App.css";
import { useMemo,useState,useEffect } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.min.css';
import Minter from "./Minter";
import SwiperCore, { Navigation ,Autoplay} from "swiper";
import * as anchor from "@project-serum/anchor";
import { clusterApiUrl } from "@solana/web3.js";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import {
  getPhantomWallet,
  getSolflareWallet,
  getSolletWallet,
  getMathWallet,
} from "@solana/wallet-adapter-wallets";

import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";

import { WalletDialogProvider } from "@solana/wallet-adapter-material-ui";
import { ThemeProvider, createTheme } from "@material-ui/core";
import { nodeModuleNameResolver } from "typescript";

SwiperCore.use([Navigation,Autoplay]);
const theme = createTheme({
  palette: {
    type: "dark",
  },
});

const candyMachineId = process.env.REACT_APP_CANDY_MACHINE_ID
  ? new anchor.web3.PublicKey(process.env.REACT_APP_CANDY_MACHINE_ID)
  : undefined;

const network = process.env.REACT_APP_SOLANA_NETWORK as WalletAdapterNetwork;

const rpcHost = process.env.REACT_APP_SOLANA_RPC_HOST!;
const connection = new anchor.web3.Connection(rpcHost);


const startDateSeed = parseInt(process.env.REACT_APP_CANDY_START_DATE!, 10);

const txTimeout = 30000; // milliseconds (confirm this works for your project)

const App = () => {
  const endpoint = useMemo(() => clusterApiUrl(network), []);
  const wallets = useMemo(
    () => [getPhantomWallet(), getSolflareWallet(), getSolletWallet(), getMathWallet() ],
    []
  );
  const getWindowSize = () => ({
    innerHeight: window.innerHeight,
    innerWidth: window.innerWidth,
  });
  const [windowSize, setWindowSize] = useState(getWindowSize());
  const [slidesPerView, setSlidesPerView] = useState(4);
  const handleResize = () => {
    console.log(getWindowSize())
    setWindowSize(getWindowSize());
    if(getWindowSize().innerWidth>900){
      setSlidesPerView(4)
    }
    if(getWindowSize().innerWidth<900){
      setSlidesPerView(3)
    }
    if(getWindowSize().innerWidth<700){
      setSlidesPerView(2)
    }
  };
  useEffect(() => {
    
    // 监听
    window.addEventListener("resize", handleResize);
    // 销毁
    return () => window.removeEventListener("resize", handleResize);
  });
  function toggleMenu() {
    const menu = document.getElementById("mobileNavContainer")!;
    menu.classList.toggle("open-menu");
    console.log("pressed");
  }
  return (
    <div>
      
       
      <div id="mobileNavContainer" className="mobile-nav">
        <div className="mobile-nav-close-button" >
          <img src="/icons/close.svg" alt="" onClick={toggleMenu}/>
        </div>
        <ul>
          <li>
            <img className="mobile-nav-logo" src="/img/logo.png" alt="" />
          </li>
          <li>

            <a href="/#link1" onClick={toggleMenu}>
            MINT
            </a>
          </li>
          <li>
            <a href="/#link2" onClick={toggleMenu}>
              Link 2
            </a>
          </li>
          <li>
            <a href="/#link3" onClick={toggleMenu}>
              Link 3
            </a>
          </li>
          <li>
            <a href="/#link4" onClick={toggleMenu}>
              Link 4
            </a>
          </li>
          <li>
            <div className="social-icons">  
            <a href="https://www.baidu.com"><img className="nav-social" src="/icons/twitter.svg" alt="" /></a>            
            <a href="https://www.baidu.com"><img className="nav-social" src="/icons/discord.svg" alt="" /></a>            
            </div>
          </li>
        </ul>
      </div>
      <div className="mobile-menu-button" onClick={toggleMenu}>
        <img src="/icons/menu.svg" alt="" />
      </div>
      <nav>
      
        <div className="nav-container">
          <img className="nav-logo" src="/img/logo.png" alt="" />
          <a className="hide-800" href="/#link1">
          <script src="hello.js"></script>
            MINT
          </a>
          <a className="hide-800" href="/#link2">
            Link 2
          </a>
          <a className="hide-800" href="/#link3">
            Link 3
          </a>
          <a className="hide-800" href="/#link4">
            Link 4
          </a>
          <div className="social-icons hide-800">
          <a href="https://www.baidu.com"><img className="nav-social" src="/icons/twitter.svg" alt="" /></a>            
          <a href="https://www.baidu.com"><img className="nav-social" src="/icons/discord.svg" alt="" /></a>       
          </div>
        </div>
      </nav>
      <div className="content-wrapper">
          <header className="card" id="link1">
            <div style={{ padding: "0 24px 0 24px 0" }}>
              <h3 className="text-secondary-color">Welcome To</h3>
              <h1 className="pb-3">The Boiler Plate</h1>
              <p className="text-secondary-color">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
                scelerisque ipsum non est porta mollis. Donec sapien sapien, dictum
                eget enim sed, hendrerit semper orci. Donec ante magna, consequat at
                eros ac, eleifend dictum sem. Nam vitae condimentum lorem.
                Vestibulum molestie dui turpis, tincidunt porta sem congue nec.
              </p>
            </div>
            <div>
              <ThemeProvider theme={theme}>
                <ConnectionProvider endpoint={endpoint}>
                  <WalletProvider wallets={wallets} autoConnect>
                    <WalletDialogProvider>
                      
                        <Minter
                          candyMachineId={candyMachineId}
                          
                          connection={connection}
                          startDate={startDateSeed}
                          txTimeout={txTimeout}
                          rpcHost={rpcHost}
                        />
                      
                    </WalletDialogProvider>
                  </WalletProvider>
                </ConnectionProvider>
              </ThemeProvider>
            </div>
          </header>
          


          <div id="link2" className="container">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac velit
            aliquet, semper sapien sed, ornare augue. Phasellus sed velit interdum,
            sagittis metus quis, facilisis lectus. Cras sollicitudin purus at magna
            eleifend maximus. Nulla nec nulla in nunc maximus viverra in at mauris.
            Fusce sodales dolor nisi, et vehicula orci porta id. In placerat nunc
            sed erat lacinia tincidunt. Interdum et malesuada fames ac ante ipsum
            primis in faucibus. Vestibulum commodo eget metus vitae tempus. Aliquam
            pharetra mi at efficitur accumsan. Curabitur venenatis libero a ex
            porttitor, at auctor turpis hendrerit. Nam commodo, risus non consequat
            pretium, erat ante auctor purus, a cursus dolor erat at velit. Maecenas
            dignissim, dolor sed laoreet aliquam, tortor lacus faucibus urna, eget
            mattis massa sem ac dui. Nam semper hendrerit interdum. Etiam at dictum
            nisi.
          </div>

          <div id="link3" className="container card">
            <h1 className="pb-3">"WIZARD" COLLECTION ❤</h1>
            <Swiper
                spaceBetween={20}
                slidesPerView={slidesPerView}
                loop={true}
                observer={true}
                freeMode={true}
                speed={2000}
                autoplay={{
                  delay: 0,
                  stopOnLastSlide: false,
                  disableOnInteraction: true,
                }}
                onSlideChange={() => console.log('slide change')}
                onSwiper={
                  (swiper)=>{
                    //鼠标悬浮暂停效果
                    swiper.$el[0].addEventListener('mouseover',()=>swiper.autoplay.stop());
                    //鼠标移开后继续自动滚屏效果
                    swiper.$el[0].addEventListener('mouseleave',()=>swiper.autoplay.start());
                  }
                }
              >
                <SwiperSlide><img className="imgshow"  src="/img/1.jpg" alt="" /></SwiperSlide>
                <SwiperSlide><img className="imgshow" src="/img/2.jpg" alt="" /></SwiperSlide>
                <SwiperSlide><img className="imgshow" src="/img/3.jpg" alt="" /></SwiperSlide>
                <SwiperSlide><img className="imgshow" src="/img/4.jpg" alt="" /></SwiperSlide>
                <SwiperSlide><img className="imgshow" src="/img/5.jpg" alt="" /></SwiperSlide>
                <SwiperSlide><img className="imgshow" src="/img/6.jpg" alt="" /></SwiperSlide>
                <SwiperSlide><img className="imgshow" src="/img/7.jpg" alt="" /></SwiperSlide>
                <SwiperSlide><img className="imgshow" src="/img/8.jpg" alt="" /></SwiperSlide>
                <SwiperSlide><img className="imgshow" src="/img/9.jpg" alt="" /></SwiperSlide>
                <SwiperSlide><img className="imgshow" src="/img/10.jpg" alt="" /></SwiperSlide>
                <SwiperSlide><img className="imgshow" src="/img/11.jpg" alt="" /></SwiperSlide>
                <SwiperSlide><img className="imgshow" src="/img/12.jpg" alt="" /></SwiperSlide>
              </Swiper>
          </div>
          

          <div id="link4" className="container faq">
            <h1 style={{ padding: "0 0 24px 0" }}>FAQ</h1>
            <div>
              <h4>What is an NFT??</h4>
              <p>
              NFT is short for "non-fungible token." An NFT is an indivisible token capable of storing a digital file for a specific purpose. Thus, an NFT can represent a work of art, music album, or any other type of digital file.
              </p>
              <hr />
            </div>

            <div>
              <h4>What is Aiko?</h4>
              <p>
              Aiko is a waifu powered by Artificial Intelligence and the Solana Blockchain. Its first NFT collection is called "I'M AIKO" and will be available on October 26th.

The Aiko Project includes the I'M Aiko Collection, Aiko Master App (iOS & Android), Aiko.art, and Multi-chain collections.
              </p>

              <hr />
            </div>

            <div>
              <h4>Lorem ipsum?</h4>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                id metus id mauris tincidunt posuere. Vivamus neque odio, imperdiet
                vitae.
              </p>

              <hr />
            </div>
          </div>
      </div>
    </div>
  );
};

export default App;
