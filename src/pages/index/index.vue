<template>
  <view class="container">
    <view class="navbar">
      <navbar />
    </view>

    <view class="swiper">
      <u-swiper
        :list="swiperList"
        keyName="image"
        showTitle
        :autoplay="true"
        circular
        indicator
        indicatorMode="line"
        previousMargin="30"
        nextMargin="30"
        radius="5"
        bgColor="rgba(0,0,0,0)"
      ></u-swiper>
    </view>
    <view class="toolbox">
      <view class="toolbox-item" v-for="tool in toolbox">
        <u-icon :name="tool.icon" size="20" color="#606266"></u-icon>
        <view class="toolbox-item-text">{{ tool.text }}</view>
      </view>
    </view>
    <view class="popular-functions">
      <view
        class="popular-functions-item"
        v-for="popularFunction in popularFunctions"
      >
        <u-icon :name="popularFunction.icon" size="20" color="#606266"></u-icon>
        <view class="popular-functions-item-text">{{
          popularFunction.text
        }}</view>
      </view>
    </view>
    <view class="roll-notice">
      <u-notice-bar
        :text="notice.text"
        mode="link"
        :url="notice.url"
        direction="row"
        :step="true"
      ></u-notice-bar>
    </view>
    <view class="cards">
      <view class="class-query-card">
        <view class="title">
          <view class="title-text">输入课程链接课程查询</view>
        </view>
        <view class="content">
          <view class="content-text">课表查询, 点击就送</view>
        </view>
      </view>

      <view class="three-cards">
        <view class="swipe-card">
          <u-swiper
            :list="swipeCard"
            keyName="image"
            radius="5"
            bgColor="rgba(0,0,0,0)"
            :autoplay="true"
            circular
            indicator
            indicatorMode="line"
          ></u-swiper>
        </view>
        <view class="column-two">
          <view class="todo">
            <view class="todo-title">今日待办</view>
            <view class="todo-content">
              <u-notice-bar
                :text="todoList"
                direction="column"
                color="black"
                bgColor="rgba(0,0,0,0)"
                icon=""
              ></u-notice-bar>
            </view>
          </view>
          <view class="kit">
            <view class="kit-title">校园好礼</view>
            <view class="kit-content">/kit tools</view>
          </view>
        </view>
      </view>

      <view class="two-cards">
        <view class="purchase-card">
          <view class="title">
            <view class="title-text">校园好礼</view>
          </view>
          <view class="content">
            <view class="content-text">学生低价, 吃喝玩乐</view>
            <u-icon name="arrow-right" :size="8" color="black"></u-icon>
          </view>
        </view>
        <view class="store-card">
          <view class="title">
            <view class="title-text">d6商店</view>
          </view>
          <view class="content">
            <view class="content-text">附魔金苹果兑不停</view>
            <u-icon name="arrow-right" :size="8" color="black"></u-icon>
          </view>
        </view>
      </view>
    </view>
    <view class="tail">
      <view class="pic"/>结尾放一张图, 完美
    </view>
  </view>
</template>

<script setup lang="ts">
import navbar from "@/components/navbar.vue";

const todoList = [
  "今日待办1",
  "今日待办2",
  "今日待办3",
  "今日待办4",
  "今日待办5",
  "今日待办6",
  "今日待办7",
  "今日待办8",
  "今日待办9",
  "今日待办10",
  "今日待办11",
  "今日待办12",
  "今日待办13",
  "今日待办14",
  "今日待办15",
  "今日待办16",
  "今日待办17",
  "今日待办18",
  "今日待办19",
  "今日待办20",
  "今日待办21",
  "今日待办22",
  "今日待办23",
  "今日待办24",
  "今日待办25",
  "今日待办26",
  "今日待办27",
  "今日待办28",
  "今日待办29",
  "今日待办30",
  "今日待办31",
  "今日待办32",
  "今日待办33",
  "今日待办34",
  "今日待办35",
  "今日待办36",
  "今日待办37",
  "今日待办38",
  "今日待办39",
  "今日待办40",
  "今日待办41",
];

