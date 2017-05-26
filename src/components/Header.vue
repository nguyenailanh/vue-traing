<template>
<header class="header">
  <a href="#" target="_blank" title="home">
    <img class="header-logo" src="../assets/image/logo.png" alt="nissan logo">
  </a>

  <h1 class="header-title">
    <a href="#" target="_blank">NOUVELLE NISSAN MICRA</a>
  </h1>

  <div class="header-right">
    <select class="header-dropdown">
      <option value="EXPLORATEUR 3D">EXPLORATEUR 3D</option>
      <option value="EXPLORATEUR 3D">EXPLORATEUR 3D</option>
    </select>
  </div>
</header>
</template>

<style lang="scss" scoped>
.header {
  position: relative;
  height: 4.9em;
  padding-left: 12%;
  padding-right: 6%;
  background: white;

  &-logo {
    position: absolute;
    left: 1.5%;
    width: 10%;
    z-index: 1;

  }

  &-title {
    display: inline-block;
    padding-left: 3%;
    font-size: 2.32em;
    line-height: 2.1;
    a {
      text-decoration: none;
      color: inherit;
    }
    &:before {
      content: '\e622';
      margin-right: .3em;
      vertical-align: middle;
      font-family: 'icon-Nissan-Global';
      font-size: .9em;
      color: #c3002f;
    }
  }

  &-right {
    position: absolute;
    right: 3.2%;
    top: 50%;
    transform: translateY(-50%);
    &:after {
      content: "\e610";
      position: absolute;
      top: 50%;
      right: 2px;
      font-size: 1.6em;
      font-family: 'icon-Nissan-Global';
      color: #c3002f;
      pointer-events: none;
      -webkit-transform: translateY(-50%);
      transform: translateY(-50%);
    }
  }

  &-dropdown {
    border: 0;
    padding-right: 1.5em;
    font-family: inherit;
    font-size: 1.86em;
    -webkit-appearance: none;
    &:focus {
      outline: none;
    }
  }
}
</style>
