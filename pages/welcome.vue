<template>
  <div id="content">
    <div id="header">
      <div class="logo" />
    </div>
    <main id="middle">
      <article>
        <section class="title">
          <h1>TRANSFORME PEDIDOS</h1>
          <p>em experiência, digitalize seu cardápio agora!</p>
        </section>
        <article class="description">
          <section>
            <img width="42" height="42" src="/imgs/icons-landingpage/sustentabilidade.svg">
            <span>Elimina a necessidade de cardápios impressos</span>
          </section>
          <section>
            <img width="42" height="42" src="/imgs/icons-landingpage/handshake.svg">
            <span>Reduza o tempo de atendimento aos seus clientes.</span>
          </section>
          <section>
            <img width="42" height="42" src="/imgs/icons-landingpage/clock.svg">
            <span>Minimiza tempo e equívocos na comunicação entre clientes e equipe</span>
          </section>
        </article>
        <div class="mascot-mobile"></div>
      </article>
      <div class="mascot"></div>
    </main>
    <footer>
      <section class="smartphones" />
      <article class="footer">
        <span>ENTRAR EM CONTATO</span>
        <section class="social-icons">
          <a href="">
            <img src="/imgs/icons-landingpage/facebook.svg" alt="facebook icon"></a>
          <a href="">
            <img src="/imgs/icons-landingpage/whatsapp.svg" alt="whatsapp icon"></a>
          <a href="">
            <img src="/imgs/icons-landingpage/instagram.svg" alt="whatsapp instagram">
          </a>
        </section>
      </article>


    </footer>
  </div>
</template>

<script setup>

</script>

<style scoped lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Bakbak+One&display=swap');



#content {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  width: 100%;
  height: 100vh;
  background: url('/imgs/bg-landingpage.svg');
  background-size: cover;
  background-attachment: fixed;
}

#header {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 60vw;
  margin-top: 50px;
  height: 12vh;
}

.logo {
  width: 157px;
  height: 102px;
  background: url('/imgs/logo-ladingpage.svg') no-repeat;
}

#middle {
  display: flex;
  width: 60vw;
  flex-direction: row;
  margin-top: 40px;
  justify-content: space-between;
}

.title {
  width: 80%;
  line-height: 40px;
}

.title h1 {
  font-family: "Bakbak One", sans-serif;
  font-weight: 400;
  color: #133D67;
  font-style: normal;
  font-size: 3rem;
}

.title p {
  font-size: 2rem;
  line-height: 30px;
  font-family: "Montserrat";
  color: #333;
}

.description {
  width: 100%;
  max-width: 600px;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  margin-top: 40px;
  gap: 15px;
}

.description section {
  display: flex;
  align-items: center;
  gap: 15px;
}

.mascot {
  position: fixed;
  top: 60px;
  left: 600px;
  display: flex;
  min-width: 60%;
  height: 90%;
  background: url('/imgs/icons-landingpage/mascot.svg') no-repeat center;
  background-size: contain;
}

.mascot-mobile {
  display: none;
  min-width: 70%;
  height: 80vh;
  background: url('/imgs/icons-landingpage/mascot.svg') no-repeat center;
  background-size: contain;
}

footer {
  position: fixed;
  bottom: 0;
  left: 50%;
  align-items: flex-end;
  transform: translateX(-50%);
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 2fr;
  width: 60vw;
}

.footer {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 100px;
  position: fixed;
  left: 0;
  z-index: 0;
  width: 60vw;
  background-color: #133D67;
  color: white;
  border-radius: 8px 8px 0 0;
  height: 120px;
}

.footer span {
  background-color: #009c8d;
  padding: 15px 30px;
  cursor: pointer;
  letter-spacing: 2px;
  font-family: "Montserrat", sans-serif;
  font-weight: bold;
  border-radius: 5px;
  transition: all .4s ease-in-out;
}

.footer span:hover {
  scale: 1.05;
}

.social-icons {
  display: flex;
  z-index: 1;
  gap: 15px;
  margin-right: 50px;
}

.social-icons a img {
  width: 32px;
  height: 32px;
}

.smartphones {
  width: 30vw;
  height: 48vh;
  z-index: 1;
  background: url('../public/imgs/icons-landingpage/celulare.svg') center bottom;
  background-repeat: no-repeat;
  background-size: contain;
  position: relative;
}
.smartphones::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 30%; 
  background: linear-gradient(to top, rgba(19, 61, 103, 1), rgba(19, 61, 103, 0));
}
@media (max-width: 900px) {
  * {
    position: static;
  }

  .mascot-mobile {
    display: flex;
    height: 60vh;
  }

  #content {
    overflow: auto !important;
    height: 100vh;
  }

  .mascot {
    display: none;

  }

  #middle {
    width: 80vw;
    flex-direction: column !important;
  }

  .title {
    width: 80vw;
    text-align: center;
  }

  #header {
    width: 80vw;
    align-items: center;
    justify-content: center;
  }

  .logo {
    width: 257px;
    height: 202px;
    background-size: 80%;
    background-position: center center;
  }

  footer {
    display: flex;
    position: relative !important;
    width: 100% !important;
    align-items: center;
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 20px 0;
    background-color: #133D67;
  }

  .footer {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: auto;
    padding: 20px 0;
    gap: 45px;
    border-radius: 8px 8px 0 0;
  }

  .footer span {
    background-color: #009c8d;
    padding: 25px 40px;
    cursor: pointer;
    border-radius: 5px;
  }

  .social-icons {
    width: 80%;
    display: flex;
    justify-content: space-evenly;
    gap: 20px;
    margin-right: 0;
  }
  .smartphones {
  width: 100vw; 
  height: 26vh; 
  z-index: 1;
  background: url('../public/imgs/icons-landingpage/celulare.svg') center bottom;
  background-repeat: no-repeat;
  background-size: 80%;
  position: relative;
}

  .footer {
    width: 90vw;
    left: 0;
    position: relative;
  }

}
</style>