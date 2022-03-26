<template>
  <div :class="$style.navbar">
    <div :class="$style.navbar__col">
      <div :class="$style.navbar__row">
        <div :class="[$style.navbar__logo]">
          <logo :class="$style.logo" />
        </div>
        <div :class="$style['logo-text']">Partners & Salesforce</div>
      </div>
    </div>
    <div :class="$style['navbar__row--wide']">
      <div v-for="item in items" :key="item.name" :class="$style.item">
        <router-link
          :class="[$style['navbar__menu-button']]"
          :to="{ name: item.name }"
          :active-class="$style['navbar__menu-button--active']"
        >
          {{ item.title }}
        </router-link>
        <slot :name="item.slotName" />
      </div>
    </div>
    <div :class="[$style.navbar__col]">
      <div :class="[$style.navbar__row, $style['navbar__row--right']]">
        <slot name="profileMenu">
          <person-icon :class="$style.navbar__icon" />
        </slot>
      </div>
    </div>
  </div>
</template>

<script>
import Logo from "@/assets/logo.svg";
import PersonIcon from "./person.svg";
export default {
  name: "Navbar",
  components: {
    Logo,
    PersonIcon
  },
  props: {
    items: {
      type: Array,
      default: () => []
    }
  }
};
</script>

<style lang="scss" module>
@import "~@/styles/_variables";
@import "~@/styles/_variables";
@import "~bootstrap/scss/mixins/_grid";
@import "~bootstrap/scss/mixins/_grid-framework";

$logo-width: 26px;

.navbar {
  height: 48px;
  background: $white;
  border-bottom: solid 1px $block_border;
  display: flex;
  justify-content: space-between;
  justify-items: center;
  align-items: center;
  padding: 11px 24px 11px 24px;
  box-shadow: 0px 4px 6px rgba(157, 157, 157, 0.22);

  @include media-breakpoint-down(xs) {
    height: 48px;
  }
  @include media-breakpoint-between(sm, md) {
    height: 48px;
  }

  &__col {
    width: 400px;
  }

  &__menu-button {
    display: flex;
    align-items: center;
    text-align: center;
    color: $grey60;
    padding: 0 12px;
    font-size: 16px;
    line-height: 24px;
    height: 48px;
    cursor: pointer;
    text-decoration: none;

    &:hover {
      text-decoration: none;
    }

    &--active {
      color: $green30;
      border-bottom: 2px solid $green30;
    }
  }

  &__row {
    display: flex;
    justify-content: center;
    align-items: center;
    &--wide {
      display: flex;
      justify-content: center;
      flex-direction: row;
      width: 100%;
    }
    &--right {
      justify-content: flex-end;
    }
  }

  &__icon {
    // height: 48px;
  }

  &__logo {
    display: flex;
    align-items: center;
    width: $logo-width;

    @include media-breakpoint-between(sm, md) {
      width: ($logo-width/1.5);
    }
    @include media-breakpoint-down(xs) {
      width: ($logo-width/2);
    }
  }
}
.logo-text {
  font-style: normal;
  font-weight: normal;
  font-size: 20px;
  line-height: 28px;
  margin-left: 16px;

  color: $grey50;
}
.logo {
  max-width: 100%;
}

.item {
  position: relative;
}
</style>
