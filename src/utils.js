/* eslint-disable no-undef */

export const request = (apiFunctionName, payload = {}) => {
  return new Promise((resolve, reject) => {
    google.script.run
      .withSuccessHandler((res) => {
        resolve(res)
      })
      .withFailureHandler((err) => reject(err))
      [apiFunctionName](payload)
  })
}
