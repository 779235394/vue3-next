<template>
  <div class="navbar">
    <hamburger
      id="hamburger-container"
      :is-active="sidebar.opened"
      class="hamburger-container"
      @toggleClick="toggleSideBar"
    />
    <breadcrumb id="breadcrumb-container" class="breadcrumb-container"/>
    <div class="right-menu">
      <el-dropdown
        class="avatar-container right-menu-item hover-effect"
        trigger="click"
      >
        <div class="avatar-wrapper">
          <img
            src="https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80"
            class="user-avatar">
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <router-link to="/">
              <el-dropdown-item>
                链接1
              </el-dropdown-item>
            </router-link>
            <a
              target="_blank"
              href="https://github.com/rcyj-FED/vue3-composition-admin"
            >
              <el-dropdown-item>
                链接2
              </el-dropdown-item>
            </a>
            <el-dropdown-item
              divided
              @click="logout"
            >
              <span style="display:block;">
                登出
              </span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>
<script lang="ts">
import Hamburger from './Hamburger.vue'
import Breadcrumb from './Breadcrumb.vue'

export default defineComponent({
  components: {
    Hamburger,
    Breadcrumb,
  },

  setup() {
    const store = useStore()
    const route = useRoute()
    const router = useRouter()
    const toggleSideBar = () => {
      store.dispatch('layout/toggleSideBar')
    }
    const sidebar = computed(() => store.getters['layout/sidebar'])
    const logout = () => {
      router.push(`/login?redirect=${route.fullPath}`).catch((err) => {
        console.warn(err)
      })
    }
    return {
      sidebar,
      logout,
      toggleSideBar,
    }
  },
})
</script>

<style lang="scss" scoped>
  .navbar {
    height: 50px;
    overflow: hidden;
    position: relative;
    background: #fff;
    box-shadow: 0 1px 4px rgba(0, 21, 41, .08);

    .hamburger-container {
      line-height: 46px;
      height: 100%;
      float: left;
      cursor: pointer;
      transition: background .3s;
      -webkit-tap-highlight-color: transparent;

      &:hover {
        background: rgba(0, 0, 0, .025)
      }
    }

    .breadcrumb-container {
      float: left;
    }

    .errLog-container {
      display: inline-block;
      vertical-align: top;
    }

    .right-menu {
      float: right;
      height: 100%;
      line-height: 50px;

      &:focus {
        outline: none;
      }

      .right-menu-item {
        display: inline-block;
        padding: 0 8px;
        height: 100%;
        font-size: 18px;
        color: #5a5e66;
        vertical-align: text-bottom;

        &.hover-effect {
          cursor: pointer;
          transition: background 0.3s;

          &:hover {
            background: rgba(0, 0, 0, 0.025);
          }
        }
      }

      .avatar-container {
        .avatar-wrapper {
          margin-top: 5px;
          margin-right: 16px;
          margin-left: 16px;
          position: relative;

          .user-avatar {
            cursor: pointer;
            width: 40px;
            height: 40px;
            border-radius: 10px;
          }

          .el-icon-caret-bottom {
            cursor: pointer;
            position: absolute;
            right: -20px;
            top: 25px;
            font-size: 12px;
          }
        }
      }
    }
  }

</style>
