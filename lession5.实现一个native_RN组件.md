#编写一个Native模块

#extends ReactContextBaseJavaModule
“一个原生模块是一个通常继承 ReactContextBaseJavaModule 类的 Java 类，并且实现了 JavaScript 需要实现的方法。

我们这里的目标是允许通过使用 JavaScript 书写  ToastAndroid.show('Awesome', ToastAndroid.SHORT);


就可以在屏幕上面显示一个短短的 toast 消息。”

	package com.facebook.react.modules.toast;
	import android.widget.Toast;
	import com.facebook.react.bridge.NativeModule;”

	import com.facebook.react.bridge.ReactApplicationContext;
	import com.facebook.react.bridge.ReactContext;
	import com.facebook.react.bridge.ReactContextBaseJavaModule;
	import com.facebook.react.bridge.ReactMethod;
	
	import java.util.Map;
	public class ToastModule extends 			 ReactContextBaseJavaModule {
		private static final String DURATION_SHORT_KEY = "SHORT";
		private static final String DURATION_LONG_KEY = "LONG";
		public ToastModule(ReactApplicationContext reactContext) {
    	super(reactContext);
    	}
	}
	
“ReactContextBaseJavaModule 需要一个叫做 getName 的方法被实现。

这个方法的目的就是返回在 JavaScript 里面表示这个类的叫做 NativeModule 的字符串的名字。

在这里我们调用 ToastAndroid 因此我们可以在 JavaScript 里面使用 React.NativeModules.ToastAndroid 来得到它。”

	@Override
	public String getName() {
    	return "ToastAndroid";
    }

“给 JavaScript 暴露一个方法，一个 Java 方法需要使用 @ReactMethod 来注解。

桥接的方法的返回值类型总是 void。

React Native 的桥接是异步的，因此将一个结果传递给 JavaScript 的唯一方式就是使用回调函数或者调用事件”

	@ReactMethod
	public void show(String message, int duration) {
    	Toast.makeText(getReactApplicationContext(), message, duration).show();
    }”
   
参数映射规则如下 @ReactMethod：

Boolean -> Bool

Integer -> Number

Double -> Number

Float -> Number

String -> String

Callback -> function

ReadableMap -> Object

ReadableArray -> Array

#注册Native模块

在使用 Java 的最后一步就是注册这个模块，这将在你的应用包中的 createNativeModules 发生。如果一个模块没有被注册，那么它在 JavaScript 是不可用的。

	class AnExampleReactPackage implements ReactPackage {
	
	@Override
	public List<NativeModule> createNativeModules(ReactApplicationContext 	reactContext) {
    	List<NativeModule> modules = new ArrayList<>();
    	modules.add(new ToastModule(reactContext));
    	return modules;
    }

#使用ReactJS调用
	var { 
		NativeModules 
	} = require('react-native');
	
	module.exports = NativeModules.ToastAndroid;”
	
	var ToastAndroid = require('ToastAndroid')
	ToastAndroid.show('Awesome', ToastAndroid.SHORT);
