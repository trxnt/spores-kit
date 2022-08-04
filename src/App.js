import {useState, useCallback} from 'react';
import {useSporeData} from './lib/hooks/useSporeData.js';
import logo from './logo.svg';
import './App.css';
import {SporeEmbed} from './lib/components/SporeEmbed.js';
import styles from './styles.module.css';

// A list of songs: grabbed directly from catalog, but could use Zora API here.
let songs = [
    "https://zora-prod.mypinata.cloud/ipfs/QmcY9FZCNeWVggwPm7dh34pexuu7AioLi77orSeJoXbRKF", // Kalisway - "bouncy ball"
    "https://ipfs.io/ipfs/bafybeihjjjab5x4kf3t2ekp3r7i7szp4ylx5zecobiestqflmvji7r5wgq", // carter reeves - "alone time"
    "https://catalog.mypinata.cloud/ipfs/QmWWwDepZfDKqypi5DXzYzGk7tVCdpDaTPLFSysA3PBRrm", // Dutchyyy
];

let skin = "https://zequencer.mypinata.cloud/ipfs/Qme7hXVjGevN7fReT2tcErkyuNzczHdsrcCnMwkeDZfkx5";

let juiceSamples = [
    "https://zequencer.io/ipfs/QmYh8ryEJ5X3RD4wwkuRpyhgXwiQdWsqmfwgDhUtE4qonZ",
    "https://zequencer.io/ipfs/Qmc43UqNSmcePMaLNP1PCK2rHRmYDJkvMPw2j5xxhWSAWi",
    "https://zequencer.io/ipfs/QmPrtDNY42aiJGLAMp2u2C9CYfFHADv6MA8ETQ29E8LYbV",
];

function App() {
    // mix 2 different songs together:
    // using the main song's bpm (alternate song gets timestretched to match
    // the BPM of main song)

    let [main, setMain] = useState(songs[0]);
    let [alternate, setAlternate] = useState(songs[1]);
    let {
        isStuttering,
        stutterRate,
        currentStep,
        bpm,
        playing,
        currentBeat,
        progress
    } =
        useSporeData();

    // bottom right slider controls cross-fade between main & alternate
    return (
        <div className={styles["test-container"]}>
          <br></br>
          <div>
          -- 💓 --|  Beats per minute: {bpm}
          </div>
          <div>
          -- 🎼 --|  Current Step: {currentStep}
          </div>
          <div>
          -- 📶 --|  Current Beat: {currentBeat}
          </div>
          <div>
          -- 🗣️ --| Artist 1: Kalisway -- | 💿 -- Track 1: bouncy ball 
          </div>
          <div>
          -- 🗣️ --| Artist 2: Carter Reeves -- | 💿 -- Track 2: alone time 
          </div>
          <div>
          -- 🎛️ --| Remix is {Math.round(progress)}% over
          </div>
          {/* {isStuttering &&
           <div>
             Stuttering at 1/{stutterRate} rate
           </div>} */}
          <SporeEmbed
            main={main} // url to main track (can be switched w/o interrupting)
            alternate={alternate} // url to alternate track (can be switched w/o interrupting)
            juiceSamples={juiceSamples} // list of URLs to samples
            backgroundColor="orange" // background color of Spore itselft
            color="" // color of waveform below
            skin={skin} // URL to image to be morphed on skin
          />
        </div>
  );
}

export default App;
