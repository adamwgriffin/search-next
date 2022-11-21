var Popup = function () {

  var Popup = function(position, containerDiv) {
    this.position = position
    this.containerDiv = containerDiv
    const containerDivStyles = {
      position: 'absolute',
      top: '0',
      left: '0',
      transform: 'translate(-50%, -100%)'
    }
    Object.assign(this.containerDiv.style, containerDivStyles)
    google.maps.OverlayView.preventMapHitsAndGesturesFrom(this.containerDiv)
  }
  
  Popup.prototype = new google.maps.OverlayView()
  
  Popup.prototype.onAdd = function () {
    // floatPane is one of several MapPanes that can be used. it contains the info window. It is above all map overlays.
    this.getPanes().floatPane.appendChild(this.containerDiv)
  }
  
  Popup.prototype.onRemove = function () {
    if (this.containerDiv.parentElement) {
      this.containerDiv.parentElement.removeChild(this.containerDiv)
    }
  }

  Popup.prototype.hide = function () {
    this.containerDiv.style.display = 'none'
  }

  Popup.prototype.show = function() {
    this.containerDiv.style.display = 'block'
  }

  Popup.prototype.draw = function () {
    const divPosition = this.getProjection().fromLatLngToDivPixel(this.position)
    this.containerDiv.style.left = divPosition.x + "px"
    this.containerDiv.style.top = divPosition.y - 18 + "px"
  }

  return Popup
}

export default Popup
