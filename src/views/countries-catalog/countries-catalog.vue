<template src="./countries-catalog.html"></template>
<script lang="ts">
import { defineComponent } from "vue";
import pagination from '../../shared/components/pagination/pagination.vue'
export default defineComponent({
    name: "Countries-Catalog-Page",
    components: {
        pagination
    },
    data() {
        return {
            countriesCatalogItems: [] as any[]
        }
    },
    watch: {
        //
    },
    mounted() {
        this.retrieveCountriesCatalog();
    },
    computed: {
        //
    },
    methods: {
        async retrieveCountriesCatalog() {
            const responseData = await this.$RequestService.get("https://restcountries.com/v3.1/all");
            if (!responseData) {
                return;
            }
            console.log("responseData", responseData);
            this.countriesCatalogItems = this.mapCountriesCatalogData(responseData);
            console.log("tttttttttttt", this.countriesCatalogItems);
        },
        mapCountriesCatalogData(data: any) {
            return data.map((item: any) => {
                return {
                    countryName: item.name.common,
                    flags: item.flags.png,
                    countryCodeCCA2: item.cca2,
                    countryCodeCCA3: item.cca3,
                    nativeCountryName: item.name.nativeName,
                    alternativeCountryName: item.altSpellings[0],
                    countrySpellingCode: item.idd,
                    languages: item.languages,
                    region: item.region,
                    subregion: item.subregion
                };
            });

        }
    },
});

</script>
<style>
@import url("./countries-catalog.css");
</style>