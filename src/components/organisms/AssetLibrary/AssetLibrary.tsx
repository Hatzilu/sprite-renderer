import React from "react";
import { Assets } from "pixi.js";
import { extend } from "@pixi/react";
import useIndexedDB from "../../../api/indexedDB";

await Assets.init({});

// extend({Assets});

// const texture = await Assets.load("path/to/hero.png");
const AssetLibrary = () => {

  const db = useIndexedDB();
  // db.
  console.log({db});
  
  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file?.name) return;
    const data = await file?.bytes();

    // Assets.add("balls", )
    if (!file) {
      console.error("No file selected");
      return;
    }
    
    const request = db.addItem({assetName: file.name, data})
    if (!request) return;
    request.onsuccess = () => {
      console.log(db.getItem(file.name));
    }
    request.onerror = () => {
      console.error("FUCK");
    }
    
    
    //   const reader = new FileReader();
    //   reader.onload = (e) => {
    //     const image = new Image();
    //     image.onload = (onload) => {
    //       Assets.load('')

    // };
  };
  return (
    <div className="assetsLibrary">
      <h1>assets</h1>

      <label htmlFor="file-upload">aids</label>
      <input
        onChange={handleFileChange}
        type="file"
        accept="image/png, image/jpeg"
        name="file-upload"
      />
    </div>
  );
};

export default AssetLibrary;
