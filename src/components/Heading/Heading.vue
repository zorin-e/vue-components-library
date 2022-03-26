<template>
  <h2 :class="[$style.heading, $style[size]]">
    <slot />
  </h2>
</template>

<script>
export default {
  props: {
    size: {
      type: String,
      default: "md",
      validator: size => ["xl", "lg", "md", "sm", "xs"].includes(size)
    }
  }
};
</script>

<style module>
.heading {
  font-family: "Source Sans Pro Bold";
  font-weight: 700;
  line-height: 32px;
  letter-spacing: 0em;
  color: #000;
  margin: 0;
}

.xl {
  font-family: "Source Sans Pro";
  font-size: 38px;
  line-height: 48px;
  font-weight: 600;
}

.lg {
  font-size: 30px;
  line-height: 40px;
}

.md {
  font-size: 24px;
}

.sm {
  font-size: 20px;
}

.xs {
  font-size: 16px;
  line-height: 24px;
}
</style>
