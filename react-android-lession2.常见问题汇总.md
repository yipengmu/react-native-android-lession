#常见问题汇总：
#1.假如你成功了
##success界面
按照官方的教程把RN-android 环境搭建好后，就可以把demo跑起来了； 

![screenshot](http://img3.tbcdn.cn/L1/461/1/30148ef98d2c1ddd8e7c83f8d467caa0df75b48f)

本地实际的访问地址可以参考：
    http://localhost:8081/index.android.bundle?platform=android
    
#2.可能第一次都会失败

##1.出现一个红色的界面

![screenshot](http://img1.tbcdn.cn/L1/461/1/a32ef715aec032c8e9f7dc02393070c9ddb2fe39)

解决方案: 

本地server指定的8081端口并没有成功接送数据

adb reverse tcp:8081 tcp:8081

可以在chrome浏览器中访问：http://localhost:8081/

在JS-SERVER上看到数据包过来

![screenshot](http://img2.tbcdn.cn/L1/461/1/37047707bd13364486e54127b17715a3923f7dfb)

点击手机的物理menu键

Dev Settings -> Debug server host for device，

填入自己pc电脑上的 IP 地址，需要在同一网段，例如手机和pc都连接到了tplink-wifi-sid上。

之后menu-reload js 即可。

##2.可能出现白色的界面
![图片](http://img4.tbcdn.cn/L1/461/1/9edf84896db6155806115ee309be71ff4b046829)
解决方案:

像MIUI等系统，默认会把那个显示悬浮窗开关给屏蔽关掉【用户可以手动切换】，操作后，重新load即可

常见的demo可以参考下这个：http://www.race604.com/react-native-for-android-start/
