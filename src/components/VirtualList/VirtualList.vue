<template>
  <div class="root" ref="root" :style="rootStyle">
    <div class="viewport" ref="viewport" :style="viewportStyle">
      <div class="spacer" ref="spacer" :style="spacerStyle">
        <slot v-bind:items="visibleItems"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      default: () => ({})
    },
    fakeItemsCount: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      rootHeight: 400,
      rowHeight: 48,
      scrollTop: 0,
      nodePadding: 20
    };
  },
  computed: {
    viewportHeight() {
      return this.itemCount * this.rowHeight;
    },
    startIndex() {
      let startNode =
        Math.floor(this.scrollTop / this.rowHeight) - this.nodePadding;
      startNode = Math.max(0, startNode);
      return startNode;
    },
    visibleNodeCount() {
      let count =
        Math.ceil(this.rootHeight / this.rowHeight) + 2 * this.nodePadding;
      count = Math.min(this.itemCount - this.startIndex, count);
      return count;
    },
    visibleItems() {
      return this.items.slice(
        this.startIndex,
        this.startIndex + this.visibleNodeCount
      );
    },
    itemCount() {
      return this.items.length + this.fakeItemsCount;
    },
    offsetY() {
      return this.startIndex * this.rowHeight;
    },
    spacerStyle() {
      return {
        transform: "translateY(" + this.offsetY + "px)"
      };
    },
    viewportStyle() {
      return {
        overflow: "hidden",
        height: this.viewportHeight + "px",
        position: "relative"
      };
    },
    rootStyle() {
      return {
        maxHeight: this.rootHeight + "px",
        overflow: "auto"
      };
    }
  },
  methods: {
    handleScroll(event) {
      this.scrollTop = this.$refs.root.scrollTop;
    },
    calculateInitialRowHeight() {
      const children = this.$refs.spacer.children;
      let largestHeight = 0;
      for (let i = 0; i < children.length; i++) {
        if (children[i].offsetHeight > largestHeight) {
          largestHeight = children[i].offsetHeight;
        }
      }
      return largestHeight;
    },
    doesBrowserSupportPassiveScroll() {
      let passiveSupported = false;

      try {
        const options = {
          get passive() {
            passiveSupported = true;
            return false;
          }
        };

        window.addEventListener("test", null, options);
        window.removeEventListener("test", null, options);
      } catch (err) {
        passiveSupported = false;
      }
      return passiveSupported;
    }
  },
  mounted() {
    this.$refs.root.addEventListener(
      "scroll",
      this.handleScroll,
      this.doesBrowserSupportPassiveScroll() ? { passive: true } : false
    );
    const largestHeight = this.calculateInitialRowHeight();
    this.rowHeight =
      typeof largestHeight !== "undefined" && largestHeight !== null
        ? largestHeight
        : 30;
  },
  beforeDestroy() {
    this.$refs.root.removeEventListener("scroll", this.handleScroll);
  }
};
</script>
