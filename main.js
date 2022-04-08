// Suerte :)
// https://restcountries.com/v3.1/all
Vue.createApp({
    data(){
        return{
            apiData: [],
            regionCountryFilter: '',
            searchTextCotnent: '',
            themeMode: false,
            modalActive: 'hidden',
            currentTarget: {},
            lowPoblation: false
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
        },
        changeThemeModel(){
            this.themeMode = !this.themeMode
        }
    },    
    computed:{
        countries(){
            let filterCountryes = this.apiData.sort((c1, c2) =>  c1.population < c2.population ? 1: c1.population > c2.population ? -1:0)

            filterCountryes = this.apiData.filter(country=> {
                if(this.regionCountryFilter == '' || this.regionCountryFilter == 'all'){                    
                    return this.apiData;
                }
                else{                    
                    return country.region.toUpperCase() == this.regionCountryFilter.toUpperCase();
                }
            })

            filterCountryes = filterCountryes.filter(country=> country.name.common.toUpperCase().includes(this.searchTextCotnent.toUpperCase()))            

            return filterCountryes
        },
        alertLowPopulation(){
            return this.filteredCountries.length >= 1 && countries.every(country => {
                return country.population < 100000000
            })
        }
    },
    created(){
        this.getData();
    }
}).mount('#app');