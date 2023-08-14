<template>
  <div class="home">
    <div class="controls">
      <div class="item">
        <input
          type="text"
          v-model.number="product.price"
          @input="debouncedRecount('price')"
          name="price"
        />
        <p class="description">Цена</p>
      </div>
      <div class="item">
        <input
          type="text"
          v-model.number="product.amount"
          @input="debouncedRecount('amount')"
          name="amount"
        />
        <p class="description">Количество</p>
      </div>
      <div class="item">
        <input
          type="text"
          v-model.number="product.sum"
          @input="debouncedRecount('sum')"
          name="sum"
        />
        <p class="description">Сумма</p>
      </div>
      <div class="item">
        <button class="send-btn" @click="postProductData">Отправить</button>
        <pre class="controls--">{{ labelData }}</pre>
      </div>
    </div>
    <div class="info">
      <h4>
        Блок 9 с всеми данными (они обёрнуты в v-if) так, что для проверки
        попользуйтесь функционалом.
      </h4>
      <div class="inputs-info">
        <p v-if="infoBlockData.oldProduct.price">
          Input price value changed from {{ infoBlockData.oldProduct.price }} to
          {{ product.price }}
        </p>
        <p v-if="infoBlockData.oldProduct.amount">
          Input amount value changed from
          {{ infoBlockData.oldProduct.amount }} to
          {{ product.amount }}
        </p>
        <p v-if="product.sum">
          Input sum value changed from
          {{ infoBlockData.oldProduct.sum || 0 }} to
          {{ product.sum }}
        </p>
      </div>
      <div class="send-data">
        <div class="before" v-if="infoBlockData.oldProductData">
          <p>Было на сервере до отправки данных:</p>
          <pre>{{ infoBlockData.oldProductData }}</pre>
        </div>
        <div class="after" v-if="infoBlockData.newProductData">
          <p>Данные отправленные на сервер:</p>
          <pre>{{ infoBlockData.newProductData }}</pre>
        </div>
      </div>
      <div class="last-reponse" v-if="infoBlockData.lastServerResponse">
        <p>
          Последний статус ответа с сервера:
          {{ infoBlockData.lastServerResponse }}
        </p>
        <p>Последние данные (успешного) ответа с сервера:</p>
        <pre> {{ infoBlockData.newProductData }} </pre>
      </div>
    </div>
  </div>
</template>

<script>
  import _ from "lodash"

  export default {
    name: "HomeView",
    data() {
      return {
        labelData: null,
        nonce: null,
        product: {
          price: 0,
          amount: 0,
          sum: 0,
        },
        infoBlockData: {
          oldProduct: {},
          lastServerResponse: null,
        },
      }
    },
    methods: {
      recountProductData(key) {
        switch (key) {
          case "price":
            this.product.sum = this.product.price * this.product.amount
            break
          case "amount":
            this.product.sum = this.product.price * this.product.amount
            break
          case "sum":
            this.product.amount = this.product.sum / this.product.price
            break
        }
      },
      postProductData() {
        if (this.product.amount % 2 === 1) {
          this.infoBlockData.lastServerResponse = {success: false}
          return
        }

        this.nonce++
        const productData = {nonce: this.nonce, ...this.product}

        this.infoBlockData.oldProductData = this.getProductDataFromServer
        this.infoBlockData.newProductData = productData

        setTimeout(() => {
          window.localStorage.setItem("product", JSON.stringify(productData))
          this.infoBlockData.lastServerResponse = {success: true}
          this.labelData = productData
        }, 1000)
      },
      debouncedRecount: _.debounce(function (key) {
        this.recountProductData(key)
      }, 300),
    },
    beforeMount() {
      this.labelData = this.getProductDataFromServer

      const nonceFromServer =
        this.getProductDataFromServer && this.getProductDataFromServer.nonce
          ? this.getProductDataFromServer.nonce
          : 0
      nonceFromServer ? (this.nonce = nonceFromServer) : (this.nonce = 0)
      this.infoBlockData.oldProductData = this.getProductDataFromServer
    },
    computed: {
      computedProductCopy() {
        return {...this.product}
      },
      getProductDataFromServer() {
        return JSON.parse(window.localStorage.getItem("product"))
      },
    },
    watch: {
      computedProductCopy: {
        handler(newVal, oldVal) {
          this.infoBlockData.oldProduct = oldVal
        },
        deep: true,
      },
    },
  }
</script>

<style lang="css" scoped>
  * {
    text-align: start;
  }
  .controls {
    display: flex;
  }

  .controls .item {
    display: flex;
    flex-direction: column;
    margin-left: 20px;
  }

  .info {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
</style>
