import "../css/style.css";

const images = [
  {
    url: "../images/banner_first_slide.jpg",
  },
  {
    url: "../images/banner_second_slide.jpg",
  },
  {
    url: "../images/banner_third_slide.jpg",
  },
];

function drawSliderImages() {
  for (let i = 0; i < images.length; i++) {
    document.querySelector(".slider_line").innerHTML +=
      `<img src="${images[i].url}" alt="slider_image" />`;
    let dots = document.createElement("div");
    dots.classList.add("dots");
    let drawBox = document.querySelector(".main_dots_block");
    drawBox += drawBox.appendChild(dots);
  }
}
drawSliderImages();
