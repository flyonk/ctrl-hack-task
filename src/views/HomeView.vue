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
    <h3>Измененные данные:</h3>
    <div v-if="infoBlock" class="info-block">
      <div v-for="(data, index) in infoBlock" :key="index">
        <div v-html="data"></div>
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
        lastServerResponse: null,
        product: {
          price: 0,
          amount: 0,
          sum: 0,
        },
        infoBlock: [],
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
        const productData = {nonce: this.nonce, ...this.product}

        if (this.product.amount % 2 === 1) {
          this.lastServerResponse = {success: false}
          this.infoBlock.unshift(`
          <p>Попытка отправить данные: </p>
          <small>
           ${JSON.stringify(productData).trim()}
          </small>
          `)
          this.infoBlock.unshift(`
          <p style="color: red">
            Ошибка при запросе на сервер. Amount должен быть чётным числом: статус {success: false}
          </p>
          `)
          return
        }

        this.nonce++

        let beforeSendData = JSON.stringify(
          window.localStorage.getItem("product")
        )

        if (!!beforeSendData) beforeSendData = "данных не было"

        let infoData = `
        <div class="before">
          <p>Данные отправленные на сервер:</p>
          <small>${JSON.stringify(productData)}</small>
        </div>
        <p style="color: green">
          Успешный ответ с сервера. Статус: {success: true}
        </p>
        <div class="after">
          <p>Было на сервере до отправки данных:</p>
          <small>${beforeSendData}</small>
        </div>
        
        `
        this.infoBlock.unshift(infoData)

        setTimeout(() => {
          window.localStorage.setItem("product", JSON.stringify(productData))
          this.lastServerResponse = {success: true}
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
          for (const i in newVal) {
            if (newVal[i] !== oldVal[i]) {
              this.infoBlock.unshift(
                `<p>Значение в ${i} инпуте изменилось с ${oldVal[i]} на ${newVal[i]}</p>`
              )
            }
          }
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

  .info-block {
    max-height: 600px;
    overflow-y: scroll;
  }
</style>
