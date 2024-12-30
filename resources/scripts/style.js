const elements = document.querySelectorAll('.hidden')

const handleScroll = () => {
  elements.forEach((element) => {
    const rect = element.getBoundingClientRect()
    if (rect.top < window.innerHeight - 100) {
      element.classList.add('visible')
    }
  });
};

window.addEventListener('scroll', handleScroll)
