<template>
    <article class="card" :style="{ backgroundImage: 'url(http://localhost:8000/api/imgs/' + bg + ')' }">
        <section class="title">
            <span><b>{{ title }}</b></span>
            <span class="desc">{{ description }}</span>
        </section>
        
        <section class="price">
            <div class="price-footer">
                <span>R$</span>
                <h2>{{ formatCurrency(price) }}</h2>
            </div>
            <section class="bt">
                <b>+</b>
            </section>
        </section>
    </article>
</template>
<script>
export default {
    props: {
        title: {
            type: String,
            default: ""
        },
        price: [Number, String],
        description:{
            type:String,
            default:""
        },
        bg: {
            type: String,
            default: ""
        }
    },
    methods: {
        formatCurrency(value) {
            return new Intl.NumberFormat('pt-BR', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
            }).format(value);
        }
    }
}
</script>
<style lang="scss" scoped>
*{
    -webkit-touch-callout: none;  
    -webkit-user-select: none;    
    -khtml-user-select: none;     
    -moz-user-select: none;       
    -ms-user-select: none;      
    user-select: none;       
}
.card {
    display: flex;
    flex-direction: column;
    width: 90%;
   background-repeat: no-repeat;
    background-size: cover;
    background-position: 10px -130px;
    height: 100%;
    justify-content: flex-end;
    align-items: baseline;
    border-radius: 4px;
    font-family: "Noto Sans", serif;
    transition: all .4s ease-in-out;
}

.desc{
    font-size: 14px;
    color: #525151;
}
.price {
    display: flex;
    width: 100%;
    padding: 10px 20px;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    background-color: #edeef3;
    border-radius:0 0 5px 5px;
}

.title {
    padding: 0 20px;
    display:flex;
    flex-direction: column;
    justify-content: space-between;
    -webkit-line-clamp: 3;
    color:#444;
    width:100%;
    background: rgba(255, 255, 255, 0.4);
    backdrop-filter: blur(6px);
    -webkit-backdrop-filter: blur(13.5px);
    padding-top: 20px;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    line-height: 1.4em;
}

.price-footer {
    display: flex;
    flex-direction: row;
    gap: 10px;
    color: var(--bgDark);
    justify-content: space-between;
    align-items: center;
}

.price-footer span {
    font-weight: bold;
}

.bt {
    display: flex;
    align-items: center;
    color: white;
    width: 28px;
    cursor: pointer;
    height: 28px;
    padding: 8px;
    font-weight: bold;
    font-family: 'Montserrat';
    background: var(--bgGreen);
    border-radius: 4px;
}
@media (max-width: 507px){
    .card{
       
    }
}
</style>
