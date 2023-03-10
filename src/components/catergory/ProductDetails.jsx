import React, { useRef, useState } from "react";
import classes from "./ProductDetails.module.scss";
import useFetch from "../hooks/use-fetch";
import { RiCloseCircleLine } from "react-icons/ri";
import { ImStarFull, ImStarHalf, ImStarEmpty } from "react-icons/im";
import ProductDetailContent from "./ProductDetailContent";

function ProductDetails({ productId, onClose }) {
  const { data, isLoading, error } = useFetch(`products/${productId}`);
  const [selected, setSelected] = useState(0);
  const [selectedImage, setSelectedImage] = useState(data?.images?.[0]);
  const imageRef = useRef(null);
  const myRef = useRef(null);

  const totalRating = [];

  let rating = data?.rating;
  for (let i = 0; i < 5; i++) {
    rating -= 1;
    const rate = Math.floor(rating);

    if (rate === 0) {
      totalRating.push(
        <ImStarHalf key={i} className={classes["product__rate"]} />
      );
    }
    if (rate < 0) {
      totalRating.push(<ImStarEmpty key={i} className={classes.half} />);
    }
    if (rate > 0) {
      totalRating.push(
        <ImStarFull key={i} className={classes["product__rate"]} />
      );
    }
  }

  const imageHandler = function (id, e) {
    setSelectedImage(e.target.src);
    setSelected(id);
  };

  return (
    <div className={classes["product-details"]}>
      <RiCloseCircleLine
        className={classes.close}
        onClick={() => onClose(false)}
      />
      {data && (
        <div className={classes["images-container"]}>
          <div className={classes["display-image"]}>
            <img
              ref={myRef}
              src={selectedImage || data?.images?.[0]}
              alt={data?.title}
            />
          </div>
          <div className={classes["image-tumbline"]}>
            <ul>
              {data?.images?.map((image, i) => (
                <div key={i} className={selected === i ? classes.selected : ""}>
                  <img
                    ref={selected === i ? imageRef : null}
                    onClick={(e) => imageHandler(i, e)}
                    src={image}
                    alt={data?.title}
                  />
                </div>
              ))}
            </ul>
          </div>
        </div>
      )}
      {data && (
        <ProductDetailContent
          title={data?.title}
          description={data?.description}
          totalRating={totalRating}
          discount={data?.discountPercentage}
          price={data?.price}
          stock={data?.stock}
          id={data?.id}
          image={data?.images?.[0]}
        />
      )}
    </div>
  );
}

export default ProductDetails;
