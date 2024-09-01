<template src="./pagination.html"></template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

export default defineComponent({
    name: "PaginationComponent",
    props: {
        items: {
            type: Array as PropType<any[]>,
            required: true
        },
        pageSize: {
            type: Number,
            required: true,
            default: 30
        },
        pageNumber: {
            type: Number,
            required: true,
            default: 1
        }
    },
    data() {
        return {
            internalPageNumber: this.pageNumber
        };
    },
    watch: {
        pageNumber(newPageNumber) {
            this.internalPageNumber = newPageNumber;
        }
    },
    computed: {
        totalPaginate() {
            return Math.ceil(this.items.length / this.pageSize);
        }
    },
    methods: {
        onUpdatePageNumber(targetPage: number) {
            this.internalPageNumber = targetPage;
            this.$emit('update:pageNumber', targetPage);
        },
        onClickNextPageNumber() {
            if (this.internalPageNumber < this.totalPaginate) {
                this.internalPageNumber++;
                this.$emit('update:pageNumber', this.internalPageNumber);
            }
        },
        onClickBackPageNumber() {
            if (this.internalPageNumber > 1) {
                this.internalPageNumber--;
                this.$emit('update:pageNumber', this.internalPageNumber);
            }
        }
    }
});
</script>

<style scoped>
@import url("./pagination.css");
</style>
