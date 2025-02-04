<template>
     <ScrollPanel style="width: 100%; height: 95%;  overflow-y: auto">
   <div class="container">
    <h1>Envie-nos uma Mensagem.</h1>
    <form>
        <section class="input-box">
            <input class="input" placeholder="Nome completo" type="text" v-model="name" />
            <input class="input" placeholder="Seu melhor E-mail" type="text" v-model="email" />
            <input class="input" placeholder="Assunto" type="text" v-model="assunt" />
            <input class="input" placeholder="Contato / Whatsapp" type="text" v-model="contact" />
        </section>
        <section>
            <textarea name="mensagem" placeholder="Escreva sua mensagem." rows="10" class="input textarea"/>
        </section>
        <section>
            <button>
                ENVIAR AGORA!
            </button>
        </section>
    </form>
   </div>
    </ScrollPanel>
</template>
<script>
import { ref } from 'vue';
const value1 = ref('');
const value2 = ref('');
</script>
<style lang="scss" scoped>
    .input-box{
        display: flex;
        gap:40px;
    }
    form{
        display: flex;
        flex-direction: column;
        gap: 50px;
        justify-content: space-between;
    }
    button{
        width: 100%;
        height: 40px;
        background-color: var(--bgGreen);
        outline: none;
        border: none;
        border-radius: 4px;
        font-size: 1rem;
        font-weight: bold;
        color: white;
        text-transform: uppercase;
        letter-spacing:1px;
    }
    .textarea{
        width: 100% !important;
    }
    .input{
        flex: 1;
        padding: 10px;
        border:1px #ccc solid;
        border-radius: 4px;
        outline: none;
        background: white;
        color: #444;
        font-weight: bold;
        font-family: "Noto sans",serif;
        font-size: 1rem;
    }
    .container{
        padding: 60px;
        flex: 1;
    }
    .container h1{
        font-family: "Noto sans";
        color: var(--bgGreen);
        padding:20px 0 60px 0;
        font-size:2em;
    }
    @media (max-width: 768px){
       .input-box{
            flex-direction: column;
            gap: 10px;
        }
        .container{
        padding:20px;
        flex: 1;
    }
    .container h1{
        width: 100%;
        padding-bottom:30px;
        text-align: center;
        font-size:1.3em;
    }
    }
</style>