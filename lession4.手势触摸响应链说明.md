#React-android的手势响应链
由于react native 不同于 webview，最终落地是 实打实的 native view componet 。

所以在响应事件分发情况上来说，是完全具备native的各种touch处理能力的:`fling,touch,tap,click,double click  and ....。`

能够有分级，分阶段，父view与子view直接的 消息传递和消息处理链的存在。

对应的ReactJS处理的实现在`ResponderEventPlugin.js`中

#交互上体验提升
之前使用h5的方式，对于客户端手势交互的反馈不是很友好，但是native可以很好的解决该问题

系统提供标准的selector.xml方式让开发者快速实现“二态效果”，包括其他的cancel状态的变更，快速，灵敏的反应对于app的交互体验将远好于web app的体验

#ReactJs端的实现

> View.props.onStartShouldSetResponder: (evt) => true
> View.props.onMoveShouldSetResponder: (evt) => true
> View.props.onResponderGrant: (evt) => {}
> View.props.onResponderReject: (evt) => {}
> View.props.onResponderMove: (evt) => {}
> View.props.onResponderRelease: (evt) => {}
> View.props.onResponderTerminationRequest: (evt) => true
> View.props.onResponderTerminate: (evt) => {}

##这里的evt 是一个touch的语义的封装：

	nativeEvent

	changedTouches - Array of all touch events that have changed since the last event

	identifier - The ID of the touch

	locationX - The X position of the touch, relative to the element

	locationY - The Y position of the touch, relative to the element

	pageX - The X position of the touch, relative to the screen

	pageY - The Y position of the touch, relative to the screen

	target - The node id of the element receiving the touch event

	timestamp - A time identifier for the touch, useful for velocity calculation

	touches - Array of all current touches on the screen
	
	
##如果父容器需要消耗事件
	View.props.onStartShouldSetResponderCapture: (evt) => true,
	
	View.props.onMoveShouldSetResponderCapture: (evt) => true,