const swipeCard = [
  {
    image:
      "https://img.zcool.cn/community/011b0e5cc434b2a801208f8b0af332.jpg@1280w_1l_2o_100sh.jpg",
    title: "昨夜星辰昨夜风，画楼西畔桂堂东",
  },
  {
    image:
      "https://th.bing.com/th/id/R.79ecb19a8f95736b29ee62eef2b9c255?rik=eagmh0omAjx0Qg&riu=http%3a%2f%2fpic1.16xx8.com%2fallimg%2fhiobi2%2f4-1ZGGG61HB.jpg&ehk=ZGBYCjbRWAm6ZRlLqaV1QUS1CBA4x%2bg220TcJL%2b53Yg%3d&risl=&pid=ImgRaw&r=0",
    title: "身无彩凤双飞翼，心有灵犀一点通",
  },
  {
    image:
      "https://pic1.zhimg.com/v2-1cbbf2c8ad2fb882586fed4a287106b0_r.jpg?source=1940ef5c",
    title: "谁念西风独自凉，萧萧黄叶闭疏窗，沉思往事立残阳",
  },
];

const notice = {
  text: [
    "浔阳江头夜送客",
    "枫叶荻花秋瑟瑟",
    "主人下马客在船",
    "举酒欲饮无管弦",
  ],
  url: "/pages/index/index",
};

const swiperList = [
  {
    image: "https://cdn.uviewui.com/uview/swiper/swiper2.png",
    title: "昨夜星辰昨夜风，画楼西畔桂堂东",
  },
  {
    image: "https://cdn.uviewui.com/uview/swiper/swiper1.png",
    title: "身无彩凤双飞翼，心有灵犀一点通",
  },
  {
    image: "https://cdn.uviewui.com/uview/swiper/swiper3.png",
    title: "谁念西风独自凉，萧萧黄叶闭疏窗，沉思往事立残阳",
  },
];

const toolbox = [
  {
    icon: "home",
    text: "首页",
  },
  {
    icon: "search",
    text: "搜索",
  },
  {
    icon: "cart",
    text: "购物车",
  },
  {
    icon: "account",
    text: "我的",
  },
];

const popularFunctions = [
  {
    icon: "home",
    text: "首页",
  },
  {
    icon: "search",
    text: "搜索",
  },
  {
    icon: "cart",
    text: "购物车",
  },
  {
    icon: "account",
    text: "我的",
  },
  {
    icon: "home",
    text: "首页",
  },
  {
    icon: "search",
    text: "搜索",
  },
  {
    icon: "cart",
    text: "购物车",
  },
  {
    icon: "account",
    text: "我的",
  },
  {
    icon: "account",
    text: "我的",
  },
  {
    icon: "account",
    text: "我的",
  },
];
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: linear-gradient(
    135deg,
    #a6eeeea3 10%,
    #ecb4ee52 40%,
    #e9f8f883 60%
  );
}

.toolbox {
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
  margin-top: 20px;
}

.toolbox .toolbox-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 25%;
}

.toolbox .toolbox-item .toolbox-item-text {
  font-size: 12px;
  color: #606266;
  margin-top: 5px;
}

.popular-functions {
  display: flex;
  flex-wrap: wrap;
  padding: 10px;
  margin: 5px 20px 0px 20px;
  background: rgba(255, 255, 255, 0.5);
  border-radius: var(--borderRadius-medium, 0.375rem);
  box-shadow: rgba(0, 0, 0, 0.1) 2.4px 2.4px 3.2px;
}

.popular-functions .popular-functions-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 20%;
}

.popular-functions .popular-functions-item .popular-functions-item-text {
  font-size: 12px;
  color: #606266;
  margin-top: 5px;
}

.roll-notice {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0px 10px;
  padding: 10px;
  border-radius: var(--borderRadius-medium, 0.375rem);
}

.cards {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0px 20px;
  border-radius: var(--borderRadius-medium, 0.375rem);
}

.cards .class-query-card {
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: url("https://img.zcool.cn/community/01662f554243770000019ae9cb94c1.jpg@1280w_1l_2o_100sh.jpg");
  height: 100px;
  border-radius: var(--borderRadius-medium, 0.375rem);
  box-shadow: rgba(0, 0, 0, 0.16) 0px 10px 36px 0px,
    rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;
}

.cards .class-query-card .title {
  display: flex;
  align-items: center;
  height: 1.5rem;
}

