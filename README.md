# Frontle

> 세상에서 가장 쉬운 멀티플랫폼 SPA 개발을 경험해보세요!

#### **Frontle을 써야하는 이유**

- **Non-Build 방식**
  - webpack, babel을 몰라도 됩니다
  - 소스코드를 그대로 실행하고 배포할 수 있습니다
  - 빌드에 사용되는 패키지들이 없기 때문에 유지보수에 드는 비용이 적습니다
- **순수 JS 문법**
  - react, vue와 같이 새로운 문법을 배우지 않아도됩니다
  - 개발사의 지원 중단을 걱정하지 않아도 됩니다
- **강력한 기능들**
  - **Browser, Android, IOS, Electron 개발 지원(Cordova)**
  - NPM 지원
  - 캐시 버스팅 지원
  - NODE_ENV와 같은 기능 지원
  - Modal, Toast, BottomSheet, Cordova KeyValueStorage, Cordova FileUtil 등 라이브러리 지원

## 개발 스타일

![1](https://user-images.githubusercontent.com/49587288/201497614-154324b3-2d6a-4796-8b36-a8e103461f95.PNG)

## 설치

```shell
npm install -g cordova
npm install -g frontle
```

## Frontle 프로젝트 만들기

```shell
frontle create myApp
cd myApp
npm install
cordova platform add browser
cordova run browser
```

## 어플리케이션 실행

### **Browser**

- **실행 방법**

```shell
cordova platform add browser
cordova run browser
```

### **Android**

- **사전 설정**

  cordova에서 안드로이드를 사용하기 위해서는 사전 설정이 필요합니다. 아래의 공식 문서를 확인해주세요

  https://cordova.apache.org/docs/en/11.x/guide/platforms/android/index.html

- **실행 방법**

```shell
cordova platform add android
cordova run android
```

- **디바이스에 설치한 Android 앱을 크롬 브라우저로 디버깅하는 방법**

  https://developer.chrome.com/docs/devtools/remote-debugging/

### **IOS**

- **사전 설정**

cordova에서 IOS를 사용하기 위해서는 사전 설정이 필요합니다. 아래의 공식 문서를 확인해주세요

https://cordova.apache.org/docs/en/11.x/guide/platforms/ios/index.html

- **실행 방법**

```shell
cordova platform add ios
open -a Xcode platforms/ios
```

- **디바이스에 설치한 IOS 앱을 사파리 브라우저로 디버깅하는 방법**

https://www.browserstack.com/guide/how-to-debug-on-iphone

### **Electron**

- **사전 설정**

cordova에서 Electron을 사용하기 위해서는 사전 설정이 필요합니다. 아래의 공식 문서를 확인해주세요

https://cordova.apache.org/docs/en/11.x/guide/platforms/electron/index.html

- **실행 방법**

```shell
cordova platform add electron
cordova run electron --nobuild
```

## IDE 설정(Live Reload, 자동 완성 등)

### vscode

추천 확장 설치하세요(이미지 보여주기)

cordova 확장 = 라이브리로드랑 디버깅 지원함(이미지)

### webstorm

여기가서 .js 설정해주세요

resource 폴더 설정해주세요

cordova plugin 있어요 이런것들

## Frontle-CLI 명령

create

install

uninstall

build

## Frontle 함수

frontle.env.

## 대표 라이브러리

modal

toast

bottomsheet

## 철학 





## 기여자 및 기여 방법





## 라이센스

