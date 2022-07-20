<script setup lang="ts">
import type { Mapper, Nullable } from '@voire/type-utils'

const baseApiUrl = 'https://api.nuxtjs.dev/rivers'

interface RiverData {
  title: string
  slug: string
  countries: string[]
}

interface RiverModel {
  title: string
  slug: string

  // Let's say, we need to process some field (e.g. join the countries ☭)
  countries: string
}

const mapRiver: Mapper<RiverData, RiverModel> = (data) => ({
  title: data.title,
  slug: data.slug,
  countries: data.countries.join(', '),
})

const readRivers = useRestRead<RiverData[], RiverModel[]>(
  baseApiUrl,
  (rivers) => rivers.map(mapRiver),
  {
    async onRequest() {
      // eslint-disable-next-line no-console
      console.log('yo, interceptor')
    },
  },
)

const rivers = ref<Nullable<RiverModel[]>>(null)
async function getRivers() {
  rivers.value = await readRivers()
}
</script>

<template>
  <div :style="{ padding: '1rem', width: '80%', maxWidth: '40rem', margin: '0 auto' }">
    <template v-if="rivers">
      <div v-if="rivers.length">
        <div v-for="river of rivers" :key="river.slug">
          <h3>{{ river.title }}</h3>
          <p>{{ river.countries }}</p>
        </div>
      </div>
      <div v-else>
        No rivers. At all.
      </div>
    </template>
    <div v-else>
      No rivers yet. <a role="button" @click="getRivers">Get some</a>.
    </div>

    <button @click="getRivers">
      <template v-if="rivers">
        Refresh
      </template>
      <template v-else>
        Read the rivers
      </template>
    </button>
  </div>
</template>
