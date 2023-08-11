const newBookButton = document.getElementById('new-book-button');
const modalNewBook = document.getElementById('new-book-modal');
const newBookForm = document.getElementById('new-book-form');
const addBookButton = document.getElementById('add-book-button');

const libraryContainer = document.getElementById('library-container');
const bookClone = document.getElementById('book-clone');

const library = (() => {
    let contents = [];
    const append = book => {
        let newBookElement = bookClone.cloneNode(true);
        let infoDivs = newBookElement.querySelectorAll('div.book-info');
        newBookValues = [book.title, book.author, book.pages]

        newBookElement.removeAttribute("id");

        infoDivs.forEach((div, index) => {
            div.textContent = newBookValues[index];
        });

        const readButton = newBookElement.querySelectorAll('div.read-button')[0];
        const removeButton = newBookElement.querySelectorAll('div.remove-button')[0];

        readButton.onclick = (e) => {
            book.read = !book.read;
            readButton.dataset.read = book.read;
            readButton.textContent = book.read ? "Read" : "Not read";
        }

        removeButton.onclick = (e) => {
            library.remove(book);
            removeButton.closest(".book-container").remove();
        }

        newBookForm.reset();
        libraryContainer.appendChild(newBookElement);
    }
    const add = book => {
        console.log(`adding ${book.title}`)
        library.contents.push(book);
        append(book);
    }
    const remove = book => {
        console.log(`removing ${book.title}`)
        console.log(contents)
        library.contents = library.contents.filter(b => b.title !== book.title);
    }
    return {contents, add, remove}
})();

const bookFactory = (title, author, pages) => {
    let read = false;
    const toggleRead = event => {
        console.log("toggleRead")
        read = true;
        this.read = true;
    }
    return {title, author, pages, read, toggleRead}
}

function showModal(modal){
    modal.style.display = "block";
}
function hideModal(modal){
    modal.style.display = "none";
}

function toggleRead() {
    return (e) => {
        console.log("toggleClass");
        console.log(element);
        console.log(class1);
        console.log(class2);
        const hasClass1 = element.classList.contains(class1);
        const hasClass2 = element.classList.contains(class2);
    
        if (hasClass1 && hasClass2) {
        element.classList.remove(class2);
        } else if (hasClass1) {
        element.classList.remove(class1);
        element.classList.add(class2);
        } else if (hasClass2) {
        element.classList.remove(class2);
        element.classList.add(class1);
        }
    }
  }

newBookButton.addEventListener('click',function(e){
    showModal(modalNewBook);
})

addBookButton.addEventListener('click',function(e){
    e.preventDefault();

    let title = document.getElementById("title").value;
    let author = document.getElementById("author").value;
    let pages = document.getElementById("pages").value;

    let newBook = bookFactory(title, author, `${pages} pages`);
    library.add(newBook);

    hideModal(modalNewBook);
})
