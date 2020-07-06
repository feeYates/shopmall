<template>
  <div id="sort">
    <nav-bar class="nav-bar">
      <div slot="center">商品分类</div>
    </nav-bar>

    <!-- 商品分类内容 -->
    <div class="content">
      <tab-menu :sorts="sorts" @selectItem="selectItem"></tab-menu>
      <div class="content-r">
        <tab-control class="tab-control" :titles="['综合', '新品', '销量']"></tab-control>
        <scroll id="tab-content">
          <tab-content-sort class="tab-content-sort" :subSorts="subSorts"></tab-content-sort>
        </scroll>
      </div>
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
export default {
  components: {
    NavBar,
    TabMenu,
    Scroll,
    TabControl,
    TabContentSort
  },
  data() {
    return {
      sorts: [], //分类的数据
      sortData: {},
      currentIndex: -1,
      subSorts: {}
    };
  },
  created() {
    this._getSort();
  },
  computed: {
    showSubSort() {
      if (this.currentIndex === -1) return {};
      return this.sortData[this.currentIndex].subSorts;
    },
    showSortDetail() {
      if (this.currentIndex === -1) return [];
      return this.sortData[this.currentIndex].sortDetail[this.currentType];
    }
  },
  methods: {
    _getSort(index) {
      getSort().then(res => {
        // console.log(res);
        // 保存分类数据
        this.sorts = res.data.category.list;
        // 初始化每个子类的子数据
        for (let i = 0; i < this.sorts.length; i++) {
          this.sortData[i] = {
            subSorts: {},
            sortDetail: {
              pop: [],
              new: [],
              sell: []
            }
          };
        }

        // 请求第一个分类的数据
        this._getSubSort(0);
      });
    },

    _getSubSort(index) {
      this.currentIndex = index;
      const mailKey = this.sorts[index].maitKey;
      getSubSort(mailKey).then(res => {
        this.sortData[index].subSorts = res.data;
        this.subSorts = res.data;
        // console.log(this.subSorts)
        // this.sortData = {...this.sortData};
        /* this._getSortDetail(POP);
        this._getSortDetail(NEW);
        this._getSortDetail(SELL); */
      });
    },
    _getSortDetail(type) {
      // 1.获取请求的miniWallkey
      const miniWallkey = this.sorts[this.currentIndex].miniWallkey;
      // 2.发送请求,传入miniWallkey和type
      getSortDetail(miniWallkey, type).then(res => {
        // 3.将获取的数据保存下来
        this.sortData[this.currentIndex].sortDetail[type] = res;
        this.sortData = [...this.sortData];
      });
    },

    selectItem(index) {
      this._getSubSort(index);
    }
  }
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
  position: absolute;
  top: 44px;
  left: 0;
  bottom: 49px;

  display: flex;
}
.content-r {
  flex: 1;
  
}
#tab-content {
  height: 100%;
  margin-top: 10px;
}
.tab-control {
  position: fixed;
  top: 44px;
  left: 100px;
  right: 0;
  flex: 1;
  z-index: 999;
  background-color: #fff;
}
</style>