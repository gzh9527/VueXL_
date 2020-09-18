<template>
  <insureJoin :planCode="'XL003'"></insureJoin>
</template>

<script>
    import insureJoin from '../../components/joinComponent'

    export default {
        name: "join",
        components: {
            insureJoin
        }
    }
</script>

