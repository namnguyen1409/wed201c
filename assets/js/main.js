// Chọn tất cả các phần tử có class "none-style"
const noneStyle = document.querySelectorAll('.none-style');

for (let i = 0; i < noneStyle.length; i++) {
    // Chọn tất cả các phần tử con của phần tử có class "none-style"
    const elements = noneStyle[i].querySelectorAll('*');

    // Duyệt qua tất cả các phần tử con
    for (let j = 0; j < elements.length; j++) {
        const el = elements[j];
        // Lấy các thuộc tính style đã được áp dụng từ CSS
        const computedStyle = window.getComputedStyle(el);
        // Tạo một bản sao các thuộc tính style để loại bỏ
        const properties = Array.from(computedStyle);

        // thêm style inline cho phần tử với các thuộc tính đã được áp dụng từ CSS chuyển về mặc định
        properties.forEach(property => {
            el.style[property] = computedStyle[property];
        });
    }
}

// function iconSet for hide and show icon on document

function iconSet(iconUrl) {
    const icon = document.querySelectorAll('.icon');
    const button = document.querySelector('#changeIcon');
    href = icon[0].getAttribute('href');
    if (href == iconUrl) {
        icon[0].setAttribute('href', './assets/img/null.png');
        button.innerHTML = 'Thêm icon';
    }
    else {
        icon[0].setAttribute('href', iconUrl);
        button.innerHTML = 'Xóa icon';
    }
}

function changeTitle() {
    const title = document.querySelector('#title');
    const newTitle = document.querySelector('#inputTitle');
    title.innerHTML = newTitle.value;
}

function changeBorderStyle() {
    const borderStyle = document.querySelector('#borderStyle');
    const table = document.querySelector('#tableStyle');
    // set style for table, td, th
    table.style.border = borderStyle.value;
    const td = table.querySelectorAll('td');
    const th = table.querySelectorAll('th');
    for (let i = 0; i < td.length; i++) {
        td[i].style.border = borderStyle.value;
    }
    for (let i = 0; i < th.length; i++) {
        th[i].style.border = borderStyle.value;
    }
}


// function change iframe height for fit content
function changeHeight(iFrame) {
    iFrame.height = iFrame.contentWindow.document.body.scrollHeight + "px";
}

// find all iframes wwith class fit-content
window.addEventListener('DOMContentLoaded', function(e) {
    var iframes = document.querySelectorAll('.fit-content');
    for (var i = 0; i < iframes.length; i++) {
        iframes[i].addEventListener('load', function(e) {
            changeHeight(e.target);
        });
    }
});

document.addEventListener("DOMContentLoaded", function() {
    let iframes = document.querySelectorAll('iframe[data-src]');

    let lazyLoad = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                let iframe = entry.target;
                iframe.src = iframe.getAttribute('data-src');
                iframe.removeAttribute('data-src');
                observer.unobserve(iframe);

                // Kiểm tra URL của iframe trước khi tạo liên kết
                let iframeUrl = iframe.src;
                if (iframeUrl) {
                    let urlName = iframeUrl.split('/').pop();
                    // Thêm liên kết "Mở trong tab mới" ngay sau iframe
                    iframe.insertAdjacentHTML('afterend', `<a class="openIframe" href="javascript:void(0);" onclick="window.open('${iframeUrl}', '${urlName}', 'width=600,height=400')">Mở trong tab mới</a>`);
                }
            }
        });
    };

    let observer = new IntersectionObserver(lazyLoad, {
        root: null,
        rootMargin: "0px",
        threshold: 0
    });

    iframes.forEach(iframe => {
        observer.observe(iframe);
    });
});


