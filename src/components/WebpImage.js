import React from 'react'

class WebpImage extends React.Component {
  render() {
    const { src, alt, webpSrc } = this.props
    return (
      <picture>
        <source type="image/webp" srcset={webpSrc} />
        <img src={src} alt={alt} />
      </picture>
    )
  }
}

export default WebpImage
