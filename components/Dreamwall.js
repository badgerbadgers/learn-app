import dynamic from 'next/dynamic'
import styles from '../styles/Home.module.css'
import useWindowDimensions from '../lib/useWindowDimensions'
const Sketch = dynamic(() => import("react-p5"),
  { ssr: false }
) 
 

const DreamWall = () => {
 
  // const { height, width } = useWindowDimensions();
  let cnv;
  let images =[];
  let imageSelectorArray;
  let selectedImages = []
  let img1, img2, img3, img4, img5, img6, img7, img8, img9, img10, img11, img12, img13, img14;
  const imgSize = 90;
  let columns;
  let rows;
  let lottoArray;
  let selectedIndex;
 // array to hold snowflake objects
const preload = (p5) => {
  img1 = p5.loadImage('/img/dreamwall/1.jpg');
  img2 = p5.loadImage('/img/dreamwall/2.jpg');
  img3 = p5.loadImage('/img/dreamwall/3.jpg');
  img4 = p5.loadImage('/img/dreamwall/4.jpg');
  img5 = p5.loadImage('/img/dreamwall/5.jpg');
  img6 = p5.loadImage('/img/dreamwall/6.jpg');
  img7 = p5.loadImage('/img/dreamwall/7.jpg');
  img8 = p5.loadImage('/img/dreamwall/8.jpg');
  img9 = p5.loadImage('/img/dreamwall/9.jpg');
  img10 = p5.loadImage('/img/dreamwall/10.jpg');
  img11= p5.loadImage('/img/dreamwall/11.jpg');
  img12= p5.loadImage('/img/dreamwall/12.jpg');
  img13= p5.loadImage('/img/dreamwall/13.jpg');
  img14 = p5.loadImage('/img/dreamwall/14.jpg');
  imageSelectorArray = [img1, img2, img3,img4, img5, img6, img7, img8, img9, img10, img11, img12, img13, img14]
}
const setup = (p5, canvasParentRef) => {
  const height = p5.windowHeight
  const width = p5.windowWidth
  console.log('height', width)
  cnv = p5.createCanvas(width,  height).parent(canvasParentRef)
  columns = Math.floor(width / 90) + 1;
  rows = Math.floor(height / 90) +1;
  p5.background(220);
  p5.noStroke();
  p5.frameRate(30)
  for (var i =0; i < width; i++) {
    // lottoArray.push(i)
    const x = (90 * Math.floor(p5.random(columns)))
    const y = (90 * Math.floor(p5.random(rows)))

    const theImage = imageSelectorArray[Math.round(p5.random(0, imageSelectorArray.length -1))]
    images[i] = new Square(p5, theImage, x, y)
    
  }
}

const draw = (p5, canvasParentRef) => {
  p5.background(255)
  if (p5.frameCount % 11) {
    selectedIndex = Math.round(p5.random(0, images.length -1));
    selectedImages.push(images[selectedIndex])
 
  } 
  for (var i=0; i < selectedImages.length -1; i++) {
    if (selectedImages[i].tint < 1 && selectedImages[i].darken == false) {
      selectedImages.splice(i, 1)
    }
     selectedImages[i].show(p5);
  }
}

// snowflake class
class Square {
  constructor(p5, img, x, y) {
    this.img = img
    // this.img.resize(50, 100);
    this.x = x;
    this.y = y;
    this.tint=0;
    this.darken = true; 
  }

  show(p5) {
    // x position follows a circle
    if (this.tint > 128) {
      this.darken=false;
      } if( this.tint <= 0) {
      this.darken = true
      }
      p5.image(this.img, this.x, this.y);
      p5.tint(255, this.tint);
      if (this.darken) {
        this.tint+=7
      } else {
        this.tint -=7;
      }
    }
  }



 return (
   <div id='canvas-parent' className={styles.canvasParent}>
     <div className="sketch-wrapper">
      <Sketch 
       setup={(...args) => setup(...args)} preload={(...args) => preload(...args)} 
      //  preload={(...args) => preload(...args)} 
      //  keyPressed={(...args) => keyPressed(...args)} 
       draw={(p5, img) => draw(p5, img)}/>
		 </div>
     
   </div>
 )

 }

 export default DreamWall