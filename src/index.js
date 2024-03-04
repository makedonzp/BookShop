import "../css/style.css";
import "../css/zero_styles.css";
import "../scss/style.scss";

const images = [
  {
    url: "./images/banner_first_slide.jpg",
  },
  {
    url: "./images/banner_second_slide.jpg",
  },
  {
    url: "./images/banner_third_slide.jpg",
  },
];
const cartStorage = JSON.parse(localStorage.getItem("cart") ?? "[]");
const sliderLine = document.querySelector(".slider_line");
const widthOffset = document.querySelector(".slider").clientWidth;
console.log(widthOffset);
const clonedSlides = sliderLine.cloneNode(true);
const movingSlider = () => {
  sliderLine.style.transition = "transform 0.5s ease-in-out"; // Добавляем CSS transition
  sliderLine.style.transform = `translateX(-${widthOffset * count}px)`; // Перемещаем слайды
};
let shopIcon = document.querySelector(".buy_active_bag");
let count = 0;
let dots = [];
let mainDotsBlock = document.querySelector(".main_dots_block");
let slider = document.querySelector(".slider");
let autoplay = setInterval(playNext, 5000);
let header = document.querySelector(".header");
let classSticky = header.offsetTop;
let subject = document.querySelector(".main__category_box-item").innerText;

if (cartStorage.length > 0) {
  shopIcon.style = `display: flex`;
  shopIcon.innerHTML = cartStorage.length;
} else {
  shopIcon.style = `display: none`;
  shopIcon.innerHTML = cartStorage.length;
}
let notForSale = "Free";
let starItem = `<p class="rating_item" aria-label="Rating is 4.5 out of 5">
<svg width="12" height="12" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
   <path d="M31.547 12a.848.848 0 00-.677-.577l-9.427-1.376-4.224-8.532a.847.847 0 00-1.516 0l-4.218 8.534-9.427 1.355a.847.847 0 00-.467 1.467l6.823 6.664-1.612 9.375a.847.847 0 001.23.893l8.428-4.434 8.432 4.432a.847.847 0 001.229-.894l-1.615-9.373 6.822-6.665a.845.845 0 00.214-.869z" />
</svg>
</p>`;
let starItemYellow = `<p class="rating_item-yellow" aria-label="Rating is 4.5 out of 5">
<svg width="12" height="12" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
   <path d="M31.547 12a.848.848 0 00-.677-.577l-9.427-1.376-4.224-8.532a.847.847 0 00-1.516 0l-4.218 8.534-9.427 1.355a.847.847 0 00-.467 1.467l6.823 6.664-1.612 9.375a.847.847 0 001.23.893l8.428-4.434 8.432 4.432a.847.847 0 001.229-.894l-1.615-9.373 6.822-6.665a.845.845 0 00.214-.869z" />
</svg>
</p>`;
let bookItem = document.querySelector(".main__books_place-books");
let requestBook;
let content;
let coutnObjectBooksItemsResult = 6;

window.onscroll = function () {
  scrollPageSticky();
};

function scrollPageSticky() {
  if (window.pageYOffset > classSticky) {
    header.classList.add("sticky");
    document.querySelector(".main").style = `margin-top: 116px;`;
  } else {
    header.classList.remove("sticky");
    document.querySelector(".main").style = `margin-top: 0;`;
  }
}
function initPage() {
  for (let i = 0; i < images.length; i++) {
    let dot = document.createElement("div");
    dot.classList.add("dots");
    mainDotsBlock.append(dot);
    dots.push(dot);
    sliderLine.innerHTML += `<img src="${images[i].url}" class="images" alt="slider images"/>`;
  }

  // Клонируем слайды для создания цикла

  sliderLine.appendChild(clonedSlides);

  dots[count].classList.add("active_dot");
  movingSlider();
}
initPage();

function playNext() {
  count++;
  sliderLine.style.transition = "transform 0.5s ease-in-out";
  movingSlider();
  updateActiveDot();
}

function playPrev() {
  count--;
  sliderLine.style.transition = "transform 0.5s ease-in-out";
  movingSlider();
  updateActiveDot();
}

function updateActiveDot() {
  document.querySelector(".dots.active_dot").classList.remove("active_dot");
  dots[count % images.length].classList.add("active_dot"); // Используем остаток от деления
}
function initiDots() {
  for (let j = 0; j < dots.length; j++) {
    dots[j].addEventListener("click", () => {
      count = j;
      movingSlider();
      updateActiveDot();
    });
  }
}
initiDots();

sliderLine.addEventListener("transitionend", () => {
  if (count >= images.length) {
    count = 0;
    sliderLine.style.transition = "none";
    sliderLine.style.transform = `translateX(0)`;
  } else if (count < 0) {
    count = images.length - 1;
    sliderLine.style.transition = "none";
    sliderLine.style.transform = `translateX(-${widthOffset * images.length}px)`;
  }
});

slider.addEventListener("mouseover", () => {
  clearInterval(autoplay);
});
slider.addEventListener("mouseout", () => {
  autoplay = setInterval(playNext, 5000);
});
mainDotsBlock.addEventListener("mouseover", () => {
  clearInterval(autoplay);
});
mainDotsBlock.addEventListener("mouseout", () => {
  autoplay = setInterval(playNext, 5000);
});

