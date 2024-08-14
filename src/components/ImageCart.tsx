import { useEffect, useState } from "preact/hooks";
import { checkImageExists } from "../utils/checkImage";

const ImageCart = ({ imageName }: { imageName: string }) => {
  const extensions = ['webp', 'png'];
  const [imagePath, setImagePath] = useState('');

  useEffect(() => {
    const get = async () => {
      const path = await checkImageExists(extensions, imageName);
      if (path) {
        setImagePath(path);
      } else {
        setImagePath('/picture/default.jpg');
      }
    }

    get();
  }, [imageName]);

  return (
    <img src={imagePath} alt="" style={{ width: '50px', height: '50px' }} />
  );
};

export default ImageCart;
