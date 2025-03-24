<template>
    <div>
        <img src="/assets/painel/imgs/notify-icon.svg" width="22">
        <span> MESA 02 está solicitando atendimento</span>
        <section class="info">
            <span>20:18:23</span>
            <img src="/assets/painel/imgs/close-icon.svg" width="22">
        </section>
    </div>
</template>
<script>
</script>
<style scoped>
div {
    display: grid;
    background-color: #ee721b;
    flex-direction: row;
    grid-template-columns: 1fr 80% 3fr;
    padding-left: 20px;
    padding-right: 20px;
    justify-content: space-between;
    color: white;
    align-items: center;
    border-radius: 4px;
    margin: 20px 0;
    height: 50px;
}

.info {
    display: flex;
    justify-content: space-between;
    gap: 50px;
    align-items: center;
}

.info img {
    cursor: pointer;
}

@media (max-width:868px) {
    div {
        display: flex;

        grid-template-columns: 10% 80% 10%;
        padding-left: 10px;
        flex-direction: column !important;
        padding-right: 10px;
        height: auto;
        gap: 50px;
    }

    .info {
        flex-direction: column;

    }

    div img:nth-child(1) {
        width: 20%;
        margin-top: 40px;
    }

    div img:nth-child(2) {
        margin-bottom: 20px;
    }
}
</style>