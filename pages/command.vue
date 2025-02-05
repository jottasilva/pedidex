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
                        <div class="py-6">
                            <Button label="Proximo" @click="activateCallback('2')" />
                        </div>
                    </StepPanel>
                </StepItem>
                <StepItem value="2">
                    <Step>Observações, Critícas ou Elogios</Step>
                    <StepPanel v-slot="{ activateCallback }">
                        <div class="flex flex-col h-48">
                            <div
                                class="border-2 border-dashed border-surface-200 dark:border-surface-700 rounded bg-surface-50 dark:bg-surface-950 flex-auto flex justify-center items-center font-medium">
                                <IftaLabel>
                                    <Textarea id="description" v-model="value" rows="6" 
                                        style="resize: none" />
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
                        <div class="flex flex-col h-48  bt">
                            <div
                                class="border-2 border-dashed border-surface-200 dark:border-surface-700 rounded bg-surface-50 dark:bg-surface-950 flex-auto flex justify-center items-center font-medium">
                            </div>
                        </div>
                        <div class="py-6">
                            <Button label="Retornar" severity="secondary" @click="activateCallback('2')" />
                        </div>
                    </StepPanel>
                </StepItem>
            </Stepper>
        </div>
    </ScrollPanel>
</template>

<script>
import { CommandItem } from '#components';

</script>
<style lang="scss" scoped>
.p-stepper {
    border-radius: 5px;
    flex: 1;
    padding: 50px;
    background-color: #ffffff !important;
}

.p-stepper .p-stepper-item {
    border-radius: 5px;
    background-color: transparent !important;
}
#description{
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

    .card {
        flex: 1;
        padding: 10px;
    }

}
</style>
