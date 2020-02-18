import { storiesOf } from '@storybook/vue';

import AppTest from './AppTest.vue';

storiesOf('Test', module).add('AppTest', () => ({
  components: { AppTest },
  template: '<app-test>Some slot content</app-test>'
}));
