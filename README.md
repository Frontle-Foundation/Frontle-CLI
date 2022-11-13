# Frontle

> 세상에서 가장 쉬운 멀티플랫폼 SPA 개발을 경험해보세요!

#### **Frontle을 써야하는 이유**

- **Non-Build 방식**
  - webpack, babel 등의 빌드 기술을 배우지 않아도 됩니다
  - 소스코드를 그대로 실행하고 배포할 수 있습니다
  - 종속된 빌드 도구들이 없어 유지보수에 드는 비용이 적습니다
- **순수 JS 문법**
  - react, vue와 같이 새로운 문법을 배우지 않아도 됩니다
  - 개발사의 지원 중단 및 업데이트에 의한 유지보수를 고려하지 않아도 됩니다
- **강력한 기능들**
  - **Browser, Android, IOS, Electron 개발 지원(Cordova)**
  - NPM 지원
  - Cache bursting 지원
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

- **추천되는 확장을 설치해주세요**

![2](https://user-images.githubusercontent.com/49587288/201522261-1dda22f6-5243-4628-8028-603ebf138704.PNG)

- **Cordova Tools**
  - Live Reload 지원
  - Cordova 어플리케이션 실행 지원
- **Inline HTML**
  - 템플릿 문자열안에 작성한 HTML, CSS 코드 인식 지원
- **Open file From Path**
  - 소스코드 내부의 파일 경로를 마우스로 클릭하고 Alt + D를 누르면 파일이 열립니다
- **Path Autocomplete**
  - 파일 경로 자동 완성 지원
- **Prettier**
  - 소스코드 자동 정돈 기능 지원

### webstorm

- JS Import 경로에 파일 확장자를 자동으로 추가하기 위해 설정에 들어가서 **Editor > Code Style > Javascript > Imports**의 **Use file extension** 설정을 **Always**로 변경합니다

![3](https://user-images.githubusercontent.com/49587288/201522864-6b32bb27-3715-4473-8c64-37da5931ed6e.PNG)

- 파일 경로가 정상적으로 작동하기 위해 **www/version 폴더**를 **Resource Root**로 설정해주세요

![4](https://user-images.githubusercontent.com/49587288/201523251-1d36b788-86c9-4282-a0fb-7d191e3a47e0.PNG)

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

