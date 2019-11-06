module.exports = {
  "env": {
      "node": true,
      "browser": true,
      "es6": true
  },
  "globals": {
      "window": true,
      "define": true,
      "require": true,
      "module": true,
      "fetch": false
  },
  "extends": "eslint:recommended",
  "parser": "babel-eslint",
  "parserOptions": {
      "ecmaFeatures": {
          "experimentalObjectRestSpread": true,
          "jsx": true,
          "es6": true,
      },
      "sourceType": "module"
  },
  "plugins": [
      "babel",
      "react"
  ],
  "rules": {
      // "indent": ["warning", 2],
      "no-console": 1,
      "linebreak-style": 0, //[ "error", "windows" ],
      "quotes": [ "error", "single" ],
      "semi": [ "error", "always"],
      "react/jsx-boolean-value": 0,
      "react/jsx-closing-bracket-location": 1,
      "react/jsx-curly-spacing": [2, "always"],
      "react/jsx-indent-props": [1, 2],
      "react/jsx-no-undef": 1,  
      "react/jsx-uses-react": 1,
      "react/jsx-uses-vars": 1,
      "react/react-in-jsx-scope": 1,
      "react/prefer-es6-class": 1,
      "react/jsx-no-bind": 1,
      "no-mixed-spaces-and-tabs": [2, "smart-tabs"]
  }
};
