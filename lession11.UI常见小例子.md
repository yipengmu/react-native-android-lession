#UI 常用 小case


##1.setTimeout

render里面 onpress时调用：被点击后200秒触发弹框

	fondSellOut(event) {
            setTimeout(function() {
                alert('click')
            }, 2000);
            console.log('Pressed!');
        },