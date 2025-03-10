
import { fetchEstablishments } from "~/services/getEstablishment";
('establishment',{
    state:() => ({
        establishments : [],
        loading:false,
        error:null,
    }),
    actions:{
        async loadEstablishments(){
            this.loading = true;
            this.error = null;
            try{
                const data = await fetchEstablishments();
                this.establishments = data;
            }catch(error){
                this.error = 'Erro ao carregar o estabelecimento';
            }finally{
                this.error = null;
                this.loading = false;
            }


        }
    }
});