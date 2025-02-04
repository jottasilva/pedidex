<template>
  <ScrollPanel style="width: 100%; height: 95%;  overflow-y: auto">
  <div>
    <article  id="about">
    <h1>Sobre Nós</h1>

    <p>Bem-vindo ao <strong>PEDIDEX Cardápio e comanda digital</strong>, a solução inovadora para otimizar a experiência de pedidos em
      estabelecimentos! </p>
      <p>Nosso sistema de comanda digital permite que os clientes façam pedidos de forma rápida e
        intuitiva, sem precisar esperar atendimento.</p>

    <h2>Como Funciona?</h2>
    <ol>
      <li>O cliente escaneia o QR Code disponível na mesa.</li>
      <li>Acessa o cardápio digital diretamente pelo celular.</li>
      <li>Adiciona itens à sua comanda de maneira prática.</li>
      <li>O pedido é enviado automaticamente para a cozinha ou bar.</li>
      <li>O cliente pode finalizar a conta de forma simples.</li>
    </ol>

    <h2>Nossa Missão</h2>
    <p>Facilitar o atendimento em bares, restaurantes e diversos estabelecimentos, proporcionando uma experiência
      moderna, eficiente e livre de complicações tanto para clientes quanto para proprietários.</p>

    <h2>Benefícios</h2>
    <ul>
      <li>Redução no tempo de espera para pedidos.</li>
      <li>Maior controle e organização dos pedidos.</li>
      <li>Facilidade na gestão do cardápio.</li>
      <li>Experiência digital intuitiva para os clientes.</li>
    </ul>

    <p class="mais"><strong>Quer saber mais?</strong>
      <br>Entre em contato conosco!</p>
  </article>
  </div>
</ScrollPanel>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style scoped>
*{
  font-family: "Noto sans",sans-serif;
}
#about{
  color: #222;
  padding:5rem
}
#about h1, h2{
  padding: 10px 0;
}
#about p,#about ul li, #about ol li{
  color: var(--bgBlue);
}
#about ul li, #about ol li{
  list-style: none;
}
.mais{
  padding: 20px 0;
  font-size: 1.5rem;
}
@media (max-width: 768px) {
    #about{
     width: 80vw;
     padding:20px;
    }
    
}

</style>