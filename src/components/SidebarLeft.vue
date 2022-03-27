<template>
  <header>
    <div class="header">
      <router-link to="/" class="header-to-main">
        <img src="../assets/img/home.svg" alt="" />
      </router-link>
      <!-- <div class="header-name">
              <span>My Cabinet</span>
          </div> -->
      <div class="header-profile-wrap">
        <router-link to="/">
          <div class="header-profile">
            <img src="../assets/img/user.svg" alt="" />
          </div>
        </router-link>
      </div>
      <div class="header-settings">
        <div class="settings-icon">
          <img src="../assets/img/settings.svg" alt="" />
        </div>
        <div class="settings-menu">
          <div class="settings-title">
            <span>Меню</span>
          </div>
        </div>
      </div>
      <div class="header-menu-list-wrap">
        <div class="header-menu-list-item">
          <div class="header-menu-list-item-name">
            <span>Кабинет</span>
          </div>
        </div>
        <div class="header-menu-list-item">
          <div class="header-menu-list-item-name">
            <span>Лента</span>
          </div>
        </div>
        <div class="header-menu-list-item">
          <div class="header-menu-list-item-name">
            <span>Моё</span>
          </div>
        </div>
        <div class="header-menu-list-item">
          <div class="header-menu-list-item-name">
            <span>Интерфейс</span>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
  export default {
    name: 'SidebarLeft',
    props: {
      classcolor: {
        type: String,
        default: 'color-blue',
      },
    },
    data() {
      return {
        colors: [
          { id: 1, color: 'color-blue' },
          { id: 2, color: 'color-red' },
          { id: 3, color: 'color-green' },
          { id: 4, color: 'color-purple' },
        ],
      }
    },
    methods: {
      colorChange(e) {
        this.$emit('colorBack', { color: e })
      },
    },
    computed: {},
  }
</script>

<style>
  .header {
    /* height: 50px;
    width: 100%; */
    width: 320px;
    -webkit-box-flex: 0;
    -ms-flex: 0 1 320px;
    flex: 0 1 320px;
    min-width: 320px;
    background: #2c2c2c;
    position: relative;
    z-index: 1000;
    height: 100vh;
    -webkit-box-shadow: 0 12px 24px 0 rgba(45, 73, 88, 0.15);
    box-shadow: 0 12px 24px 0 rgba(45, 73, 88, 0.15);
  }
  .header-name {
    font-size: 20px;
    font-weight: bold;
    color: white;
  }
  .header-profile-wrap {
    display: flex;
    justify-content: center;
    align-content: center;
  }
  .header-to-main img {
    width: 25px;
    height: 25px;
    /* width: 100%;
    height: 100%; */
  }
  .header-menu-list-item {
    display: flex;
    -webkit-box-pack: justify;
    justify-content: space-between;
    flex-wrap: wrap;
    -webkit-box-align: center;
    /* align-items: center; */
    width: 100%;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    font-size: 22px;
    min-height: 55px;
    color: white;
  }
  .header-menu-list-item-name {
    width: 100%;
    text-align: left;
  }
  .header-menu-list-item-name span {
    margin: 8px;
  }
  .header-menu-list-additem {
    width: 100%;
  }

  .header-colors {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .header-color {
    width: 20px;
    height: 20px;
    border: 2px solid white;
    margin: 5px;
  }
  .header-to-main {
    width: 25px;
    height: 25px;
    margin-left: 20px;
  }
  .header-to-main svg {
    fill: white;
  }
  .header-profile img {
    width: 50px;
    height: 50px;
  }
  .settings-icon {
    width: 25px;
    height: 25px;
    margin-right: 20px;
  }
  .settings-icon img {
    width: 100%;
    height: 100%;
  }
  .settings-menu {
    position: absolute;
    top: 50px;
    right: 0;
    background-color: white;
    width: 300px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    display: none;
  }
</style>
