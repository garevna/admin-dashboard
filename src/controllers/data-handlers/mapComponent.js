export const mapComponent = (
  function () {
    let component = null
    return function (value) {
      if (value) { component = value } else return component
    }
  }
)()
