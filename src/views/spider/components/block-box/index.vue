<template>
    <div class="block-box">
        <div class="header"><i :class="icon"></i> {{ title }}</div>
        <div class="body"><slot></slot></div>
    </div>
</template>
<script>
    export default {
        name: "block-box",
        props: {
            title: {
                type: String,
                default: ""
            },
            icon: {
                type: String,
                default: ""
            }
        }
    };
</script>

<style lang="scss">
    /* block-box */
    .block-box {
        position: relative;
    }
    .block-box .header {
        font-size: 16px;
        padding: 15px 20px;
        line-height: 1;
        background: #2196f3;
        color: rgb(68, 64, 66);
        font-weight: 500;
        border-top-left-radius: 6px;
        border-top-right-radius: 6px;
    }

    .block-box .body {
        height: auto;
        position: relative;
        padding: 20px;
        border-bottom-left-radius: 6px;
        border-bottom-right-radius: 6px;
        background: #f5f5f5;
    }
</style>
