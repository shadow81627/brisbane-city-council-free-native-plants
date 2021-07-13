<template>
  <v-container>
    <v-row>
      <v-col class="d-flex flex-column">
        <v-card class="flex d-flex flex-column justify-between">
          <Hero v-if="item.image" :src="`/img/species/${item.image}`">
            <template #item>
              <v-container
                v-if="$vuetify.breakpoint.lgAndUp"
                class="fill-height align-items-end justify-start pb-0"
              >
                <v-row class="align-self-end pb-0" align="end" justify="start">
                  <v-col class="pa-0">
                    <v-card style="background: rgba(0, 0, 0, 0.3)">
                      <v-card-title>
                        <h1 class="text-break text-wrap">
                          {{ commonName }} ({{ botanicalName }})
                        </h1>
                      </v-card-title>
                      <!-- <v-card-text class="caption text-no-wrap">
                      {{ item.credit }}
                    </v-card-text> -->
                    </v-card>
                  </v-col>
                </v-row>
              </v-container>
            </template>
          </Hero>

          <div v-if="$vuetify.breakpoint.mdAndDown">
            <v-card-title>
              {{ commonName }}
            </v-card-title>
            <v-card-subtitle class="pb-0 font-italic">{{
              botanicalName
            }}</v-card-subtitle>
          </div>

          <v-card-text class="flex-grow-1 text--primary">
            {{ item.description }}
          </v-card-text>

          <v-container v-if="waterwise">
            <v-row>
              <v-col>
                <v-card-subtitle class="pb-0">Width</v-card-subtitle>
                <v-card-text class="text--primary">
                  {{ waterwise['Spread Ranges'] }}
                </v-card-text>
                <v-card-subtitle class="pb-0">Height</v-card-subtitle>
                <v-card-text class="text--primary">
                  {{ waterwise['Height Ranges'] }}
                </v-card-text>
                <v-card-subtitle class="pb-0">Category</v-card-subtitle>
                <v-card-text class="text--primary">
                  {{ waterwise['Plant Type'] }}
                </v-card-text>

                <v-card-subtitle class="pb-0">Water Needs</v-card-subtitle>
                <v-card-text class="text--primary">
                  {{ waterwise['Water Needs'] }}
                </v-card-text>

                <v-card-subtitle class="pb-0">Light Needs</v-card-subtitle>
                <v-card-text class="text--primary">
                  {{ waterwise['Light Needs'] }}
                </v-card-text>

                <v-card-subtitle class="pb-0">Maintenance</v-card-subtitle>
                <v-card-text class="text--primary">
                  {{ waterwise['Maintenance'] }}
                </v-card-text>

                <v-card-subtitle class="pb-0"
                  >Bore water Tolerance</v-card-subtitle
                >
                <v-card-text class="text--primary">
                  {{ waterwise['Bore water Tolerance'] }}
                </v-card-text>

                <v-card-subtitle class="pb-0">Frost Tolerance</v-card-subtitle>
                <v-card-text class="text--primary">
                  {{ waterwise['Frost Tolerance'] }}
                </v-card-text>

                <v-card-subtitle class="pb-0"
                  >Greywater Tolerance</v-card-subtitle
                >
                <v-card-text class="text--primary">
                  {{ waterwise['Greywater Tolerance'] }}
                </v-card-text>

                <v-card-subtitle class="pb-0">Edible</v-card-subtitle>
                <v-card-text class="text--primary">
                  {{ waterwise['Edible'] }}
                </v-card-text>
              </v-col>
              <v-col>
                <v-card-subtitle class="pb-0">Perfume</v-card-subtitle>
                <v-card-text class="text--primary">
                  {{ waterwise['Perfume'] }}
                </v-card-text>

                <v-card-subtitle class="pb-0">Aromatic</v-card-subtitle>
                <v-card-text class="text--primary">
                  {{ waterwise['Aromatic'] }}
                </v-card-text>

                <v-card-subtitle class="pb-0">Flower Colour</v-card-subtitle>
                <v-card-text class="text--primary">
                  <span v-for="color in flowerColor" :key="color">
                    <!-- <span style="display: inline-flex; align-self: bottom;">
                      <svg
                        style="
                          height: 1em;
                          width: 1em;
                          top: 0.125em;
                          position: relative;
                        "
                      >
                        <rect
                          :fill="color.toLowerCase()"
                          style="height: 1em; width: 1em;"
                        ></rect>
                      </svg>
                    </span> -->
                    <span>{{ startCase(color) }}</span>
                    <span> </span>
                  </span>
                </v-card-text>

                <v-card-subtitle class="pb-0">Foliage Colour</v-card-subtitle>
                <v-card-text class="text--primary">
                  <span v-for="color in foliageColor" :key="color">
                    <!-- <span style="display: inline-flex; align-self: bottom;">
                      <svg
                        style="
                          height: 1em;
                          width: 1em;
                          top: 0.125em;
                          position: relative;
                        "
                      >
                        <rect
                          :fill="color.toLowerCase()"
                          style="height: 1em; width: 1em;"
                        ></rect>
                      </svg>
                    </span> -->
                    <span>{{ startCase(color) }}</span>
                    <span> </span>
                  </span>
                </v-card-text>

                <template v-if="waterwise['Climate Zones']">
                  <v-card-subtitle class="pb-0">
                    Climate Zones
                  </v-card-subtitle>
                  <v-card-text>
                    <v-chip v-for="i in climateZones" :key="i" readonly>
                      {{ startCase(i) }}
                    </v-chip>
                  </v-card-text>
                </template>

                <template v-if="waterwise['Soil Type']">
                  <v-card-subtitle class="pb-0"> Soil Type </v-card-subtitle>
                  <v-card-text>
                    <v-chip v-for="i in soilType" :key="i" readonly>
                      {{ startCase(i) }}
                    </v-chip>
                  </v-card-text>
                </template>

                <template v-if="waterwise['Soil Additional']">
                  <v-card-subtitle class="pb-0"
                    >Soil Additional</v-card-subtitle
                  >
                  <v-card-text class="text--primary">
                    {{ waterwise['Soil Additional'] }}
                  </v-card-text>
                </template>

                <template v-if="waterwise['Abcission']">
                  <v-card-subtitle class="pb-0"
                    >Abcission (when it makes a mess eg. drops
                    leaves)</v-card-subtitle
                  >
                  <v-card-text class="text--primary">
                    {{ waterwise['Abcission'] }}
                  </v-card-text>
                </template>

                <template v-if="item.attracts">
                  <v-card-subtitle class="pb-0"> Attracts </v-card-subtitle>
                  <v-card-text>
                    <v-chip v-for="attract in attracts" :key="attract" readonly>
                      {{ startCase(attract) }}
                    </v-chip>
                  </v-card-text>
                </template>
              </v-col>
            </v-row>
          </v-container>

          <v-card-subtitle class="pb-0">Image License</v-card-subtitle>
          <v-card-text class="text--primary">
            {{ item.credit }}
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" text to="/nurseries">
              See Nurseries
              <v-icon>{{ mdiArrowRight }}</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mdiArrowRight } from '@mdi/js'
