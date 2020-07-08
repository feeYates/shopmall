<template>
  <div id="sort">
    <nav-bar class="nav-bar">
      <div slot="center">商品分类</div>
    </nav-bar>

    <!-- 商品分类内容 -->
    <div class="content">
      <tab-menu :sorts="sorts" @selectItem="selectItem"></tab-menu>
      <scroll id="tab-content" ref="scroll" >
        <tab-content-sort class="tab-content-sort" :subSorts="subSorts"></tab-content-sort>
        <tab-control @TabClick="tabClick" class="tab-control" :titles="['综合', '新品', '销量']"></tab-control>
        <tab-content-detail :sortDetail="showGoodsDetail"></tab-content-detail>
      </scroll>
    </div>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import Scroll from "components/common/scroll/Scroll";
import TabControl from "components/content/tabControl/TabControl";

import { getSort, getSubSort, getSortDetail } from "network/sort";

import TabMenu from "./subComponets/TabMenu";
import TabContentSort from "./subComponets/TabContentSort";
import TabContentDetail from './subComponets/TabContentDetail'

import {itemListenerMixin, backTopMixin} from 'common/mixin'
export default {
  components: {
    NavBar,
    TabMenu,
    Scroll,
    TabControl,
    TabContentSort,
    TabContentDetail
  },
  data() {
    return {
      sorts: [], //分类的数据
      sortData: {},
      currentType: "pop",
      subSorts: {},
      sortDetail: {
        pop: [],
        new: [],
        sell: []
      }
    };
  },
  mixins: [itemListenerMixin],
  created() {
    this._getSort();
  },
  computed: {
    showGoodsDetail() {
      return this.sortDetail[this.currentType];
    }
  },
  methods: {
    _getSort(index) {
      getSort().then(res => {
        // console.log(res);
        // 保存分类数据
        this.sorts = res.data.category.list;

        // 请求第一个分类的数据
        this._getSubSorts(0);
      });
    },

    _getSubSorts(index) {
      this.currentIndex = index;
      const mailKey = this.sorts[index].maitKey;
      getSubSort(mailKey).then(res => {
        this.subSorts = res.data;

        this._getSortDetail("pop");
        this._getSortDetail("sell");
        this._getSortDetail("new");

        // 监听图片加载完成
      });
    },
    _getSortDetail(type) {
      // 1.获取请求的miniWallkey
      const miniWallkey = this.sorts[this.currentIndex].miniWallkey;
      // 2.发送请求,传入miniWallkey和type
      getSortDetail(miniWallkey, type).then(res => {
        // 3.将获取的数据保存下来
        // this.sortData[this.currentIndex].sortDetail[type] = res;
        // this.sortData = [...this.sortData];
        this.sortDetail[type].push(...res)
        
      });
    },
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
    },
    selectItem(index) {
      this._getSubSorts(index);
    },

  },
 
};
</script>

<style lang="css" scoped>
#sort {
  height: 100vh;
}
#sort .nav-bar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background-color: var(--color-tint);
  color: #fff;
  font-weight: 700;
  z-index: 999;
}

.content {
  overflow: hidden;
  position: absolute;
  top: 44px;
  left: 0;
  bottom: 49px;

  display: flex;
}
#tab-content {
  height: 100%;
  margin-top: 10px;
  flex: 1;
}
.tab-control {
  flex: 1;
  z-index: 999;
  background-color: #fff;
}
</style>