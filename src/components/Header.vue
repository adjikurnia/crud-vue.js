<template>
  <div class="headers">
    <header class="navbar p-0">
      <img src="../../src/assets/logoSinauKoding.png" alt="LogoSinauKoding">
        <div class="logoutButton">
          <a class="nav-link px-3" href="#">LOG OUT</a>
        </div>
    </header>
  </div>
</template>

<script>
export default {
  name: 'Header'
}
</script>

<style scoped>
.headers header {
  width: 100%;
  height: 66px;
  background: linear-gradient(315deg, rgba(0, 0, 0, 0.6) 0%, rgba(255, 255, 255, 0) 100%);
  background: #EFF0F4;
  border-bottom: 1px solid #BFBFC0;
  box-shadow: 64px 64px 128px 0px #AEAEC066;
  box-shadow: -42.66666793823242px -42.66666793823242px 128px 0px #FFFFFF;
  position: fixed;
  z-index: 9999;
}

.headers header img {
  height: 35px;
  width: 110px;
  left: 36px;
  top: 13px;
  border-radius: 0px;
  margin-left: 36px;
}

.headers header .logoutButton {
  height: 28px;
  width: 150px;
  left: 0px;
  top: 0px;
  border-radius: 2px;
  background: #F0F0F3;
  box-shadow: -1px -1px 3px 0px #FFFFFF;
  box-shadow: 1.5px 1.5px 3px 0px #AEAEC066;
  margin-right: 36px;
}

.headers header .logoutButton a {
  color: #414B5A;
  font-size: 12px;
  font-weight: bolder;
  text-align: center;
  line-height: 12px;
  letter-spacing: 2px;
}
</style>
