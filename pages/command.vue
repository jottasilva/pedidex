
<template>
    <ScrollPanel style="width: 100%; height: 98%;  overflow-y: auto">
    <div class="card">
        <Stepper value="1">
            <StepItem value="1">
                <Step>Resumo</Step>
                <StepPanel v-slot="{ activateCallback }">
                    <div class="flex flex-col h-48 bt">
                        <div class="border-2 border-dashed border-surface-200 dark:border-surface-700 rounded bg-surface-50 dark:bg-surface-950 flex-auto flex justify-center items-center font-medium">Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus quisquam suscipit commodi, sint, maiores sit libero neque ea voluptatem eligendi doloribus atque tempore omnis ut animi ipsum accusantium molestiae at numquam, perferendis exercitationem veritatis. Dolorum fugit odit blanditiis, quibusdam illo dignissimos tenetur distinctio laboriosam quos laborum sit quidem possimus voluptatibus sapiente, praesentium natus soluta dolorem, numquam ipsa. Natus suscipit iure obcaecati hic fugiat mollitia, dolores officia, laboriosam laborum quod qui architecto sunt? Quaerat quos suscipit nam voluptatibus fuga neque, facere dicta odit aspernatur omnis qui ea ipsam quidem quia minus repudiandae error asperiores sapiente eaque laudantium soluta minima ex. Dolorem esse quae hic nisi, sed dignissimos voluptas sapiente inventore fugit ullam et ratione facilis! Est ad rerum molestiae consequatur minus inventore suscipit eveniet veritatis dignissimos, totam asperiores id numquam error necessitatibus velit aspernatur optio beatae possimus. Repellendus beatae laudantium consequatur soluta incidunt quod perferendis quam dolores voluptate modi animi nobis ullam eius enim, dolorum voluptatibus ipsam cupiditate. Maiores molestias provident laudantium magni eum consequuntur velit, rem reprehenderit quisquam quo dolor hic quas possimus ab, harum id praesentium voluptate eligendi eaque ea illum exercitationem dolore vel? Facere odio officia tempore velit iusto accusantium nihil ipsum, laborum repellat voluptatem? Ratione recusandae veniam inventore quisquam numquam labore totam porro obcaecati quia cumque mollitia ut eum, ipsa provident eos eaque dolorem minus cum illo odit, eligendi voluptate optio? Eligendi aliquid nisi dolorem voluptate soluta quo minus ducimus ex natus? Ut ducimus fuga, ad, doloribus ex illo tempore enim, possimus dignissimos quisquam voluptatem accusantium consequuntur.</div>
                    </div>
                    <div class="py-6">
                        <Button label="Proximo" @click="activateCallback('2')" />
                    </div>
                </StepPanel>
            </StepItem>
            <StepItem value="2">
                <Step>Observações</Step>
                <StepPanel v-slot="{ activateCallback }">
                    <div class="flex flex-col h-48">
                        <div class="border-2 border-dashed border-surface-200 dark:border-surface-700 rounded bg-surface-50 dark:bg-surface-950 flex-auto flex justify-center items-center font-medium">Content II</div>
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
                        <div class="border-2 border-dashed border-surface-200 dark:border-surface-700 rounded bg-surface-50 dark:bg-surface-950 flex-auto flex justify-center items-center font-medium">
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
</script>
<style lang="scss" scoped> 

.p-stepper {
    border-radius: 5px;
    flex:1;
    padding: 50px;
    background-color: #ffffff !important;
}
.p-stepper .p-stepper-item {
    border-radius: 5px;
    background-color: transparent !important;
}
.p-stepper .p-stepper-item .p-stepper-circle {
    background-color: var(--bgGreen);  
}
.p-stepper .p-stepper-item .p-stepper-title {
    font-weight: bold;
}
.bt{
    padding: 40px 0;
}
.bt button:nth-child(1){
    margin-right:20px;
}
.p-stepper .p-stepper-item.p-stepper-current .p-stepper-title {
    padding: 50px;
}

@media (max-width: 768px){
    .p-stepper{
        padding:10px 25px 10px 0;
    }
    .card{
        flex: 1;
        padding: 10px;
    }
    
}
</style>
