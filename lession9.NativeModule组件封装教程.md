#如何封装一个React native for android 的 NativeModule组件


##1.首先需要使用自己的packageManager
 
    public class YourRnPackage extends MainReactPackage {
    @Override
    public List<NativeModule> createNativeModules(ReactApplicationContext reactContext) {
        List<NativeModule> modules = super.createNativeModules(reactContext);
        //new an Array intstead of abstract List exception
        List<NativeModule> result = new ArrayList<>();
        result.addAll(modules);
        result.add(new YourOpenSomePageModule(reactContext));
        result.add(new YourToastModule(reactContext));
        return result;
    }
    @Override
    public List<Class<? extends JavaScriptModule>> createJSModules() {
        return Collections.emptyList();
    }

    @Override
    public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
        List<ViewManager> main = super.createViewManagers(reactContext);
        List<ViewManager> result = new ArrayList<>();
        result.addAll(main);
        result.add(new YourWebviewManager());

        return result;

    }
	}


#2.在你的Activitiy或Fragment中对其进行设置


    public class MainActivity extends Activity implements DefaultHardwareBackBtnHandler {
    private ReactInstanceManager mReactInstanceManager;
    private ReactRootView mReactRootView;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        mReactRootView = new ReactRootView(this);

        mReactInstanceManager = ReactInstanceManager.builder()
                .setApplication(getApplication())
                .setBundleAssetName("index.android.bundle")
                .setJSMainModuleName("index.android")
                .addPackage(new YourRnPackage())
                .setUseDeveloperSupport(BuildConfig.DEBUG)
                .setInitialLifecycleState(LifecycleState.RESUMED)
                .build();

        mReactRootView.startReactApplication(mReactInstanceManager, "YourRnPackage", null);

        setContentView(mReactRootView);
    }
    
#3.Step by Step:

1.Create the ViewManager subclass.

2.Annotate the view properties with @UIProp

3.Implement the createViewInstance method

4.Implement the updateView method

5.Register the manager in createViewManagers of the applications package.

6.Implement the JavaScript module

#4.以新增一个自定义Toast为例


    public class YourToastModule extends ReactContextBaseJavaModule {
    private static final String DURATION_SHORT_KEY = "SHORT";

    private static final String DURATION_LONG_KEY = "LONG";

    public AliToastModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "AliToastAndroid";
    }

    @Override
    public Map<String, Object> getConstants() {
        final Map<String, Object> constants = new HashMap<>();
        //JS端可以使用指定NativeModules对象下的属性
        constants.put(DURATION_SHORT_KEY, Toast.LENGTH_SHORT);
        constants.put(DURATION_LONG_KEY, Toast.LENGTH_LONG);
        return constants;
    }

    @ReactMethod
    public void show(String message, int duration) {
        Toast.makeText(getReactApplicationContext(), message, duration).show();
    }
    }
1.继承自ReactContextBaseJavaModule，实现getName用于js前端调用NativeModules.类A，实现含有@ReactMethod的方法用于前端调用类A的xx方法

	    public class YourToastModule extends ReactContextBaseJavaModule {
	   	@ReactMethod
     	public void show(String message, int duration) {
        	Toast.makeText(getReactApplicationContext(), message, duration).show();
	    }
2.在你自定义的packManager中增加你的NativeModule,
     
       @Override
    public List<NativeModule> createNativeModules(ReactApplicationContext reactContext) {
        List<NativeModule> modules = super.createNativeModules(reactContext);
        //new an Array intstead of abstract List exception
        List<NativeModule> result = new ArrayList<>();
        result.addAll(modules);
        result.add(new YourOpenSomePageModule(reactContext));
        result.add(new YourToastModule(reactContext));
        return result;
    }
    
3.这样就可以在前端调用了，代码如下：

	var React = require('react-native');
	var ToastAndroid = React.NativeModules.YourToastModule
	ToastAndroid.show('自定义toast 调用成功', ToastAndroid.SHORT);

#4.最终的自定义组件封装的调用效果如下图所示：

1.底部的toast就是通过自定义的React组件显示出来的

2.屏幕中的webview也是类似的方法，在JS使用了
如下代码即可:

var ToastAndroid = React.NativeModules.MyWebView

`var AliReactAndroid = React.createClass({})；` 

	<MyWebView
              style={{width: 600,height: 500}}
              url={"http://www.qq.com"}/>
![pics](https://github.com/yipengmu/react-native-android-lession/blob/master/pics/Screenshot_2015-10-14-19-51-43.png)