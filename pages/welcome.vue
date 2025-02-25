<template>
    <div id="content">
      <section class="body">
        <div class="img"/>
        <div class="description">
            <div class="logo"></div>
            <div class="text">
              <article class="infos">
                <section class="icon-sustent"></section>
                <section class="desc">
                  <h3>Elimina a necessidade de cardápios impressos</h3>
                  <span>contribuindo para a redução do uso de papel e promovendo práticas mais ecológicas.</span>
                </section>
               </article>
               <article class="infos">
                <section class="icon-hands"></section>
                <section class="desc">
                  <h3>Elimina a necessidade de cardápios impressos</h3>
                  <span>contribuindo para a redução do uso de papel e promovendo práticas mais ecológicas.</span>
                </section>
               </article>
               <article class="infos">
                <section class="icon-clock"></section>
                <section class="desc">
                  <h3>Elimina a necessidade de cardápios impressos</h3>
                  <span>contribuindo para a redução do uso de papel e promovendo práticas mais ecológicas.</span>
                </section>
               </article>
               <article class="infos">
                <section class="icon-qrcode"></section>
                <section class="desc">
                  <h3>Elimina a necessidade de cardápios impressos</h3>
                  <span>contribuindo para a redução do uso de papel e promovendo práticas mais ecológicas.</span>
                </section>
               </article>
               
            </div>
        </div>
        
      </section>
      <div class="btn-wpp">CONHECER AGORA</div>
      <div class="footer">
          <a href=""><div class="icon-face"/></a>
          <a href=""><div class="icon-instagram"/></a>
          <a href=""><div class="icon-wpp"/></a>
      </div>
    </div>
  </template>
  
  <script setup>
  
  </script>
  
  <style scoped>
* {
    user-select: none; 
    -webkit-user-select: none; 
    -moz-user-select: none; 
    -ms-user-select: none;
  }
  #content{
    background: url(../../frontend/public/imgs/bghome.svg);
    position: relative;
    background-repeat: no-repeat;
    flex-direction: column;
    background-position: center;
    backdrop-filter: blur(10px); 
    -webkit-backdrop-filter: blur(10px);
    display: flex;
    width: 100%;
    padding-top: 120px;
    height: 100vh;
    align-items: center;
    flex: 1;
    z-index: 0;
    background-size:120%;
  }
  #content::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(0); 
    -webkit-backdrop-filter: blur(0);
    z-index: 0;
    animation: backdropAnimation 7s infinite alternate;
}
@keyframes backdropAnimation {
  0% {
    backdrop-filter: blur(0);
    -webkit-backdrop-filter: blur(0);
    background: rgba(255, 255, 255, 0.1);
  }
  50% {
    backdrop-filter: blur(220px);
    -webkit-backdrop-filter: blur(220px);
    background: rgba(255, 255, 255, 0.05);
  }
  100% {
    backdrop-filter: blur(40px);
    -webkit-backdrop-filter: blur(40px);
    background: rgba(255, 255, 255, 0.02);
  }
}

  .body{
    display: flex;
    width: 70vw;
    height: 80vh;
    z-index: 1;
    margin: 0 auto;
  }
  .img{
    display: flex;
    width: 35vw;
    background:url('../public/imgs/print.svg');
    background-repeat: no-repeat;
    background-size: cover;
    margin-top: 50px;
    background-position: top center;
  }

  .description{
    display: flex;
    max-width: 35vw;
    flex: 1;
    flex-direction: column;
  }
  .logo{
    width: 280px;
    height:200px;
    background:url('../public/imgs/logo-ladingpage.svg');
    background-repeat: no-repeat;
  }
  .icon-sustent{
    display: flex;
    width: 60px;
    height: 60px;
    background:url('../public/imgs/sustentabilidade.svg') var(--bgBlue);
    background-repeat: no-repeat;
    background-size: 35px;
    background-position: center;
    border-radius: 6px;
  }
  .icon-hands{
    display: flex;
    width: 60px;
    height: 60px;
    background:url('../public/imgs/hands.svg') var(--bgBlue);
    background-repeat: no-repeat;
    background-size: 35px;
    background-position: center;
    border-radius: 6px;
  }
  .icon-clock{
    display: flex;
    width: 60px;
    height: 60px;
    background:url('../public/imgs/clock.svg') var(--bgBlue);
    background-repeat: no-repeat;
    background-size: 35px;
    background-position: center;
    border-radius: 6px;
  }
  .icon-qrcode{
    display: flex;
    width: 60px;
    height: 60px;
    background:url('../public/imgs/qricon.svg') var(--bgBlue);
    background-repeat: no-repeat;
    background-size: 35px;
    background-position: center;
    border-radius: 6px;
  }
  .desc{
    max-width: 24vw;
  }
  .infos{
    display: flex;
    margin-left: 20px;
    gap:12px;
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px); 
    -webkit-backdrop-filter: blur(10px);
    padding: 10px;
    border-radius: 7px;
    margin:20px;
    transition: .5s all linear;
  }
  .infos:hover{
    background: rgba(123, 209, 243, 0.2);
    backdrop-filter: blur(10px); 
    -webkit-backdrop-filter: blur(10px);
  }
  .infos:nth-child(1) {
  margin-left: 0px;
}

