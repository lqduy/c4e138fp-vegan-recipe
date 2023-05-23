const recipeCollection = [
    {
        chef: {
            chefName: 'Nguyễn Đức An',
            chefId: '110132'
        },
        recipes: [
            {
                id: '110132-0001',
                name: 'Mì Cà Ri',
                thumbnail: '/assets/mi-ca-ri.jpg',
                intro: 'Món mì được làm cho những ngày mưa. Cái vị có chút thơm nồng của bột cà ri làm cho mước dùng của món mì này thêm phần đặc biệt…',
                cookingTime: "15'",
                preparationTime: "30'",
                price: 20,
                tag: ['món Việt', 'món nước', 'mì']
            },
            {
                id: '110132-0002',
                name: 'Chả Ngải Cứu',
                thumbnail: '/assets/cha-ngai-cuu.jpg',
                intro: 'Chả ngải cứu chay với vị của ngải cứu rất đặc trưng, có chút ngăm ngăm, nhưng hậu vị thì lại ngọt đậm đà. Bạn có thể làm món này như một món ăn chơi chấm cùng nước tương tỏi ớt…',
                cookingTime: "45'",
                preparationTime: "45'",
                price: 40,
                tag: ['món Việt', 'chả']
            }
        ]
    },
    {
        chef: {
            chefName: 'Nguyễn Trọng Nhân',
            chefId: '110133'
        },
        recipes: [
            {
                id: '110133-0001',
                name: 'Canh Kim Chi Đậu Phụ',
                thumbnail: '/assets/canh-kim-chi-dau-phu.png',
                intro: 'Những ngày đầu đông giá lạnh, bát canh kim chi đậu phụ nóng hổi, đậm đà, chút cay nồng với màu đỏ hấp dẫn, nhìn mà đã thèm ngay rồi…',
                cookingTime: "20'",
                preparationTime: "35'",
                price: 25,
                tag: ['canh']
            },
            {
                id: '110133-0002',
                name: 'Đậu Sốt Coca',
                thumbnail: '/assets/dau-sot-coca.jpg',
                intro: 'Đậu sốt coca có vị ngọt dịu, mùi thơm nhẹ và mới lạ. Đậu mới buổi sáng còn béo ngậy, rán lên rồi đem sốt, cắn miếng nào là sướng miếng đó!…',
                cookingTime: "15'",
                preparationTime: "30'",
                price: 25,
                tag: ['món Việt', 'món lạ']
            },
            {
                id: '110133-0003',
                name: 'Bánh Tráng Trộn',
                thumbnail: '/assets/banh-trang-tron.jpg',
                intro: 'Nguyên liệu làm món này thì đa số đều sẵn có, không khó tìm mua. Bạn có thể biến tấu thêm, trộn cùng mấy món mà bản thân yêu thích…',
                cookingTime: "25'",
                preparationTime: "5'",
                price: 25,
                tag: ['món Việt', 'ăn vặt']
            }
        ]
    },
    {
        chef: {
            chefName: 'Lý Công Thành',
            chefId: '110134'
        },
        recipes: [
            {
                id: '110134-0001',
                name: 'Bánh Rán Hành Hàn Quốc',
                thumbnail: '/assets/banh-ran-hanh-han-quoc.png',
                intro: 'Lắm lúc ở nhà cuối tuần là mình lại buồn miệng, muốn làm món ăn vặt gì ngon ngon, ngồi ăn nhâm nhi chill cho hết ngày. Gợi ý cho…',
                cookingTime: "30'",
                preparationTime: "60'",
                price: 35,
                tag: ['bánh', 'Hàn Quốc']
            },
            {
                id: '110134-0002',
                name: 'Cải Thảo Cuộn',
                thumbnail: '/assets/cai-thao-cuon.jpg',
                intro: 'Món mì được làm cho những ngày mưa. Cái vị có chút thơm nồng của bột cà ri làm cho mước dùng của món mì này thêm phần đặc biệt…',
                cookingTime: "20'",
                preparationTime: "50'",
                price: 40,
                tag: ['món Việt', 'món lạ']
            },
            {
                id: '110134-0003',
                name: 'Bánh Gối',
                thumbnail: '/assets/banh-goi.jpg',
                intro: 'Bánh gối là món ăn đường phố quen thuộc ở Hà Nội. Những ai đã trải qua thời học sinh khó mà quên được kí ức sau giờ học…',
                cookingTime: "40'",
                preparationTime: "30'",
                price: 40,
                tag: ['món Việt', 'bánh']
            }
        ]
    },
    {
        chef: {
            chefName: 'Trịnh Duy Châu',
            chefId: '110135'
        },
        recipes: [
            {
                id: '110135-0001',
                name: 'Cháo Nấm Rau Củ',
                thumbnail: '/assets/chao-nam-rau-cu.png',
                intro: 'Hồi bé mỗi khi mình cảm thấy không khoẻ là mẹ lại nấu cháo cho ăn. Từng miếng cháo ấm bụng xua đi phần nào mệt mỏi. Đầu đông Hà…',
                cookingTime: "5'",
                preparationTime: "15'",
                price: 15,
                tag: ['cháo', 'món Việt']
            },
            {
                id: '110135-0002',
                name: 'Cơm Chiên Kim Chi',
                thumbnail: '/assets/com-chien-kim-chi.jpg',
                intro: '“Bí quyết” của mình là dùng kim chi chua, đã muối lâu. Kim chi lúc này nếu để ăn không thì không ngon cho lắm, nhưng nấu canh hay dùng để chiên cơm lại là ngon nhật…',
                cookingTime: "15'",
                preparationTime: "30'",
                price: 30,
                tag: ['cơm', 'món chiên']
            },
            {
                id: '110135-0003',
                name: 'Khổ Qua Xào',
                thumbnail: '/assets/kho-qua-xao.jpg',
                intro: 'Mướp đắng là một nguyên liệu đặc biệt trong ẩm thực Việt Nam. Giống như cái tên của nó, không phải ai cũng yêu mến mùi vị của loại quả này…',
                cookingTime: "15'",
                preparationTime: "10'",
                price: 35,
                tag: ['món Việt', 'món xào']
            },
            {
                id: '110135-0004',
                name: 'Bún Ốc Chay',
                thumbnail: '/assets/bun-oc-chay.jpg',
                intro: 'So với bún riêu thì món bún ốc có phần đơn giản hơn, từ nước dùng cho tới đồ ăn kèm. Vì vậy mình cũng tinh giản nguyên liệu…',
                cookingTime: "40'",
                preparationTime: "40'",
                price: 35,
                tag: ['món Việt', 'món nước', 'bún']
            }
        ]
    },
    {
        chef: {
            chefName: 'Nguyễn Hào',
            chefId: '110136'
        },
        recipes: [
            {
                id: '110136-0001',
                name: 'Mứt Củ Dền',
                thumbnail: '/assets/mut-cu-den.jpg',
                intro: 'Có vô vàn cách để nhuộm màu cho mứt từ những nguyên liệu tự nhiên. Mình vẫn thích sắc hồng của mứt dừa củ dền nhất màu hồng tươi xinh cho một năm mới nhiều may mắn…',
                cookingTime: "30'",
                preparationTime: "60'",
                price: 25,
                tag: ['món ngọt', 'món Việt', 'mứt', 'món Tết']
            },
            {
                id: '110136-0002',
                name: 'Nấm Mỡ Rim Me',
                thumbnail: '/assets/nam-mo-rim-me.jpg',
                intro: 'Những món với nấm lúc nào cũng đem lại sự ngon miệng đậm đà. Và nấm mỡ rim me là một món ăn đơn giản ngon lành cho mâm cơm gia đình…',
                cookingTime: "15'",
                preparationTime: "25'",
                price: 45,
                tag: ['món Việt', 'món kho']
            }
        ]
    }
];

