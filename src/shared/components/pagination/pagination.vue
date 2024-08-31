<template src="./pagination.html"></template>
<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
    name: "Pagination Component",
    props: ["items"],
    data() {
        return {

        }
    },
    mounted() {

    },
    watch: {

    },
    computed: {

    },
    methods: {
        async retrieveCountriesCatalog() {
            const responseData = await this.$RequestService.get("https://restcountries.com/v3.1/all");
            console.log("responseData", responseData);
        }
    }
});
</script>
<style scoped>
@import url("./pagination.css");
</style>
