document.addEventListener('DOMContentLoaded', () => {
    const tocContainer = document.getElementById('toc');
    const mainContent = document.querySelector('main');
    const backToTopButton = document.getElementById('back-to-top');


    const headings = mainContent.querySelectorAll('h1, h2, h3');
    let tocHTML = '';

    headings.forEach(heading => {
        const id = heading.id || heading.textContent.trim().toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
        heading.id = id;
        
        let indentClass = '';
        if (heading.tagName === 'H2') {

        } else if (heading.tagName === 'H3') {
            indentClass = 'pl-4';
        }


        if (heading.tagName === 'H2' || heading.tagName === 'H3') {
             tocHTML += `<a href="#${id}" class="toc-link ${indentClass}" data-target="${id}">${heading.textContent}</a>`;
        }
    });

    if (tocContainer) {
        tocContainer.innerHTML = tocHTML;
    }


    const tocLinks = document.querySelectorAll('.toc-link');
    tocLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });


    if (backToTopButton) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopButton.classList.add('visible');
            } else {
                backToTopButton.classList.remove('visible');
            }
        });

        backToTopButton.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }


    const sections = Array.from(headings).filter(h => h.tagName === 'H2' || h.tagName === 'H3');
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            const id = entry.target.getAttribute('id');
            const link = tocContainer.querySelector(`a[href="#${id}"]`);
            if (link) {
                if (entry.isIntersecting && entry.intersectionRatio > 0) {

                    tocContainer.querySelectorAll('.toc-link').forEach(l => l.classList.remove('active'));

                    link.classList.add('active');
                }
            }
        });
    }, { rootMargin: '0px 0px -75% 0px', threshold: 0.1 });
    
    sections.forEach(section => {
        observer.observe(section);
    });

});