// Trải phẳng biến recipeCollection
export function recipeCollectionSpread() {
    let item = {};
    let array = [];
    for (let i = 0; i < recipeCollection.length; i++) {
        for (let j = 0; j < recipeCollection[i].recipes.length; j++) {
            item = { ...recipeCollection[i].recipes[j], ...recipeCollection[i].chef };
            array.push(item);
        }
    }
    return array.sort((a, b) => a.name.localeCompare(b.name));
}

// Tạo mảng chứa tất cả tag
export function getTagList() {
    let tagList = [];
    recipeCollectionSpread().forEach((recipe) => {
        const tagNotYet = recipe.tag.filter((tag) => !tagList.find((tagInTagList) => tagInTagList === tag));
        tagList = [...tagList, ...tagNotYet];
    });
    return tagList.sort((a, b) => a.localeCompare(b));
}

// Lấy tất cả từ khóa để tìm kiếm
export function getAllKeyToSearch() {
    let newObject = recipeCollectionSpread().map((parent) => {
        const { name, chefName, tag } = parent;
        return (parent = [name, chefName, tag]);
    });
    newObject = newObject
        .flat(2)
        .filter((value, index, self) => self.indexOf(value) === index)
        .map((key) => key.toLowerCase());
    return newObject.sort((a, b) => a.localeCompare(b));
}