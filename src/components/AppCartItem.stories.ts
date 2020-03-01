import { storiesOf } from '@storybook/vue';
import { withKnobs, text, number } from '@storybook/addon-knobs';

import AppCartItem from './AppCartItem.vue';

storiesOf('Components | AppCartItem', module)
  .addDecorator(withKnobs)
  .add('standard', () => {
    return {
      components: { AppCartItem },
      props: {
        title: {
          default: text(':title', 'Computer')
        },
        price: {
          default: number(':price', 2000)
        },
        thumbnail: {
          default: text(
            ':thumbnail',
            'https://images.unsplash.com/photo-1520256862855-398228c41684?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60'
          )
        },
        quantity: {
          default: number(':quantity', 2)
        }
      },
			template: `
			<app-cart-item 
				:title="title" 
				:price="price" 
				:thumbnail="thumbnail" 
				:quantity="quantity"
			/>`
    };
  });
