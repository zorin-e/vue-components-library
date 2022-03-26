<template>
  <div :class="[$style.pagination, $style.flex]" v-if="pagesAmountMoreThanOne">
    <manage
      :totalItems="pagination.totalItems"
      :startIndex="pagination.startIndex"
      :endIndex="pagination.endIndex"
      :pageSize="pageSize"
      @change:pageSize="changePageSize"
    />
    <div :class="$style.flex">
      <prev
        @click="setPage(currentPage - 1)"
        :class="currentPage <= 1 && $style.disabled"
      />
      <page
        v-for="page in pagination.pages"
        :key="page"
        :text="page"
        :page="page"
        @click="setPage(page)"
        :is-active="page == currentPage"
      />
      <next
        @click="setPage(currentPage + 1)"
        :class="pagesAmount === currentPage && $style.disabled"
      />
    </div>
  </div>
</template>

<script>
import Page from "./Page";
import Prev from "./Prev";
import Next from "./Next";
import paginate from "jw-paginate";
import Manage from "./Manage";

export default {
  components: {
    Page,
    Prev,
    Next,
    Manage
  },
  props: {
    items: {
      type: Array,
      required: true
    },
    maxPages: {
      type: Number,
      default: 10
    },
    initialPage: {
      type: Number,
      default: 1
    },
    size: {
      type: Number,
      default: 100
    }
  },
  data() {
    return {
      pagination: {},
      pageSize: Number(this.$route.query.size) || this.size
    };
  },
  methods: {
    setPage(page) {
      const { items, pageSize, maxPages } = this;
      const pager = paginate(items.length, page, Number(pageSize), maxPages);
      const pageOfItems = items.slice(pager.startIndex, pager.endIndex + 1);
      this.pagination = pager;

      if (this.urlCurrentPage !== this.currentPage) {
        this.changeQuery({
          query: { page: this.currentPage },
          method: "replace"
        });
      }

      this.$emit("changePage", pageOfItems);
    },
    changeQuery({ query, method = "push" }) {
      this.$router[method]({
        path: this.$route.path,
        query: {
          ...this.$route.query,
          ...query
        },
        params: {
          fromFunction: true
        }
      });
    },
    changePageSize(pageSize) {
      this.changeQuery({ query: { size: pageSize } });
      this.pageSize = pageSize;
      this.setPage(this.currentPage);
    }
  },
  computed: {
    currentPage() {
      return this.pagination.currentPage;
    },
    urlCurrentPage() {
      return Number(this.$route.query.page);
    },
    pagesAmount() {
      return this.pagination.totalPages;
    },
    pagesAmountMoreThanOne() {
      return this.pagesAmount > 1;
    }
  },
  watch: {
    $route(to, from) {
      if (to.params.fromFunction) return;
      this.setPage(Number(to.query.page));
    }
  },
  created() {
    if (!this.$listeners.changePage)
      throw "Missing required event listener: changePage";

    this.setPage(this.initialPage);
  }
};
</script>

<style module>
.nav {
  height: 32px;
  padding: 3px 12px;
}

.flex {
  display: flex;
  align-items: center;
}

.pagination {
  justify-content: space-between;
}

.disabled {
  opacity: 0.4;
  pointer-events: none;
}
</style>
