<template>
    <div>
         <div id="footer">
        <section class="links">
            <h1>Links uteis</h1>
            <ul>
                <li><a @click="openModal({page: 'about'})">Sobre</a></li>
                <li><a  @click="openModal({page: 'contact'})">Entre em contato</a></li>
                <li><a  @click="openModal({page: 'terms'})">Termos de uso</a></li>
                <li><a  @click="openModal({page: 'terms_r'})">Termos de responsabilidade</a></li>
            </ul>
        </section>
        <section class="logo-footer" />
        <section class="socials">
            
                <h1>Nossas redes</h1>
                <article class="social-icons">
                    <section class="social-wpp" />
                    <section class="social-instagram" />
                    <section class="social-facebook" />
                </article>
            
        </section>
        
    </div>
    <div class="copyright">
        <span><b>Desenvolvido pensando como um cliente!</b> © todos os direitos reservados</span>
    </div>
    </div>

</template>
<script setup>
    import { useModalStore } from '~/stores/modal'
    const modalStore = useModalStore(); 
    const { openModal } = modalStore;   
</script>
<style scoped>
#footer {
    display: grid;
    font-family: "Noto Sans", serif;
    grid-template-columns: 1fr 1fr 1fr;
    grid-auto-columns: auto;
    align-items: start;
    width: 100%;
    max-width: 70vw;
    margin: 0 auto;
    padding: 20px 0 80px 0;
    border-top: 15px var(--bgGreen) solid;
}

.links,
.socials {
    padding: 40px 10px 0 10px;
}

.socials {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
}

.social-icons {
    display: flex;
    margin: 20px 0;
    gap:30px;
    justify-content: flex-end;
}

.social-wpp {
    background: url('../public/imgs/icons/whatsapp.svg') no-repeat center;
    cursor: pointer;
    width: 48px;
    height: 48px;
}

.social-instagram {
    background: url('../public/imgs/icons/instagram.svg') no-repeat center;
    cursor: pointer;
    width: 48px;
    height: 48px;
}

.social-facebook {
    background: url('../public/imgs/icons/facebook.svg') no-repeat center;
    cursor: pointer;
    width: 48px;
    height: 48px;
}

.links h1,
.socials h1 {
    color: var(--bgBlue);
    font-size: 2rem;
}

.links ul li {
    list-style: none;
    cursor: pointer;
}

.links ul li a {
    text-decoration: none;
    color: #333;
    transition: all .3s linear;
}
.links ul li a:hover{
    color: var(--bgGreen);
}

.logo-footer {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    opacity: .5;
    transition: all .4s linear;
    background: url('../public/imgs/logo-footer.svg') no-repeat center;
    background-size:40%;
}
.copyright{
    display: flex;
    width: 100%;
    height:50px;
    background: var(--bgBlue);
    color: white;
    align-items: center;
    justify-content: center;
    font-size: .8rem;
    font-family: "Noto sans";
    letter-spacing: 1px;
    text-align: center;
}
@media (max-width: 660px){
#footer{
    display: flex;
    align-items: center;
    height: 80vh;
    flex-direction: column !important;
    max-width: 90vw;
    }
.links{
    align-items: center;
    text-align: center;
    margin-bottom: 40px;
}
.links h1{
    padding:0 0 20px 0;
}
.links ul li{
    height: 30px;

}
}
</style>