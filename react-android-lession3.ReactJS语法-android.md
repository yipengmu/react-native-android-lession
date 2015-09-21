#React需要注意的语法

##所有的jsx组件Facebook推荐大家按照一定的格式去编写
	"<Text style={styles.base} />

	<View style={styles.background} />
	

	<View style={[styles.base, styles.background]} />




* 1.对于ui 组件使用大写命名
* 2.对于组件的属性使用小写命名
* 3.对于style的配置支持按照对象方式去引用，{yourvar.somelable};
* 4.也支持两层嵌套style样式，直接写入属性，类似{{}}
* 5.对于style，React还支持 数组的方式即{[yourvar.somelable1,yourvar.somelable2]}