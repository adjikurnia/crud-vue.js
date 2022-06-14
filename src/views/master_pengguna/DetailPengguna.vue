<template>
  <div class="container-fluid">
    <div style="margin: 70px">
      <div class="row">
        <h5>Lihat Pengguna</h5>
      </div>
      <div style="margin-top: 30px; width: 65%" >
        <div>
          <b-card>
            <form>
              <div class="form-group row">
                <label class="col-sm-2 col-form-label">Nama</label>
                <div class="col-sm-10">
                  <input type="text" readonly class="form-control-plaintext" v-model="form.name">
                </div>
              </div>
              <div class="form-group row">
                <label class="col-sm-2 col-form-label">Email</label>
                <div class="col-sm-10">
                  <input type="text" readonly class="form-control-plaintext"  v-model="form.email">
                </div>
              </div>
              <div class="form-group row">
                <label class="col-sm-2 col-form-label">Gender</label>
                <div class="col-sm-10">
                  <input type="text" readonly class="form-control-plaintext"  v-model="form.gender">
                </div>
              </div>
              <div class="form-group row">
                <label class="col-sm-2 col-form-label">Status</label>
                <div class="col-sm-10">
                  <input type="text" readonly class="form-control-plaintext"  v-model="form.status">
                </div>
              </div>
            </form>
          </b-card>
        </div>
      </div>
      <div class="row justify-content-between" style="margin-top: 30px">
        <div class="col-md-6">
          <h5>Post Pengguna</h5>
        </div>
        <div class="col-md-6">
          <b-button id="show-btn" @click="buatPost" style="width: 150px" squared>Buat Post</b-button>
        </div>
      </div>
      <div style="width: 65%; margin-top: 10px">
        <b-table :per-page="perPage" :current-page="currentPage" :items="items" :fields="fields" responsive="sm">
          <template #cell(no)="row">
            <a>{{row.index + 1}}</a>
          </template>
          <template #cell(description)="row">
            <a>{{row.item.body}}</a>
          </template>
          <template #cell(actions)="row">
            <b-button style="margin-left: 5px" size="sm" squared @click="deleteData(row)" class="mr-2">Delete</b-button>
          </template>
        </b-table>
      </div>
      <div style="margin-top: 60px; width: 65%" align="right">
        <b-button style="width: 150px" @click="$router.go(-1)" squared>Kembali</b-button>
      </div>
      <b-modal centered id="modal-post" hide-footer>
        <template #modal-header>
          <h5>Tambah Post</h5>
          <b-button style="width: 120px" squared @click="simpanPost">Simpan</b-button>
        </template>
        <div class="d-block">
          <b-form>
            <b-form-group label="Title:" class="form-input">
              <b-form-input
                  v-model="post.title"
                  placeholder="Title"
              ></b-form-input>
            </b-form-group>

            <b-form-group label="Description:" class="form-input">
              <b-form-textarea
                  id="textarea"
                  v-model="post.body"
                  placeholder="Description"
                  rows="4"
                  max-rows="6"
              ></b-form-textarea>
            </b-form-group>
          </b-form>
        </div>
<!--        <b-button squared class="mt-3" block @click="$bvModal.hide('bv-modal-example')">Tutup</b-button>-->
<!--        <b-button squared class="mt-3" block @click="simpanPost">Simpan</b-button>-->
      </b-modal>
    </div>
  </div>
</template>

<script>
import axios from "axios"
import swal from "sweetalert"

export default {
  name: "DetailPengguna",
  data() {
    return {
      idPengguna : this.$route.params.id,
      form: {
        name: '',
        email: '',
        gender: 'null',
        status: 'null',
      },

      /**
       * data Input Post
       */
      post: {
        title: '',
        body: '',
      },

      /**
       * data table
       */
      currentPage: 1,
      fields: [
        { key: 'no'},
        { key: 'title'},
        { key: 'description'},
        { key: 'actions'}
      ],
      items: [],
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
    this.getDataTable()
  },
  methods: {
    async getDetailData() {
      const config = {
        headers: { Authorization: `Bearer 9690fb8196780608aa119e9cadbf3901b8d6679995f2667a259a1f07fb7617cd` }
      }
      await axios.get('https://gorest.co.in/public/v2/users/'+ this.idPengguna, this.requestConfig).then((res)=>{
        this.form.name = res.data.name
        this.form.email = res.data.email
        this.form.gender = res.data.gender
        this.form.status = res.data.status
      })
    },
    async getDataTable() {
      const config = {
        headers: { Authorization: `Bearer 9690fb8196780608aa119e9cadbf3901b8d6679995f2667a259a1f07fb7617cd` }
      }
      let data = await axios.get('https://gorest.co.in/public/v2/users/'+ this.idPengguna + '/posts', this.requestConfig)
      this.items = data.data
    },
    deleteData() {
      swal({
        title: "Peringatan?",
        text: "Apa kamu yakin ingin menghapus data post pengguna ini?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then( async (hapus) => {
        if (hapus) {
          await axios.delete('https://gorest.co.in/public/v2/users/' + this.idPengguna + '/posts', this.requestConfig).then(()=>{
            swal( {
              title: "Berhasil!",
              text: "Data Post Pengguna Berhasil Dihapus!",
              icon: "success",
            })
            this.getDataTable()
          }).catch(() => {
            swal({
              title: "Gagal!",
              text: "Data Post Pengguna Gagal Dihapus!",
              icon: "error"
            })
          })
        }
      })
    },
    async simpanPost() {
      let data = Object.assign(this.post)
      await axios.post('https://gorest.co.in/public/v2/users/' + this.idPengguna + '/posts', data, this.requestConfig).then(() => {
        this.$bvModal.hide('modal-post')
        swal({
          title: "Berhasil!",
          text: "Data Post Pengguna Berhasil di Tambah!",
          icon: "success"
        })
        this.getDataTable()
      }).catch(() => {
        swal({
          title: "Gagal!",
          text: "Data Post Pengguna Gagal di Tambah!",
          icon: "error"
        });
      })
    },
    buatPost() {
      this.post.title = ''
      this.post.body = ''
      this.$bvModal.show('modal-post')
    }
  }
}
</script>

<style scoped>
.form-input {
  margin-bottom: 18px;
}
</style>
