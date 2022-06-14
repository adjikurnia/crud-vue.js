<template>
  <div class="container-fluid">
    <div style="margin: 70px">
      <div class="row">
        <h5>Update Pengguna</h5>
      </div>
      <div style="margin-top: 30px; width: 60%" >
        <div>
          <b-form>
            <b-form-group label="Nama:" class="form-input">
              <b-form-input
                  v-model="form.name"
                  placeholder="Masukkan nama pengguna"
              ></b-form-input>
            </b-form-group>

            <b-form-group label="Email:" class="form-input">
              <b-form-input
                  v-model="form.email"
                  type="email"
                  placeholder="Masukkan email pengguna"
              ></b-form-input>
            </b-form-group>

            <b-form-group label="Gender:" class="form-input">
              <select v-model="form.gender" class="form-select">
                <option value="null" disabled>Pilih Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </b-form-group>

            <b-form-group label="Status:" class="form-input">
              <select v-model="form.status" class="form-select">
                <option value="null" disabled>Pilih Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </b-form-group>

            <div class="row justify-content-between" style="margin-top: 80px">
              <div class="col-md-2" style="margin-left: 40px">
                <b-button style="width: 150px" @click="$router.go(-1)" squared>Kembali</b-button>
              </div>
              <div class="col-md-4">
                <b-button style="width: 150px" @click="update" squared>Update</b-button>
              </div>
            </div>
          </b-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios"
import swal from "sweetalert"

export default {
  name: "UpdatePengguna",
  data() {
    return {
      idPengguna : this.$route.params.id,
      form: {
        name: '',
        email: '',
        gender: 'null',
        status: 'null'
      },
       requestConfig: {
         headers: { 
         'Authorization': `Bearer 9690fb8196780608aa119e9cadbf3901b8d6679995f2667a259a1f07fb7617cd`,
         'Accept': 'application/json',
         'Content-Type': 'application/json'
        } 
      }
    }
  },
  created() {
    this.getDetailData()
  },
  methods: {
   async getDetailData() {
      await axios.get('https://gorest.co.in/public/v2/users/'+ this.idPengguna ,this.requestConfig).then((res)=>{
        this.form.name = res.data.name
        this.form.email = res.data.email
        this.form.gender = res.data.gender
        this.form.status = res.data.status
      })
    },
    async update() {
      let data = Object.assign(this.form)
      await axios.put('https://gorest.co.in/public/v2/users/'+ this.idPengguna, data, this.requestConfig).then(() => {
        swal({
          title: "Berhasil!",
          text: "Data Pengguna Berhasil di Update!",
          icon: "success"
        }).then(() => {
          setTimeout(()=>{
            this.$router.push('/master-pengguna')
          },500)
        })
      }).catch(() => {
        swal({
          title: "Gagal!",
          text: "Data Pengguna Gagal di Update!",
          icon: "error"
        });
      })
    }
  }
}
</script>

<style scoped>
.form-input {
  margin-bottom: 18px;
}
</style>
