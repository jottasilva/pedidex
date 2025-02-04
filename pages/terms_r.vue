<template>
    <ScrollPanel style="width: 96%; height: 95%">
    <div class="container">
        
        <h1>Termos de Responsabilidade</h1>
        <p>Ao utilizar o sistema de comanda digital do <strong>PEDIDEX Cardápio/comanda digital</strong>, você declara estar
            ciente e de acordo com os seguintes termos.</p>

        <h2>1. Responsabilidade do Usuário</h2>
        <p>O Usuário é responsável por todos os pedidos realizados no sistema, verificando os itens antes da confirmação
            e utilizando a plataforma de forma adequada.</p>

        <h2>2. Responsabilidade do Estabelecimento</h2>
        <p>O Estabelecimento se compromete a manter as informações do cardápio atualizadas e a garantir o bom
            funcionamento do sistema, mas não se responsabiliza por erros de seleção feitos pelo Usuário.</p>

        <h2>3. Privacidade e Segurança</h2>
        <p>Os dados do Usuário são protegidos conforme a Política de Privacidade do Estabelecimento e não serão
            compartilhados indevidamente.</p>

        <h2>4. Pagamento e Cobrança</h2>
        <p>O pagamento dos pedidos deverá ser realizado conforme as opções disponíveis. </p>
        <p>O Usuário é responsável pelo
            pagamento de todos os pedidos registrados na sua comanda.</p>

        <h2>5. Modificações nos Termos</h2>
        <p>O Estabelecimento pode modificar estes termos de responsabilidade a qualquer momento, e o uso contínuo do
            sistema implica aceitação das novas condições.</p>

        <h2>6. Aceitação</h2>
        <p>Ao continuar utilizando o sistema, o usuário concorda com estes termos.</p>
  
        
    </div>
    </ScrollPanel>
</template>
<style scoped>
.container {
    font-family: "Noto sans", serif;
    color: #222;
    padding: 40px 80px;
}
.container h1{
    padding: 20px 0;
}
.container h2 {
    color: var(--bgBlue);
    padding:12px 0;
}
@media (max-width: 768px){
    .container{
        padding:20px;
    }
    .container h1{
        text-align: center;
        padding-bottom: 30px;
    }
}
</style>