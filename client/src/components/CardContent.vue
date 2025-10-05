<template>
<div class="card-container">
<div class="card-screen-content">
    <h1>
        Planification
    </h1>
</div>
<div class="card-screen-content">
    <h1>
        En cours
    </h1>
</div>
<div class="card-screen-content">
    <h1>
        Terminée
    </h1>
</div>
</div>

</template>

<script>
</script>

<style scoped>
.card-container {
  display: flex;
  gap: 1rem;
  padding: 2rem;
  align-items: center;
  justify-content: center;
}

.card-screen-content{
  padding: 4rem;
  height: 40vh;
  border: 2px solid red;
  display: flex;
  flex-direction: column;
  flex: 1;
}

</style>