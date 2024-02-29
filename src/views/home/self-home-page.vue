<template>
  <main class="main">
    <p>Bosh sahifa</p>
    <p>IIV TQD Kiberxavfsizlik markazi balansidagi tovar moddiy boyliklari</p>
    <div class="admin__home">
      <div class="home__item">
        <img src="@/assets/printers.jpg" alt="Rasm" />
        <div class="price__title">
          <h3>Printerlar 2 ta</h3>
          <div>
            <el-icon class="sss"><WalletFilled /></el-icon> 4 200 000 so'm
          </div>
        </div>
      </div>

      <div class="home__item">
        <img src="@/assets/panel.jpg" alt="Rasm" />
        <div class="price__title">
          <h3>Interaktiv panellar 1 ta</h3>
          <div>
            <el-icon class="sss"><WalletFilled /></el-icon> 35 825 440 so'm
          </div>
        </div>
      </div>
    </div>

    <div class="admin__home">
      <div class="home__item">
        <img src="@/assets/laptop.jpg" alt="Rasm" />
        <div class="price__title">
          <h3>Kompyuterlar 4 dona</h3>
          <div>
            <el-icon class="sss"><WalletFilled /></el-icon> 68 710 260 so'm
          </div>
        </div>
      </div>

      <div class="home__item">
        <img src="@/assets/android.png" alt="Rasm" />
        <div class="price__title">
          <h3>Mobil aloqa vositalari 2 ta</h3>
          <div>
            <el-icon class="sss"><WalletFilled /></el-icon> 23 510 060 so'm
          </div>
        </div>
      </div>
    </div>

    <div class="admin__home">
      <div class="home__item">
        <img src="@/assets/phone.jpg" alt="Rasm" />
        <div class="price__title">
          <h3>Aloqa vositalari 4 dona</h3>
          <div>
            <el-icon class="sss"><WalletFilled /></el-icon> 2 140 030 so'm
          </div>
        </div>
      </div>

      <div class="home__item">
        <img src="@/assets/equepment.jpg" alt="Rasm" />
        <div class="price__title">
          <h3>Qo'shimcha jihozlar 8 ta</h3>
          <div>
            <el-icon class="sss"><WalletFilled /></el-icon> 17 930 000 so'm
          </div>
        </div>
      </div>
    </div>

    <div class="admin__home">
      <div class="home__item">
        <img src="@/assets/work__room.png" alt="Rasm" />
        <div class="price__title">
          <h3>Xizmat xonasi jihozlari 12 dona</h3>
          <div>
            <el-icon class="sss"><WalletFilled /></el-icon> 14 540 089 so'm
          </div>
        </div>
      </div>

      <div class="home__item">
        <img src="@/assets/seyf.jpg" alt="Rasm" />
        <div class="price__title">
          <h3>Seyflar 2 ta</h3>
          <div>
            <el-icon class="sss"><WalletFilled /></el-icon> 1 286 000 so'm
          </div>
        </div>
      </div>
    </div>

    <div class="admin__home">
      <div class="home__item">
        <img src="@/assets/tv.jpg" alt="Rasm" />
        <div class="price__title">
          <h3>Televizorlar 1 dona</h3>
          <div>
            <el-icon class="sss"><WalletFilled /></el-icon> 7 820 000 so'm
          </div>
        </div>
      </div>

      <div class="home__item">
        <img src="@/assets/list.jpg" alt="Rasm" />
        <div class="price__title">
          <h3>TMB ning umumiy qiymati 36</h3>
          <div>
            <el-icon class="sss"><WalletFilled /></el-icon> 1 382 120 000 so'm
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
<script></script>
<style lang="scss" scoped>
p {
  font-size: 22px;
}
.admin__home {
  width: 65%;
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
}
.sss {
  color: green;
}
.home__item {
  box-sizing: border-box;
  border-radius: 10px 0;
  padding: 8px 0 8px 0;
  width: 43%;
  display: flex;
  gap: 10px;
  transition: all 0.3s;
  border: 1px solid rgba(0, 0, 0, 0.233);
  img {
    width: 22%;
    border-radius: 25% 5%;
    margin-left: 10px;
    -webkit-box-shadow: 0px 0px 9px -2px rgba(0, 0, 0, 0.29);
    -moz-box-shadow: 0px 0px 9px -2px rgba(0, 0, 0, 0.29);
    box-shadow: 0px 0px 9px -2px rgba(0, 0, 0, 0.29);
  }
}
.home__item:hover {
  width: 44%;
}
.price__title {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
</style>
