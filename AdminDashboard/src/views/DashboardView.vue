<template>
  <el-table :data="items" height="100%" style="width: 100%" :lazy="true" :border="true">
    <template slot="empty">
        {{ isLoading ? "Loading . . ." : "No data" }}
    </template>
    <el-table-column prop="API" label="API Name" width="120"> </el-table-column>
    <el-table-column prop="Description" label="Description" width="200">
    </el-table-column>
    <el-table-column prop="Category" label="Category" width="130">
    </el-table-column>
    <el-table-column label="Link"> 
        <template slot-scope="scope">
            <el-link :href="scope.row.Link" type="primary" target="_blank"> {{ scope.row.Link }}</el-link>
        </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  name: "dashboard-view",
  data() {
    return {
      items: [],
      isLoading: false
    };
  },
  async created() {
    this.isLoading = true
    try {
      let response = await (
        await fetch("https://api.publicapis.org/entries")
      ).json();

      console.log(response);
      this.items = response.entries;
    } catch (error) {
      console.log(error);
    }
    this.isLoading = false
  },
};
</script>
