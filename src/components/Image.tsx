import axios from "axios";
import { useEffect, useState } from "preact/hooks";
import { Fragment } from "preact/jsx-runtime";
import { checkImageExists } from "../utils/checkImage";

const ImageDisplay = ({ imageName }: { imageName: string }) => {
  const extensions = ['webp', 'png'];
  const [imagePath, setImagePath] = useState('');
  const [error, setError] = useState(false);

  useEffect(() => {
    (async () => {
      const path = await checkImageExists(extensions, imageName);
      if (path) {
        setImagePath(path)
      } else {
        setError(true)
      }
    })
  }, [imageName]);

  return (
    <Fragment>
      {error ? (
        <div class="product__item__pic set-bg" style={`background-image: url("/picture/default.jpg");`}>
          <ul class="product__item__pic__hover">
            <li><a href="#"><i class="bi bi-cart-fill"></i></a></li>
          </ul>
        </div>
      ) : (
        imagePath && <div class="product__item__pic set-bg" style={`background-image: url("${imagePath}");`}>
          <ul class="product__item__pic__hover">
            <li><a href="#"><i class="bi bi-cart-fill"></i></a></li>
          </ul>
        </div>
      )}
    </Fragment>
  );
};

export default ImageDisplay;
