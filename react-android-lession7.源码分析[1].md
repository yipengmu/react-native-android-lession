#React 0.11.0 源码分析

##如何调用远程的js
* 根据代码分析，目前react.jar里没有剥离出对于的setLocalJSFilePatch()和setRemoteJsFileUrl()的方法。

跟进代码到

ReactInstanceManager.onJSBundleLoadedFromServer（）；


	recreateReactContext(

        new JSCJavaScriptExecutor(),
        
        JSBundleLoader.createCachedBundleFromNetworkLoader(
        
            mDevSupportManager.getSourceUrl(),
            
            mDevSupportManager.getDownloadedJSBundleFile()));
            
            
            
##JS加载初始化逻辑源码分析            
 * 通过分析初始化逻辑及加载逻辑，我们很容易能够跟进到ReactInstanceManager这个类中的，方法onJSBundleLoadedFromServer();
 
 ![图片路径分析](https://github.com/yipengmu/react-native-android-lession/blob/master/pics/js-url.png?raw=true)    
 
 
##现在只能通过dev-setting的Helper类进行设置
            
 * 通过手机的硬件物理menu菜单，里面有个设置ip的地方，即加载本sid网段下的一个指定ip
 
 * 而本地会启动一个Node服务器，把现在的安格indexandroid.js部署在那个服务器上，只能手动改变那个js中代码，进行配置
 
 ![现在只能通过dev-setting的Helper类进行设置](https://github.com/yipengmu/react-native-android-lession/blob/master/pics/js-url.png?raw=true)          
         
##如何分离图片库fresco和网络库okhttp
* 这个是个好问题，目前的版本代码耦合还是比较紧密的，需要进一步分析和跟进源代码，系统能够做一个adapter适配器，让不同的实现者可以注入自己的图片库和网络库