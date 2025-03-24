<template>
    <ScrollPanel style="width: 100%; height: 98%;  overflow-y: auto">
        <div class="card">
            <Stepper value="1">
                <StepItem value="1">
                    <Step>Resumo</Step>
                    <StepPanel v-slot="{ activateCallback }">
                        <div class="flex flex-col h-48 bt">
                            <div
                                class="border-2 border-dashed border-surface-200 dark:border-surface-700 rounded bg-surface-50 dark:bg-surface-950 flex-auto flex justify-center items-center font-medium">
                                <CommandItem />
                            </div>
                        </div>
                        <div class="py-6 " style="margin-bottom: 40px; display: flex; justify-content: space-between;">
                            <Button label="Proximo" @click="activateCallback('2')" />
                            <Button @click="cartStore.resetAllQuantities" label="Limpar comanda" severity="secondary" />
                        </div>
                    </StepPanel>
                </StepItem>
                <StepItem value="2">
                    <Step>Observações, Critícas ou Elogios</Step>
                    <StepPanel v-slot="{ activateCallback }">
                        <div class="flex flex-col h-48">
                            <div
                                class="border-2 border-dashed border-surface-200 dark:border-surface-700 rounded bg-surface-50 dark:bg-surface-950 flex-auto flex justify-center items-center font-medium">
                                <IftaLabel style="margin-top: 20px;">
                                    <Textarea id="description" v-model="observation" rows="6" style="resize: none" />
                                    <label for="description">Deixe sua mensagem.</label>
                                </IftaLabel>
                            </div>
                        </div>
                        <div class="flex py-6 gap-2 bt">
                            <Button label="Retornar" severity="secondary" @click="activateCallback('1')" />
                            <Button label="Proximo" @click="activateCallback('3')" />
                        </div>
                    </StepPanel>
                </StepItem>
                <StepItem value="3">
                    <Step>Finalização</Step>
                    <StepPanel v-slot="{ activateCallback }">
                        <div class="flex finallyboxbt flex-col h-48 bt">
                            <div
                                class="border-2 border-dashed border-surface-200 dark:border-surface-700 rounded bg-surface-50 dark:bg-surface-950 flex-auto flex justify-center items-center font-medium">
                            </div>
                            <Accordion value="0">
                                <AccordionPanel value="0">
                                    <AccordionHeader style="color: var(--bgGreen); font-size: 1.5rem;">Meus dados
                                    </AccordionHeader>
                                    <AccordionContent>
                                        <section class="finally">
                                            <form action="">
                                                <input type="text" v-model="name" placeholder="Seu nome completo">
                                                <input v-model="email" type="email" placeholder="Seu e-mail">
                                                <input type="tel" v-model="phone" placeholder="Telefone para contato">
                                                <input v-model="cpf" type="text" placeholder="CPF na nota? (Opcional)">
                                            </form>
                                        </section>
                                    </AccordionContent>
                                </AccordionPanel>
                                <AccordionPanel value="1">
                                    <AccordionHeader style="color: var(--bgGreen); font-size: 1.5rem;">Endereço para
                                        Delivery</AccordionHeader>
                                    <AccordionContent style="height: 40vh">
                                        <section class="address">
                                            <form @input="updateClientStore">
                                                <section class="address-inputs">
                                                    <input v-model="addressName" type="text" placeholder="Rua...">
                                                    <input v-model="addressNumber" type="number" placeholder="Nº">
                                                    <input v-model="addressNeighborhood" type="text"
                                                        placeholder="Bairro (ex : Centro)">
                                                    <input v-model="addressCityUf" type="text"
                                                        placeholder="Cidade / estado">
                                                </section>
                                                <section>
                                                    <IftaLabel>
                                                        <Textarea id="description" v-model="deliveryNotes" rows="6"
                                                            style="resize: none" />
                                                        <label style="font-size: 14px;font-weight: bold;"
                                                            for="description">Facilite a entrega, deixe dicas!</label>
                                                    </IftaLabel>
                                                </section>
                                                <section class="payment">
                                                    <h3>Forma de pagamento :</h3>
                                                    <div aria-required="true" class="card flex justify-center suggest">
                                                        <Select v-model="selectedPayment" :options="paym"
                                                            optionLabel="name" placeholder="Forma de Pagamento"
                                                            class="w-full md:w-56" />
                                                    </div>
                                                    <input v-if="selectedPayment?.code == 'DINHEIRO'" v-model="money" type="number"
                                                        placeholder="Precisa de troco ?">
                                                </section>

                                            </form>
                                        </section>
                                    </AccordionContent>
                                </AccordionPanel>
                            </Accordion>

                        </div>
                        <div class="py-6 fnlly">
                            <section>
                                <Button label="Retornar" severity="secondary" @click="activateCallback('2')" />
                                <Button label="Cancelar"
                                    style="background-color: red;border: 1px red solid;margin-left: 20px;"
                                    @click="activateCallback('2')" />
                            </section>

                            <Button @click="sendOrderData" class="btfnl" label="Finalizar Pedido" severity="success" />
                        </div>
                    </StepPanel>
                </StepItem>
            </Stepper>
        </div>

    </ScrollPanel>

</template>

