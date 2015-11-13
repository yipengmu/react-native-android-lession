# react-native-android-lession
---
> 老穆记录： react native andorid 

---
[关于iOS部分可以参考vczero的lession文章](https://github.com/vczero/react-native-lession)


> React-Native 是Android端实现实现动态部署的另一种思路，绕过dexLoad【一些现有的Android插件框架】。

> 是在开发效率和用户体验间做的一种权衡。

> React-native使用JS开发，开发效率高、发布能力强。


* 1、用编辑器打开对应的.js文件，分析代码结构：

	var React = require('react-native');

和Node.js有关，require可以引入其他模块。

类似java 的 import com.andorid.xx.Act;

* 2、定义组件，结构化的代码：

		var {

		   AppRegistry,

		   StyleSheet,

		   Text,

		   View,

		} = React;

* 3、React.createClass里的render方法就是渲染视图用的。return返回的是视图的模板代码。

* 4、样式表现：那么StyleSheet.create就是干这件事的，只是用JS的自面量表达了css样式。

* 5、引入css样式：

		方法1：style={styles.container}

		方法2：style={{width:20,height:100}}

* 6、注册View组件，第二个参数为React.createClass创建的 那个var对象
 
		AppRegistry.registerComponent('aswsome', () => yourVar);

#最新动态
15.10.28日React Native Android可以load指定 jsBundle啦 虽然暂时还不支持直接的server-url，但是可以通过自定义JSLoader+DownloadManager去实现了。 

1.这个代码应该会合到0.14版本中 https://github.com/facebook/react-native/releases

2.使用loadFromFile代替了loadFromNetwork 

3.使用loadFromAssets充当了loadFromNetworkCached

4.code diff http://t.cn/RU5aksF?u=1310602621&m=3903222676550852&cu=1310602621

#1.环境安装
1.安装nvm

* 1.brew install nvm

2.nvm 安装最新的 Node.js 4.0

* nvm install node && nvm alias default node

3.安装watchman 和 flow

* $ brew install watchman
* $ brew install flow

并更新brew

* brew update && brew upgrade

#2.demo运行

首先切换到你想要的目录下，依次执行以下命令

* $ npm install -g react-native-cli

* $ react-native init AwesomeProject

* $ cd AwesomeProject/

运行项目

* $ react-native run-android

#3.react-android依赖树

    android-jsc-r174650

    appcompat-v7-23.0.0

    bolts-android-1.1.4

    drawee-0.6.1

    fbcore-0.6.1

    fresco-0.6.1

    imagepipeline-0.6.1

    imagepipeline-okhttp-0.6.1

    jackson-core-2.2.3

    jsr305-3.0.0

    library-2.4.0

    okhttp-2.4.0

    okhttp-ws-2.4.0

    okio-1.5.0

    react-native-0.11.0

    support-annotations-23.0.0

    support-v4-23.0.0



#4.从服务端动态拉取配置，并用listview进行展示

##1.listview展示

![listview展示](https://github.com/yipengmu/react-native-android-lession/blob/master/pics/flexbox.png)

##2.自定义webview 和 自定义Toast

![自定义webview 和 自动Toast](https://github.com/yipengmu/react-native-android-lession/blob/master/pics/Screenshot_2015-10-14-19-51-43.png)

## 3.配合官方的UI explorer，对学习和使用ReactAndroid都会有非常大的帮助

![ui demo](https://github.com/yipengmu/react-native-android-lession/blob/master/pics/demo-list.png)

![ui demo](https://github.com/yipengmu/react-native-android-lession/blob/master/pics/uiexplorer.png)
