
# Android ReactNative ImageView 的使用

> 在使用RNAndroid 的 ToolbarAndroid时 ，关于navIcon标签的属性值，即设置左上角导航图片的资源路径时，发现直接尝试加载android apk包中的资源会失败：

![tp](http://s10.sinaimg.cn/mw690/001qH9BXgy6YmkDPml349&690)
## imageView source的 资源路径的设置
> 主要有以下几种形式可供使用和操作：

### 1.根据当前 node 服务器的 资源绝对路径
* 进行配置，验证可以正常显示：

`<Image source={require('./android/app/src/main/res/mipmap-hdpi/ic_launcher.png')} style={{width: 30, height: 30}}  />`
        


### 2.根据给定的url
* 直接显示，验证可以正常显示：

`<Image {uri: 'https://facebook.github.io/react/img/logo_og.png'} style={{width: 30, height: 30}}  />`
        
### 直接使用apk包中图片名

* 在使用ToolbarAndroid 时可以看到 navIcon的属性值是支持直接传递apk包内的图片名的。

* 即还有一种是 让js直接使用app的 res包下的drable资源，这里遇到了一些问题，按道理说，程序会自动去当前的app容器中起找，考虑到RN的消息通信的流转机制，毕竟最总绘制UI ,是发生在 native这一层，所以 picture 及 xml 等资源文件的路径索取，应该还是会回归到native那一次层，如果是是使用app包内的图片资源，那么按照官方给出的样例，后缀名是不用写的，这也是Android 本身推荐的方式。

* 但是目前直接这样操作（apk包里已经有了 这个同名的文件ic_launcher.png），貌似是不能正常显示出来，官方是有给出这样的加载方式的case,但是我这边本地这样尝试，貌似没有成功，切换到上两种情况即ok了。不知道大家有没有遇到类似情况。

`<  Image source={{uri: 'ic_launcher'}} style={{width: 30, height: 30}} />`


## 对应官方Image 文档：
[http://facebook.github.io/react-native/docs/image.html#content](http://facebook.github.io/react-native/docs/image.html#content)


## 源码分析及跟踪

### ImageRequestBuilder
根据红框的log,可以找到对应的ImageRequestBuilder类的代码【截图如下】，
从mathod的doc中可以看到,就是标准的ImageView是只支持network and local uris,那么 navIcon那个难道是自己拼的uri不成？

![tp](http://s2.sinaimg.cn/mw690/001qH9BXgy6Ymmq55CNb1&690)
![tp](http://s15.sinaimg.cn/mw690/001qH9BXgy6Ymmq8j1Ace&690)




### ReactImageView
再去对照ReactAndroid 的 ReactImageView源码，可以看到在setSource方法中，对source的路径相关的合法性检验和处理，里面有个mIsDitrty的结果反馈。

另外，优先check了分发uri后，如果失败，则会继续调用ReactImageView的静态方法 getResourceDrawableUri（Context context , String name）

![tp](http://s10.sinaimg.cn/mw690/001qH9BXgy6YmmQzrJv59&690)

### getResourceDrawableUri
getResourceDrawableUri 最终会执行通过下面React中如下代码获得DrawableId

	return context.getResources().getIdentifier(
	name.toLowerCase().replace("-", "_"),
	"drawable",
	context.getPackageName())`

* 平时直接用getIdentifier（） 不是特别多，简单说明下方法参数介绍

> Resources resources = context.getResources();
 
>intindentify= getResources().getIdentifier("icon", "drawable", "org.xx.package");

> 第一个参数为ID名，第二个为资源属性是ID或者是Drawable，第三个为包名。 

### R.java
到gradle的build/generated/source/r/debug/package里可以找到R.java文件,去里面查一下是否有自己要用的那个 drawable名字

查了后 ，fuck ,果然没有 这个ic_launcher 的id名



### id
一路跟踪 。。。。。擦,写死了 drawable 这种type, 而新版本的Studio是推荐的mipmap文件夹。。。。。额 找到问题关键了

![](http://s11.sinaimg.cn/mw690/001qH9BXgy6YmoZpFLIba&690)
![](http://s1.sinaimg.cn/mw690/001qH9BXgy6YmoZutfq90&690)
![](http://s5.sinaimg.cn/mw690/001qH9BXgy6YmoZycRu64&690)



### mipmap
原来是 新的Android studio 现在新建的文件夹都是mipmap-xxdpi 而不是以前的drawable-xxdpi,自己也没有注意

具体的原因可以参考这里，http://segmentfault.com/q/1010000002603418

即官方后续也是推荐使用mipmap代替 drawable...

### 曙光
换成drawable 下 ，运行正常，采坑结束，基本了解了 js端imageView组件到native层加载搜索的逻辑了


文章源地址见 github :[老穆 React Native 常见采坑总结](https://github.com/yipengmu/ReactNative_Android_QA/blob/master/README.md)
