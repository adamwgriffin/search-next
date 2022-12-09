const ContainerDivStyles = {
  position: 'absolute',
  top: '0',
  left: '0',
  transform: 'translate(-50%, -100%)'
}

// we're wrapping the Popup class in this lazyLoadPopup function because the google.maps.OverlayView class it inherits
// from will not be loaded when the class is imported normally. if google is not loaded then the compiler throws an
// error and we can't proceed further. importing then calling the lazyLoadPopup function instead allows prevents the
// Popup class from being evaluated immediately so we can check if google is loaded before calling `Popup =
// lazyLoadPopup()`.
export const lazyLoadPopup = () => {

  return class Popup extends google.maps.OverlayView {
    // position will normally be the lat/lng coordinates of the listing/marker
    position: google.maps.LatLng
    containerDiv: HTMLDivElement
  
    constructor(position: google.maps.LatLng, containerDiv: HTMLDivElement) {
      super()
      this.position = position
      this.containerDiv = containerDiv
      Object.assign(this.containerDiv.style, ContainerDivStyles)
      // optionally stop clicks, etc., from bubbling up to the map
      Popup.preventMapHitsAndGesturesFrom(this.containerDiv)
    }
  
    onAdd() {
      // "floatPane" is one of several MapPanes that we can attach our OverlayView to. it contains the info window. It
      // is above all map overlays.
      this.getPanes()!.floatPane.appendChild(this.containerDiv)
    }
  
    onRemove() {
      if (this.containerDiv.parentElement) {
        this.containerDiv.parentElement.removeChild(this.containerDiv)
      }
    }
  
    // called each frame when the popup needs to draw itself
    draw() {
      // fromLatLngToDivPixel() computes the pixel coordinates of the given geographical location in the DOM element
      // that holds the draggable map. we can use these coordinates to make the containerDiv show up where the
      // ListingMarker appears on the map by setting the left/top styles. this works because containerDiv's style has
      // been set to position: absolute above.
      const divPosition = this.getProjection().fromLatLngToDivPixel(this.position)!
      this.containerDiv.style.left = `${divPosition.x}px`
      this.containerDiv.style.top = `${divPosition.y - 30}px`
    }
  }

}
