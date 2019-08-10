<h1 align="center">Welcome to xhr-bridge 👋</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000" />
  <a href="https://github.com/h-4vok/xhr-bridge#readme">
    <img alt="Documentation" src="https://img.shields.io/badge/documentation-yes-brightgreen.svg" target="_blank" />
  </a>
  <a href="https://github.com/h-4vok/xhr-bridge/graphs/commit-activity">
    <img alt="Maintenance" src="https://img.shields.io/badge/Maintained%3F-yes-green.svg" target="_blank" />
  </a>
  <a href="https://github.com/h-4vok/xhr-bridge/blob/master/LICENSE">
    <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-yellow.svg" target="_blank" />
  </a>
</p>

> XHR Bridge Pattern that allows you to decouple your codebase from the actual XHR implementation of your choice. You will need an XHR-Bridge implementation of the XHR library of your choosing.

### 🏠 [Homepage](https://github.com/h-4vok/xhr-bridge#readme)

## Install

```sh
npm install xhr-bridge
```

## Run tests

```sh
npm run test
```

## About xhr-bridge

The idea is to decouple applications from specific XHR implementations. For example, if you use fetch, axios or superagent, you will be using these specific objects and calls directly from your code, effectively coupling your code to these specific libraries and implementations.

Through xhr-bridge and you should be able to decouple your XHR implementation for the xhr-bridge abstract layer.

This is better understood through an example. Currently xhr-bridge is completed but please wait until I upload xhr-superagent and also post a github with a xhr-superagent-example. I will also be developing xhr-fetch. Other libraries like axios and whatnot will follow after.

## Author

👤 **Christian Guzmán**

- Github: [@h-4vok](https://github.com/h-4vok)

## 🤝 Contributing

Contributions, issues and feature requests are welcome!<br />Feel free to check [issues page](https://github.com/h-4vok/xhr-bridge/issues).

## Show your support

Give a ⭐️ if this project helped you!

## 📝 License

Copyright © 2019 [Christian Guzmán](https://github.com/h-4vok).<br />
This project is [MIT](https://github.com/h-4vok/xhr-bridge/blob/master/LICENSE) licensed.

---

_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_
