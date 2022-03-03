import ReactCrop from "react-image-crop";
import * as React from "react";
import {forwardRef, Ref, useEffect, useState} from "react";
import apiServices from "../../../services/apiServices";
import SaveIcon from '@mui/icons-material/Save';
import {Button} from "@mui/material";
import {useDispatch} from "react-redux";
import {setUserImagePath} from "../../../redux/actions";
import Resizer from "react-image-file-resizer";

interface imgBlob extends Blob {
  lastModifiedDate?: Date,
  name?: string
}

// eslint-disable-next-line react/display-name
export const Crop = forwardRef(
  (
    {
      image,
      id,
      setFile,
      inputRef
    }: {
      image: File | null,
      id: string,
      setFile: Function ,
      inputRef: Ref<any>
    }, ref) => {
  const dispatch = useDispatch();
  const { uploadImage } = apiServices();
  const [crop, setCrop] = useState<any>({
    unit: '%',
    width: 100,
    aspect: 1
  })
  const [src, setSrc] = useState<string>('');
  const [imageRef, setImageRef] = useState('');
  const [blob, setBlob] = useState<imgBlob>();
  const [croppedImageUrl, setCroppedImageUrl] = useState<string | unknown>('');

  useEffect(() => {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
        if (typeof reader.result === 'string') {
          setSrc(reader.result)
        } else {
          console.error( `Type error on setSrc. render.result: ${reader.result}`)
        }
      }

    );
    if (image) {
      reader.readAsDataURL(image);
    }
  }, [image])

  useEffect(() => {
    makeClientCrop(crop);
  }, [crop])

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
    if (ctx === null) {
      console.error('ctx is null');
      return
    }
    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx.imageSmoothingQuality = 'high';
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
        (blob: imgBlob | null) => {
          if (!blob) {
            console.error('Canvas is empty');
            return;
          }
          blob.name = fileName;
          setBlob(blob);
          const fileUrl = window.URL.createObjectURL(blob);
          resolve(fileUrl);
        },
        'image/jpeg',
        1
      );
    });
  }

  const resizeFile = (file: any): Promise<File> =>
    new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        200,
        200,
        "JPEG",
        80,
        0,
        (uri) => {
          // @ts-ignore
          resolve(uri);
        },
        "file"
      );
    });

  const blobToFile = async (theBlob: imgBlob, fileName: string) => {
    theBlob.lastModifiedDate = new Date();
    theBlob.name = fileName;
    return await resizeFile(theBlob);
  }

  const onClickSave = async (id: string) => {
    if (blob) {
      const file = await blobToFile(blob, 'image.png');
      const res = await uploadImage(file, id);
      dispatch(setUserImagePath(res.data.path));
      setFile(null);
      if (inputRef !== null && typeof inputRef === 'object') {
        inputRef.current.value = '';
      }
    }
  }

  return (
    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '100px'}}>
        <ReactCrop
          style={{width: '50vh'}}
          src={src}
          crop={crop}
          ruleOfThirds
          onImageLoaded={onImageLoaded}
          onChange={onCropChange}
        />
        {/*<img alt="Crop" style={{ maxWidth: '100%' }} src={croppedImageUrl} />*/}
      <Button
        sx={{marginTop: '50px'}}
        variant="contained"
        onClick={() => onClickSave(id)}
      >
        <SaveIcon />
      </Button>
    </div>
  )
})