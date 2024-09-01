<template src="./popup-details.html"></template>
<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
    name: "Popup Countries Catalog Detail",
    props: ["detailItems"],
    data() {
        return {

        }
    },
    methods: {
        onClickClosePopup() {
            this.$emit("closePopup", false);
        }
    },
});
</script>
<style>
@import url("./popup-details.css");
</style>