import axios from 'axios';

export const api = axios.create({
    baseURL: 'https://api.jsonbin.io/v3/b/6433bd77ace6f33a22081fd3',
    headers: {
      "X-Master-Key" : "$2b$10$WjPAJ6CjsV9RT95B.e5L2OkiYzyfQUb7wVaCNXYma4/clStz4PZD6",
      "X-ACCESS-KEY" : "$2b$10$2Vp.W99lV1NDZ/1Q6dxEfeNEUdKtG11KvVQ4zZdfTB1RfuoMusuGG"
    }
})