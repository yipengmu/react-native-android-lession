#常见问题汇总：
#1.假如你成功了
##success界面
按照官方的教程把RN-android 环境搭建好后，就可以把demo跑起来了； 

![screenshot](http://img3.tbcdn.cn/L1/461/1/30148ef98d2c1ddd8e7c83f8d467caa0df75b48f)

本地实际的访问地址可以参考：
    http://localhost:8081/index.android.bundle?platform=android
    
#2.可能第一次都会失败

##1.出现一个红色的界面，failed JS bundle

![screenshot](http://img1.tbcdn.cn/L1/461/1/a32ef715aec032c8e9f7dc02393070c9ddb2fe39)

解决方案: 

有时候你运行 react-native run-android，发现并不能自动运行 dev server，你可以在当前项目目录中运行如下命令来手动启动 server：
```shell
	$ react-native start
```
本地server指定的8081端口并没有成功接送数据

adb reverse tcp:8081 tcp:8081

可以在chrome浏览器中访问：http://localhost:8081/

在JS-SERVER上看到数据包过来

![screenshot](http://img2.tbcdn.cn/L1/461/1/37047707bd13364486e54127b17715a3923f7dfb)

如果是5.0以下的系统 会爆出closed ， 建议使用wifi方式进行调试
```shell
	$ adb reverse tcp:8081 tcp:8081
	error: closed  
```
点击手机的物理menu键, 或者摇动手机才会出现Dev settings菜单（这项操作需要在你已经打开的ReactNavtive应用界面操作才有效）

Dev Settings -> Debug server host for device，

填入自己pc电脑上的 IP 地址，需要在同一网段，例如手机和pc都连接到了tplink-wifi-sid上。

之后menu-reload js 即可。

如果手机和电脑不在同一个网段，或者手机不能访问到，就会出现
Unable to download js bundle的红屏界面

##2.可能出现白色的界面
![图片](http://img4.tbcdn.cn/L1/461/1/9edf84896db6155806115ee309be71ff4b046829)
解决方案:

像MIUI等系统，默认会把那个显示悬浮窗开关给屏蔽关掉【用户可以手动切换】，操作后，重新load即可

更常见的搭建问题可以参考下这个：http://www.race604.com/react-native-for-android-start/

##3.invariant Violation:Application 红色屏幕错误
![图片](https://github.com/yipengmu/react-native-android-lession/blob/master/pics/Screenshot_2015-09-23-12-30-41.png?raw=true)

解决方案:

1.首先可以参考 OverStack 和一个官方的issue:

http://stackoverflow.com/questions/29287987/invariant-violation-application-awesomeproject-has-not-been-registered-when-b

https://github.com/facebook/react-native/issues/500#issuecomment-111575780

2.根据具体错误信息去排查，最后发现我出现这个错误的原因是不小心在文件头部打多了个无效字符，导致无法正确解析下面的代码行。所以只需要把那个无用的代码【影响了语法编译环节】删掉，重新reload -js 即可

##4.加载UIExplorerBlock失败

![图片](https://github.com/yipengmu/react-native-android-lession/blob/master/pics/Screenshot_2015-09-23-16-41-45.png?raw=true)

这是一个官方bug,默认的node_modules里面并没有该组件对应

https://github.com/facebook/react-devtools/issues/128

ios之前有这个问题，Android的初期版本貌似也有该类似问题

##5. .babelrc.stage文件错误
```java
transforming [========================================] 100% 399/400
Error while persisting cache: TransformError: /Users/alexwan/Documents/Project/HelloWorld/node_modules/react-deep-force-update/lib/index.js: [BABEL] /Users/alexwan/Documents/Project/HelloWorld/node_modules/react-deep-force-update/lib/index.js: Unknown option:
/Users/alexwan/Documents/Project/HelloWorld/node_modules/react-deep-force-update/.babelrc.stage
```
项目文件夹中node_modules/react-deep-force-update/.babelrc.stage 这个文件也会引起`红屏`，删除之后就可以运行通过了。
