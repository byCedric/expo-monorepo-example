'use dom';

import { DOMProps } from 'expo/dom';

export default function HelloWeb(props: DOMProps & { name: string }) {
  console.log('hello from web component');
  console.log('props:', props);

  return (
    <div style={{ backgroundColor: 'green', flex: 1 }}>
      <p style={{ color: 'white' }}>Hello {props.name}, from a web view</p>
    </div>
  );
}
