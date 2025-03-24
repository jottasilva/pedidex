<template>
    <div>
        <div class="orderRecents">
            <img src="/assets/painel/imgs/order-icon-recent.svg" width="30">
            <span>
                Pedidos Recentes
            </span>
        </div>

        <article class="item">
            <div class="container">
                <section class="date">
                    <span> <b>MESA 10 PEDIDO #1012</b> 18:27:12</span>
                </section>
                <section class="body-item">
                    <span>2 - Margherita Suprema , 1 - Coca cola Lata 350ml , 1 - Suco de Laranja 600ml , 2 - Esfiha
                        Nutela
                        com morango </span>
                </section>
                <section class="obs">
                    <span>Observações : Retirar cebola e oregano caso tenha, quero também a coca em temperatura
                        ambiente,
                        não precisa estar gelada.</span>
                </section>
            </div>
            <div class="btns">
                <span>Pendente..</span>
                <img src="/assets/painel/imgs/cancel-icon.svg" width="30">
                <img src="/assets/painel/imgs/accept-icon.svg" width="30">
            </div>
        </article>

        <article class="item">
            <div class="container">
                <section class="date">
                    <span> <b>MESA 10 PEDIDO #1012</b> 18:27:12</span>
                </section>
                <section class="body-item">
                    <span>2 - Margherita Suprema , 1 - Coca cola Lata 350ml , 1 - Suco de Laranja 600ml , 2 - Esfiha
                        Nutela
                        com morango </span>
                </section>
                <section class="obs">
                    <span>Observações : Retirar cebola e oregano caso tenha, quero também a coca em temperatura
                        ambiente,
                        não precisa estar gelada.</span>
                </section>
            </div>
            <div class="btns">
                <span>Pendente..</span>
                <img src="/assets/painel/imgs/cancel-icon.svg" width="30">
                <img src="/assets/painel/imgs/accept-icon.svg" width="30">
            </div>
        </article>


        <article class="item">
            <div class="container">
                <section class="date">
                    <span> <b>MESA 10 PEDIDO #1012</b> 18:27:12</span>
                </section>
                <section class="body-item">
                    <span>2 - Margherita Suprema , 1 - Coca cola Lata 350ml , 1 - Suco de Laranja 600ml , 2 - Esfiha
                        Nutela
                        com morango </span>
                </section>
                <section class="obs">
                    <span>Observações : Retirar cebola e oregano caso tenha, quero também a coca em temperatura
                        ambiente,
                        não precisa estar gelada.</span>
                </section>
            </div>
            <div class="btns">
                <span>Pendente..</span>
                <img src="/assets/painel/imgs/cancel-icon.svg" width="30">
                <img src="/assets/painel/imgs/accept-icon.svg" width="30">
            </div>
        </article>

        <article>
            <div class="orderRecents">
                <img src="/assets/painel/imgs/table-icon.svg" width="50">
                <span>
                    Mesas
                </span>
            </div>
            <section class="tables">
                <div v-for="n in 42" :key="n">
                    <span>{{ n }}</span>
                </div>
            </section>
        </article>

    </div>
</template>
<style scoped>
.orderRecents {
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 60px;
    padding-left: 20px;
    gap: 20px;
    color: white;
    margin-top: 30px;
    font-size: clamp(14px,2vw, 34px);
    border-radius: 4px;
    background-color: #133d67;
}

.item {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 20px;
    gap: 15px;
    border-bottom: 1px #d8d8d8 dashed;
}

.body-item {
    margin: 5px 0;
    font-size: clamp(14px, 1vw, 24px);
    font-weight: bold;
    color:#133d67 ;
}

.date {
    display: flex;
    color: #444;
    margin: 10px 0;
    font-size: clamp(14px, 0.5vw, 24px);
}

.date span {
    display: flex;
    border-radius: 3px;
    background-color: #ccc;
    padding: 3px 10px;
    gap: 50px;
}

.obs {
    font-size: clamp(14px, .5vw, 24px);
}

.btns {
    display: flex;
    align-items: center;
    gap: 20px;
}

.btns span {
    border-radius: 3px;
    background-color: #ccc;
    padding: 5px 10px;
}

.tables {
    display: flex;
    padding: 40px 0;
    flex-direction: row;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 20px;
}

.tables div {
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 4px;
    width: 42px;
    height: 42px;
    font-size: clamp(14px, 1vw, 24px);
    background-color: #ccc;
    font-weight: bold;
}
.tables div:nth-child(2)
,.tables div:nth-child(5)
,.tables div:nth-child(9)
,.tables div:nth-child(7)
,.tables div:nth-child(11)
,.tables div:nth-child(14)
,.tables div:nth-child(17)
,.tables div:nth-child(18)
,.tables div:nth-child(21)
,.tables div:nth-child(22)
,.tables div:nth-child(24)
,.tables div:nth-child(27)
,.tables div:nth-child(29)
,.tables div:nth-child(32)
,.tables div:nth-child(33)
,.tables div:nth-child(35)
,.tables div:nth-child(37)
,.tables div:nth-child(38)
,.tables div:nth-child(39)
,.tables div:nth-child(42)
{
    background-color: #009c8d;
    color: white;
}
@media (max-width:868px) {
    .item {
        display: flex;
        align-items: center;
        gap:50px;
        flex-direction: column;

    }

}
</style>