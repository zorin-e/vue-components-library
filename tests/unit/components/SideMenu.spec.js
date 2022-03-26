import { mount, createLocalVue } from "@vue/test-utils";
import { SideMenu } from "@/";
import VueRouter from "vue-router";

const routes = [
  {
    path: "/",
    name: "home",
    component: () => {
      "<div>Home</div>";
    }
  },
  {
    path: "/news",
    name: "news",
    component: () => {
      "<div>News</div>";
    }
  }
];

let localVue;

beforeEach(() => {
  localVue = createLocalVue();
  localVue.use(VueRouter);
});

const router = new VueRouter({ routes });
const menu = [
  {
    title: "Главная",
    name: "home"
  },
  {
    title: "Новости",
    name: "news"
  }
];

describe("SideMenu.vue", () => {
  it(`should render ${menu.length} menu items`, () => {
    const wrapper = mount(SideMenu, {
      localVue,
      router,
      propsData: {
        menu
      }
    });
    expect(wrapper.findAll("a").length).toBe(menu.length);
  });

  menu.forEach((item, index) => {
    it(`menu item should be ${item.title}`, () => {
      const wrapper = mount(SideMenu, {
        localVue,
        router,
        propsData: {
          menu
        }
      });
      expect(
        wrapper
          .findAll("a")
          .at(index)
          .text()
      ).toBe(item.title);
    });
  });
});
