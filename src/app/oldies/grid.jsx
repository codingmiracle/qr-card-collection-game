import { exec } from "child_process"
import { Component } from "react"

function ImageGridItem({ image }) {
    const style = {
      gridColumnEnd: `span ${getSpanEstimate(image.width)}`,
      gridRowEnd: `span ${getSpanEstimate(image.height)}`,
    }
  
    return <img style={style} src={image.url} alt={image.alt} />
  }
  
  function getSpanEstimate(size) {
    if (size > 250) {
      return 2
    }
  
    return 1
  }


  export function ImageGridItem()
  {
    
  }