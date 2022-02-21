import ReactCrop from "react-image-crop";
import * as React from "react";
import {forwardRef, useEffect, useRef, useState} from "react";
import apiServices from "../../services/apiServices";
import SaveIcon from '@mui/icons-material/Save';
import {Button} from "@mui/material";

// eslint-disable-next-line react/display-name
export const Crop = forwardRef(({ image, id }: { image: any, id: string }, ref) => {
  const { uploadImage } = apiServices();
  const [crop, setCrop] = useState({
    unit: '%',
    width: 100,
    aspect: 1
  })
  const [src, setSrc] = useState<string>('')
  const [imageRef, setImageRef] = useState('');
  const [blob, setBlob] = useState();
  const [croppedImageUrl, setCroppedImageUrl] = useState<string | unknown>('');

  useEffect(() => {
    const reader = new FileReader();
    reader.addEventListener('load', () =>
      setSrc(reader.result)
    );
    reader.readAsDataURL(image);
  }, [image])

  const onCropComplete = (crop: any) => {
    makeClientCrop(crop);
  };

  const onCropChange = (crop: any) => {
    setCrop(crop);
  };

  const onImageLoaded = (image: any) => {
    setImageRef(image);
  };

  const makeClientCrop = async (crop: any) => {
    if (imageRef && crop.width && crop.height) {
      const croppedImageUrl = await getCroppedImg(
        imageRef,
        crop,
        'newAvatar.jpeg'
      );
      setCroppedImageUrl(croppedImageUrl);
    }
  }

  const getCroppedImg = (image: any, crop: any, fileName: string) => {
    const canvas = document.createElement('canvas');
    const pixelRatio = window.devicePixelRatio;
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    const ctx = canvas.getContext('2d');

    canvas.width = crop.width * pixelRatio * scaleX;
    canvas.height = crop.height * pixelRatio * scaleY;

    // @ts-ignore
    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    // @ts-ignore
    ctx.imageSmoothingQuality = 'high';
    // @ts-ignore
    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width * scaleX,
      crop.height * scaleY
    );

    return new Promise((resolve, reject) => {
      canvas.toBlob(
        (blob) => {
          if (!blob) {
            //reject(new Error('Canvas is empty'));
            console.error('Canvas is empty');
            return;
          }
          // @ts-ignore
          blob.name = fileName;
          setBlob(blob);
          // @ts-ignore
          const fileUrl = window.URL.createObjectURL(blob);
          // @ts-ignore
          resolve(fileUrl);
        },
        'image/jpeg',
        1
      );
    });
  }

  function blobToFile(theBlob, fileName){
    //A Blob() is almost a File() - it's just missing the two properties below which we will add
    theBlob.lastModifiedDate = new Date();
    theBlob.name = fileName;
    return theBlob;
  }

  const onClickSave = (id: string) => {
    uploadImage(blobToFile(blob, 'image.png'), id);
  }

  return (
    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <ReactCrop
          src={src}
          crop={crop}
          ruleOfThirds
          onImageLoaded={onImageLoaded}
          onComplete={onCropComplete}
          onChange={onCropChange}
        />
        <img alt="Crop" style={{ maxWidth: '100%' }} src={croppedImageUrl} />
      <Button
        sx={{marginTop: '50px'}}
        variant="contained"
        onClick={() => onClickSave(croppedImageUrl, id)}
      >
        <SaveIcon />
      </Button>
    </div>
  )
})