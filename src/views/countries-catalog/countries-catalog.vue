<template src="./countries-catalog.html"></template>
<script lang="ts">
import { defineComponent } from "vue";
import pagination from '../../shared/components/pagination/pagination.vue'
import PopupCountriesCataLog from "../../shared/components/popup-details/popup-details.vue"
export default defineComponent({
    name: "Countries-Catalog-Page",
    components: {
        pagination,
        PopupCountriesCataLog
    },
    data() {
        return {
            countriesCatalogItems: [] as any[],
            pageNumber: 1 as number,
            pageSize: 30 as number,
            startFromItems: 0,
            startToItems: 30,
            searchCountryCatalog: "",
            sortBy: "asc",
            isShowPopupDetail: false,
            countriesCatalogDetail: {} as any,
        }
    },
    watch: {
        "sortBy": {
            handler(value) {
                if (value == "asc" && this.pageNumber) {
                    this.countriesCatalogItems.sort((a, b) => a.countryName.localeCompare(b.countryName))
                }
                if (value == 'dsc' && this.pageNumber) {
                    this.countriesCatalogItems.sort((a, b) => b.countryName.localeCompare(a.countryName))
                }
            }
        }
    },
    async mounted() {
        await this.retrieveCountriesCatalog();
    },
    computed: {
        handleSelectItemBaseOnPageNumber() {
            const searchItems = this.searchCountryCatalog.toLowerCase();
            const filteredItems = this.countriesCatalogItems.filter((item) =>
                item.countryName.toLowerCase().includes(searchItems)
            );
            return filteredItems.slice(this.startFromItems, this.startToItems);
        },

    },
    methods: {
        async retrieveCountriesCatalog() {
            const responseData = await this.$RequestService.get("https://restcountries.com/v3.1/all");
            if (!responseData) {
                return;
            }
            const countriesItemsAfterSort = responseData.sort((a: any, b: any) => (a.name.common.localeCompare(b.name.common)));
            this.countriesCatalogItems = this.mapCountriesCatalogData(countriesItemsAfterSort);
            console.log("responseData", responseData);
        },
        mapCountriesCatalogData(data: any) {
            return data.map((item: any) => {
                const nativeNameKeys = item.name.nativeName ? Object.keys(item.name.nativeName) : [];
                const firstNativeNameKey = nativeNameKeys[0];
                return {
                    countryName: item.name.common,
                    flag: item.flags.png,
                    countryCodeCCA2: item.cca2,
                    countryCodeCCA3: item.cca3,
                    nativeCountryName: firstNativeNameKey ? item.name.nativeName[firstNativeNameKey].official : null,
                    alternativeCountryName: item.altSpellings[0],
                    countrySpellingCode: item.idd,
                    languages: item.languages,
                    region: item.region,
                    subregion: item.subregion,
                    startOfWeek: item.startOfWeek,
                    capitalCity: item.capital
                };
            });
        },
        updatePageNumber(currentPageNumber: number) {
            this.pageNumber = currentPageNumber;
            this.startFromItems = (currentPageNumber - 1) * this.pageSize;
            this.startToItems = currentPageNumber * this.pageSize;
        },
        onClickOpenPopupCountryDetail() {
            this.isShowPopupDetail = true;
        },
        closePopup(isShow: boolean) {
            this.isShowPopupDetail = isShow;
        },
        onClickGetCountryDetail(item: any){
            this.countriesCatalogDetail = item;
            console.log(item)
        }
    }
});

</script>
<style>
@import url("./countries-catalog.css");
</style>