import { startCase } from 'lodash-es'
export default {
  data: () => ({
    item: {},
    waterwise: {},
    mdiArrowRight,
  }),
  async fetch() {
    const id = this.$route.params.id
    const result = await this.$content('species').fetch()
    const { body } = result
    const item = body.find((item) => item.species === id) ?? {}

    const { body: waterwiseBody = [] } = await this.$content(
      'waterwise-plants'
    ).fetch()
    const waterwise = waterwiseBody.find((i) => {
      const commonName = startCase(item.species.split('(')[0].trim())
      const botanicalName = item.species
        .split('(')[1]
        .replace(/seasonal$/, '')
        .replace(/-/, '')
        .trim()
        .replace(/\)+$/, '')
        .trim()
      return (
        i['Common Name'] === commonName ||
        i['Botanical Name'] === botanicalName ||
        i['Previous Name'] === botanicalName ||
        i['Botanical Name'].startsWith(
          botanicalName.replace(/sp\.$/, '').trim()
        )
      )
    })
    if (!item && !item.length) {
      if (process.server) {
        this.$nuxt.context.res.statusCode = 404
      } else {
        this.$nuxt.error({ statusCode: 404 })
      }
    }
    this.item = item
    this.waterwise = waterwise
  },
  head() {
    return {
      title: this.item.species,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.item.description,
        },
      ],
    }
  },
  computed: {
    attracts() {
      const separator = ','
      const data = this.item.attracts
      return this.split(data, separator).sort()
    },
    soilType() {
      const separator = ','
      const data = this.waterwise['Soil Type']
      return this.split(data, separator).sort()
    },
    climateZones() {
      const separator = ','
      const data = this.waterwise['Climate Zones']
      return this.split(data, separator).sort()
    },
    foliageColor() {
      const separator = ' and '
      const data = this.waterwise['Foliage Colour']
      return this.split(data, separator).sort()
    },
    flowerColor() {
      const separator = ' and '
      const data = this.waterwise['Flower colour']
      return this.split(data, separator).sort()
    },
    commonName() {
      const separator = '('
      const text = this.item.species
      const splits = this.split(text, separator)
      if (splits && splits.length) {
        const split = splits[0]
        return startCase(split.trim())
      }
      return null
    },
    botanicalName() {
      const separator = '('
      const text = this.item.species
      const splits = this.split(text, separator)
      if (splits && splits.length) {
        const split = splits[1]
        return split.replace(/\)+$/, '').trim()
      }
      return null
    },
  },
  methods: {
    startCase,
    split(text, separator = ',') {
      if (text) {
        return text.split(separator)
      }
      return []
    },
  },
}
</script>
