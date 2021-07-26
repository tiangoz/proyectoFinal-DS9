class Footer extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = `
        <style>
        * {
        box-sizing: border-box;
      }
      
      body {
        padding: 0;
        margin: 0;
        font-family: "Rubik", sans-serif;
      }
      
      strong {
        padding: 0;
        margin: 0;
      }
      
      label,
      a {
        text-decoration: none;
        color: #555;
      }
      
      ul {
        list-style: none;
        padding: 0;
      }
      
      header {
        box-shadow: 2px 9px 49px -17px rgba(0, 0, 0, 0.3);
        position: sticky;
        top: 0;
        width: 100%;
        z-index: 10;
      }
      
      .header-content-top {
        background: #545bc4;
        height: 30px;
        width: 100%;
      }
      .header-content-top .content {
        align-items: center;
        display: flex;
        height: 30px;
        justify-content: flex-end;
        margin: 0 auto;
        max-width: 1300px;
        width: 100%;
      }
      .header-content-top .content span {
        color: #fff;
        font-size: 12px;
        margin: 0 15px;
      }
      .header-content-top .content span .fas {
        margin-right: 5px;
      }
      
      .container {
        align-items: center;
        display: flex;
        height: 70px;
        justify-content: space-between;
        margin: 0 auto;
        max-width: 1300px;
        padding: 0 15px;
        position: relative;
        width: 100%;
      }
      .container .logo {
        color: #545bc4;
        font-size: 40px;
        line-height: 20px;
        padding-right: 15px;
      }
      .container .open-search {
        border-radius: 3px;
        flex: auto;
        margin: 0 15px;
        overflow: hidden;
        position: relative;
      }
      @media (max-width: 991px) {
        .container .open-search {
          margin: 0;
          position: static;
          text-align: right;
        }
      }
      .container .open-search .fa-search {
        display: none;
      }
      @media (max-width: 991px) {
        .container .open-search .fa-search {
          display: block;
        }
      }
      .container .open-search .input-open-search {
        display: none;
      }
      .container .open-search .input-open-search:checked ~ .search {
        display: block;
      }
      @media (max-width: 991px) {
        .container .search {
          display: none;
          position: absolute;
          left: 0;
          top: 70px;
          width: 100%;
          z-index: 999;
        }
      }
      .container .search .input-search {
        border-radius: 3px;
        border: 1px solid #e1e1e1;
        height: 40px;
        padding: 0 70px 0 15px;
        width: 100%;
        background: white no-repeat;
        transition: 100ms all linear 0s;
        background-image: linear-gradient(to bottom, rgba(77, 97, 252, 0.63) 0%, #4d61fc 90%), linear-gradient(to bottom, #e1e1e1, #e1e1e1);
        background-size: 0 2px, 100% 1px;
        background-position: 50% 100%, 50% 100%;
        transition: background-size 0.3s cubic-bezier(0.64, 0.09, 0.08, 1);
      }
      .container .search .input-search:focus {
        background-size: 100% 2px, 100% 1px;
        outline: none;
      }
      .container .search .button-search {
        background: #545bc4;
        border: 0;
        color: #fff;
        cursor: pointer;
        padding: 13px 20px;
        position: absolute;
        right: 0px;
        top: 0px;
      }
      .container .search .button-search .fa-search {
        display: block;
      }
      .container .nav-content .nav-content-list {
        align-items: center;
        display: flex;
        justify-content: space-between;
        padding: 0 15px;
      }
      .container .nav-content .nav-content-list .nav-content-item {
        align-items: center;
        display: flex;
        height: 40px;
        margin: 0 5px;
        position: relative;
        transition: 100ms all linear 0s;
      }
      @media (max-width: 991px) {
        .container .nav-content .nav-content-list .nav-content-item {
          padding: 0 5px;
        }
      }
      .container .nav-content .nav-content-list .nav-content-item .item-arrow {
        margin-left: 5px;
        position: relative;
        top: -3px;
      }
      @media (max-width: 768px) {
        .container .nav-content .nav-content-list .nav-content-item .item-arrow {
          display: none;
        }
      }
      .container .nav-content .nav-content-list .nav-content-item .open-menu-login-account {
        align-items: center;
        cursor: pointer;
        display: flex;
        position: relative;
      }
      .container .nav-content .nav-content-list .nav-content-item .input-menu {
        display: none;
      }
      .container .nav-content .nav-content-list .nav-content-item .input-menu:checked ~ .login-list {
        display: block;
      }
      .container .nav-content .nav-content-list .nav-content-item .login-list {
        background: #fff;
        border-bottom: 3px solid #545bc4;
        border-radius: 3px;
        box-shadow: 2px 9px 49px -17px rgba(0, 0, 0, 0.3);
        display: none;
        overflow: hidden;
        position: absolute;
        right: 0;
        top: 28px;
        transition: 100ms all linear 0s;
        width: 200px;
        z-index: 10;
      }
      .container .nav-content .nav-content-list .nav-content-item .login-list .login-list-item {
        padding: 15px 20px;
      }
      .container .nav-content .nav-content-list .nav-content-item .login-list .login-list-item:hover {
        background: #545bc4;
      }
      .container .nav-content .nav-content-list .nav-content-item .login-list .login-list-item:hover a {
        color: #fff;
      }
      .container .nav-content .nav-content-list .nav-content-item:nth-child(2):hover .fas {
        color: #e74c3c;
      }
      .container .nav-content .nav-content-list .nav-content-item:hover .fas {
        color: #545bc4;
      }
      .container .nav-content .nav-content-list .account-login .login-text {
        align-items: end;
        display: flex;
        flex-direction: column;
        font-size: 12px;
        margin-left: 5px;
      }
      @media (max-width: 991px) {
        .container .nav-content .nav-content-list .account-login .login-text {
          display: none;
        }
      }
      .container .nav-content .nav-content-list .account-login .login-text strong {
        display: block;
      }
      .container .nav-content .nav-content-list .nav-content-link {
        border-radius: 3px;
        font-size: 19px;
        padding: 10px 15px;
        transition: 100ms all linear 0s;
      }
      @media (max-width: 991px) {
        .container .nav-content .nav-content-list .nav-content-link {
          padding: 0;
        }
      }
      
      .nav-container {
        align-items: center;
        display: flex;
        margin: 0 auto;
        max-width: 1300px;
        width: 100%;
      }
      .nav-container .nav-row {
        align-items: center;
        display: flex;
        height: 40px;
        justify-content: space-between;
        margin: 0;
        padding: 0;
      }
      @media (max-width: 991px) {
        .nav-container .nav-row {
          display: none;
        }
      }
      .nav-container .nav-row .nav-row-list {
        flex: auto;
      }
      .nav-container .nav-row .nav-row-list .nav-row-list-link {
        align-items: center;
        display: flex;
        height: 40px;
        justify-content: center;
        transition: 100ms all linear 0s;
      }
      .nav-container .nav-row .nav-row-list .nav-row-list-link:hover {
        background: #e1e1e1;
        width: 100%;
      }
      .nav-container .featured-category {
        flex: auto;
        margin: 0 15px 0 0;
      }
      @media (max-width: 991px) {
        .nav-container .featured-category {
          display: none;
        }
      }
      .nav-container .all-navigator {
        align-items: center;
        background: #545bc4;
        color: #fff;
        display: flex;
        height: 40px;
        padding: 0 25px;
        width: 100%;
      }
      @media (max-width: 991px) {
        .nav-container .all-navigator {
          margin-right: 0;
        }
      }
      .nav-container .all-navigator .fa-angle-up,
      .nav-container .all-navigator .fa-angle-down {
        position: absolute;
        right: 25px;
      }
      .nav-container .all-navigator .fa-angle-up {
        display: none;
      }
      .nav-container .all-navigator .fas {
        font-size: 16px;
        margin-right: 0;
      }
      .nav-container .all-navigator span {
        margin-left: 15px;
      }
      .nav-container .all-category-nav {
        cursor: pointer;
        max-width: 300px;
        position: relative;
        width: 100%;
      }
      @media (max-width: 991px) {
        .nav-container .all-category-nav {
          max-width: 100%;
        }
      }
      .nav-container .all-category-nav .open-menu-all {
        align-items: center;
        cursor: pointer;
        display: flex;
        position: relative;
      }
      .nav-container .all-category-nav .input-menu-all {
        display: none;
      }
      .nav-container .all-category-nav .input-menu-all:checked ~ .all-category-list {
        display: block;
      }
      .nav-container .all-category-nav .input-menu-all:checked + .all-navigator .fa-angle-down {
        display: none;
      }
      .nav-container .all-category-nav .input-menu-all:checked + .all-navigator .fa-angle-up {
        display: block;
      }
      .nav-container .all-category-list {
        background: #fff;
        border-bottom: 3px solid #545bc4;
        box-shadow: 2px 9px 49px -17px rgba(0, 0, 0, 0.3);
        display: none;
        height: auto;
        min-height: 300px;
        padding: 15px 0;
        position: absolute;
        top: 24px;
        width: 300px;
        z-index: 90;
      }
      @media (max-width: 991px) {
        .nav-container .all-category-list {
          min-width: 100%;
        }
      }
      .nav-container .all-category-list-item:hover {
        display: block;
        background: #545bc4;
      }
      .nav-container .all-category-list-item:hover .category-second-list {
        left: 100%;
        opacity: 1;
        visibility: visible;
      }
      .nav-container .all-category-list-item:hover .all-category-list-link {
        color: #fff;
      }
      .nav-container .all-category-list-link {
        align-items: center;
        display: flex;
        justify-content: space-between;
        padding: 15px;
        transition: 100ms all linear 0s;
      }
      .nav-container .category-second-list {
        background: #fff;
        border-bottom: 3px solid #545bc4;
        box-shadow: inset 44px -1px 88px -59px rgba(0, 0, 0, 0.37);
        display: flex;
        height: 322px;
        left: 80%;
        min-height: 297px;
        min-width: 400px;
        opacity: 0;
        position: absolute;
        top: 0;
        transition: 100ms all linear 0s;
        visibility: hidden;
        width: auto;
      }
      @media (max-width: 991px) {
        .nav-container .category-second-list {
          display: none;
        }
      }
      .nav-container .category-second-list .img-product-menu img {
        max-width: 180px;
      }
      .nav-container .category-second-list-ul {
        display: flex;
        flex-direction: column;
        min-width: 400px;
        padding: 0 15px;
      }
      .nav-container .category-second-item a {
        align-items: center;
        display: flex;
        justify-content: space-between;
        padding: 15px;
      }
      .nav-container .category-second-item:hover {
        background: #545bc4;
      }
      .nav-container .category-second-item:hover a {
        color: #fff;
      }
      
      .fa-bars {
        font-size: 28px;
      }
        </style>
        <header>
  <!-- contact content -->
  <div class="header-content-top">
    <div class="content">
      <span><i class="fas fa-phone-square-alt"></i> (00)0000-0000</span>
      <span><i class="fas fa-envelope-square"></i>email@email.com.br</span>
    </div>
  </div>
  <!-- / contact content -->
  <div class="container">
    <!-- logo -->
    <strong class="logo"><i class="fas fa-heart"></i></strong>
    <!-- open nav mobile -->

    <!--search -->
    <label class="open-search" for="open-search">
      <i class="fas fa-search"></i>
      <input class="input-open-search" id="open-search" type="checkbox" name="menu" />
      <div class="search">
        <button class="button-search"><i class="fas fa-search"></i></button>
        <input type="text" placeholder="What are you looking for?" class="input-search" />
      </div>
    </label>
    <!-- // search -->
    <nav class="nav-content">
      <!-- nav -->
      <ul class="nav-content-list">
        <li class="nav-content-item account-login">
          <label class="open-menu-login-account" for="open-menu-login-account">

            <input class="input-menu" id="open-menu-login-account" type="checkbox" name="menu" />

            <i class="fas fa-user-circle"></i><span class="login-text">Hello, Sign in <strong>Create Account</strong></span> <span class="item-arrow"></span>

            <!-- submenu -->
            <ul class="login-list">
              <li class="login-list-item"><a href="https://www.cupcom.com.br/">My account</a></li>
              <li class="login-list-item"><a href="https://www.cupcom.com.br/">Create account</a></li>
              <li class="login-list-item"><a href="https://www.cupcom.com.br/">logout</a></li>
          </label>
      </ul>
      </li>
      <li class="nav-content-item"><a class="nav-content-link" href="https://www.cupcom.com.br/"><i class="fas fa-heart"></i></a></li>
      <li class="nav-content-item"><a class="nav-content-link" href="https://www.cupcom.com.br/"><i class="fas fa-shopping-cart"></i></a></li>
      <!-- call to action -->
      </ul>
    </nav>
  </div>
  <!-- nav navigation commerce -->
  <div class="nav-container">
    <nav class="all-category-nav">
      <label class="open-menu-all" for="open-menu-all">
        <input class="input-menu-all" id="open-menu-all" type="checkbox" name="menu-open" />
        <span class="all-navigator"><i class="fas fa-bars"></i> <span>All category</span> <i class="fas fa-angle-down"></i>
          <i class="fas fa-angle-up"></i>
        </span>

        <ul class="all-category-list">
          <li class="all-category-list-item"><a href="https://www.cupcom.com.br/" class="all-category-list-link">Smartphones<i class="fas fa-angle-right"></i></a>
            <div class="category-second-list">
              <ul class="category-second-list-ul">
                <li class="category-second-item"><a href="https://www.cupcom.com.br/">Iphone 10</a></li>
                <li class="category-second-item"><a href="https://www.cupcom.com.br/">Galaxy Note 10</a></li>
                <li class="category-second-item"><a href="https://www.cupcom.com.br/">Motorola One </a></li>
                <li class="category-second-item"><a href="https://www.cupcom.com.br/">Galaxy A80 </a></li>
                <li class="category-second-item"><a href="https://www.cupcom.com.br/">Galaxy M </a></li>
                <li class="category-second-item"><a href="https://www.cupcom.com.br/">Huaway P30 </a></li>
              </ul>

              <div class="img-product-menu"><img src="https://i.ibb.co/Vvndkmy/banner.jpg"></div>
            </div>
          </li>
          <li class="all-category-list-item"><a href="https://www.cupcom.com.br/" class="all-category-list-link">Furniture <i class="fas fa-angle-right"></i></a></li>
          <li class="all-category-list-item"><a href="https://www.cupcom.com.br/" class="all-category-list-link">Toys<i class="fas fa-angle-right"></i></a></li>
          <li class="all-category-list-item"><a href="https://www.cupcom.com.br/" class="all-category-list-link">Computing<i class="fas fa-angle-right"></i></a></li>
          <li class="all-category-list-item"><a href="https://www.cupcom.com.br/" class="all-category-list-link">Games<i class="fas fa-angle-right"></i></a></li>
          <li class="all-category-list-item"><a href="" class="all-category-list-link">Automotive<i class="fas fa-angle-right"></i></a></li>

        </ul>
      </label>

    </nav>
    <nav class="featured-category">
      <ul class="nav-row">
        <li class="nav-row-list"><a href="https://www.cupcom.com.br/" class="nav-row-list-link">Smartphones</a></li>
        <li class="nav-row-list"><a href="https://www.cupcom.com.br/" class="nav-row-list-link">furniture</a></li>
        <li class="nav-row-list"><a href="https://www.cupcom.com.br/" class="nav-row-list-link">Toys</a></li>
        <li class="nav-row-list"><a href="https://www.cupcom.com.br/" class="nav-row-list-link">Computing</a></li>
        <li class="nav-row-list"><a href="https://www.cupcom.com.br/" class="nav-row-list-link">Games</a></li>
        <li class="nav-row-list"><a href="https://www.cupcom.com.br/" class="nav-row-list-link">Automotive</a></li>
      </ul>
    </nav>
  </div>
</header>
      `;
    }
}

customElements.define('footer-component', Footer);