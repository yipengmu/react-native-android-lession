#为什么在AwesomeProject里没看到React对应的so，

其实他是通过gradle依赖的那个gradle-dependence实现的。

而如果要看compile'com.facebook.react:react-native:0.11.0'的实现，

就要去git上下载

https://github.com/facebook/react-native 项目代码



#通过ReactAndroid项目可以看到，他的“复杂的”gradle脚本,

里面有操作node_module 的task，并且依赖ndk环境编译

可能会遇到该问题

![图片](https://github.com/yipengmu/react-native-android-lession/blob/master/pics/1.jpeg?raw=true)
#mac下配置NDK配置React

http://developer.android.com/ndk/downloads/index.html#download

将bin文件放到你一个新开辟的文件下后，执行：

ndk$ chmod a+x android-ndk-r10c-darwin-x86_64.bin 

ndk$ ./android-ndk-r10c-darwin-x86_64.bin

之后就可以看到

![图片](https://github.com/yipengmu/react-native-android-lession/blob/master/pics/2.jpeg?raw=true)

项目可以编译通过的状态。


在我们的主工程项目里面也可以看到node_modules的对应目录关系：


![图片](https://github.com/yipengmu/react-native-android-lession/blob/master/pics/3.jpeg?raw=true)

# ReactAndroid打包分析[共15个task]:

1.task createNativeDepsDirectories 

2.task downloadBoost

3.task prepareBoost

4.task downloadDoubleConversion

5.task prepareDoubleConversion

6.task downloadFolly

7.task prepareFolly

8.task downloadGlog

9.task prepareGlog

10.task downloadJSCHeaders

11.task prepareJSC

12.task buildReactNdkLib

13.task cleanReactNdkLib

14.task packageReactNdkLibs