<template>
    <div id="shadow" @click.self="modalStore.closeModal">
        <section class="bt-close">
            <div @click="closeModal"/>
        </section>
        <div id="modal">
            <About v-if="modalStore.modalData?.page === 'about'" />
            <Contact v-if="modalStore.modalData?.page === 'contact'"/>
            <Terms v-if="modalStore.modalData?.page === 'terms'"/>
            <Terms_r v-if="modalStore.modalData?.page === 'terms_r'"/>
            <Command v-if="modalStore.modalData?.page === 'command'"/>
            <ModalLogin v-if="modalStore.modalData?.page === 'login'" />
        </div>
    </div>
</template>
<script setup>
import Command from '~/pages/command.vue';
import { useModalStore } from '~/stores/modal'
const modalStore = useModalStore();
const { closeModal } = modalStore; 
const About = defineAsyncComponent(() => import('../pages/about.vue')) 
const Contact = defineAsyncComponent(() => import('../pages/contact.vue')) 
const Terms = defineAsyncComponent(() => import('../pages/terms.vue')) 
const Terms_r = defineAsyncComponent(() => import('../pages/terms_r.vue')) 
</script>
<style scoped>

#modal {
    display: flex;
    width: 80vw;
    max-width: 80vw;
    height: 80vh;
    justify-content: center;
    background: #fff;
    border-radius: 5px;
}
.bt-close{
    display: flex;
    align-self: flex-end;
    padding:0 10vw 0 50vh;
    height: 60px;
}
.bt-close div{
    display: flex;
    background:url('/public/imgs/icons/close-bt.svg') no-repeat center;
    width:120px;
    cursor: pointer;
    height: 40px;
}
#shadow {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 101vw;
    height: 101vh;
    background: rgba(0, 0, 0, 0.9);
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1000;

}
</style>