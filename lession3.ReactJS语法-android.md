#React需要注意的语法

##所有的jsx组件Facebook推荐大家按照一定的格式去编写
	<Text style={styles.base} />

	<View style={styles.background} />
	

	<View style={[styles.base, styles.background]} />




* 1.对于ui 组件使用大写命名

* 2.对于组件的属性使用小写命名

* 3.对于style的配置支持按照对象方式去引用，{yourvar.somelable};

* 4.也支持两层嵌套style样式，直接写入属性，类似{{}}

* 5.对于style，React还支持 数组的方式即{[yourvar.somelable1,yourvar.somelable2]}

##style样式写法
	var styles = StyleSheet.create({
	base: {
    	width: 38,
    	height: 38,
	},
		background: {
    	backgroundColor: '#222222',
	},
	active: {
    	borderWidth: 2,
    	borderColor: '#00ff00',
	},
	});
	
这样的构造StyleSheet的方式是非必须的但是是（老穆）推荐的.

他的目的类似函数封装，对于后续的复用和重载都会有一定好处.

当然你也可以直接通过内联方式去编写样式代码例如

`<View style={[styles.base, styles.background]} />`