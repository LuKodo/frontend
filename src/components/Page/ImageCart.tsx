import { useEffect, useState } from "preact/hooks";
import { getImage } from "@/utils/checkImage";
import { TipoImagen } from "@/interfaces/TipoImagenEnum";
import { LazyLoadImage } from "react-lazy-load-image-component";

const ImageCart = ({ imageName }: { imageName: string }) => {
  const [imagePath, setImagePath] = useState('');

  useEffect(() => {
    const get = async () => {
      const path = await getImage(imageName, TipoImagen.PRODUCT);
      if (path) {
        setImagePath(path);
      } else {
        setImagePath('https://placehold.co/50x50/png');
      }
    }

    get();
  }, [imageName]);

  return (
    <LazyLoadImage
      alt={imagePath || 'Product Image'}
      width="50"
      height="50"
      src={imagePath}
      effect="opacity"
      wrapperProps={{
        // If you need to, you can tweak the effect transition using the wrapper style.
        style: { transitionDelay: "1s" },
      }}
    />
  );
};

export default ImageCart;
