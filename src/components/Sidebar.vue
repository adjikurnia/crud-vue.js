<template>
  <div class="sidebar">
    <nav id="sidebarMenu" class="col-md-3 d-md-block sidebar collapse">
      <div class="item">
        <ul class="nav flex-column">
          <li class="item1" style="cursor: pointer">
            <a v-if="menu === 'dashboard'" @click="gantiMenu('dashboard')" class="nav-link active" aria-current="page">
              DASHBOARD
            </a>
            <a v-else class="nav-link" aria-current="page" @click="gantiMenu('dashboard')">
              DASHBOARD
            </a>
          </li>
          <li class="item2" style="cursor: pointer">
            <a v-if="menu === 'master-pengguna'" @click="gantiMenu('masterPengguna')" class="nav-link active">
              MASTER PENGGUNA
            </a>
            <a v-else class="nav-link" @click="gantiMenu('masterPengguna')">
              MASTER PENGGUNA
            </a>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: "Sidebar",
  data() {
    return {
      menu: this.$route.path
    }
  },
  created() {
    if(this.$route.path === '/') {
      this.menu = 'dashboard'
    } else if(this.$route.path === '/master-pengguna') {
      this.menu = 'master-pengguna'
    }
  },
  methods: {
    gantiMenu(val) {
      if (val === 'dashboard') {
        if(this.$route.path !== '/') {
          this.$router.push('/')
          this.menu = 'dashboard'
        }
      } else if (val === 'masterPengguna') {
        if(this.$route.path !== '/master-pengguna') {
          this.$router.push('/master-pengguna')
          this.menu = 'master-pengguna'
        }
      }
    }
  }
}
</script>

<style scoped>
.sidebar {
  height: 100%;
  width: 179px;
  left: 0px;
  top: 0px;
  border-radius: 0px;
  z-index: -1;
  background: #F0F1F5;
  box-shadow: 0px 4px 4px 0px #00000040;
  margin-top: 66px;
  z-index: 99;
  position: fixed;
}

nav .item1 {
  margin-top: -20px;
  margin-bottom: 20px;
  font-size: 12px;
  margin-left: 12px;
}

nav .item2 {
  font-size: 12px;
  margin-left: 12px;
}
</style>
