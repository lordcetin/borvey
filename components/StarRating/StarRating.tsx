/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import { Star } from "lucide-react";
import { Fragment } from "react";

type Props = {
  categories:any;
  hover:any;
  ratings:any;
  handleRating:any;
  handleHover:any;
  handleMouseLeave:any;
}

const StarRating = ({categories,hover,ratings,handleRating,handleHover,handleMouseLeave}:Props) => {

  return (
    <div className="container w-100">
      <div className="flex-col items-center">
      {categories.map((category:any,x:any) => (
        <Fragment key={x}>
        <div key={category.stateKey} className="flex items-center mt-5">
          <h3 className="flex items-center w-full">{category.name}</h3>
          <div className="flex items-center text-[2rem] transition-all">
            {[...Array(5)].map((star, index) => {
              index += 1;
              return (
                <Fragment key={index}>
                {index <= (hover[category.stateKey] || ratings[category.stateKey]) ?
                <>
                <svg 
                key={index}
                className="fill-amber-500 transition-all size-[24px]"
                onClick={() => handleRating(category.stateKey, index)}
                onMouseEnter={() => handleHover(category.stateKey, index)}
                onMouseLeave={() => handleMouseLeave(category.stateKey)}
                style={{ cursor: 'pointer', marginRight: '5px' }}
                enableBackground="new 0 0 32 32" 
                id="Glyph" version="1.1" 
                viewBox="0 0 32 32" 
                xmlSpace="preserve" 
                xmlns="http://www.w3.org/2000/svg" 
                xmlnsXlink="http://www.w3.org/1999/xlink"><path d="M29.895,12.52c-0.235-0.704-0.829-1.209-1.549-1.319l-7.309-1.095l-3.29-6.984C17.42,2.43,16.751,2,16,2  s-1.42,0.43-1.747,1.122l-3.242,6.959l-7.357,1.12c-0.72,0.11-1.313,0.615-1.549,1.319c-0.241,0.723-0.063,1.507,0.465,2.046  l5.321,5.446l-1.257,7.676c-0.125,0.767,0.185,1.518,0.811,1.959c0.602,0.427,1.376,0.469,2.02,0.114l6.489-3.624l6.581,3.624  c0.646,0.355,1.418,0.311,2.02-0.114c0.626-0.441,0.937-1.192,0.811-1.959l-1.259-7.686l5.323-5.436  C29.958,14.027,30.136,13.243,29.895,12.52z" id="XMLID_328_"/></svg>
                {/* <TbStarFilled 
                key={index}
                className="text-amber-500 transition-all"
                onClick={() => handleRating(category.stateKey, index)}
                onMouseEnter={() => handleHover(category.stateKey, index)}
                onMouseLeave={() => handleMouseLeave(category.stateKey)}
                style={{ cursor: 'pointer', marginRight: '5px' }}
                /> */}
                </>
                :
                <Star
                key={index}
                className="text-amber-500 transition-all"
                onClick={() => handleRating(category.stateKey, index)}
                onMouseEnter={() => handleHover(category.stateKey, index)}
                onMouseLeave={() => handleMouseLeave(category.stateKey)}
                style={{ cursor: 'pointer', marginRight: '5px' }}
                />
                }
                </Fragment>
              );
            })}
          </div>
        </div>
        </Fragment>
      ))}
      </div>
    </div>
  );
};

export default StarRating;
