import React from 'react'

const AssetLibrary = () => {
  return (
      <div>
        <label htmlFor="file-upload">Upload an image:</label>
        <input name="file-upload" type="file" accept="image/png, image/jpeg" />
      </div>
  )
}

export default AssetLibrary
