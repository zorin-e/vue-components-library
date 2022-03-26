<template>
  <app-wrapper>
    <container class="pt-30 pb-30" column fill-height wide>
      <h3 class="text-center">Common components</h3>
      <div class="row">
        <div class="col-3">
          <radio-toggle
            :items="[
              { name: 'Активный', value: 'Активный' },
              { name: 'Неактивный', value: 'Неактивный' }
            ]"
            v-model="radioToggleValue"
          />
        </div>
      </div>
      <block class="mb-30">
        <base-button @click="isVisibleToastLikeModal = true"
          >Show toast like modal</base-button
        >
      </block>
      <div v-for="(item, index) in paginationData" :key="index">
        {{ item }}
      </div>
      <pagination
        :items="initialPaginationData"
        :initialPage="initialPage"
        :size="10"
        @changePage="changePage"
        class="mt-20 mb-20"
      />
      <toast
        title="Отменить создание карточки ТО"
        text="Вы уверены, что хотите отменить создание новой карточки ТО? Все введённые данные будут удалены без возможности восстановления."
        okText="Продолжить"
        cancelText="Удалить черновик"
        @click:ok="checkbox = !checkbox"
      />
      <base-title background class="mb-20">Title</base-title>
      <p class="font-size-16 mb-10">Navbar</p>
      <navbar :items="menuItems">
        <template #chat>
          <chat-counter :class="$style.chatCounter" amount="99+" />
        </template>
      </navbar>
      <hr class="mt-20 mb-20" />
      <p class="font-size-16 mb-10">Block</p>
      <block />
      <hr class="mt-20 mb-20" />
      <p class="font-size-16 mb-10">Side menu</p>
      <side-menu
        :menu="[
          {
            title: 'Главная',
            icon: 'home',
            name: 'home'
          },
          {
            title: 'Новости',
            icon: 'news',
            name: 'news'
          }
        ]"
      />
      <hr class="mt-20 mb-20" />
      <p class="font-size-16 mb-10">Checkbox</p>
      <block>
        <checkbox v-model="checkbox" label="Лэйбл через параметр" />
        <checkbox v-model="disabledChekbox" class="ml-20" disabled>
          Залоченный чекбокс
        </checkbox>
        <error-text class="mt-5">Не верные данные</error-text>
      </block>
      <hr class="mt-20 mb-20" />
      <p class="font-size-16 mb-10">Autocomplete</p>
      <block class="row">
        <div>
          <autocomplete
            filter
            :items="moreItems"
            placeholder="start typing: apple"
            label="with filter"
          />
        </div>
        <div class="ml-20">
          <autocomplete
            :items="moreItems"
            placeholder="start typing: apple"
            label="without filter"
          />
        </div>
      </block>
      <hr class="mt-20 mb-20" />
      <p class="font-size-16 mb-10">Select</p>
      <block>
        <base-select
          v-model="selectModel"
          :items="selectList"
          placeholder="Выберите статус"
          title="Статус"
          displayExpr="name"
          valueExpr="code"
          with-input
          :is-default-item="true"
        />
      </block>
      <hr class="mt-20 mb-20" />
      <p class="font-size-16 mb-10">Modal</p>
      <block>
        <base-button title="Open Modal" @click="isModalOpen = !isModalOpen" />
      </block>
      <modal
        v-model="isModalOpen"
        @close="isModalOpen = false"
        direction="center-right"
        :with-mask="false"
      >
        <template v-slot:header>
          Modal Header
        </template>
        <template v-slot:body>
          Modal Body
        </template>
        <template v-slot:footer>
          Modal Footer
        </template>
      </modal>

      <hr class="mt-20 mb-20" />
      <p class="font-size-16 mb-10">Tabs</p>
      <block>
        <tabs v-model="activeTab" :items="tabs" size="xs">
          <template v-slot:first>
            Контент первого таба
          </template>
          <template v-slot:second>
            Контент второго таба
          </template>
        </tabs>
      </block>

      <hr class="mt-20 mb-20" />
      <p class="font-size-16 mb-10">List</p>
      <block>
        <list :items="listItems" :fields="listFields">
          <template v-slot:status="{ item }">
            <base-label :title="item.status" />
          </template>
        </list>
      </block>

      <hr class="mt-20 mb-20" />
      <p class="font-size-16 mb-10">Button 32 Fill</p>
      <block>
        <base-button title="Button" size="s" /> &nbsp;
        <!-- <base-button title="Button" size="xs" color="warning" /> &nbsp; -->
      </block>
      <hr class="mt-20 mb-20" />
      <p class="font-size-16 mb-10">Button 32</p>
      <block>
        <base-button title="Button" size="s" :fill="false" /> &nbsp;
        <!-- <base-button title="Button" size="xs" :fill="false" color="warning" /> -->

        &nbsp;
        <base-button title="Button" size="s" :fill="false" :disabled="true" />
        &nbsp;
      </block>
      <hr class="mt-20 mb-20" />
      <base-button title="Button" size="s" :disabled="true" /> &nbsp;
      <hr class="mt-20 mb-20" />
      <p class="font-size-16 mb-10">Button 48</p>
      <block> <base-button title="Button" size="m" /> &nbsp; </block>

      <hr class="mt-20 mb-20" />
      <block class="mt-10">
        <div class="flex">
          <base-input
            v-model="baseInput.inputValue"
            :disabled="baseInput.isDisabled"
            class="mb-10 mt-10"
            label="Номер телефона"
            placeholder="+7 985 935-20-86"
            v-focus
            :mask="{ mask: '+7 999 999-99-99', greedy: false }"
          />
          <base-input
            v-model="baseInput.inputValueMd"
            :disabled="baseInput.isDisabled"
            class="mb-10 mt-10 ml-10"
            label="Описание"
            type="number"
            placeholder="Текст"
            size="m"
          />
          <base-input
            v-model="baseInput.inputValueXs"
            :disabled="baseInput.isDisabled"
            class="mb-10 mt-10 ml-10"
            label="Описание"
            placeholder="Текст"
            size="s"
            is-success
          />
          <base-input
            v-model="baseInput.inputValueXs"
            :disabled="baseInput.isDisabled"
            class="mb-10 mt-10 ml-10"
            label="Описание"
            placeholder="Текст"
            size="s"
          >
            <template v-slot:left>
              <div style="width: 14px;height: 14px; background: green;"></div>
            </template>
            <template v-slot:right>
              <div style="width: 14px;height: 14px; background: green;"></div>
            </template>
          </base-input>
        </div>
        <checkbox v-model="baseInput.isDisabled">
          Заблокировать ввод
        </checkbox>
      </block>

      <hr class="mt-20 mb-20" />
      <p class="font-size-16 mb-10">Switch</p>
      <block>
        <base-switch v-model="switchModel" />
      </block>

      <hr class="mt-20 mb-20" />
      <p class="font-size-16 mb-10">Label</p>
      <block>
        <base-label title="Активен" />
        <base-label title="Не активен" color="warning" />
        <base-label title="Заблокирован" color="error" />
      </block>
      <block class="flex mt-10">
        <div>
          <radio
            label="Is this the value!"
            v-model="radio.value"
            optionValue="Yes"
          >
          </radio>
          <radio
            label="Or is this the value!"
            v-model="radio.value"
            optionValue="No"
          >
          </radio>
        </div>
        <div>
          <radio
            label="Disabled Selected"
            v-model="radio.disabledValue"
            optionValue="Disabled Selected"
            :disabled="true"
          >
          </radio>
          <radio
            label="Disabled unselected"
            v-model="radio.disabledValue"
            optionValue="Can be anything."
            :disabled="true"
          >
          </radio>
        </div>
      </block>
      <block class="mt-10">
        {{ textarea }}
        <base-textarea v-model="textarea" class="mt-10"></base-textarea>
      </block>
      <block class="mt-10">
        <file-input
          :value="fl"
          :withoutInput="false"
          @input="addFiles"
          label="Выберите файл"
          :isLoading="flIsloading"
        />
      </block>
      <base-title>Chat</base-title>
      <block class="flex">
        <chat-brokers-list
          @selectChat="selectChat"
          :current-page="$route.path"
          :brokers="[
            { name: 'Broker 10', id: 10, notificationsAmount: 20 },
            { name: 'Broker 20', id: 20 }
          ]"
          style="width: 300px"
        />
        <block wide>
          <base-title class="text-center"
            >Чат с брокером {{ currentChatId }}</base-title
          >
          <chat-messages-list wide class="pl-10 pr-10 pb-10">
            <block wide>
              <text-wrapper center>
                <chat-date>Сегодня</chat-date>
              </text-wrapper>
              <chat-message class="mt-10">Hi!</chat-message>
              <chat-message class="mt-10" is-message-in
                >How are u, man?</chat-message
              >
              <chat-message class="mt-10" time="12:10"
                >Very well! Where is east fifty second street? Do u know? Very
                well! Where is east fifty second street? Do u
                know?</chat-message
              >
              <chat-message class="mt-10" is-message-in
                >I'm not sure, but maybe it`s over there</chat-message
              >
              <unread-message />
              <chat-message>Hm, I will ask somebody more</chat-message>
              <chat-message is-message-in>Good luck cowboy!</chat-message>
              <chat-message is-message-out>Till tmr then</chat-message>
            </block>
          </chat-messages-list>
          <chat-divider />
          <chat-message-panel />
        </block>
      </block>
      <base-title>Spinners</base-title>
      <block class="flex align align--v-center">
        <spinner size="xs" />
        <spinner size="sm" class="ml-10" />
        <spinner size="md" class="ml-10" />
        <spinner size="lg" class="ml-10" />
      </block>
      <block class="mt-20"><router-view /></block>
      <block>
        <base-title>Multiselection:</base-title>
        <multiselect
          :items="multiselectItems"
          v-model="checkedMultiselectItemIds"
        />
      </block>
      <toast-like-modal
        title="Отменить создание карточки ТО"
        text="Вы уверены, что хотите отменить создание новой карточки ТО? Все введённые данные будут удалены без возможности восстановления."
        okText="Продолжить"
        cancelText="Удалить черновик"
        @click:ok="checkbox = !checkbox"
        v-model="isVisibleToastLikeModal"
        @close="isVisibleToastLikeModal = false"
      />
    </container>
  </app-wrapper>
