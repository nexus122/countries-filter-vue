// Suerte :)
// https://restcountries.com/v3.1/all
Vue.createApp({
    data(){
        return{
            apiData: [],
            regionCountryFilter: '',
            searchTextCotnent: '',
            modalActive: 'hidden',
            currentTarget: {}
        }
    },
    methods:{
        async getData(){
            const result = await fetch('https://restcountries.com/v3.1/all');            
            this.apiData = await result.json();
            this.countries = this.apiData
            this.currentTarget = this.apiData[0]
        },
        changeCurrentTarget(param){
            this.currentTarget = param;
            this.toggleModal();
        },
        toggleModal(){
            this.modalActive = this.modalActive == 'open' ? 'hidden': 'open'
        }
    },    
    computed:{
        countries(){
            let filterCountryes = this.apiData.filter(country=> {
                if(this.regionCountryFilter == '' || this.regionCountryFilter == 'all'){                    
                    return this.apiData;
                }
                else{                    
                    return country.region.toUpperCase() == this.regionCountryFilter.toUpperCase();
                }
            })

            filterCountryes = filterCountryes.filter(country=> country.name.common.toUpperCase().includes(this.searchTextCotnent.toUpperCase()))

            return filterCountryes
        }
    },
    created(){
        this.getData();
    }
}).mount('#app');

// Cambiar la clase del body (no gobernado por vue) escucha el click del btn dark mode y añade o quita una clase para volverlo un tema "claro" o "oscuro"
document.querySelector('.btn-toggle').addEventListener('click', function(){
    document.querySelector('body').classList.toggle('light');
})