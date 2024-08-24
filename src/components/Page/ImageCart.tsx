import { useEffect, useState } from "preact/hooks";
import { getImage } from "@/utils/checkImage";
import { TipoImagen } from "@/interfaces/TipoImagenEnum";

const ImageCart = ({ imageName }: { imageName: string }) => {
  const extensions = ['webp', 'png', 'jpg', 'jpeg'];
  const [imagePath, setImagePath] = useState('');

  useEffect(() => {
    const get = async () => {
      const path = await getImage(extensions, imageName, TipoImagen.PRODUCT);
      if (path) {
        setImagePath(path);
      } else {
        setImagePath('https://placehold.co/50x50/png');
      }
    }

    get();
  }, [imageName]);

  return (
    <img src={imagePath} alt="" style={{ width: '50px', height: '50px' }} />
  );
};

export default ImageCart;