.infos:nth-child(2) {
  margin-left: 20px;
}

.infos:nth-child(3) {
  margin-left: 40px;
}

.infos:nth-child(4) {
  margin-left: 60px;
}

.btn-wpp{
  width: 20vw;
  text-align: center;
  color: white;
  letter-spacing:2px;
  font-family: "Noto Sans", serif;
  font-size: clamp(1em, 1em + 1vw, 1.1em);
  padding: 20px;
  z-index: 1;
  cursor: pointer;
  border-radius: 7px;
  margin-top:-60px;
  font-weight: bold;
  background: var(--bgGreen);
  transition: .4s all linear;
}
.btn-wpp:hover{
  letter-spacing:4px;
}
.btn-wpp:hover{
  background: var(--bgBlue);
}
.icon-face, .icon-instagram, .icon-wpp{
  width: 32px;
  height: 32px;
}
.footer{
  display: flex;
  flex-direction: row;
  padding: 40px;
  gap: 10px;
  z-index: 9;
}
.icon-face{
  background: url("../public/imgs/icons-landingpage/face.png") no-repeat center;
  background-size: cover;
}
.icon-instagram{
  background: url("../public/imgs/icons-landingpage/insta.png") no-repeat center;
  background-size: cover;
}
.icon-wpp{
  background: url("../public/imgs/icons-landingpage/whatsapp.png") no-repeat center;
  background-size: cover;
}
@media (max-width: 1024px) {
  .body {
    width: 90vw;
    height: auto;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
  
  .img {
    width: 80%;
    height: auto;
    background-position: center;
    margin-bottom: 20px;
  }
  
  .description {
    max-width: 90%;
    text-align: center;
  }

  .infos {
    flex-direction: column;
    align-items: center;
    text-align: center;
    margin-left: 0 !important;
  }

  .desc {
    max-width: 90%;
  }
}

@media (max-width: 768px) {
  #content {
    background-size: cover;
    height: auto;
    padding: 20px 0;
  }
  
  .body {
    width: 95vw;
  }

  .img {
    width: 100%;
    height: auto;
  }

  .infos {
    width: 90%;
    flex-direction: column;
    align-items: center;
    margin: 10px auto;
  }

  .icon-sustent, .icon-hands, .icon-clock, .icon-qrcode {
    width: 50px;
    height: 50px;
    background-size: 30px;
  }

  .desc h3 {
    font-size: 1rem;
  }

  .desc span {
    font-size: 0.9rem;
  }
}

@media (max-width: 480px) {
  .logo {
    width: 180px;
    height: 120px;
  }

  .infos {
    width: 100%;
    padding: 8px;
  }

  .icon-sustent, .icon-hands, .icon-clock, .icon-qrcode {
    width: 40px;
    height: 40px;
    background-size: 25px;
  }

  .desc h3 {
    font-size: 0.9rem;
  }

  .desc span {
    font-size: 0.8rem;
  }
}

  </style>
  