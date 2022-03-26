import Autocomplete from "@/components/Autocomplete/";

export default {
  title: "Autocomplete",
  component: Autocomplete,
  argTypes: {}
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { Autocomplete },
  data() {
    return {
      autocompleteResult: {
        selectedValue: "",
        item: {}
      },

      moreItems: [
        { _displayedValue: "apple juice", _selectedValue: "apple", id: 12 },
        {
          _displayedValue: "google company",
          _selectedValue: "google",
          id: 144
        },
        { _displayedValue: "amazon company", _selectedValue: "amazon", id: 16 }
      ]
    };
  },
  computed: {
    isAutocompleteSelected() {
      return Object.keys(this.autocompleteResult.item).length > 0;
    }
  },
  methods: {
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
    }
  },
  template: '<autocomplete :items="moreItems" v-bind="$props" />'
});

export const WithFilter = Template.bind({});

WithFilter.args = {
  placeholder: "start typing: apple",
  label: "With filter",
  filter: true
};

export const WithoutFilter = Template.bind({});

WithoutFilter.args = {
  placeholder: "start typing: apple",
  label: "Without filter"
};
