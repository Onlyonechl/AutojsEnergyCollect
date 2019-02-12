
//var hand = images.read("/storage/emulated/0/tencent/MicroMsg/WeiXin/hand.jpg");
//var hand = images.read("/storage/emulated/0/Pictures/Screenshots/hand.jpg");

var myEnergeType=["线下支付","行走","共享单车","地铁购票","网络购票","网购火车票","生活缴费","ETC缴费","电子发票","绿色办公","咸鱼交易","预约挂号"];
var morningTime="07:10";//自己运动能量生成时间
function tLog(msg) {
  toast(msg);
  console.log(msg)
}
/**
 * 获取权限和设置参数
 */
function prepareThings(){
  setScreenMetrics(1080, 1920);
  //请求截图
  if(!requestScreenCapture()){
    tLog("请求截图失败");
    exit();
  }
}
/**
 * 设置按键监听 当脚本执行时候按音量减 退出脚本
 */
function registEvent() {
  //启用按键监听
  events.observeKey();
  //监听音量上键按下
  events.onKeyDown("volume_down", function(event){
    tLog("脚本手动退出");
    exit();
  });
}
/**
 * 获取截图
 */
function getCaptureImg(){
  var img0 = captureScreen();
  if(img0==null || typeof(img0)=="undifined"){
    tLog("截图失败,退出脚本");
    exit();
  }else{
    return img0;
  }
}
/**
 * 默认程序出错提示操作
 */
function defaultException() {
  tLog("程序当前所处状态不合预期,脚本退出");
  back();
  sleep(1000);
  back();
  sleep(1000);
  back();
  sleep(10000);
  mainEntrence();
}
/**
 * 等待加载收集能量页面,采用未找到指定组件阻塞的方式,等待页面加载完成
 */
function waitPage(type){
  // 等待进入自己的能量主页
  if(type==0){
    desc("消息").findOne();
  }
  // 等待进入他人的能量主页
  else if(type==1){
    desc("浇水").findOne();
  }
  //再次容错处理
  sleep(3000);
}
/**
 * 从支付宝主页进入蚂蚁森林我的主页
 */
function enterMyMainPage(){
  launchApp("支付宝");
  tLog("等待支付宝启动");
  var i=0;
  sleep(1000);
  //五次尝试蚂蚁森林入口
  while (!textEndsWith("蚂蚁森林").exists() && i<=5){
    sleep(2000);
    i++;
  }
  click("蚂蚁森林");//为了这后面正常运行，将蚂蚁森林放在支付宝首页中
  //等待进入自己的主页
  //waitPage(0);
  sleep(2000);
}
/**
 * 进入排行榜
 */
function enterRank(){
  //tLog("排行榜部分log0");
  //swipe(520,1860,520,100,500);
  //tLog("排行榜部分log1");
  //sleep(2500);
  //tLog("排行榜部分log2");
  //clickByDesc("查看更多好友",0,true,"程序未找到排行榜入口,脚本退出");
  //tLog("排行榜部分log3");
  swipe(520,1860,520,100,1000);
  swipe(520,1860,520,100,1000);
  swipe(520,1860,520,100,1000);
  //clickByDesc("查看更多好友",0,true,"程序未找到排行榜入口,脚本退出");
  desc("查看更多好友").findOne().click();
  sleep(1000);

  var i=0;
  //等待排行榜主页出现
  sleep(2000);
  while (!textEndsWith("好友排行榜").exists() && i<=5){
    sleep(2000);
    i++;
  }
  if(i>=5){
    defaultException();
  }
}
/**
 * 从排行榜获取可收集好有的点击位置
 * @returns {*}
 */
