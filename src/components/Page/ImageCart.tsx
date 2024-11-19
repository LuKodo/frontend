import { createEffect, createSignal } from "solid-js";
import { getImage } from "../../shared/utils/checkImage";
import { TipoImagen } from "../../admin/domain/entities/TipoImagenEnum";
import { UnLazyImage } from "@unlazy/solid";

const ImageCart = ({ imageName }: { imageName: string }) => {
  const [imagePath, setImagePath] = createSignal('');

  createEffect(() => {
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
    <UnLazyImage
      alt={imagePath() || 'Product Image'}
      width="50"
      height="50"
      srcSet={imagePath()}
    />
  );
};

export default ImageCart;
