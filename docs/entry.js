
    window.reactComponents = {};

    window.vueComponents = {};

  
      import React from "react";

      import ReactDOM from "react-dom";


      import ReactWrapper from '../node_modules/better-docs/lib/react-wrapper.js';

      window.React = React;

      window.ReactDOM = ReactDOM;

      window.ReactWrapper = ReactWrapper;

    
    import './styles/reset.css';

    import './styles/iframe.css';

  import Component0 from '../src/components/AppDescription/AppDescription.js';
reactComponents['AppDescription'] = Component0;

import Component1 from '../src/components/Document/Document.js';
reactComponents['Documented'] = Component1;

import Component2 from '../src/components/GettingStarted/GettingStarted.js';
reactComponents['GettingStarted'] = Component2;