let bntActive = document.querySelectorAll(".main__category_box-item");

for (let i = 0; i < bntActive.length; i++) {
  bntActive[i].addEventListener("click", () => {
    coutnObjectBooksItemsResult = 6;
    subject = event.target.innerText;
    bookItem.innerHTML = "";
    loadBooks.innerHTML = "";
    booksInit(bookItem, coutnObjectBooksItemsResult, 0);

    let activeDecorElement = document.querySelectorAll(
      ".main__category_box-item-list"
    );
    let categoryActive = document.querySelectorAll(".main__category_box-item");
    for (let i = 0; i < activeDecorElement.length; i++) {
      activeDecorElement[i].classList.remove("active_category_item");
      categoryActive[i].classList.remove("active_category_item");
    }
    activeDecorElement[i].classList.add("active_category_item");
    event.target.classList.add("active_category_item");
  });
}
async function booksInit(page, load, start) {
  coutnObjectBooksItemsResult = load;
  requestBook = await fetch(
    `https://www.googleapis.com/books/v1/volumes?q="subject:${subject}"&key=AIzaSyATuREMcehrlywzugoPNrfUSjUXx62JRvk&printType=books&startIndex=0&maxResults=${coutnObjectBooksItemsResult}&langRestrict=en`
  );
  content = await requestBook.json();
  console.log(content);
  for (let i = start; i < coutnObjectBooksItemsResult; i++) {
    page.innerHTML += `<div class="main__book_item">
                    <div class="main__item_box">
                        <img
                            src="${
                              content.items[i].volumeInfo.imageLinks
                                ?.thumbnail ??
                              `https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/450px-No_image_available.svg.png`
                            }"
                            alt="image book icon preview"
                        />
                    </div>
                    <div class="main__item_text">
                        <h5 class="author" alt="author: ${content.items[i].volumeInfo.authors}">${content.items[i].volumeInfo.authors}</h5>
                        <h2 class="book_title" alt="book title: ${content.items[i].volumeInfo.title}">${content.items[i].volumeInfo.title}</h2>
                        <div class="rating_box" alt="rating book is ${content.items[i].volumeInfo?.averageRating ?? 0} stars">
                        <div class="star_bgr">
                        ${starItemYellow}
                        ${starItemYellow}
                        ${starItemYellow}
                        ${starItemYellow}
                        ${starItemYellow}
                        </div>
                        <div class="star_default">
                        ${starItem}
                        ${starItem}
                        ${starItem}
                        ${starItem}
                        ${starItem}
                        </div>
                        <div class="review">${content.items[i].volumeInfo?.ratingsCount ?? 0} review</div>
                        </div>
                        <p class="decription" alt="decription book: ${content.items[i].volumeInfo?.description ?? `Unfortunately, there is no description for this book.`}">
                        ${content.items[i].volumeInfo?.description ?? `Unfortunately, there is no description for this book.`}
                        </p>
                        <p class="price" alt="book price: ${content.items[i].saleInfo.listPrice?.amount ?? notForSale} ${content.items[i].saleInfo.listPrice?.currencyCode ?? ""}">${content.items[i].saleInfo.listPrice?.amount ?? notForSale} ${content.items[i].saleInfo.listPrice?.currencyCode ?? ""}</p>
                        <button class="buy_button ${cartStorage.includes(content.items[i].id) ? "active_shop" : ""}" data-id="${content.items[i].id}" alt="button for buy">${cartStorage.includes(content.items[i].id) ? "IN THE CART" : "BUY NOW"}</button>
                    </div>
                </div>`;
    let starWidth = document.querySelectorAll(".star_bgr");
    starWidth[i].style =
      `width: ${(34 / 5) * content.items[i].volumeInfo?.averageRating ?? 0}%`;
  }
  document.querySelector(".main__load_more").style = `padding: 0`;
}
booksInit(bookItem, coutnObjectBooksItemsResult, 0);

let loadBooks = document.querySelector(".load_more_books_box");

document.querySelector(".btn_load_more").addEventListener("click", () => {
  document.querySelector(".btn_load_more").style = "margin-top:30px";
  booksInit(loadBooks, (coutnObjectBooksItemsResult += 6), 6);
});

document.addEventListener("click", (event) => {
  if (event.target.classList.contains("buy_button")) {
    const id = event.target.dataset.id;
    if (cartStorage.includes(id)) {
      cartStorage.splice(cartStorage.indexOf(id), 1);
      event.target.innerText = `BUY NOW`;
      event.target.classList.remove("active_shop");
      shopIcon.innerHTML = cartStorage.length;
      shopIcon.setAttribute(
        "alt",
        `how many buying shop you have ${cartStorage.length}`
      );
      if (cartStorage.length <= 0) {
        shopIcon.style = `display: none`;
      }
    } else {
      cartStorage.push(id);
      event.target.innerText = `IN THE CART`;
      event.target.classList.add("active_shop");
      shopIcon.style = `display: flex`;
      shopIcon.innerHTML = cartStorage.length;
      shopIcon.setAttribute(
        "alt",
        `how many buying shop you have ${cartStorage.length}`
      );
    }

    localStorage.setItem("cart", JSON.stringify(cartStorage));
  }
});
