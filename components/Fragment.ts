import { defineComponent } from 'vue';
export default defineComponent({
  name: 'Fragment',
  template: `<Fragment>
  <slot></slot>
  </Fragment>`

});