</template>

<script>
import {
  AppWrapper,
  Container,
  Navbar,
  Block,
  SideMenu,
  Checkbox,
  Autocomplete,
  Select as BaseSelect,
  Tabs,
  Modal,
  Button as BaseButton,
  Input as BaseInput,
  Radio,
  Textarea as BaseTextarea,
  Label as BaseLabel,
  FileInput,
  ChatMessagesList,
  ChatBrokersList,
  ChatMessagePanel,
  ChatMessage,
  ChatDate,
  ChatDivider,
  ChatCounter,
  Title as BaseTitle,
  Spinner,
  Switch as BaseSwitch,
  List,
  TextWrapper,
  ErrorText,
  Multiselect,
  UnreadMessage,
  Toast,
  ToastLikeModal,
  Pagination,
  RadioToggle
} from "@/";

export default {
  components: {
    RadioToggle,
    AppWrapper,
    Container,
    Navbar,
    Block,
    SideMenu,
    Checkbox,
    Autocomplete,
    BaseSelect,
    Modal,
    Tabs,
    BaseButton,
    BaseInput,
    Radio,
    BaseTextarea,
    FileInput,
    ChatMessagesList,
    ChatBrokersList,
    ChatMessagePanel,
    ChatMessage,
    ChatDate,
    ChatDivider,
    ChatCounter,
    BaseTitle,
    Spinner,
    BaseLabel,
    BaseSwitch,
    List,
    TextWrapper,
    ErrorText,
    Multiselect,
    UnreadMessage,
    Toast,
    ToastLikeModal,
    Pagination
  },
  data() {
    return {
      radioToggleValue: "Неактивный",
      isVisibleToastLikeModal: false,
      checkbox: true,
      disabledChekbox: true,
      switchModel: true,
      autocompleteResult: {
        selectedValue: "",
        item: {}
      },
      activeTab: 1,
      menuItems: [
        {
          name: "brokers",
          title: "Брокеры"
        },
        {
          name: "news",
          title: "Новости"
        },
        {
          name: "dictionary",
          title: "Справочники"
        },
        {
          name: "chat",
          title: "Чат",
          slotName: "chat"
        }
      ],
      listItems: [
        {
          id: "1",
          service: "RecieveCreditDecision",
          name: "Получение решения",
          status: "активен"
        },
        {
          id: "2",
          service: "RecieveCreditDecision",
          name: "Получение решения",
          status: "активен"
        },
        {
          id: "3",
          service: "RecieveCreditDecision",
          name: "Получение решения",
          status: "активен"
        }
      ],
      listFields: [
        {
          name: "id",
          width: 20
        },
        {
          name: "service"
        },
        {
          name: "name"
        },
        {
          name: "status",
          width: 100
        }
      ],
      items: [],
      moreItems: [
        { _displayedValue: "apple juice", _selectedValue: "apple", id: 12 },
        {
          _displayedValue: "google company",
          _selectedValue: "google",
          id: 144
        },
        { _displayedValue: "amazon company", _selectedValue: "amazon", id: 16 }
      ],
      selectModel: "ACTIVE",
      isModalOpen: false,
      tabs: [
        {
          title: "Первый таб",
          slot: "first",
          isError: true
        },
        {
          title: "Второй таб",
          slot: "second"
        }
      ],
      selectList: [
        {
          name: "Активен",
          code: "ACTIVE"
        },
        {
          name: "Заблокирован",
          code: "INACTIVE"
        },
        {
          name: "Архив",
          code: "ARCHIVE"
        }
      ],
      baseInput: {
        inputValue: "",
        inputValueMd: "",
        inputValueSm: "",
        inputValueXs: "",
        isDisabled: false
      },
      radio: {
        value: "Yes",
        disabledValue: "Disabled Selected"
      },
      textarea: "",
      fl: "",
      flIsloading: false,
      currentChatId: 0,
      checkedMultiselectItemIds: [],
      multiselectItems: [
        {
          name: "Автозапчасти, шины, диски",
          id: 880
        },
        {
          name: "Билеты и туры",
          id: 90
        },
        {
          name: "Домашние аудио-видео системы",
          id: 589
        },
        {
          name: "Игровые приставки",
          id: 80
        },
        {
          name: "Автозапчасти, шины, диски",
          id: 8800
        },
        {
          name: "Билеты и туры",
          id: 980
        },
        {
          name: "Домашние аудио-видео системы",
          id: 5989
        },
        {
          name: "Игровые приставки",
          id: 820
        }
      ],
      paginationData: [],
      initialPaginationData: [
        ...Array.from({ length: 500 }, (_, i) => `John ${i}`)
      ]
    };
  },
  methods: {
    ttt(value) {
      console.log("v", value);
    },
    clearInputItem() {
      this.autocompleteResult.item = {};
    },
    inputItems(item, isItemSelected) {
      this.autocompleteResult.selectedValue = item.value;
      if (
        item.value !== this.autocompleteResult._selectedValue &&
        this.isAutocompleteSelected
      ) {
        this.clearInputItem();
      }
      if (isItemSelected) {
        this.autocompleteResult.selectedValue = item._selectedValue;
        this.autocompleteResult.item = { ...item };
        return;
      }

      new Promise(resovle => {
        this.items = [
          { _displayedValue: "apple juice", _selectedValue: "apple", id: 12 },
          {
            _displayedValue: "google company",
            _selectedValue: "google",
            id: 144
          },
          { _displayedValue: "amazon company", _selectedValue: "amazon", id: 9 }
        ];
        resovle();
      });
    },
    delay() {
      return new Promise(resolve => {
        setTimeout(() => {
          resolve();
        }, 1000);
      });
    },
    async addFiles(files) {
      this.flIsloading = true;
      await this.delay();
      this.fl = files[0].name;
      this.flIsloading = false;
    },
    setCurrentChatId(id) {
      this.currentChatId = id;
    },
    selectChat({ id }) {
      const currentPath = `/chat/${id}`;
      if (this.$route.path === currentPath) return;
      this.setCurrentChatId(id);
      this.$router.push({
        name: "messagesList",
        params: { id }
      });
    },
    changePage(data) {
      this.paginationData = data;
    }
  },
  computed: {
    isAutocompleteSelected() {
      return Object.keys(this.autocompleteResult.item).length > 0;
    },
    initialPage() {
      return Number(this.$route.query.page) || 1;
    }
  },
  watch: {
    selectModel(value) {
      console.log(value);
    }
  },
  mounted() {
    this.setCurrentChatId(this.$route.params.id);

    // setTimeout(() => {
    //   this.selectList = [
    //     {
    //       name: "Активен",
    //       code: "ACTIVE"
    //     },
    //     {
    //       name: "Заблокирован",
    //       code: "INACTIVE"
    //     },
    //     {
    //       name: "Архив",
    //       code: "ARCHIVE"
    //     }
    //   ]
    // }, 100)
  }
};
</script>

<style module>
.chatCounter {
  position: absolute;
  left: 100%;
  top: 50%;
  transform: translateY(-50%);
}
</style>
