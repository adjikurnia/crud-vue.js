<template>
  <div class="container-fluid">
      <div class="row">
        <div class="judul col-md-6 row">
          <h5>DAFTAR PENGGUNA</h5>
        </div>
        <div class="col-md-6" align="right">
          <b-button squared size="sm" @click="tambahData">TAMBAH DATA</b-button>
        </div>
      </div>
        <div align="center" style="margin-top: 30px">
          <b-table ref="table" :per-page="perPage" :current-page="currentPage" :items="items" :fields="fields" responsive="sm">
            <template #cell(no)="row">
              {{row.index+1}}
            </template>
            <template #cell(actions)="row">
              <b-button style="margin-right: 5px" size="sm" squared @click="viewData(row)" class="mr-2">View</b-button>
              <b-button size="sm" squared @click="updateData(row)" class="mr-2">Update</b-button>
              <b-button style="margin-left: 5px" size="sm" squared @click="deleteData(row)" class="mr-2">Delete</b-button>
            </template>
          </b-table>
          <b-pagination
              v-model="currentPage"
              :total-rows="rows"
              :per-page="perPage"
              aria-controls="my-table">
          </b-pagination>
      </div>
    </div>
</template>

<script>
import axios from 'axios'
import swal from 'sweetalert'

export default {
  props: {
    msg: String
  },
  data() {
    return {
      perPage: 7,
      currentPage: 1,
      rows: 20,
      sortBy: 'age',
      sortDesc: false,
      fields: [
        { key: 'no'},
        { key: 'name'},
        { key: 'email'},
        { key: 'gender'},
        { key: 'status'},
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
    this.getDataTable()
  },
  methods: {
    async getDataTable() {
      let data = await axios.get('https://gorest.co.in/public/v2/users', this.requestConfig)
      this.items = data.data
    },

    deleteData(val) {
      const payload = val.item.id
      swal({
        title: "Peringatan?",
        text: "Apa kamu yakin ingin menghapus data pengguna ini?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then( async (hapus) => {
        if (hapus) {
         await axios.delete('https://gorest.co.in/public/v2/users/' + payload, this.requestConfig).then(()=>{
            swal( {
              title: "Berhasil!",
              text: "Data Pengguna Berhasil Dihapus!",
              icon: "success",
            })
            this.getDataTable()
          }).catch(() => {
            swal({
              title: "Gagal!",
              text: "Data Pengguna Gagal Dihapus!",
              icon: "error"
            });
          })
        }
      })
    },

    viewData(val) {
      this.$router.push('/detail-pengguna/'+ val.item.id)
    },

    updateData(val) {
      this.$router.push('/update-pengguna/'+ val.item.id)
    },

    tambahData() {
      this.$router.push('/tambah-pengguna')
    }
  }
}
</script>

<style scoped>
  .container-fluid {
    padding-left: 80px;
    padding-right: 120px;
    margin-bottom: 80px;
    margin-top: 100px;
    box-sizing: border-box;
  }

  button {
    font-size: 12px;
    font-weight: bold;
    color: #414B5A;
    background: #F0F0F3;
    border: none;
    box-shadow: 1.5px 1.5px 3px 0px #AEAEC066;
    box-shadow: -1px -1px 3px 0px #FFFFFF;
  }
</style>
