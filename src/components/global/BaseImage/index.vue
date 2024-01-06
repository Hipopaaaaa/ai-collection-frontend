<template>
  <van-image
    class="image"
    :fit="fit"
    :position="position"
    :src="src"
    :alt="alt"
    :width="width"
    :height="height"
    ref="image"
  >
    <template v-slot:loading>
      <div class="imageLoading"><van-icon  name="photo-o" /></div>
    </template>
  </van-image>
</template>

<script lang="ts" setup>
import type Props from "./index.d";
defineOptions({
  name: "BaseImage",
});

const props = withDefaults(defineProps<Props>(), {
  fit: "fill",
  position: "center",
});

const image = ref()
const imageHegiht = ref('')
onMounted(()=>{
  imageHegiht.value = image.value.$el.offsetHeight + 'px'
})
const iconFontSize = computed(() => {
  if (Number(props.height)) {
    return props.height + "px";
  }
  if(String(props.height).endsWith('%')){     
   return imageHegiht.value
  }
  return props.height;
});
</script>

<style lang="scss" scoped>
.image {
  :deep(.van-image__loading) {
    background: inherit;
  }
  .imageLoading {
    @keyframes van-skeleton-blink {
      50% {
        opacity: 0.6;
      }
    }
    width: 100%;
    height: 100%;
    animation: van-skeleton-blink 1.2s ease-in-out infinite;
    // background-color: var(--delete-button-box-shadow-color);
    display: flex;
    justify-content: center;
    i {
      font-size: v-bind(iconFontSize);
    }
  }
}
</style>
