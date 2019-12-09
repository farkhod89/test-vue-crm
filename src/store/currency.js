export default {
  actions: {
    async fetchCurrency() {
      const key = process.env.VUE_APP_FIXER;
      let response = await fetch(`http://fixer.local/latest.json?access_key=${key}&v=1`);
      return await response.json();
    },
  }
}
