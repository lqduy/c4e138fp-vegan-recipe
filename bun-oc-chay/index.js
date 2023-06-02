import { productList } from '../database/database-products.js';
import { addProductToCart } from '../function/cart-and-collection.js';

const ingredientsList = [
  {
    item: 'Nước sạch',
    unit: 'lít',
    value: 1.25,
    groupId: ''
  },
  {
    item: 'Bún tươi',
    unit: 'g',
    value: 800,
    groupId: 'BUN'
  },
  {
    item: 'Hành tây',
    unit: 'g',
    value: 80,
    groupId: 'HANHTAY'
  },
  {
    item: 'Bắp ngọt',
    unit: 'g',
    value: 220,
    groupId: 'BAP'
  },
  {
    item: 'Nấm sò',
    unit: 'g',
    value: 150,
    groupId: 'NAMSO'
  },
  {
    item: 'Cà chua chín',
    unit: 'g',
    value: 450,
    groupId: 'CACHUA'
  },
  {
    item: 'Nấm hương khô',
    unit: 'g',
    value: 15,
    groupId: 'NAMHUONGKHO'
  },
  {
    item: 'Hành khô',
    unit: 'nhánh',
    value: 2,
    groupId: 'HANHKHO'
  },
  {
    item: 'Nước tương',
    unit: 'tbsp',
    value: 1,
    groupId: 'NUOCTUONG'
  },
  {
    item: 'Muối',
    unit: 'tsp',
    value: 1,
    groupId: 'MUOI'
  },
  {
    item: 'Dầu ăn',
    unit: 'tbsp',
    value: 1,
    groupId: 'DAUAN'
  },
  {
    item: 'Cốt me chua',
    unit: 'g',
    value: 30,
    groupId: 'ME'
  },
  {
    item: '"Ốc" chay',
    unit: '_',
    value: '_',
    groupId: 'OCCHAY'
  },
  {
    item: 'Đậu phụ rán (cắt miếng vuông 2cm chiên vàng)',
    unit: 'g',
    value: 200,
    groupId: 'DAUPHU'
  },
  {
    item: 'Đồ ăn kèm',
    unit: '_',
    value: '_',
    groupId: 'TOPPING'
  },
  {
    item: 'Ớt tươi, hành lá, tía tô, xà lách...',
    unit: '_',
    value: '_',
    groupId: 'RAUSONG'
  }
];

// Render một hàng nguyên liệu
function renderRowInTable(ingredient) {
  return `
    <tr>
        <td>${ingredient.item}</td>
        <td>${ingredient.unit}</td>
        <td>${ingredient.value}</td>
        <td class="buy-space">
            <button><i class="fa-solid fa-cart-shopping"></i></button>
            <div class="seeding-block">
                <div id="${ingredient.groupId}" class="seeding-core">

                </div>
            </div>
        </td>
    </tr>
    `;
}

// Render nguyên bảng nguyên liệu
function renderTable() {
  const elements = document.getElementById('ingredients-board');
  for (const ingredient of ingredientsList) {
    const item = renderRowInTable(ingredient);
    elements.innerHTML += item;
  }
}

// Render một sản phẩm
function renderProductItem(product) {
  const formatPrice = product.price.toLocaleString('en-US');
  return `
    <div class="the-box" product-id="${product.id}">
        <div class="box-thumbnail">
            <img src="${product.image}" alt="">
        </div>
        <div class="box-body">
            <div class="details">
                <h4 class="product-name">${product.name}</h4>
                <div class="product-price">
                    <p>${formatPrice}</p>
                    <p>${product.unit}</p>
                </div>
            </div>
            <button class="add-cart">Thêm</button>
        </div>
    </div>
          `;
}

// Render toàn bộ sản phẩm
function renderProductListAll() {
  for (const group of productList) {
    const elements = document.getElementById(group.groupId);
    for (const product of group.groupItem) {
      const item = renderProductItem(product);
      elements.innerHTML += item;
    }
  }
}

renderTable();
renderProductListAll();

window.addEventListener('load', () => {
  const addProductBtn = Array.from(document.getElementsByClassName('add-cart'));
  addProductBtn.forEach(btn => {
    const productId = btn.parentNode.parentNode.getAttribute('product-id');
    btn.addEventListener('click', () => {
      addProductToCart(productId);
    });
  });
});