.cards .class-query-card .title .title-text {
  margin-left: 10px;
  font-size: 1.5rem;
  color: cornflowerblue;
  font-family: "LXGW WenKai";
}

.cards .class-query-card .content {
  display: flex;
  align-items: center;
  height: 1.5rem;
}

.cards .class-query-card .content .content-text {
  margin-left: 4rem;
  font-size: 1rem;
  color: gray;
  font-family: "LXGW WenKai";
}

.cards .three-cards {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 10px 0px;
  border-radius: var(--borderRadius-medium, 0.375rem);
}

.cards .three-cards .swipe-card {
  display: flex;
  width: 35%;
  flex-direction: column;
  justify-content: center;
  border-radius: var(--borderRadius-medium, 0.375rem);
}

.cards .three-cards .column-two {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 60%;
  border-radius: var(--borderRadius-medium, 0.375rem);
}

.cards .three-cards .todo {
  background: linear-gradient(90deg, rgba(255, 0, 0, 0.116) 10%, white 90%);
  box-shadow: rgba(0, 0, 0, 0.09) 0px 3px 12px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-radius: var(--borderRadius-medium, 0.375rem);
}

.cards .three-cards .todo .todo-title {
  display: flex;
  align-items: center;
  font-weight: bold;
  height: 0.5rem;
  margin-left: 1rem;
  margin-top: 0.8rem;
}

.cards .three-cards .todo .todo-title .title-text {
  font-size: 1rem;
  color: black;
}

.cards .three-cards .todo .todo-content {
  display: flex;
  align-items: center;
  margin: 0 0.35rem;
}

.cards .three-cards .kit {
  box-shadow: rgba(0, 0, 0, 0.09) 0px 3px 12px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 4.3rem;
  background: linear-gradient(
    90deg,
    rgba(220, 71, 228, 0.442) 40%,
    rgba(220, 71, 228, 0.316) 95%
  );
  border-radius: var(--borderRadius-medium, 0.375rem);
}

.cards .three-cards .kit .kit-title {
  display: flex;
  align-items: center;
  font-weight: bold;
  margin-left: 1rem;
}

.cards .three-cards .kit .kit-content {
  display: flex;
  margin: 0 1rem;
  font-size: 0.6rem;
}

.cards .two-cards {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.cards .two-cards .purchase-card {
  background: linear-gradient(60deg, #a6eeee6c 50%, #ffffff59 90%);
  height: 60px;
  width: 60%;
  border-radius: var(--borderRadius-medium, 0.375rem);
  box-shadow: rgba(0, 0, 0, 0.16) 0px 10px 36px 0px,
    rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;
}

.cards .two-cards .purchase-card .title {
  display: flex;
  /* align-items: center; */
  height: 1.5rem;
  margin-left: 1rem;
  margin-top: 0.8rem;
}

.cards .two-cards .purchase-card .title .title-text {
  font-size: 1.2rem;
  color: black;
}

.cards .two-cards .purchase-card .content {
  display: flex;
  align-items: center;
  margin: 0 1rem;
}

.cards .two-cards .purchase-card .content .content-text {
  font-size: 0.6rem;
  color: rgb(28, 94, 217);
  font-family: "LXGW WenKai";
}

.cards .two-cards .store-card {
  background: linear-gradient(300deg, #ffffff1f 5%, #eeb82f6c 95%);
  height: 60px;
  width: 38%;
  border-radius: var(--borderRadius-medium, 0.375rem);
  box-shadow: rgba(0, 0, 0, 0.16) 0px 10px 36px 0px,
    rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;
}

.cards .two-cards .store-card .title {
  display: flex;
  /* align-items: center; */
  height: 1.5rem;
  margin-left: 1rem;
  margin-top: 0.8rem;
}

.cards .two-cards .store-card .title .title-text {
  font-size: 1.2rem;
}

.cards .two-cards .store-card .content {
  display: flex;
  align-items: center;
  margin: 0 1rem;
}

.cards .two-cards .store-card .content .content-text {
  font-size: 0.6rem;
  color: chocolate;
  font-family: "LXGW WenKai";
}

.tail{
  margin-top: 1rem;
  height: 30px;
  width: auto;
}
</style>