<script setup>
import { useToast } from 'primevue/usetoast'
import { ref } from "vue";
import { useCartStore } from '../services/cartStore';
import { useClientStore } from '~/stores/orderData';
import  webSocketService  from '~/services/websocket_client';
import { useEstablishmentStore } from '~/services/establishmentStore';
const localData = JSON.parse(localStorage.getItem('orderDataClient')) || {};
const cartStore = useCartStore();
const clientStore = useClientStore();
const toast = useToast();
const name = ref(localData.name || "");
const email = ref(localData.email || "");
const phone = ref(localData.phone || "");
const cpf = ref(localData.cpf || "");
const addressName = ref(localData.street || "");
const addressNumber = ref(localData.number || "");
const deliveryNotes = ref("");
const addressNeighborhood = ref(localData.neighborhood || "");
const addressCityUf = ref(localData.cityState || "");
const addressTip = ref("");
const observation = ref("");
const selectedPayment = ref("");
const money = ref("");
const store = useEstablishmentStore();

const showToast = (severity, summary, detail) => {
    toast.add({
        severity: severity,
        summary: summary,
        detail: detail,
        life: 4000,
        group: 'bl'
    })
    //severity: Define a severidade do toast (por exemplo, "success", "info", "warn", "error").
    //summary: Define um título curto para a notificação.
    //detail: Define uma mensagem mais detalhada da notificação.
}
const orderCall = () => {
    const data = {
            establishment_id:store.getEstablishment().id,
            message:"Pedido Realizado",
            table_number:2,
            group_name: "order"
    };

    try {
        webSocketService.sendMessage(data);
        showToast('success', 'Atendimento Solicitado!', 'Aguarde, em instantes você será atendido(a)!');
    } catch (err) {
        showToast('error', 'Erro', 'Erro ao tentar chamar atendimento... ' + err);
    }
};
const sendOrderData = async () => {
    
    if (cartStore.cartItems.length > 0) {
        if (name.value?.trim() && email.value?.trim() && phone.value?.trim()) {
            try {
                const clientData = {
                    name: name.value,
                    order_number: localStorage.getItem('orderNumber'),
                    email: email.value,
                    phone: phone.value,
                    cpf: cpf.value,
                    street: addressName.value,
                    number: addressNumber.value,
                    neighborhood: addressNeighborhood.value,
                    cityState: addressCityUf.value,
                    observation: observation.value,
                    deliveryNotes: deliveryNotes.value,
                    paymentMethod: selectedPayment.value.code === "DINHEIRO" ? `Dinheiro (troco para ${money.value} R$)` : selectedPayment.value.name,
                    change: addressTip.value,
                };

                clientStore.setClientData(clientData);

                await new Promise((resolve) => setTimeout(resolve, 0));

                await cartStore.newOrder();

                showToast("success", "Sucesso", "Pedido enviado com sucesso!");

                orderCall();

            } catch (error) {
                console.error("Erro ao enviar os dados do pedido:", error);
                showToast("error", "Erro", "Ocorreu um erro ao enviar os dados do pedido.");
            }
        } else {
            showToast("warn", "PREENCHA SEUS DADOS!", "Complete seus dados para concluir o pedido");
        }

    } else {
        showToast("warn", "Adicione Produtos", "Sua comanda esta vazia.");
    }
};

watch(() => cartStore.orderStatus, (newStatus) => {
    if (newStatus == "true") {
        showToast("success", "Sucesso", "Pedido enviado com sucesso!");
    } else {
        showToast("error", "Imprevistos acontecem...", "Ocorreu um erro ao tentar enviar seu pedido, tente novamente...");
    }
});

const paym = ref([
    { name: 'Pix', code: 'PIX' },
    { name: 'Dinheiro', code: 'DINHEIRO' },
    { name: 'Cartão', code: 'CARTAO' },
]);

</script>
<style lang="scss" scoped>
.p-stepper {
    display: block;
    border-radius: 5px;
    padding: 50px;
    background-color: #ffffff !important;
}

.fnlly {
    display: flex;
    justify-content: space-between;
}

.finally form {
    display: flex;
    width: 100%;
    gap: 30px;
    padding: 30px 0;
}

.payment {
    display: flex;
    flex-direction: row;
    height: 40px;
    margin-top: 40px;
    gap: 30px;
    align-items: center;

}

.address-inputs {
    display: grid;
    grid-template-columns: 5fr 1fr 3fr 2fr;
    flex: 1;
    margin-bottom: 50px;
    gap: 30px;
}

.address {
    padding: 30px 0;
}

.address form {
    display: flex;
    width: 100%;
    flex-direction: column;
    height: 40px;
    justify-content: space-between;
}

form input {
    font-family: "Noto sans";
    padding: 10px;
    flex: 1;
    gap: 30px;
    letter-spacing: .5px;
    border-radius: 4px;
    border: 1px #ccc solid;
    font-size: 1rem;
    font-weight: bold;
    color: #444;
}

.p-stepper .p-stepper-item {
    border-radius: 5px;
    background-color: transparent !important;
}

#description {
    width: 100%;
}

.p-stepper .p-stepper-item .p-stepper-circle {
    background-color: var(--bgGreen);
}

.p-stepper .p-stepper-item .p-stepper-title {
    font-weight: bold;
}

.bt {
    padding: 40px 0;
}

.bt button:nth-child(1) {
    margin-right: 20px;
}

.p-stepper .p-stepper-item.p-stepper-current .p-stepper-title {
    padding: 50px;
}

@media (max-width: 768px) {
    .p-stepper {
        padding: 10px 25px 10px 0;
    }

    .finallyboxbt {
        height: 120vh;
    }

    .card {
        flex: 1;
        padding: 10px;
    }

    .fnlly {
        width: 100%;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        gap: 30px;
    }

    .address-inputs {
        display: flex;
        width: 100%;
        flex-direction: column;
    }

    .finally form {
        display: flex;
        flex-direction: column;
    }

    .payment {
        flex-direction: column;
    }

    .btfnl {
        width: 100%;
        height: 42px;
    }


}
</style>
