function injectContents() {
    const pages = [...document.querySelectorAll('[data-page-heading]')];
    const contentContainer = document.querySelector('.js-contents-container-target');
    let groups = [];

    addPageNums();

    pages.forEach((page, i) => {
        const pageNum = page.dataset.pageNumber;
        const pageGroup = page.dataset.pageGroup;

        // Checking if the page is missing heading or it's data-page-contents is set to false
        if ( page.dataset.pageHeading == '' || page.dataset.pageContents == 'false' ) return;

        // Checking if this is the first iteration or table for the current page's group doesn't already exist
        if ( i == 0 || !groups.includes(pageGroup) ) {
            const table = document.createElement('div');
            table.classList.add('table');
            table.setAttribute('id', pageGroup);

            const header = document.createElement('div');
            header.classList.add('table__row', 'table__header');
            header.innerText = pageGroup;
            table.appendChild(header);
            contentContainer.appendChild(table);
        }

        const row = document.createElement('div');
        row.classList.add('table__row');

        const label = document.createElement('div');
        label.classList.add('table__label');
        label.innerText = page.dataset.pageHeading;
        row.appendChild(label);

        const value = document.createElement('div');
        value.classList.add('table__value');
        value.innerText = pageNum;
        row.appendChild(value);

        document.querySelector(`#${pageGroup}`).appendChild(row);

        if ( !groups.includes(pageGroup) ) groups.push(pageGroup);
    });
}

function addPageNums() {
    const pages = document.querySelectorAll('.page');
    pages.forEach((page, index) => {
        const pageNumDiv = page.querySelector('.pageNumber');

        if ( pageNumDiv == null ) return;

        if ( index % 2 ) pageNumDiv.classList.add('pageNumber--right');

        page.dataset.pageNumber = index;
        pageNumDiv.innerHTML = index;
    });
}