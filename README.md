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

## About xhr-bridge

The idea is to decouple applications from specific XHR implementations. For example, if you use fetch, axios or superagent, you will be using these specific objects and calls directly from your code, effectively coupling your code to these specific libraries and implementations.

Through xhr-bridge and you should be able to decouple your XHR implementation for the xhr-bridge abstract layer.

This is better understood through an example. Currently xhr-bridge is completed but please wait until I upload xhr-superagent and also post a github with a xhr-superagent-example. I will also be developing xhr-fetch. Other libraries like axios and whatnot will follow after.

This way you can accomplish the following:

- Abstract your application from your XmlHttpRequest calls. Now you can change your API library at any time as long as there is an xhr-bridge implementation of it. I will provide my own for a couple of libraries.
- Abstracting your application from your XmlHttpRequest allows you to unit test your code without worrying about the coupling you have with libraries like fetch, axios, superagent and so on. Just mock the xhr-bridge interfaces and off you go.

## The motivation

I am a big enthusiast for patterns, whether its software design, architecture, project management or whatever. I even love reading about anti-patterns. It always puzzled me the way we keep coupling our frontend code to the API library of our choice like it's nothing. We do that too often with most libraries.

I created this idea of xhr-bridge during a React project where first we started using react-toastr and saw our devs directly calling the toastr methods whenever we needed to show a notification. Wow, hold it right there buddy. Yeah, we can totally mock this stuff on unit testing but the interface provided is opinionated and entirely functional to toastr.

So I went ahead and created a small interface on top. Partially a bridge, partially not (toastr does not inherit from an implementation interface of my own), it solved the problem. Now the entire application was talking to an interface and toastr was only initialized as a dependency injection at the start of the app. During unit testing we didn't need to worry about toastr at all.

And then I realized we were doing the same thing with superagent, an amazing XHR library available in npm. So I decided to build a bridge pattern on top of it and I was pleased with the results. Here it even made more sense. Superagent is very complete, and has features and behavior that other libraries do not have. However, I wanted to simplify the interface to the way I wanted to make API calls (which was very similar to superagent though!) and stay decoupled.

Maybe this is an overkill. I mean, how often do you change your XHR library? Probably the same amount of times you change your database engine right? Still, maybe we do not change it often because the cost of that change is exponential to our application size. Let alone having to re-test absolutely everything.

I will be building the axios, fetch and superagent xhr implementations myself, and testing them through. I will probably miss out functionality at first, or even library-specific features since I will be hiding all that magic. Hopefully, for the majority of the projects, xhr-bridge and it's family of implementations can provide a common language and a known interface to developers of applications under javascript that might push our performance up. Nothing would make me happier to see if the community approves of the idea and starts writing xhr implementations of their own for other libraries.

## About xhr library versioning

I am aware that by doing this on top of other libraries there is also the problem of additional versioning. If you were to download, say, xhr-axios@0.19.0 then that version would be matchin axios@0.19.0.

## xhr-bridge is indeed opinionated

The interface itself is my opinion. The way I feel things should be accomplished. So the interface is the result of a subjective and emotional decision, backed by my own logic and experience. By design, it should be flawed in some way. You will certainly be able to achieve 99% of your needs through the use of xhr-bridge and a library specific implementation, but to consider xhr-bridge the should-be defacto way things should be done is irrational and 100% flawed logic.

## Extensibility

You can extend xhr-bridge and your xhr-bridge specific library implementation above the current feature set. There are many ways to accomplish this.

- You can extend any of the xhr classes, overriding behavior.
- The idea is that XhrBridge allows dependency injection everywhere. I might not have achieved this 100% yet but eventually you should be able to override everything you need in order to add your own code on top, if you have special case scenarios.
- On my example repository I will be providing ways to extend or even override xhr-bridge using some common case scenarios I have come with, where the best option is to extend xhr-bridge adding specific domain controls and behavior.

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
