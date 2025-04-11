import './styles/styles.css'

import avatar from './images/avatar.jpg'
// import Sword from './images/sword.tsx'
// import Totem from './images/totem.tsx'
import Arrow from './images/arrow.tsx'
import YoutubeLogo from './images/YouTube-Icon.tsx'
import SteamLogo from './images/steam.tsx'
import TelegramLogo from './images/telegram-logo.tsx'
import DiscordLogo from './images/discord-logo.tsx'
import TextTyper from './components/textTyper'
import VolumeButtonOn from './images/volume-button-on.tsx'
import VolumeButtonOff from './images/volume-button-off.tsx'
import ButtonBack from './images/button-back.tsx'
import ButtonForward from './images/button-forward.tsx'
import ButtonPause from './images/button-pause.tsx'
import ButtonPlay from './images/button-play.tsx'
import Progress from './components/progress.tsx'
import TikTok from './images/ticTok.tsx'
import { useState , useRef} from 'react'

import musicArr from '../public/music/data.ts'

function App() {
  const [musicPlayer, setMusicPlayer] = useState({
    currentTimeStr:"0.00",
    currentTimeNum:0,
    isPlaying:false,
    isVolumeOn:true,
    musicId:0,
    progressProcent:0,
  });
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audio: HTMLAudioElement | null = audioRef.current;


  function chVolume(){
    setMusicPlayer((prev) => ({ ...prev, isVolumeOn: !prev.isVolumeOn }));
    if(musicPlayer.isVolumeOn){
      if(audio){
        audio.volume = 0;
      }
    }else{
      if(audio){
        audio.volume = 1;
      }
    }
  }

  function togglePlayPause(){
    if (audioRef.current) {
      if (musicPlayer.isPlaying) {
          audioRef.current.pause();
      } else {
          audioRef.current.play();
      }
      setMusicPlayer((prev) => ({ ...prev, isPlaying: !prev.isPlaying }));
    }
  }

  function updateProgress(){
    const minutes:number = Math.floor(Math.trunc((audio?.currentTime ?? 0)) / 60);
    const seconds = Math.trunc((audio?.currentTime ?? 0)) % 60; 
    let currentTime:string
    if(seconds<10){
      currentTime = `${minutes}.0${seconds}`
    }else{
      currentTime = `${minutes}.${seconds}`
    }

    setMusicPlayer({...musicPlayer, 
      currentTimeStr: currentTime,
      progressProcent: (Number(currentTime) / musicArr[musicPlayer.musicId].duration) * 100
    });
  }

  function toggleBack(){
    if(musicPlayer.musicId !== 0){
      setMusicPlayer({...musicPlayer,  musicId:musicPlayer.musicId-1});
    }
  }

  function toggleForward(){
    if(musicPlayer.musicId + 1 !== musicArr.length){
      setMusicPlayer({...musicPlayer,  musicId:musicPlayer.musicId+1});
    }
  }

  function setProgress(currentProgress:number){
    const [minutes, fraction] = String(musicArr[musicPlayer.musicId].duration).split('.').map(Number); // Разделяем на целую и дробную части
    const seconds = (minutes * 60) + fraction;
    const newTime = Math.trunc((seconds * currentProgress)/100);

    if(audio){
      audio.currentTime  = newTime;
    }
    
  }

  return (
    <>
      <main className="bio">
        <div className="container">
          <section className="hero">
            <div className="hero__header">
              <img src={avatar} alt="" className="hero__header-avatar" />
            </div>
            <div className="hero__body">
              <div className="hero__info">
                <div className="hero__info-wrapper">
                  <div className="hero__info-visitors">
                    <p>2837</p>
                  </div>
                  {/* <div className="hero__info-compliments">
                    <div className="hero__info-compliment">
                      <Sword/>
                    </div>
                    <div className="hero__info-compliment">
                      <Totem/>
                    </div>
                  </div> */}
                </div>
              </div>
              <div className="hero__greetings">
                <h1 className="hero__greetings-header">What is skwwq?</h1>
                <div className="hero__text-wraper">
                  <TextTyper/>
                </div>
              </div>
              <ul className="hero__links">
                <a href="https://www.tiktok.com/@skwwq52?_t=ZM-8uxcbP0XPIj&_r=1">
                  <li className="hero__link link-image">
                    <TikTok/>
                  </li>
                </a>
                <a href="https://steamcommunity.com/profiles/76561199477059396/">
                  <li className="hero__link link-image">
                    <SteamLogo/>
                  </li>
                </a>
                {/* <a href="">
                  <li className="hero__link link-image">
                    <TelegramLogo/>
                  </li>
                </a> */}
                <a href="https://discord.gg/U3xzqKpHvS">
                  <li className="hero__link link-image">
                    <DiscordLogo/>
                  </li>
                </a>
              </ul>
            </div>
          </section>
          <section className="links">
            <div className="links__item">
              <a href="https://www.youtube.com/@skwwq52">
                <div className="links__image link-image">
                  <YoutubeLogo/>
                </div>
                <div className="links__wrapper">
                  <p className="links__text"> Youtube</p>
                  <div className="links__arrow">
                    <Arrow/>
                  </div>
                </div>
              </a>
            </div>
            <div className="links__item">
              <a href="https://t.me/sswkqq">
                <div className="links__image link-image">
                  <TelegramLogo/>
                </div>
                <div className="links__wrapper">
                  <p className="links__text"> Telegram</p>
                  <div className="links__arrow">
                    <Arrow/>
                  </div>
                </div>
              </a>
            </div>
          </section>
          <section className="music">
          <audio ref={audioRef} src={musicArr[musicPlayer.musicId].path}  onTimeUpdate={updateProgress}/>
            <div className="music__volume">
              <button className="music__button" onClick={chVolume}>
                <div className="music__volume-image">
                  {musicPlayer.isVolumeOn ? <VolumeButtonOn/> : <VolumeButtonOff/> }
                </div>
              </button>
            </div>
            <div className="music__name">
              <p>{musicArr[musicPlayer.musicId].name}</p>
            </div>
            <div className="music__player">
              <div className="music__progress">
                <div className="music__current-time">
                  <p>{musicPlayer.currentTimeStr}</p>
                </div>
                {/* <div className="music__progress-wrapper">
                  <div className="music__progress-inner" style={{width: `${musicPlayer.progressProcent}%`}}>
                  </div>
                  {/* <div className="music__progress-indicator" style={{left: `${musicPlayer.progressProcent}%`}}>
                  </div> */}
               {/*} </div> */}
                <Progress setCurrentProgress={setProgress} audio={audio} isPlaying={musicPlayer.isPlaying}/>
                <div className="music__total-time">
                  {musicArr[musicPlayer.musicId].duration}
                </div>
              </div>
              <div className="music__controls">
                <div className="music__controls-back">
                  <button className="music__button" onClick={toggleBack}>
                    <div className="music__controls-back-image music__controls-button">
                      <ButtonBack/>
                    </div>
                  </button>
                </div>
                <div className="music__controls-pause">
                  <button className="music__button" onClick={togglePlayPause}>
                    <div className="music__controls-pause-image music__controls-button">
                      {musicPlayer.isPlaying ? <ButtonPause/> : <ButtonPlay/>  }
                    </div>
                  </button>
                </div>
                <div className="music__controls-forward">
                  <button className="music__button" onClick={toggleForward}>
                    <div className="music__controls-forward-image music__controls-button">
                      <ButtonForward/>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </section>
        </div>
        <div className="background">
        </div>
        
      </main>
      <div className="secret" >
        <p>CREATED BY PROSTO ONIC</p>
      </div>
    </>
  )
}

export default App
