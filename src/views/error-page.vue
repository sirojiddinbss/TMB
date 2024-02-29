<template>
  <div class="error__page">
    <div>
      <span>4</span>
      <span>0</span>
      <span>4</span>
    </div>
    <h1>Bu sahifa topilmadi</h1>
    <router-link to="/"> Bosh sahifaga qaytish... </router-link>
  </div>
</template>
<script>
export default {}
</script>
<style scoped>
.error__page {
  background-color: aliceblue;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: rgb(255, 255, 255);
  background: radial-gradient(circle, rgba(255, 255, 255, 1) 0%, rgba(200, 200, 200, 1) 100%);
}
span {
  font-size: 140px;
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
}
h1 {
  font-family: 'Courier New', Courier, monospace;
  font-size: 50px;
}
a {
  margin-top: 10px;
  font-size: 25px;
  font-family: 'Courier New', Courier, monospace;
  font-weight: bold;
  text-decoration: underline;
  color: rgb(0, 0, 56);
}
</style>
