import React, { useEffect, useState } from 'react';
import '../../scss/Home.scss';
import { setInterval } from 'core-js';
import Axios from 'axios';


const Home = ({history}) => {

  const [collection, setCollection] = useState([]);

  const [transitionDuration, setTransitionDuration] = useState({transitionDuration : '1s'})


  const fetchCollection = async() => {
    try {
      await Axios
      .get('http://127.0.0.1:8000/api/collections?title=home')
      .then(response => setCollection(response.data['hydra:member'][0].productList))
    } catch (error) {
      console.log(error)
    }
  }

  const animatedBg = (target) => {
    
    const minus = ['','-'];
    for (let index = 0; index < target.children.length; index++) {
      const randomMinus = Math.floor(Math.random()*minus.length);
      target.children[index].style.marginTop = -Math.floor(Math.random() * (300 - 100) + 100)+'px';
      target.children[index].animate([
        // keyframes
        { transform: 'translateY(0px)' }, 
        { transform: 'translateY('+minus[randomMinus] + Math.floor(Math.random() * (100 - 50) + 50)+'px)' },
        { transform: 'translateY(0px)' }
      ], { 
        // timing options
        duration: Math.floor(Math.random() * (7000 - 5000) + 5000),
        iterations: Infinity,
        direction: "reverse"
      });
    }
    
  }

  const handleEnter = ({currentTarget}) => {
    setTransitionDuration({transitionDuration : '1s'})
    animatedBg(currentTarget.children[1].children[1].children[0]);
   currentTarget.style.background = '#101010';
   currentTarget.children[0].style.display = 'none';
   currentTarget.children[1].style.display = 'block';
   const imgPlayer = currentTarget.children[1].children[0].children[0].children[1];
   const imgPlayerNegativ = currentTarget.children[1].children[0].children[0].children[0];
   const text1 = currentTarget.children[1].children[0].children[1].children[0];
   const text2 = currentTarget.children[1].children[0].children[1].children[1];
   const text3 = currentTarget.children[1].children[0].children[1].children[2];
   const text4 = currentTarget.children[1].children[0].children[1].children[3];
   const shoe = currentTarget.children[1].children[1].children[1];
   const audio = currentTarget.children[1].children[2];
   const audio2 = currentTarget.children[1].children[3];
   text4.style.right = "50%";
   text4.style.opacity = 0;
   text3.style.right = "50%";
   text3.style.opacity = 0;
   text2.style.right = "50%";
   text2.style.opacity = 0;
   text1.style.right = "50%";
   text1.style.opacity = 0;
   imgPlayer.style.right = "50%";
   imgPlayer.style.opacity = 0;
   imgPlayerNegativ.style.right = "50%";
   imgPlayerNegativ.style.opacity = 0;
   shoe.style.bottom = "-50%";
   audio.pause()
   audio2.pause()
  audio.currentTime = 0;
  audio2.currentTime = 0;
  audio.volume = 0.22;
  audio2.volume = 0.025;
  audio.play();
  audio2.play();
      
      setTimeout(() => {
        text4.style.right = "-15%";
        text4.style.opacity = 1;
      }, 250)
      setTimeout(() => {
        text3.style.right = "-15%";
        text3.style.opacity = 1;
      }, 500)
      setTimeout(() => {
        text2.style.right = "-15%";
        text2.style.opacity = 1;
      }, 750)
      setTimeout(() => {
        text1.style.right = "-15%";
        text1.style.opacity = 1;
      }, 1000)
      setTimeout(() => {
        imgPlayer.style.right = "-15%";
        imgPlayer.style.opacity = 1;
        shoe.style.bottom = "30%";
      }, 1250)
      setTimeout(() => {
        imgPlayerNegativ.style.right = "-20%";
        imgPlayerNegativ.style.opacity = 1;
      }, 1700)

  }

  const handleLeave = ({currentTarget}) => {
    setTransitionDuration({transitionDuration : 'none'})
  
   const imgPlayer = currentTarget.children[1].children[0].children[0].children[1];
   const imgPlayerNegativ = currentTarget.children[1].children[0].children[0].children[0];
   const text1 = currentTarget.children[1].children[0].children[1].children[0];
   const text2 = currentTarget.children[1].children[0].children[1].children[1];
   const text3 = currentTarget.children[1].children[0].children[1].children[2];
   const text4 = currentTarget.children[1].children[0].children[1].children[3];
   const shoe = currentTarget.children[1].children[1].children[1];
   const audio = currentTarget.children[1].children[2];
   const audio2 = currentTarget.children[1].children[3];
   
   audio.pause()
   audio2.pause()
   text4.style.right = "50%";
   text4.style.opacity = 0;
   text3.style.right = "50%";
   text3.style.opacity = 0;
   text2.style.right = "50%";
   text2.style.opacity = 0;
   text1.style.right = "50%";
   text1.style.opacity = 0;
   imgPlayer.style.right = "50%";
   imgPlayer.style.opacity = 0;
   imgPlayerNegativ.style.right = "50%";
   imgPlayerNegativ.style.opacity = 0;
   shoe.style.bottom = "-50%";
   currentTarget.style.background = 'none';
   currentTarget.children[0].style.display = 'block';
   currentTarget.children[1].style.display = 'none';
  }

  const handleClick = ({currentTarget}) => {
    const productId = collection[Math.floor(Math.random() * collection.length)];
    history.replace('/shop/'+productId);
  }

  console.log(collection)

  useEffect(() => {
    fetchCollection();
  }, [])

  return ( <>
    <div className="content-home">
      <div onMouseEnter={handleEnter} onMouseLeave={handleLeave} className="home-part">
        <div className="part-content">
          <h2>KB</h2>
          
        </div>
        <div onClick={handleClick} className="part-content-active">
          <div className="player-content">
            <div className="player">
              <img style={transitionDuration} src="../img/home/kobe/kobe_negativ.png" alt=""/>
              <img style={transitionDuration} src="../img/home/kobe/kobe.png" alt=""/>
            </div>
            <div className="player-text">
              <img style={transitionDuration} src="../img/home/kobe/text1.png" alt=""/>
              <img style={transitionDuration} src="../img/home/kobe/text2.png" alt=""/>
              <img style={transitionDuration} src="../img/home/kobe/text3.png" alt=""/>
              <img style={transitionDuration} src="../img/home/kobe/text4.png" alt=""/>
            </div>
          </div>
         
          <div className="content-animated-bg">
            <div className="animated-bg">
            
              <div>
              KOBE - KOBE - KOBE - KOBE - KOBE - KOBE - KOBE - KOBE - KOBE - KOBE - KOBE - KOBE - KOBE - KOBE - KOBE - KOBE - KOBE - KOBE - KOBE - KOBE - KOBE - KOBE - KOBE - KOBE
              </div>
              <div>
              BRYANT - BRYANT - BRYANT - BRYANT - BRYANT - BRYANT - BRYANT - BRYANT - BRYANT - BRYANT - BRYANT - BRYANT - BRYANT - BRYANT - BRYANT - BRYANT - BRYANT - BRYANT - BRYANT - BRYANT - BRYANT 
              </div>
              <div>
              KOBE - KOBE - KOBE - KOBE - KOBE - KOBE - KOBE - KOBE - KOBE - KOBE - KOBE - KOBE - KOBE - KOBE - KOBE - KOBE - KOBE - KOBE - KOBE - KOBE - KOBE - KOBE - KOBE - KOBE
              </div>
              <div>
              BRYANT - BRYANT - BRYANT - BRYANT - BRYANT - BRYANT - BRYANT - BRYANT - BRYANT - BRYANT - BRYANT - BRYANT - BRYANT - BRYANT - BRYANT - BRYANT - BRYANT - BRYANT - BRYANT - BRYANT - BRYANT 
              </div>
              <div>
              KOBE - KOBE - KOBE - KOBE - KOBE - KOBE - KOBE - KOBE - KOBE - KOBE - KOBE - KOBE - KOBE - KOBE - KOBE - KOBE - KOBE - KOBE - KOBE - KOBE - KOBE - KOBE - KOBE - KOBE
              </div>
              <div>
              BRYANT - BRYANT - BRYANT - BRYANT - BRYANT - BRYANT - BRYANT - BRYANT - BRYANT - BRYANT - BRYANT - BRYANT - BRYANT - BRYANT - BRYANT - BRYANT - BRYANT - BRYANT - BRYANT - BRYANT - BRYANT 
              </div>
              <div>
              KOBE - KOBE - KOBE - KOBE - KOBE - KOBE - KOBE - KOBE - KOBE - KOBE - KOBE - KOBE - KOBE - KOBE - KOBE - KOBE - KOBE - KOBE - KOBE - KOBE - KOBE - KOBE - KOBE - KOBE
              </div>
              <div>
              BRYANT - BRYANT - BRYANT - BRYANT - BRYANT - BRYANT - BRYANT - BRYANT - BRYANT - BRYANT - BRYANT - BRYANT - BRYANT - BRYANT - BRYANT - BRYANT - BRYANT - BRYANT - BRYANT - BRYANT - BRYANT 
              </div>
              <div>
              KOBE - KOBE - KOBE - KOBE - KOBE - KOBE - KOBE - KOBE - KOBE - KOBE - KOBE - KOBE - KOBE - KOBE - KOBE - KOBE - KOBE - KOBE - KOBE - KOBE - KOBE - KOBE - KOBE - KOBE
              </div>
              <div>
              BRYANT - BRYANT - BRYANT - BRYANT - BRYANT - BRYANT - BRYANT - BRYANT - BRYANT - BRYANT - BRYANT - BRYANT - BRYANT - BRYANT - BRYANT - BRYANT - BRYANT - BRYANT - BRYANT - BRYANT - BRYANT 
              </div>
              <div>
              KOBE - KOBE - KOBE - KOBE - KOBE - KOBE - KOBE - KOBE - KOBE - KOBE - KOBE - KOBE - KOBE - KOBE - KOBE - KOBE - KOBE - KOBE - KOBE - KOBE - KOBE - KOBE - KOBE - KOBE
              </div>
              <div>
              BRYANT - BRYANT - BRYANT - BRYANT - BRYANT - BRYANT - BRYANT - BRYANT - BRYANT - BRYANT - BRYANT - BRYANT - BRYANT - BRYANT - BRYANT - BRYANT - BRYANT - BRYANT - BRYANT - BRYANT - BRYANT 
              </div>
              <div>
              KOBE - KOBE - KOBE - KOBE - KOBE - KOBE - KOBE - KOBE - KOBE - KOBE - KOBE - KOBE - KOBE - KOBE - KOBE - KOBE - KOBE - KOBE - KOBE - KOBE - KOBE - KOBE - KOBE - KOBE
              </div>
              <div>
              BRYANT - BRYANT - BRYANT - BRYANT - BRYANT - BRYANT - BRYANT - BRYANT - BRYANT - BRYANT - BRYANT - BRYANT - BRYANT - BRYANT - BRYANT - BRYANT - BRYANT - BRYANT - BRYANT - BRYANT - BRYANT 
              </div>
              <div>
              KOBE - KOBE - KOBE - KOBE - KOBE - KOBE - KOBE - KOBE - KOBE - KOBE - KOBE - KOBE - KOBE - KOBE - KOBE - KOBE - KOBE - KOBE - KOBE - KOBE - KOBE - KOBE - KOBE - KOBE
              </div>
              <div>
              BRYANT - BRYANT - BRYANT - BRYANT - BRYANT - BRYANT - BRYANT - BRYANT - BRYANT - BRYANT - BRYANT - BRYANT - BRYANT - BRYANT - BRYANT - BRYANT - BRYANT - BRYANT - BRYANT - BRYANT - BRYANT 
              </div>
              <div>
              KOBE - KOBE - KOBE - KOBE - KOBE - KOBE - KOBE - KOBE - KOBE - KOBE - KOBE - KOBE - KOBE - KOBE - KOBE - KOBE - KOBE - KOBE - KOBE - KOBE - KOBE - KOBE - KOBE - KOBE
              </div>
              <div>
              BRYANT - BRYANT - BRYANT - BRYANT - BRYANT - BRYANT - BRYANT - BRYANT - BRYANT - BRYANT - BRYANT - BRYANT - BRYANT - BRYANT - BRYANT - BRYANT - BRYANT - BRYANT - BRYANT - BRYANT - BRYANT 
              </div>
              <div>
              KOBE - KOBE - KOBE - KOBE - KOBE - KOBE - KOBE - KOBE - KOBE - KOBE - KOBE - KOBE - KOBE - KOBE - KOBE - KOBE - KOBE - KOBE - KOBE - KOBE - KOBE - KOBE - KOBE - KOBE
              </div>
              <div>
              BRYANT - BRYANT - BRYANT - BRYANT - BRYANT - BRYANT - BRYANT - BRYANT - BRYANT - BRYANT - BRYANT - BRYANT - BRYANT - BRYANT - BRYANT - BRYANT - BRYANT - BRYANT - BRYANT - BRYANT - BRYANT 
              </div>
            </div>
            <div className="shoe">
              <img style={transitionDuration} src="../img/home/kobe/shoe.png" alt=""/>
            </div>
          </div>
          <audio
              controls
              src="../img/home/kobe/kobe_sound.mp3">
                  Your browser does not support the
                  <code>audio</code> element.
          </audio>
          <audio
              controls
              src="../img/home/audio/nba.mp3">
                  Your browser does not support the
                  <code>audio</code> element.
          </audio>
          <audio
              controls
              src="../img/home/audio/crowd.mp3">
                  Your browser does not support the
                  <code>audio</code> element.
          </audio>
        </div>
      </div>
      <div onMouseEnter={handleEnter} onMouseLeave={handleLeave} className="home-part">
        <div className="part-content">
          <h2>KI</h2>
        </div>
        <div onClick={handleClick} className="part-content-active">
          <div className="player-content">
            <div className="player">
              <img style={transitionDuration} src="../img/home/kyrie/kyrie_negativ.png" alt=""/>
              <img style={transitionDuration} src="../img/home/kyrie/kyrie.png" alt=""/>
            </div>
            <div className="player-text">
              <img style={transitionDuration} src="../img/home/kyrie/text1.png" alt=""/>
              <img style={transitionDuration} src="../img/home/kyrie/text2.png" alt=""/>
              <img style={transitionDuration} src="../img/home/kyrie/text3.png" alt=""/>
              <img style={transitionDuration} src="../img/home/kyrie/text4.png" alt=""/>
            </div>
          </div>
         
          <div className="content-animated-bg">
            <div className="animated-bg">
            
              <div>
              KYRIE - KYRIE - KYRIE - KYRIE - KYRIE - KYRIE - KYRIE - KYRIE - KYRIE - KYRIE - KYRIE - KYRIE - KYRIE - KYRIE - KYRIE - KYRIE - KYRIE - KYRIE - KYRIE - KYRIE - KYRIE - KYRIE - KYRIE - KYRIE
              </div>
              <div>
              IRVING - IRVING - IRVING - IRVING - IRVING - IRVING - IRVING - IRVING - IRVING - IRVING - IRVING - IRVING - IRVING - IRVING - IRVING - IRVING - IRVING - IRVING - IRVING - IRVING - IRVING - IRVING - IRVING - IRVING
              </div>
              <div>
              KYRIE - KYRIE - KYRIE - KYRIE - KYRIE - KYRIE - KYRIE - KYRIE - KYRIE - KYRIE - KYRIE - KYRIE - KYRIE - KYRIE - KYRIE - KYRIE - KYRIE - KYRIE - KYRIE - KYRIE - KYRIE - KYRIE - KYRIE - KYRIE
              </div>
              <div>
              IRVING - IRVING - IRVING - IRVING - IRVING - IRVING - IRVING - IRVING - IRVING - IRVING - IRVING - IRVING - IRVING - IRVING - IRVING - IRVING - IRVING - IRVING - IRVING - IRVING - IRVING - IRVING - IRVING - IRVING
              </div>
              <div>
              KYRIE - KYRIE - KYRIE - KYRIE - KYRIE - KYRIE - KYRIE - KYRIE - KYRIE - KYRIE - KYRIE - KYRIE - KYRIE - KYRIE - KYRIE - KYRIE - KYRIE - KYRIE - KYRIE - KYRIE - KYRIE - KYRIE - KYRIE - KYRIE
              </div>
              <div>
              IRVING - IRVING - IRVING - IRVING - IRVING - IRVING - IRVING - IRVING - IRVING - IRVING - IRVING - IRVING - IRVING - IRVING - IRVING - IRVING - IRVING - IRVING - IRVING - IRVING - IRVING - IRVING - IRVING - IRVING
              </div>
              <div>
              KYRIE - KYRIE - KYRIE - KYRIE - KYRIE - KYRIE - KYRIE - KYRIE - KYRIE - KYRIE - KYRIE - KYRIE - KYRIE - KYRIE - KYRIE - KYRIE - KYRIE - KYRIE - KYRIE - KYRIE - KYRIE - KYRIE - KYRIE - KYRIE
              </div>
              <div>
              IRVING - IRVING - IRVING - IRVING - IRVING - IRVING - IRVING - IRVING - IRVING - IRVING - IRVING - IRVING - IRVING - IRVING - IRVING - IRVING - IRVING - IRVING - IRVING - IRVING - IRVING - IRVING - IRVING - IRVING
              </div>
              <div>
              KYRIE - KYRIE - KYRIE - KYRIE - KYRIE - KYRIE - KYRIE - KYRIE - KYRIE - KYRIE - KYRIE - KYRIE - KYRIE - KYRIE - KYRIE - KYRIE - KYRIE - KYRIE - KYRIE - KYRIE - KYRIE - KYRIE - KYRIE - KYRIE
              </div>
              <div>
              IRVING - IRVING - IRVING - IRVING - IRVING - IRVING - IRVING - IRVING - IRVING - IRVING - IRVING - IRVING - IRVING - IRVING - IRVING - IRVING - IRVING - IRVING - IRVING - IRVING - IRVING - IRVING - IRVING - IRVING
              </div>
              <div>
              KYRIE - KYRIE - KYRIE - KYRIE - KYRIE - KYRIE - KYRIE - KYRIE - KYRIE - KYRIE - KYRIE - KYRIE - KYRIE - KYRIE - KYRIE - KYRIE - KYRIE - KYRIE - KYRIE - KYRIE - KYRIE - KYRIE - KYRIE - KYRIE
              </div>
              <div>
              IRVING - IRVING - IRVING - IRVING - IRVING - IRVING - IRVING - IRVING - IRVING - IRVING - IRVING - IRVING - IRVING - IRVING - IRVING - IRVING - IRVING - IRVING - IRVING - IRVING - IRVING - IRVING - IRVING - IRVING
              </div>
              <div>
              KYRIE - KYRIE - KYRIE - KYRIE - KYRIE - KYRIE - KYRIE - KYRIE - KYRIE - KYRIE - KYRIE - KYRIE - KYRIE - KYRIE - KYRIE - KYRIE - KYRIE - KYRIE - KYRIE - KYRIE - KYRIE - KYRIE - KYRIE - KYRIE
              </div>
              <div>
              IRVING - IRVING - IRVING - IRVING - IRVING - IRVING - IRVING - IRVING - IRVING - IRVING - IRVING - IRVING - IRVING - IRVING - IRVING - IRVING - IRVING - IRVING - IRVING - IRVING - IRVING - IRVING - IRVING - IRVING
              </div>
              <div>
              KYRIE - KYRIE - KYRIE - KYRIE - KYRIE - KYRIE - KYRIE - KYRIE - KYRIE - KYRIE - KYRIE - KYRIE - KYRIE - KYRIE - KYRIE - KYRIE - KYRIE - KYRIE - KYRIE - KYRIE - KYRIE - KYRIE - KYRIE - KYRIE
              </div>
              <div>
              IRVING - IRVING - IRVING - IRVING - IRVING - IRVING - IRVING - IRVING - IRVING - IRVING - IRVING - IRVING - IRVING - IRVING - IRVING - IRVING - IRVING - IRVING - IRVING - IRVING - IRVING - IRVING - IRVING - IRVING
              </div>
              <div>
              KYRIE - KYRIE - KYRIE - KYRIE - KYRIE - KYRIE - KYRIE - KYRIE - KYRIE - KYRIE - KYRIE - KYRIE - KYRIE - KYRIE - KYRIE - KYRIE - KYRIE - KYRIE - KYRIE - KYRIE - KYRIE - KYRIE - KYRIE - KYRIE
              </div>
              <div>
              IRVING - IRVING - IRVING - IRVING - IRVING - IRVING - IRVING - IRVING - IRVING - IRVING - IRVING - IRVING - IRVING - IRVING - IRVING - IRVING - IRVING - IRVING - IRVING - IRVING - IRVING - IRVING - IRVING - IRVING
              </div>
              <div>
              KYRIE - KYRIE - KYRIE - KYRIE - KYRIE - KYRIE - KYRIE - KYRIE - KYRIE - KYRIE - KYRIE - KYRIE - KYRIE - KYRIE - KYRIE - KYRIE - KYRIE - KYRIE - KYRIE - KYRIE - KYRIE - KYRIE - KYRIE - KYRIE
              </div>
              <div>
              IRVING - IRVING - IRVING - IRVING - IRVING - IRVING - IRVING - IRVING - IRVING - IRVING - IRVING - IRVING - IRVING - IRVING - IRVING - IRVING - IRVING - IRVING - IRVING - IRVING - IRVING - IRVING - IRVING - IRVING
              </div>
            </div>
            <div className="shoe">
              <img style={transitionDuration} src="../img/home/kyrie/shoe.png" alt=""/>
            </div>
          </div>
          <audio
              controls
              src="../img/home/kyrie/kyrie.mp3">
                  Your browser does not support the
                  <code>audio</code> element.
          </audio>
          <audio
              controls
              src="../img/home/audio/nfl2.mp3">
                  Your browser does not support the
                  <code>audio</code> element.
          </audio>
          <audio
              controls
              src="../img/home/audio/crowd.mp3">
                  Your browser does not support the
                  <code>audio</code> element.
          </audio>
        </div>
      </div>
      <div onMouseEnter={handleEnter} onMouseLeave={handleLeave} className="home-part">
        <div className="part-content">
          <h2>LJ</h2>
        </div>
        <div onClick={handleClick} className="part-content-active">
          <div className="player-content">
            <div className="player">
              <img style={transitionDuration} src="../img/home/lebron/lebron_negativ.png" alt=""/>
              <img style={transitionDuration} src="../img/home/lebron/lebron.png" alt=""/>
            </div>
            <div className="player-text">
              <img style={transitionDuration} src="../img/home/lebron/text1.png" alt=""/>
              <img style={transitionDuration} src="../img/home/lebron/text2.png" alt=""/>
              <img style={transitionDuration} src="../img/home/lebron/text3.png" alt=""/>
              <img style={transitionDuration} src="../img/home/lebron/text4.png" alt=""/>
            </div>
          </div>
         
          <div className="content-animated-bg">
            <div className="animated-bg">
            
              <div>
              LEBRON - LEBRON - LEBRON - LEBRON - LEBRON - LEBRON - LEBRON - LEBRON - LEBRON - LEBRON - LEBRON - LEBRON - LEBRON - LEBRON - LEBRON - LEBRON - LEBRON - LEBRON - LEBRON - LEBRON
              </div>
              <div>
              JAMES - JAMES - JAMES - JAMES - JAMES - JAMES - JAMES - JAMES - JAMES - JAMES - JAMES - JAMES - JAMES - JAMES - JAMES - JAMES - JAMES - JAMES - JAMES - JAMES
              </div>
              <div>
              LEBRON - LEBRON - LEBRON - LEBRON - LEBRON - LEBRON - LEBRON - LEBRON - LEBRON - LEBRON - LEBRON - LEBRON - LEBRON - LEBRON - LEBRON - LEBRON - LEBRON - LEBRON - LEBRON - LEBRON
              </div>
              <div>
              JAMES - JAMES - JAMES - JAMES - JAMES - JAMES - JAMES - JAMES - JAMES - JAMES - JAMES - JAMES - JAMES - JAMES - JAMES - JAMES - JAMES - JAMES - JAMES - JAMES
              </div>
              <div>
              LEBRON - LEBRON - LEBRON - LEBRON - LEBRON - LEBRON - LEBRON - LEBRON - LEBRON - LEBRON - LEBRON - LEBRON - LEBRON - LEBRON - LEBRON - LEBRON - LEBRON - LEBRON - LEBRON - LEBRON
              </div>
              <div>
              JAMES - JAMES - JAMES - JAMES - JAMES - JAMES - JAMES - JAMES - JAMES - JAMES - JAMES - JAMES - JAMES - JAMES - JAMES - JAMES - JAMES - JAMES - JAMES - JAMES
              </div>
              <div>
              LEBRON - LEBRON - LEBRON - LEBRON - LEBRON - LEBRON - LEBRON - LEBRON - LEBRON - LEBRON - LEBRON - LEBRON - LEBRON - LEBRON - LEBRON - LEBRON - LEBRON - LEBRON - LEBRON - LEBRON
              </div>
              <div>
              JAMES - JAMES - JAMES - JAMES - JAMES - JAMES - JAMES - JAMES - JAMES - JAMES - JAMES - JAMES - JAMES - JAMES - JAMES - JAMES - JAMES - JAMES - JAMES - JAMES
              </div>
              <div>
              LEBRON - LEBRON - LEBRON - LEBRON - LEBRON - LEBRON - LEBRON - LEBRON - LEBRON - LEBRON - LEBRON - LEBRON - LEBRON - LEBRON - LEBRON - LEBRON - LEBRON - LEBRON - LEBRON - LEBRON
              </div>
              <div>
              JAMES - JAMES - JAMES - JAMES - JAMES - JAMES - JAMES - JAMES - JAMES - JAMES - JAMES - JAMES - JAMES - JAMES - JAMES - JAMES - JAMES - JAMES - JAMES - JAMES
              </div>
              <div>
              LEBRON - LEBRON - LEBRON - LEBRON - LEBRON - LEBRON - LEBRON - LEBRON - LEBRON - LEBRON - LEBRON - LEBRON - LEBRON - LEBRON - LEBRON - LEBRON - LEBRON - LEBRON - LEBRON - LEBRON
              </div>
              <div>
              JAMES - JAMES - JAMES - JAMES - JAMES - JAMES - JAMES - JAMES - JAMES - JAMES - JAMES - JAMES - JAMES - JAMES - JAMES - JAMES - JAMES - JAMES - JAMES - JAMES
              </div>
              <div>
              LEBRON - LEBRON - LEBRON - LEBRON - LEBRON - LEBRON - LEBRON - LEBRON - LEBRON - LEBRON - LEBRON - LEBRON - LEBRON - LEBRON - LEBRON - LEBRON - LEBRON - LEBRON - LEBRON - LEBRON
              </div>
              <div>
              JAMES - JAMES - JAMES - JAMES - JAMES - JAMES - JAMES - JAMES - JAMES - JAMES - JAMES - JAMES - JAMES - JAMES - JAMES - JAMES - JAMES - JAMES - JAMES - JAMES
              </div>
              <div>
              LEBRON - LEBRON - LEBRON - LEBRON - LEBRON - LEBRON - LEBRON - LEBRON - LEBRON - LEBRON - LEBRON - LEBRON - LEBRON - LEBRON - LEBRON - LEBRON - LEBRON - LEBRON - LEBRON - LEBRON
              </div>
              <div>
              JAMES - JAMES - JAMES - JAMES - JAMES - JAMES - JAMES - JAMES - JAMES - JAMES - JAMES - JAMES - JAMES - JAMES - JAMES - JAMES - JAMES - JAMES - JAMES - JAMES
              </div>
              <div>
              LEBRON - LEBRON - LEBRON - LEBRON - LEBRON - LEBRON - LEBRON - LEBRON - LEBRON - LEBRON - LEBRON - LEBRON - LEBRON - LEBRON - LEBRON - LEBRON - LEBRON - LEBRON - LEBRON - LEBRON
              </div>
              <div>
              JAMES - JAMES - JAMES - JAMES - JAMES - JAMES - JAMES - JAMES - JAMES - JAMES - JAMES - JAMES - JAMES - JAMES - JAMES - JAMES - JAMES - JAMES - JAMES - JAMES
              </div>
              <div>
              LEBRON - LEBRON - LEBRON - LEBRON - LEBRON - LEBRON - LEBRON - LEBRON - LEBRON - LEBRON - LEBRON - LEBRON - LEBRON - LEBRON - LEBRON - LEBRON - LEBRON - LEBRON - LEBRON - LEBRON
              </div>
              <div>
              JAMES - JAMES - JAMES - JAMES - JAMES - JAMES - JAMES - JAMES - JAMES - JAMES - JAMES - JAMES - JAMES - JAMES - JAMES - JAMES - JAMES - JAMES - JAMES - JAMES
              </div>
            </div>
            <div className="shoe">
              <img style={transitionDuration} src="../img/home/lebron/shoe.png" alt=""/>
            </div>
          </div>
          <audio
              controls
              src="../img/home/lebron/lebron.mp3">
                  Your browser does not support the
                  <code>audio</code> element.
          </audio>
          <audio
              controls
              src="../img/home/audio/nba1.mp3">
                  Your browser does not support the
                  <code>audio</code> element.
          </audio>
          <audio
              controls
              src="../img/home/audio/crowd.mp3">
                  Your browser does not support the
                  <code>audio</code> element.
          </audio>
        </div>

      </div>
      <div onMouseEnter={handleEnter} onMouseLeave={handleLeave} className="home-part">
        <div className="part-content">
          <h2>SC</h2>
        </div>
        <div onClick={handleClick} className="part-content-active">
          <div className="player-content">
            <div className="player">
              <img style={transitionDuration} src="../img/home/steph/steph_negativ.png" alt=""/>
              <img style={transitionDuration} src="../img/home/steph/steph.png" alt=""/>
            </div>
            <div className="player-text">
              <img style={transitionDuration} src="../img/home/steph/text1.png" alt=""/>
              <img style={transitionDuration} src="../img/home/steph/text2.png" alt=""/>
              <img style={transitionDuration} src="../img/home/steph/text3.png" alt=""/>
              <img style={transitionDuration} src="../img/home/steph/text4.png" alt=""/>
            </div>
          </div>
         
          <div className="content-animated-bg">
            <div className="animated-bg">
            
              <div>
              STEPH - STEPH - STEPH - STEPH - STEPH - STEPH - STEPH - STEPH - STEPH - STEPH - STEPH - STEPH - STEPH - STEPH - STEPH - STEPH - STEPH - STEPH - STEPH - STEPH
              </div>
              <div>
              CURRY - CURRY - CURRY - CURRY - CURRY - CURRY - CURRY - CURRY - CURRY - CURRY - CURRY - CURRY - CURRY - CURRY - CURRY - CURRY - CURRY - CURRY - CURRY - CURRY
              </div>
              <div>
              STEPH - STEPH - STEPH - STEPH - STEPH - STEPH - STEPH - STEPH - STEPH - STEPH - STEPH - STEPH - STEPH - STEPH - STEPH - STEPH - STEPH - STEPH - STEPH - STEPH
              </div>
              <div>
              CURRY - CURRY - CURRY - CURRY - CURRY - CURRY - CURRY - CURRY - CURRY - CURRY - CURRY - CURRY - CURRY - CURRY - CURRY - CURRY - CURRY - CURRY - CURRY - CURRY
              </div>
              <div>
              STEPH - STEPH - STEPH - STEPH - STEPH - STEPH - STEPH - STEPH - STEPH - STEPH - STEPH - STEPH - STEPH - STEPH - STEPH - STEPH - STEPH - STEPH - STEPH - STEPH
              </div>
              <div>
              CURRY - CURRY - CURRY - CURRY - CURRY - CURRY - CURRY - CURRY - CURRY - CURRY - CURRY - CURRY - CURRY - CURRY - CURRY - CURRY - CURRY - CURRY - CURRY - CURRY
              </div>
              <div>
              STEPH - STEPH - STEPH - STEPH - STEPH - STEPH - STEPH - STEPH - STEPH - STEPH - STEPH - STEPH - STEPH - STEPH - STEPH - STEPH - STEPH - STEPH - STEPH - STEPH
              </div>
              <div>
              CURRY - CURRY - CURRY - CURRY - CURRY - CURRY - CURRY - CURRY - CURRY - CURRY - CURRY - CURRY - CURRY - CURRY - CURRY - CURRY - CURRY - CURRY - CURRY - CURRY
              </div>
              <div>
              STEPH - STEPH - STEPH - STEPH - STEPH - STEPH - STEPH - STEPH - STEPH - STEPH - STEPH - STEPH - STEPH - STEPH - STEPH - STEPH - STEPH - STEPH - STEPH - STEPH
              </div>
              <div>
              CURRY - CURRY - CURRY - CURRY - CURRY - CURRY - CURRY - CURRY - CURRY - CURRY - CURRY - CURRY - CURRY - CURRY - CURRY - CURRY - CURRY - CURRY - CURRY - CURRY
              </div>
              <div>
              STEPH - STEPH - STEPH - STEPH - STEPH - STEPH - STEPH - STEPH - STEPH - STEPH - STEPH - STEPH - STEPH - STEPH - STEPH - STEPH - STEPH - STEPH - STEPH - STEPH
              </div>
              <div>
              CURRY - CURRY - CURRY - CURRY - CURRY - CURRY - CURRY - CURRY - CURRY - CURRY - CURRY - CURRY - CURRY - CURRY - CURRY - CURRY - CURRY - CURRY - CURRY - CURRY
              </div>
              <div>
              STEPH - STEPH - STEPH - STEPH - STEPH - STEPH - STEPH - STEPH - STEPH - STEPH - STEPH - STEPH - STEPH - STEPH - STEPH - STEPH - STEPH - STEPH - STEPH - STEPH
              </div>
              <div>
              CURRY - CURRY - CURRY - CURRY - CURRY - CURRY - CURRY - CURRY - CURRY - CURRY - CURRY - CURRY - CURRY - CURRY - CURRY - CURRY - CURRY - CURRY - CURRY - CURRY
              </div>
              <div>
              STEPH - STEPH - STEPH - STEPH - STEPH - STEPH - STEPH - STEPH - STEPH - STEPH - STEPH - STEPH - STEPH - STEPH - STEPH - STEPH - STEPH - STEPH - STEPH - STEPH
              </div>
              <div>
              CURRY - CURRY - CURRY - CURRY - CURRY - CURRY - CURRY - CURRY - CURRY - CURRY - CURRY - CURRY - CURRY - CURRY - CURRY - CURRY - CURRY - CURRY - CURRY - CURRY
              </div>
              <div>
              STEPH - STEPH - STEPH - STEPH - STEPH - STEPH - STEPH - STEPH - STEPH - STEPH - STEPH - STEPH - STEPH - STEPH - STEPH - STEPH - STEPH - STEPH - STEPH - STEPH
              </div>
              <div>
              CURRY - CURRY - CURRY - CURRY - CURRY - CURRY - CURRY - CURRY - CURRY - CURRY - CURRY - CURRY - CURRY - CURRY - CURRY - CURRY - CURRY - CURRY - CURRY - CURRY
              </div>
              <div>
              STEPH - STEPH - STEPH - STEPH - STEPH - STEPH - STEPH - STEPH - STEPH - STEPH - STEPH - STEPH - STEPH - STEPH - STEPH - STEPH - STEPH - STEPH - STEPH - STEPH
              </div>
              <div>
              CURRY - CURRY - CURRY - CURRY - CURRY - CURRY - CURRY - CURRY - CURRY - CURRY - CURRY - CURRY - CURRY - CURRY - CURRY - CURRY - CURRY - CURRY - CURRY - CURRY
              </div>
            </div>
            <div className="shoe">
              <img style={transitionDuration} src="../img/home/steph/shoe.png" alt=""/>
            </div>
          </div>
          <audio
              controls
              src="../img/home/steph/steph.mp3">
                  Your browser does not support the
                  <code>audio</code> element.
          </audio>
          <audio
              controls
              src="../img/home/audio/nfl1.mp3">
                  Your browser does not support the
                  <code>audio</code> element.
          </audio>
          <audio
              controls
              src="../img/home/audio/crowd.mp3">
                  Your browser does not support the
                  <code>audio</code> element.
          </audio>
        </div>
    </div>
  </div>
  </> );
}
 
export default Home;