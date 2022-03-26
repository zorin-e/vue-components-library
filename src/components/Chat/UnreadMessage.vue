<template>
  <div :class="$style['unread-message']">
    Непрочитанные сообщения
  </div>
</template>
<script>
export default {};
</script>
<style lang="scss" module>
.unread-message {
  width: 86%;
  height: 24px;
  background: #eeeeee;
  border-radius: 6px;
  margin: 11px 7%;
  text-align: center;
  padding: 4px 0;
}
</style>
