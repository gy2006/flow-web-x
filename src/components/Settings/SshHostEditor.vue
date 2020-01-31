<template>
  <v-row>
    <v-col cols="12">
      <div>SSH Host Settings</div>
    </v-col>
    <v-col cols="12">
      <v-select dense
                v-model="wrapper.credential"
                :items="credentials"
                :rules="rules.required"
                label="Select Credential"
      ></v-select>
    </v-col>
    <v-col cols="12">
      <v-text-field dense
                    v-model="wrapper.user"
                    :rules="rules.required"
                    label="Host User"
      ></v-text-field>
    </v-col>
    <v-col cols="12">
      <v-text-field dense
                    v-model="wrapper.ip"
                    :rules="rules.required"
                    label="Host IP"
      ></v-text-field>
    </v-col>
    <v-col cols="4">
      <v-text-field dense
                    max="50"
                    min="1"
                    step="1"
                    type="number"
                    label="Max Pool Size"
                    v-model="wrapper.maxSize"
      ></v-text-field>
    </v-col>
    <v-col cols="4">
      <v-text-field dense
                    max="120"
                    min="5"
                    step="5"
                    type="number"
                    label="Stop agent if it has idle after minutes"
                    v-model="wrapper.maxIdle"
      ></v-text-field>
    </v-col>
    <v-col cols="4">
      <v-text-field dense
                    max="120"
                    min="5"
                    step="5"
                    type="number"
                    label="Remove agent if it has been offline after xx minutes"
                    v-model="wrapper.maxOffline"
      ></v-text-field>
    </v-col>
  </v-row>
</template>

<script>
  import { required } from '@/util/rules'

  export default {
    name: 'SshHostEditor',
    props: {
      wrapper: {
        type: Object,
        required: true
      },
      credentials: {
        type: Array,
        required: true
      }
    },
    data () {
      return {
        rules: {
          required: required('Required')
        }
      }
    }
  }
</script>

<style scoped>

</style>