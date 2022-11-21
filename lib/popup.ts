class Popup extends google.maps.OverlayView {
  position: google.maps.LatLng
  containerDiv: HTMLDivElement

  constructor(position: google.maps.LatLng, containerDiv: HTMLDivElement) {
    super()
    this.position = position
    this.containerDiv = containerDiv
    // Optionally stop clicks, etc., from bubbling up to the map.
    Popup.preventMapHitsAndGesturesFrom(this.containerDiv)
  }

  onAdd() {
    // floatPane is one of several MapPanes that can be used. it contains the info window. It is above all map overlays.
    this.getPanes()!.floatPane.appendChild(this.containerDiv)
  }

  onRemove() {
    if (this.containerDiv.parentElement) {
      this.containerDiv.parentElement.removeChild(this.containerDiv)
    }
  }

  hide() {
    this.containerDiv.style.display = 'none'
  }

  show() {
    this.containerDiv.style.display = 'block'
  }

}

export default Popup