function getHasEnergyfriend(type) {
  var img = getCaptureImg();
  var p=null;
  sleep(500);
  if(type==1){
    //img 是图片
    //"#30bf6c" 第一个颜色
    //[0, 33, "#30bf6c"] 第二颜色和它的相对坐标
    //[34,45, "#ffffff"] 第三个颜色和它的相对坐标
    //region: [1030, 100, 1, 1700] （1030，100）为找色区域左上角的起始坐标，1，1700为找色区域的宽和高！！！
    p = images.findMultiColors(img, "#ffffff",[[28, 0, "#1da06d"], [28,50, "#1da06d"]], {
      region: [1073, 0, 100, 1820],
      threshold: 10
    });
    //411宽度 #a2cbb4 1032,1820 #30bf6c 1032,1787  -33   #52ca84 1032,1832  12   #ffffff 1032,1835  15
    //p = images.findMultiColors(img, "#a2cbb4",[[0, -33, "#30bf6c"], [0,12, "#52ca84"],[0,15, "#ffffff"]], {
    //  region: [1032, 180, 1, 1700]
    //});
    // p = images.findImage(img,hand,{
    //   region:[1000,0,80,1920],threshold:0.8
    // });
  // }else if(type==2){
  //   // 480宽度  基准点1775,832  #30bf6  -2,23 #ffffff  -5,16 #ffffff  0,-12 #30bf6c  0,44  #30bf6c
  //   p = images.findMultiColors(img, "#f99137",[[0, 62, "#f99137"], [0, 60, "#f99137"]], {
  //     region: [1073, 100, 1, 1820]
  //   });
  }
  if(p!=null){
    return p;
  }else {
    return null;
  }
}
/**
 * 判断是否好有排行榜已经结束
 * @returns {boolean}
 */
function isRankEnd() {
//   var img = getCaptureImg();
//   var p=null;
//   sleep(500);
//   tLog("判断是否为末尾");
//   p = images.findImage(img,NoMore,{
//     region:[200,1600,680,320],threshold:0.8
//   });
//   if(p!=null){
//     tLog("1111");
//     return true;
//   }else {
//     tLog("2222");
//     return false;
//   }
// }
  //tLog("判断是否为末尾");
  //if(descEndsWith("没有更多了").exists()){
  //  var b=descEndsWith("没有更多了").findOne();
  //  var bs=b.bounds();
  //  if(bs.centerY()<1920){
  //    tLog("1111");
  //    return true;
  //  }
  //}
  //tLog("2222");
  //return false; 

  tLog("判断是否为末尾");
  if (id("J_rank_list_more").findOne()){
    tLog("1111");
    return true;
  }
  tLog("2222");
  return false;
}
/**
 * 在排行榜页面,循环查找可收集好友的点击位置
 * @returns {boolean}
 */
function enterOthers(){
  tLog("开始检查排行榜");
  var i = 1;
  var ePoint=null;
  //确保当前操作是在排行榜界面
  while(textEndsWith("好友排行榜").exists() && i <=16){
    ePoint=getHasEnergyfriend(1);
    if(ePoint!=null){
      //点击位置相对找图后的修正
      //click(520,ePoint.y+100);//像素拉伸，荣耀10为1080*2280(默认1080*1920)，1920/2280≈0.84，实测系数0.9较为合适；魅族为1080*1920，系数为1.
      click(520,ePoint.y+20)
      waitPage(1);
      //clickByDesc("可收取",80);
      collect();
      //进去收集完后,递归调用enterOthers
      back();
      //tLog("点击中间");
      //click(520,ePoint.y);
      //waitPage(1);
      //clickByDesc("可收取",80);
      //collect();
      //进去收集完后,递归调用enterOthers
      //back();
      //tLog("点击下方");
      //click(520,ePoint.y+70);
      //waitPage(1);
      //clickByDesc("可收取",80);
      //collect();
      //进去收集完后,递归调用enterOthers
      //back();
      sleep(1000);
    }//else{
      //tLog("无可收取");
      //defaultException();
    //}
    // ePoint=getHasEnergyfriend(2);
    // if(ePoint!=null){
    //   click(520,ePoint.y+20)
    //   waitPage(1);
    //   collect();
    //   back();
    //   sleep(1000);
    // }
    i++;
    //滑动排行榜 root方式的的点击调用.如无root权限,7.0及其以上可采用无障碍模式的相关函数
    swipe(520,1800,520,300,1000);
    sleep(1500);
    // if(idEndsWith("J_rank_list_more").findOnce()){
    //   tLog("没有更多了");
    //   swipe(520,300,520,1800,1000);
    //   swipe(520,300,520,1800,1000);
    //   swipe(520,300,520,1800,1000);
    //   swipe(520,300,520,1800,1000);
    //   swipe(520,300,520,1800,1000);
    //   swipe(520,300,520,1800,1000);
    // }else{
    //   tLog("过了");
    // }
    //检测是否排行榜结束了
    // if(isRankEnd()){
    //   back();
    //   tLog("退出好友排行榜");
    //   enterRank();
    //   tLog("重新进入好友排行榜");
    //   enterOthers();
    //   tLog("重新开始循环好友列表");
    // }
    //如果连续32次都未检测到可收集好友,无论如何停止查找(由于程序控制了在排行榜界面,且判断了结束标记,基本已经不存在这种情况了)
    //else if(i>100){
    //  tLog("程序可能出错,连续"+i+"次未检测到可收集好友");
    //  exit();
    //}
  }
}
/**
 * 根据描述值 点击
 * @param energyType
 * @param noFindExit
 */
function clickByDesc(energyType,paddingY,noFindExit,exceptionMsg){
  if(descEndsWith(energyType).exists()){
    descEndsWith(energyType).find().forEach(function(pos){
      var posb=pos.bounds();
      Tap(posb.centerX(),posb.centerY()-paddingY);
      sleep(2000);
    });
  }else{
    if(noFindExit!=null && noFindExit){
      if(exceptionMsg !=null){
        tLog(exceptionMsg);
        exit();
      }else{
        defaultException();
      }
    }
  }
}
/**
 * 根据text值 点击
 * @param energyType
 * @param noFindExit
 */
function clickByText(energyType,noFindExit,exceptionMsg){
  if(textEndsWith(energyType).exists()){
    textEndsWith(energyType).find().forEach(function(pos){
      var posb=pos.bounds();
      Tap(posb.centerX(),posb.centerY()-60);
    });
  }else{
    if(noFindExit!=null && noFindExit){
      if(exceptionMsg !=null){
        tLog(exceptionMsg);
        exit();
      }else{
        defaultException();
      }
    }
  }
}
/**
 * 遍历能量类型,收集自己的能量
 */
function collectionMyEnergy(){
  var energyRegex=generateCollectionType();
  var checkInMorning=false;
  //如果是早上7点10分左右的话.等待主页能量出现 每隔一秒检测一次
  while(isMorningTime() && descEndsWith("行走").exists()){
    if (!checkInMorning){
      tLog("等待运动能量生成中...");
      checkInMorning=true;

    }
    descEndsWith("行走").find().forEach(function(pos){
      var posb=pos.bounds();
      Tap(posb.centerX(),posb.centerY()-80);
      sleep(1500);
    });
  }
  if(checkInMorning){
    tLog("运动能量收集完成");
  }
  if(descMatches(energyRegex).exists()){
    if(!checkInMorning){
      tLog("防止小树的提示遮挡,等待中");
      sleep(7000);
    }
    descMatches(energyRegex).find().forEach(function(pos){
      var posb=pos.bounds();
      Tap(posb.centerX(),posb.centerY()-80);
      sleep(2000);
    });
  }
}
/**
 * 收集能量，简单粗暴，对着小树上方点一遍
 * 为避免被文字提示遮挡，点击三遍
 */
function collect() {
  var i = 1;
  while (i<=1){
    for (var y = 460; y <= 860; y += 100) {
        for (var x = 185; x <= 890; x += 100) {
            click(x, y);
        }
    }
    //sleep(500);
    //tLog("第"+i+"次收集");
    i++;
  }
    
}
/**
 * 结束后返回主页面
 */
function whenComplete() {
  tLog("结束");
  back();
  sleep(1500);
  back();
  exit();
}
/**
 * 根据能量类型数组生成我的能量类型正则查找字符串
 * @returns {string}
 */
function generateCollectionType() {
  var regex="/";
  myEnergeType.forEach(function (t,num) {
    if(num==0){
      regex+="(\\s*"+t+"$)";
    }else{
      regex+="|(\\s*"+t+"$)";
    }
  });
  regex+="/";
  return regex;
}
function isMorningTime() {
  var now =new Date();
  var hour=now.getHours();
  var minu=now.getMinutes();
  var targetTime=morningTime.split(":");
  if(Number(targetTime[0])==hour && Math.abs(Number(targetTime[1])-minu)<=2){
    return true;
  }else{
    return false;
  }
}
//程序主入口
function mainEntrence(){
  //前置操作
  prepareThings();
  //注册音量下按下退出脚本监听
  registEvent();
  //从主页进入蚂蚁森林主页
  while(true){
    enterMyMainPage();
    tLog("进入蚂蚁森林主页");
    //收集自己的能量
    //collectionMyEnergy();
    collect();
    tLog("主页能量收集完毕");
    //注册音量下按下退出脚本监听
    registEvent();
    //进入排行榜
    enterRank();
    //在排行榜检测是否有好有的能量可以收集
    enterOthers();
    //退出排行榜
    back();
    sleep(1000);
    back();
    sleep(1500);
  }
  //结束后返回主页面
  //whenComplete();
}
mainEntrence();